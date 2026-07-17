import { useState, useRef, useEffect } from 'react';

const B = '#0056D2';
const INK = '#0f172a';
const MUTED = '#64748b';
const SAND = '#e2e8f0';

const ChatWidget = ({ nativeLang }) => {
    const isFr = nativeLang === 'french';
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const scrollRef = useRef(null);

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
                body: JSON.stringify({ messages: next }),
            });
            const data = await res.json();
            setMessages([...next, { role: 'assistant', content: data.reply || (isFr ? "Désolé, je n'ai pas pu répondre. Essayez la page Contact." : "Sorry, I couldn't reply. Please try the Contact page.") }]);
        } catch {
            setMessages([...next, { role: 'assistant', content: isFr ? "Désolé, une erreur est survenue. Essayez la page Contact." : 'Sorry, something went wrong. Please try the Contact page.' }]);
        } finally {
            setSending(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '1.25rem', right: '1.25rem', zIndex: 200 }}>
            {open && (
                <div style={{
                    width: 'min(340px, calc(100vw - 2.5rem))', height: '440px',
                    background: '#fff', borderRadius: '18px', boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
                    border: `1.5px solid ${SAND}`, display: 'flex', flexDirection: 'column',
                    marginBottom: '0.75rem', overflow: 'hidden',
                }}>
                    <div style={{ background: B, padding: '0.9rem 1rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>💬 Medumba.AI</span>
                        <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.1rem', cursor: 'pointer', lineHeight: 1 }}>✕</button>
                    </div>
                    <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {messages.length === 0 && (
                            <div style={{ fontSize: '0.82rem', color: MUTED, lineHeight: 1.7 }}>
                                {isFr
                                    ? "Bonjour ! Posez-moi une question sur Medumba.AI (prix, classes, CEPOM, disponibilité...)."
                                    : 'Hi! Ask me anything about Medumba.AI (pricing, classes, CEPOM, availability...).'}
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
                    width: '56px', height: '56px', borderRadius: '50%', background: B, color: '#fff',
                    border: 'none', fontSize: '1.5rem', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,86,210,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                aria-label="Chat"
            >
                {open ? '✕' : '💬'}
            </button>
        </div>
    );
};

export default ChatWidget;
