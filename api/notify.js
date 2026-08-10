// Vercel serverless function — client-facing endpoint for "email a human
// the moment something needs a response". Covers the contact form and
// content submissions; the ask-an-elder queue is notified directly from
// api/_tontah/tools.js (already server-side, no HTTP round-trip needed) —
// both paths share the same logic in api/_shared/notify.js.
import { sendNotifyEmail } from './_shared/notify.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { kind, ...fields } = req.body || {};
    const sent = await sendNotifyEmail(kind, fields);
    if (!sent) {
        res.status(503).json({ error: 'Email notifications are not configured yet.' });
        return;
    }
    res.status(200).json({ ok: true });
}
