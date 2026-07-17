// Vercel serverless function — proxies chat messages to the DeepSeek API.
// Keeps DEEPSEEK_API_KEY server-side only (set in Vercel project env vars),
// never exposed to the browser bundle.

const SYSTEM_PROMPT = `You are the support assistant for Medumba.AI, an app for learning the Medumba language (Bafoussam, Cameroon). Answer briefly and helpfully in the same language the user writes in (French or English). Use only the facts below — if you don't know the answer, say you don't know and suggest the contact form.

Facts about Medumba.AI:
- 100% free for the launch — all lessons, the dictionary, counting, and videos are available at no cost. No premium/paid tiers right now.
- Classes with a teacher: go to the Classes section on the landing page and contact a CEPOM-certified teacher directly via the "Contact" button.
- CEPOM is the partner organization that certifies the app's teachers and oversees the learning path structure.
- Available on web browser now; Android and iOS apps are coming soon.
- For anything you can't answer, direct the user to the Contact page/form on the site.`;

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

    const { messages } = req.body || {};
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
                messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
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
