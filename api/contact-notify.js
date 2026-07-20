// Vercel serverless function — emails contact form submissions to contact@kaaynos.com.
// Keeps RESEND_API_KEY server-side only (set in Vercel project env vars).
// Uses Resend's shared onboarding@resend.dev sender since medumba.ai isn't a verified domain yet.

const NOTIFY_TO = 'contact@kaaynos.com';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        res.status(503).json({ error: 'Email notifications are not configured yet.' });
        return;
    }

    const { name, email, phone, subject, message } = req.body || {};
    if (!name || !email || !message) {
        res.status(400).json({ error: 'name, email and message are required' });
        return;
    }

    try {
        const upstream = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: 'Medumba.AI Contact Form <onboarding@resend.dev>',
                to: [NOTIFY_TO],
                reply_to: email,
                subject: `[Medumba.AI Contact] ${subject || 'New message from ' + name}`,
                text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '—'}\n\n${message}`,
            }),
        });

        if (!upstream.ok) {
            const detail = await upstream.text().catch(() => '');
            // TEMP: surfaced for debugging the current outage — remove once diagnosed.
            res.status(502).json({ error: 'Could not send email notification', status: upstream.status, detail });
            return;
        }

        res.status(200).json({ ok: true });
    } catch (e) {
        res.status(502).json({ error: 'Could not send email notification', detail: String(e) });
    }
}
