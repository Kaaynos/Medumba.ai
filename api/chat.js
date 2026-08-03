// Vercel serverless function — proxies chat messages to Mistral's API and
// logs every turn to chat_turn (migration 026).
// Keeps MISTRAL_API_KEY and SUPABASE_SERVICE_ROLE_KEY server-side only (set
// in Vercel project env vars), never exposed to the browser bundle.
//
// Tontah ticket 1 ("move inference to our own account, prove it with a
// request log"): replaces a prior DeepSeek passthrough with Mistral's
// official API (best French-register fluency for this user base, and its
// own hosted API is a confirmable "our own account" with a signed DPA,
// unlike a bare third-party key). This ticket is a provider swap + logging
// only — no persona, no retrieval, no tools yet (tickets 2/3).

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://amhzzwiqlmewghtlmjbm.supabase.co';

const SYSTEM_PROMPT = `You are the support assistant for Medumba.AI, an app for learning the Medumba language (Bafoussam, Cameroon). Answer briefly and helpfully in the same language the user writes in (French or English). Use only the facts below — if you don't know the answer, say you don't know and suggest the contact form.

Facts about Medumba.AI:
- 100% free for the launch — all lessons, the dictionary, counting, and videos are available at no cost. No premium/paid tiers right now.
- Classes with a teacher: go to the Classes section on the landing page and contact a CEPOM-certified teacher directly via the "Contact" button.
- CEPOM is the partner organization that certifies the app's teachers and oversees the learning path structure.
- Available on web browser now; Android and iOS apps are coming soon.
- For anything you can't answer, direct the user to the Contact page/form on the site.`;

// Mistral Small published per-token pricing, as of this writing — approximate,
// confirm against Mistral's current pricing page before trusting this for
// real budgeting/reporting.
const PRICE_PER_1K_INPUT_CENTS  = 0.02;
const PRICE_PER_1K_OUTPUT_CENTS = 0.06;

async function logChatTurn({ profileId, contentJson, tokens, costCents, latencyMs }) {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) return; // logging is best-effort — never blocks the reply
    try {
        const admin = createClient(SUPABASE_URL, serviceKey);
        await admin.from('chat_turn').insert({
            profile_id: profileId || null,
            content_json: contentJson,
            tokens,
            cost_cents: costCents,
            latency_ms: latencyMs,
        });
    } catch (e) {
        console.error('[chat_turn] logging failed:', e.message);
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
        res.status(503).json({ error: 'Chat is not configured yet.' });
        return;
    }

    const { messages, profileId } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'messages is required' });
        return;
    }

    const startedAt = Date.now();
    try {
        const upstream = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'mistral-small-latest',
                messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
                max_tokens: 400,
            }),
        });

        const latencyMs = Date.now() - startedAt;

        if (!upstream.ok) {
            res.status(502).json({ error: 'Chat service unavailable' });
            return;
        }

        const data = await upstream.json();
        const reply = data?.choices?.[0]?.message?.content ?? '';
        const usage = data?.usage || {};
        const promptTokens = usage.prompt_tokens ?? 0;
        const completionTokens = usage.completion_tokens ?? 0;
        const totalTokens = usage.total_tokens ?? (promptTokens + completionTokens);
        const costCents = (promptTokens / 1000) * PRICE_PER_1K_INPUT_CENTS
                         + (completionTokens / 1000) * PRICE_PER_1K_OUTPUT_CENTS;

        await logChatTurn({
            profileId,
            contentJson: { messages, reply },
            tokens: totalTokens,
            costCents,
            latencyMs,
        });

        res.status(200).json({ reply });
    } catch {
        res.status(502).json({ error: 'Chat service unavailable' });
    }
}
