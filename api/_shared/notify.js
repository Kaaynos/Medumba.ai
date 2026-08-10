// Shared "email a human the moment something needs a response" helper —
// used by api/notify.js (client-facing endpoint, contact form + content
// submissions) and directly by api/_tontah/tools.js's askAnElder, which
// already runs server-side and doesn't need an HTTP round-trip to itself.
//
// Gracefully unavailable without RESEND_API_KEY — callers treat a false
// return as "not configured", never as an error to surface to a user.

const NOTIFY_TO = 'medumba.ai@kaaynos.com';

export function buildNotifyEmail(kind, fields) {
    if (kind === 'contact') {
        const { name, email, phone, subject, message } = fields;
        return {
            replyTo: email,
            subject: `[Medumba.AI Contact] ${subject || 'New message from ' + name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '—'}\n\n${message}`,
        };
    }
    if (kind === 'open_question') {
        const { termAsked, askedByName } = fields;
        return {
            subject: `[Medumba.AI] New ask-an-elder question`,
            text: `${askedByName || 'A learner'} asked about: "${termAsked}"\n\nAnswer it in the Cultural Steward console.`,
        };
    }
    if (kind === 'word_submission') {
        const { wordFr, wordMedumba, submittedByName } = fields;
        return {
            subject: `[Medumba.AI] New word submission for review`,
            text: `${submittedByName || 'A contributor'} submitted: "${wordFr}" → ${wordMedumba || '(no Medumba word yet)'}\n\nReview it in the Content Creator / Cultural Steward console.`,
        };
    }
    return null;
}

/** Returns true if the email was actually sent, false if not configured or it failed — never throws. */
export async function sendNotifyEmail(kind, fields) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return false;

    const email = buildNotifyEmail(kind, fields);
    if (!email) return false;

    try {
        const upstream = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                from: 'Medumba.AI <noreply@kaaynos.com>',
                to: [NOTIFY_TO],
                ...(email.replyTo ? { reply_to: email.replyTo } : {}),
                subject: email.subject,
                text: email.text,
            }),
        });
        return upstream.ok;
    } catch {
        return false;
    }
}
