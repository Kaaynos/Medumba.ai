// Vercel serverless function — admin-only user management. Deleting an
// account needs the Supabase Auth Admin API (supabase.auth.admin.deleteUser),
// which requires the service role key — never usable from the browser
// bundle, so this has to be server-side, same reasoning as api/zoom.js.
//
// Security boundary, same as api/tontah-chat.js: the caller's admin status
// is resolved from their own verified bearer token, never trusted from the
// request body. A non-admin (or unauthenticated) request is rejected, not
// downgraded.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://amhzzwiqlmewghtlmjbm.supabase.co';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
        res.status(503).json({ error: 'Not configured yet.' });
        return;
    }
    const admin = createClient(SUPABASE_URL, serviceKey);

    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (!token) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
    }
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData?.user) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
    }
    const { data: callerProfile } = await admin.from('profiles').select('id, is_admin').eq('auth_user_id', userData.user.id).single();
    if (!callerProfile?.is_admin) {
        res.status(403).json({ error: 'Admin access required' });
        return;
    }

    const { action, profileId } = req.body || {};
    if (action !== 'deleteUser') {
        res.status(400).json({ error: 'Unknown action' });
        return;
    }
    if (!profileId) {
        res.status(400).json({ error: 'profileId is required' });
        return;
    }
    if (profileId === callerProfile.id) {
        res.status(400).json({ error: "You can't delete your own account from here." });
        return;
    }

    const { data: target, error: targetErr } = await admin.from('profiles').select('id, auth_user_id').eq('id', profileId).single();
    if (targetErr || !target) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    try {
        if (target.auth_user_id) {
            // profiles.auth_user_id has "on delete cascade" to auth.users
            // (migration 014) — deleting the login account removes the
            // profile row, and everything FK-cascaded from it, in one step.
            const { error: delErr } = await admin.auth.admin.deleteUser(target.auth_user_id);
            if (delErr) throw delErr;
        } else {
            // An unclaimed child profile has no auth.users row at all —
            // delete the profiles row directly.
            const { error: delErr } = await admin.from('profiles').delete().eq('id', profileId);
            if (delErr) throw delErr;
        }
        res.status(200).json({ ok: true });
    } catch (e) {
        res.status(500).json({ error: e.message || 'Delete failed' });
    }
}
