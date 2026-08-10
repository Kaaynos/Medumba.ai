// Vercel serverless function — creates/deletes a Zoom meeting via a
// Server-to-Server OAuth app. Keeps ZOOM_CLIENT_SECRET server-side only
// (set in Vercel project env vars), never exposed to the browser bundle.
//
// Gracefully degrades: with no ZOOM_ACCOUNT_ID/ZOOM_CLIENT_ID/
// ZOOM_CLIENT_SECRET configured, returns { configured: false } rather than
// erroring — same honesty pattern as src/config/stripe.js and
// api/contact-notify.js in this codebase. The caller (teacherService.js)
// falls back to manually-entered meeting links when this comes back false.

let _tokenCache = null; // { token, expiresAt } — reused across warm invocations

async function getAccessToken() {
    const accountId    = process.env.ZOOM_ACCOUNT_ID;
    const clientId     = process.env.ZOOM_CLIENT_ID;
    const clientSecret = process.env.ZOOM_CLIENT_SECRET;
    if (!accountId || !clientId || !clientSecret) return null;

    if (_tokenCache && _tokenCache.expiresAt > Date.now()) return _tokenCache.token;

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const res = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`, {
        method: 'POST',
        headers: { Authorization: `Basic ${basic}` },
    });
    if (!res.ok) return null;
    const json = await res.json();
    _tokenCache = { token: json.access_token, expiresAt: Date.now() + (json.expires_in - 60) * 1000 };
    return _tokenCache.token;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const token = await getAccessToken();
    if (!token) {
        res.status(200).json({ configured: false });
        return;
    }

    const { action } = req.body || {};

    try {
        if (action === 'createMeeting') {
            const { zoomEmail, topic, scheduledStart, durationMinutes } = req.body;
            if (!zoomEmail || !scheduledStart) {
                res.status(400).json({ error: 'zoomEmail and scheduledStart are required' });
                return;
            }
            const upstream = await fetch(`https://api.zoom.us/v2/users/${encodeURIComponent(zoomEmail)}/meetings`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: topic || 'Medumba.AI class',
                    type: 2, // scheduled meeting
                    start_time: scheduledStart,
                    duration: durationMinutes || 60,
                    settings: { join_before_host: true, waiting_room: false },
                }),
            });
            if (!upstream.ok) {
                res.status(502).json({ configured: true, error: 'Zoom API rejected the request' });
                return;
            }
            const meeting = await upstream.json();
            res.status(200).json({
                configured: true,
                meetingId: meeting.id,
                joinUrl:   meeting.join_url,
                startUrl:  meeting.start_url,
            });
            return;
        }

        if (action === 'deleteMeeting') {
            const { meetingId } = req.body;
            if (!meetingId) { res.status(400).json({ error: 'meetingId is required' }); return; }
            await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            res.status(200).json({ configured: true, ok: true });
            return;
        }

        res.status(400).json({ error: 'Unknown action' });
    } catch {
        res.status(502).json({ configured: true, error: 'Zoom request failed' });
    }
}
