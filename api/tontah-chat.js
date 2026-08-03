// Vercel serverless function — Tontah ticket 3: the five Phase-1 tools,
// bound per persona, persona resolved server-side from the caller's own
// session. Sits alongside api/chat.js (the plain support widget), not yet
// replacing it — this is the tool-calling entry point for the actual
// Tontah personas.
//
// Security boundary (implementation doc, Part III): "A request for a
// persona the session doesn't hold is rejected, not downgraded. A client
// that can send persona: 'teacher' and get teacher tools is the whole
// security model gone." Accordingly, this endpoint never reads a persona
// or profileId from the request body for gating purposes — only from the
// caller's verified Supabase access token.

import { createClient } from '@supabase/supabase-js';
import { resolvePersona, isToolAllowed } from './_tontah/persona.js';
import { lookUpWord, playRecording, scoreAttempt, addToPractice, askAnElder } from './_tontah/tools.js';

const SUPABASE_URL = 'https://amhzzwiqlmewghtlmjbm.supabase.co';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const mistralKey = process.env.MISTRAL_API_KEY;
    if (!serviceKey || !mistralKey) {
        res.status(503).json({ error: 'Tontah tools are not configured yet.' });
        return;
    }

    const { tool, args } = req.body || {};
    if (!tool) {
        res.status(400).json({ error: 'tool is required' });
        return;
    }

    const admin = createClient(SUPABASE_URL, serviceKey);

    // Resolve WHO is calling from their own bearer token — an
    // unauthenticated request resolves to the Visitor persona, never to
    // whatever the client claims.
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    let profile = null;
    if (token) {
        const { data: userData, error: userErr } = await admin.auth.getUser(token);
        if (!userErr && userData?.user) {
            const { data: prof } = await admin.from('profiles').select('*').eq('auth_user_id', userData.user.id).single();
            profile = prof;
        }
    }
    const persona = resolvePersona(profile);

    if (!isToolAllowed(persona, tool)) {
        res.status(403).json({ error: `Tool "${tool}" is not available for this session.` });
        return;
    }

    try {
        let result;
        switch (tool) {
            case 'look_up_word':    result = await lookUpWord(admin, mistralKey, profile, args || {}); break;
            case 'play_recording':  result = await playRecording(admin, args || {}); break;
            case 'score_attempt':   result = await scoreAttempt(admin, profile, args || {}); break;
            case 'add_to_practice': result = await addToPractice(admin, profile, args || {}); break;
            case 'ask_an_elder':    result = await askAnElder(admin, profile, args || {}); break;
            default:
                res.status(400).json({ error: 'Unknown tool' });
                return;
        }
        res.status(200).json({ result });
    } catch (e) {
        console.error(`[tontah-chat] ${tool} failed:`, e.message);
        res.status(500).json({ error: 'Tool execution failed' });
    }
}
