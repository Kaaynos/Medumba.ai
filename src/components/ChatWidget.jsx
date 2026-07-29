import { useState, useRef, useEffect } from 'react';
import { tontahAvatar } from '../utils/tontahSeason';

const B = '#0056D2';
const INK = '#0f172a';
const MUTED = '#64748b';
const SAND = '#e2e8f0';

const GREETING = {
    visitor: {
        fr: "Bonjour ! Je suis Tontah 👋 Posez-moi une question sur Medumba.AI (prix, classes, CEPOM, disponibilité...).",
        en: "Hi! I'm Tontah 👋 Ask me anything about Medumba.AI (pricing, classes, CEPOM, availability...).",
    },
    child: {
        fr: "Salut ! 🎉 Tu veux réviser un mot, ou je te rappelle la suite de ta leçon ?",
        en: 'Hi! 🎉 Want to practice a word, or should I remind you what\'s next in your lesson?',
    },
    teen: {
        fr: "Salut — une petite révision de vocabulaire, ou tu veux en savoir plus sur les cours avec un vrai prof ?",
        en: 'Hey — need a quick vocab check, or curious about the live classes with a certified teacher?',
    },
    adult: {
        fr: "Bonjour ! Je suis Tontah. Posez-moi une question sur Medumba.AI, ou sur votre progression.",
        en: "Hi! I'm Tontah. Ask me about Medumba.AI, or about your own progress.",
    },
};

const ROLE_LABEL = {
    visitor: { fr: 'Questions générales', en: 'General questions' },
    child:   { fr: 'Copain de révision', en: 'Practice buddy' },
    teen:    { fr: 'Ton compagnon Medumba', en: 'Your Medumba companion' },
    adult:   { fr: 'Compagnon Medumba.AI', en: 'Medumba.AI companion' },
};

const ChatWidget = ({ nativeLang, persona = 'visitor' }) => {
    const isFr = nativeLang === 'french';
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const scrollRef = useRef(null);
    const avatar = tontahAvatar(128);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, open]);

    const send = async (e) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || sending) return;
        const next = [...messages, { role: 'user', content: text }];
        setMessages(next);
        setInput('');
        setSending(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: next, nativeLang, persona }),
            });
            const data = await res.json();
            setMessages([...next, { role: 'assistant', content: data.reply || (isFr ? "Désolé, je n'ai pas pu répondre. Essayez la page Contact." : "Sorry, I couldn't reply. Please try the Contact page.") }]);
        } catch {
            setMessages([...next, { role: 'assistant', content: isFr ? "Désolé, une erreur est survenue. Essayez la page Contact." : 'Sorry, something went wrong. Please try the Contact page.' }]);
        } finally {
            setSending(false);
        }
    };

    const greeting = (GREETING[persona] || GREETING.visitor)[isFr ? 'fr' : 'en'];
    const roleLabel = (ROLE_LABEL[persona] || ROLE_LABEL.visitor)[isFr ? 'fr' : 'en'];

    return (
        <div style={{ position: 'fixed', bottom: '1.25rem', right: '1.25rem', zIndex: 200 }}>
            {open && (
                <div style={{
                    width: 'min(340px, calc(100vw - 2.5rem))', height: '440px',
                    background: '#fff', borderRadius: '18px', boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
                    border: `1.5px solid ${SAND}`, display: 'flex', flexDirection: 'column',
                    marginBottom: '0.75rem', overflow: 'hidden',
                }}>
                    <div style={{ background: B, padding: '0.7rem 1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <img src={avatar} alt="Tontah" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.7)', objectFit: 'cover', background: '#fff', flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: '800', fontSize: '0.9rem', lineHeight: 1.2 }}>Tontah</div>
                            <div style={{ fontSize: '0.68rem', opacity: 0.85 }}>{roleLabel}</div>
                        </div>
                        <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.1rem', cursor: 'pointer', lineHeight: 1 }}>✕</button>
                    </div>
                    <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {messages.length === 0 && (
                            <div style={{ fontSize: '0.82rem', color: MUTED, lineHeight: 1.7 }}>
                                {greeting}
                            </div>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} style={{
                                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                                background: m.role === 'user' ? B : '#f1f5f9',
                                color: m.role === 'user' ? '#fff' : INK,
                                borderRadius: '12px', padding: '0.55rem 0.8rem',
                                fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '85%',
                            }}>
                                {m.content}
                            </div>
                        ))}
                        {sending && <div style={{ fontSize: '0.8rem', color: MUTED }}>{isFr ? '…' : '…'}</div>}
                    </div>
                    <form onSubmit={send} style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', borderTop: `1px solid ${SAND}` }}>
                        <input
                            value={input} onChange={(e) => setInput(e.target.value)}
                            placeholder={isFr ? 'Votre message…' : 'Your message…'}
                            style={{ flex: 1, border: `1.5px solid ${SAND}`, borderRadius: '10px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', fontFamily: 'inherit' }}
                        />
                        <button type="submit" disabled={sending} style={{ background: B, color: '#fff', border: 'none', borderRadius: '10px', padding: '0 1rem', fontWeight: '700', cursor: 'pointer', opacity: sending ? 0.6 : 1 }}>
                            {isFr ? 'Envoyer' : 'Send'}
                        </button>
                    </form>
                </div>
            )}
            <button
                onClick={() => setOpen((o) => !o)}
                style={{
                    width: '56px', height: '56px', borderRadius: '50%', background: B,
                    border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,86,210,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, overflow: 'hidden',
                }}
                aria-label="Tontah"
            >
                {open
                    ? <span style={{ color: '#fff', fontSize: '1.5rem' }}>✕</span>
                    : <img src={avatar} alt="Tontah" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </button>
        </div>
    );
};

export default ChatWidget;
