import { useState } from 'react';
import { submitContactMessage } from '../services/contactService';

const B = '#0056D2';
const INK = '#0f172a';
const MUTED = '#64748b';
const SAND = '#e2e8f0';

const FAQ = [
    {
        qFr: "L'application est-elle gratuite ?", qEn: 'Is the app free?',
        aFr: '100% gratuite pour le lancement — toutes les leçons, le dictionnaire, le comptage et les vidéos sont accessibles sans frais.',
        aEn: '100% free for the launch — all lessons, the dictionary, counting and videos are available at no cost.',
    },
    {
        qFr: 'Comment prendre un cours avec un enseignant ?', qEn: 'How do I book a class with a teacher?',
        aFr: 'Rendez-vous dans la section Classes de la landing page et contactez directement un enseignant certifié CEPOM via le bouton "Contacter".',
        aEn: 'Go to the Classes section on the landing page and contact a CEPOM-certified teacher directly via the "Contact" button.',
    },
    {
        qFr: "Qu'est-ce que le CEPOM ?", qEn: 'What is CEPOM?',
        aFr: "L'organisme partenaire qui certifie les enseignants de l'application.",
        aEn: 'The partner organization that certifies the teachers on the app.',
    },
    {
        qFr: 'Sur quelles plateformes est disponible Medumba.AI ?', qEn: 'What platforms is Medumba.AI available on?',
        aFr: "L'application est disponible sur navigateur web dès maintenant ; Android et iOS arrivent bientôt.",
        aEn: 'The app is available in your web browser right now; Android and iOS are coming soon.',
    },
];

const ContactPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error
    const [openFaq, setOpenFaq] = useState(null);

    const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
        setStatus('sending');
        try {
            await submitContactMessage(form);
            setStatus('sent');
            setForm({ name: '', email: '', phone: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <div style={{ minHeight: '100dvh', backgroundColor: '#f8fafc', fontFamily: "'Outfit',system-ui,sans-serif" }}>
            {/* Header */}
            <div style={{ background: B, padding: '1.5rem 1.5rem 2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
                    <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                            {isFr ? 'Support' : 'Support'}
                        </div>
                        <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#fff' }}>
                            💬 {isFr ? 'Contact' : 'Contact'}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '1.5rem', maxWidth: '640px', margin: '-1.5rem auto 0' }}>
                {/* Coordonnées directes */}
                <div style={{ background: '#fff', border: `1.5px solid ${SAND}`, borderRadius: '20px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', display: 'flex', flexWrap: 'wrap', gap: '.6rem' }}>
                    <a
                        href="https://wa.me/237697531413"
                        target="_blank" rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.5rem .9rem', borderRadius: '99px', background: 'rgba(37,211,102,.1)', border: '1.5px solid rgba(37,211,102,.35)', color: '#15803d', fontWeight: 700, fontSize: '.85rem', textDecoration: 'none' }}
                    >
                        💬 +237 697 531 413
                    </a>
                    <a
                        href="mailto:medumba.ai@kaaynos.com"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.5rem .9rem', borderRadius: '99px', background: 'rgba(0,86,210,.06)', border: `1.5px solid ${SAND}`, color: B, fontWeight: 700, fontSize: '.85rem', textDecoration: 'none' }}
                    >
                        ✉️ medumba.ai@kaaynos.com
                    </a>
                </div>

                {/* FAQ */}
                <div style={{ background: '#fff', border: `1.5px solid ${SAND}`, borderRadius: '20px', padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: '900', color: INK, marginBottom: '1rem' }}>
                        {isFr ? 'Questions fréquentes' : 'Frequently Asked Questions'}
                    </h2>
                    {FAQ.map((f, i) => (
                        <div key={i} style={{ borderBottom: i < FAQ.length - 1 ? `1px solid ${SAND}` : 'none' }}>
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', background: 'none', border: 'none', padding: '0.85rem 0', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
                            >
                                <span style={{ fontWeight: '700', fontSize: '0.9rem', color: INK }}>{isFr ? f.qFr : f.qEn}</span>
                                <span style={{ color: MUTED, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>▾</span>
                            </button>
                            {openFaq === i && (
                                <p style={{ fontSize: '0.85rem', color: MUTED, lineHeight: 1.7, margin: '0 0 0.85rem' }}>
                                    {isFr ? f.aFr : f.aEn}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact form */}
                <div style={{ background: '#fff', border: `1.5px solid ${SAND}`, borderRadius: '20px', padding: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: '900', color: INK, marginBottom: '0.3rem' }}>
                        {isFr ? 'Envoyer un message' : 'Send a message'}
                    </h2>
                    <p style={{ fontSize: '0.82rem', color: MUTED, marginBottom: '1.25rem' }}>
                        {isFr ? "Nous vous répondrons par e-mail dans les 24h." : "We'll reply by email within 24h."}
                    </p>

                    {status === 'sent' ? (
                        <div style={{ background: '#dcfce7', border: '1.5px solid #bbf7d0', borderRadius: '14px', padding: '1.1rem', textAlign: 'center', color: '#15803d', fontWeight: '700', fontSize: '0.9rem' }}>
                            ✅ {isFr ? 'Message envoyé ! Merci de nous avoir contactés.' : 'Message sent! Thanks for reaching out.'}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                            <input required value={form.name} onChange={set('name')} placeholder={isFr ? 'Nom' : 'Name'}
                                style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: `1.5px solid ${SAND}`, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }} />
                            <input required type="email" value={form.email} onChange={set('email')} placeholder="Email"
                                style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: `1.5px solid ${SAND}`, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }} />
                            <input type="tel" value={form.phone} onChange={set('phone')} placeholder={isFr ? 'Téléphone (optionnel)' : 'Phone (optional)'}
                                style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: `1.5px solid ${SAND}`, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }} />
                            <textarea required rows={4} value={form.message} onChange={set('message')} placeholder={isFr ? 'Votre message' : 'Your message'}
                                style={{ padding: '0.75rem 1rem', borderRadius: '12px', border: `1.5px solid ${SAND}`, fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', resize: 'none' }} />

                            {status === 'error' && (
                                <div style={{ fontSize: '0.82rem', color: '#dc2626', fontWeight: '600' }}>
                                    {isFr ? "Erreur d'envoi. Réessayez." : 'Failed to send. Please try again.'}
                                </div>
                            )}

                            <button type="submit" disabled={status === 'sending'} style={{
                                padding: '0.85rem', borderRadius: '9999px', border: 'none',
                                background: B, color: '#fff', fontWeight: '800', fontSize: '0.95rem',
                                cursor: status === 'sending' ? 'default' : 'pointer', fontFamily: 'inherit',
                                opacity: status === 'sending' ? 0.7 : 1,
                            }}>
                                {status === 'sending' ? (isFr ? 'Envoi…' : 'Sending…') : (isFr ? 'Envoyer' : 'Send')}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
