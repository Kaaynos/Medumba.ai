// Vercel serverless function — proxies chat messages to the DeepSeek API.
// Keeps DEEPSEEK_API_KEY server-side only (set in Vercel project env vars),
// never exposed to the browser bundle.
// (forced redeploy to pick up latest env vars)

// You are Tontah, Medumba.AI's learning companion. Answer briefly and
// helpfully in the same language the user writes in (French or English).
// Use only the facts below — if you don't know the answer, say you don't
// know and suggest the contact form.
const SHARED_FACTS = `Facts about Medumba.AI:
- 100% free for the launch — all lessons, the dictionary, counting, and videos are available at no cost. No premium/paid tiers right now.
- Classes with a teacher: go to the Classes section on the landing page and contact a CEPOM-certified teacher directly via the "Contact" button.
- CEPOM is the partner organization that certifies the app's teachers and oversees the learning path structure.
- Available on web browser now; Android and iOS apps are coming soon.
- For anything you can't answer, direct the user to the Contact page/form on the site.`;

// Phase 1 personas only — Parent and Teacher wait on the account-model and
// teacher-roster work (no data exists yet to answer those questions from,
// and guessing would be worse than not having the feature).
const PERSONA_VOICE = {
    child: `Talk like a warm, encouraging older sibling. Keep sentences short. Celebrate small wins. Never discuss payment, accounts, or teacher/class logistics — say that's something to ask a parent about.`,
    teen: `Be friendly but direct, not childish. Treat the user as capable of managing their own account. If relevant, mention that live classes with a certified teacher are a natural next step.`,
    adult: `Be helpful and concise, as a knowledgeable companion for their own learning.`,
    visitor: `Be helpful and concise for someone who hasn't created an account yet — focus on what Medumba.AI offers and how to get started.`,
};

function buildSystemPrompt(persona) {
    const voice = PERSONA_VOICE[persona] || PERSONA_VOICE.visitor;
    return `You are Tontah, the Medumba.AI learning companion, for an app that teaches the Medumba language (Bafoussam, Cameroon).\n\n${voice}\n\n${SHARED_FACTS}`;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
        res.status(503).json({ error: 'Chat is not configured yet.' });
        return;
    }

    const { messages, persona } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'messages is required' });
        return;
    }

    try {
        const upstream = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'system', content: buildSystemPrompt(persona) }, ...messages],
                max_tokens: 400,
            }),
        });

        if (!upstream.ok) {
            res.status(502).json({ error: 'Chat service unavailable' });
            return;
        }

        const data = await upstream.json();
        const reply = data?.choices?.[0]?.message?.content ?? '';
        res.status(200).json({ reply });
    } catch {
        res.status(502).json({ error: 'Chat service unavailable' });
    }
}
