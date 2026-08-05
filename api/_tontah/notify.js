// Safety-escalation email — same Resend pattern as api/contact-notify.js,
// same destination. Best-effort: a missing RESEND_API_KEY or a failed
// send logs a warning but never blocks the caller's safe response — the
// REFUSAL to process flagged content normally is the fail-closed part of
// this guardrail, not the email itself.

const NOTIFY_TO = 'medumba.ai@kaaynos.com';

export async function notifySafetyEscalation({ resendApiKey, persona, profile, tool, flaggedText }) {
    if (!resendApiKey) {
        console.warn('[tontah safety] RESEND_API_KEY not configured — distress flag was NOT emailed:', { persona, tool });
        return;
    }
    try {
        const upstream = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendApiKey}` },
            body: JSON.stringify({
                from: 'Medumba.AI Safety <noreply@kaaynos.com>',
                to: [NOTIFY_TO],
                subject: `[Medumba.AI Safety] Distress flag — ${persona || 'unknown persona'}`,
                text: `A message was flagged by Tontah's distress heuristic and was NOT processed normally.\n\n`
                    + `Persona: ${persona || 'unknown'}\n`
                    + `Tool: ${tool}\n`
                    + `Profile: ${profile?.name || 'unknown'} (${profile?.email || 'no email on file'})\n`
                    + `Time: ${new Date().toISOString()}\n\n`
                    + `Flagged text:\n${flaggedText}\n\n`
                    + `This needs a real person to check in — not an automated reply.`,
            }),
        });
        if (!upstream.ok) console.error('[tontah safety] Resend responded with', upstream.status);
    } catch (e) {
        console.error('[tontah safety] notification failed:', e.message);
    }
}
