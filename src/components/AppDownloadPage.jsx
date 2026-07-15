import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const _FE = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets';

export default function AppDownloadPage({ onBack }) {
    const { T, isDark } = useTheme();
    const [email, setEmail] = useState('');
    const [notified, setNotified] = useState(false);
    const [isMobile] = useState(() => window.innerWidth < 768);
    const [isFr, setIsFr] = useState(false); // English by default, like the landing page
    const tr = (fr, en) => isFr ? fr : en;

    const handleNotify = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        // TODO: save email to Firestore / Mailchimp
        setNotified(true);
    };

    const features = [
        { emoji: '🎮', en: 'Gamified lessons with XP & streaks',  fr: 'Leçons gamifiées avec XP & séries'  },
        { emoji: '🔊', en: 'Native Medumba audio pronunciations', fr: 'Prononciations audio natives Medumba' },
        { emoji: '🃏', en: 'Vocabulary flashcards & quizzes',     fr: 'Fiches vocabulaire & quiz'            },
        { emoji: '📖', en: 'Full phrasebook for daily life',      fr: 'Phrasebook complet pour la vie quotidienne' },
        { emoji: '🥁', en: 'Music & traditional culture',         fr: 'Musique & culture traditionnelle'     },
        { emoji: '📵', en: 'Offline mode (Premium)',              fr: 'Mode hors ligne (Premium)'            },
    ];

    return (
        <div style={{
            minHeight: '100dvh', backgroundColor: T.bg,
            display: 'flex', flexDirection: 'column',
            fontFamily: "'Inter', system-ui, sans-serif",
        }}>
            {/* ── Header ── */}
            <header style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: `1px solid ${T.border}`,
                backgroundColor: T.surface,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <img src={logo} alt="Medumba.AI" style={{ width: '32px', height: 'auto' }} />
                    <span style={{ fontWeight: '900', fontSize: '1.1rem', color: '#0056D2' }}>Medumba.AI</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                        onClick={() => setIsFr(v => !v)}
                        style={{
                            background: 'none', border: `1.5px solid ${T.border}`,
                            borderRadius: '99px', padding: '0.4rem 0.7rem',
                            cursor: 'pointer', fontFamily: 'inherit',
                            fontWeight: '700', fontSize: '0.78rem', color: T.text,
                        }}
                    >
                        {isFr ? '🇬🇧 EN' : '🇫🇷 FR'}
                    </button>
                    <button
                        onClick={onBack}
                        style={{
                            background: 'none', border: `1.5px solid ${T.border}`,
                            borderRadius: '99px', padding: '0.4rem 1rem',
                            cursor: 'pointer', fontFamily: 'inherit',
                            fontWeight: '700', fontSize: '0.85rem', color: T.text,
                        }}
                    >
                        ← {tr('Retour', 'Back')}
                    </button>
                </div>
            </header>

            {/* ── Hero ── */}
            <div style={{
                background: 'linear-gradient(135deg, #0056D2 0%, #0891b2 60%, #06b6d4 100%)',
                padding: isMobile ? '3rem 1.5rem 4rem' : '4rem 2rem 5rem',
                textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden',
            }}>
                {/* Background decoration */}
                <div style={{
                    position: 'absolute', top: '-60px', right: '-60px',
                    width: '220px', height: '220px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '-40px', left: '-40px',
                    width: '160px', height: '160px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                }} />

                {/* App icon */}
                <div style={{
                    width: '90px', height: '90px', borderRadius: '24px',
                    background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem', border: '2px solid rgba(255,255,255,0.3)',
                }}>
                    <img src={logo} alt="" style={{ width: '60px', height: 'auto' }} />
                </div>

                <h1 style={{
                    fontSize: isMobile ? '2rem' : '2.8rem',
                    fontWeight: '900', marginBottom: '0.75rem',
                    letterSpacing: '-0.03em', lineHeight: 1.15,
                }}>
                    Medumba.AI<br />{tr('dans votre poche', 'in your pocket')}
                </h1>
                <p style={{
                    fontSize: '1.05rem', opacity: 0.9, lineHeight: 1.6,
                    maxWidth: '480px', margin: '0 auto 2rem',
                }}>
                    {tr(
                        "Apprenez le Medumba n'importe où, n'importe quand. Leçons interactives, audio natif, culture authentique.",
                        'Learn Medumba anywhere, anytime. Interactive lessons, native audio, authentic culture.'
                    )}
                </p>

                {/* Coming Soon badge */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    padding: '0.5rem 1.25rem', borderRadius: '99px',
                    fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.5px',
                }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fbbf24' }} />
                    {tr('LANCEMENT BIENTÔT — Été 2026', 'COMING SOON — Summer 2026')}
                </div>
            </div>

            {/* ── Download Buttons ── */}
            <div style={{
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                backgroundColor: T.surface,
                borderBottom: `1px solid ${T.border}`,
            }}>
                <h2 style={{
                    textAlign: 'center', fontWeight: '800', fontSize: '1.2rem',
                    color: T.text, marginBottom: '1.5rem',
                }}>
                    {tr("Télécharger l'application", 'Download the app')}
                </h2>
                <div style={{
                    display: 'flex', gap: '1rem', justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                    {/* App Store */}
                    <div style={{ position: 'relative' }}>
                        <a
                            href="#"
                            onClick={e => e.preventDefault()}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                padding: '0.9rem 1.5rem', borderRadius: '16px',
                                backgroundColor: '#000', color: '#fff',
                                textDecoration: 'none', minWidth: '180px',
                                opacity: 0.7,
                            }}
                        >
                            <img
                                src={`${_FE}/Mobile%20phone/3D/mobile_phone_3d.png`}
                                alt="iOS"
                                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                            />
                            <div>
                                <div style={{ fontSize: '0.65rem', fontWeight: '500', opacity: 0.8, letterSpacing: '0.3px' }}>
                                    {tr('Disponible sur', 'Available on')}
                                </div>
                                <div style={{ fontSize: '1.05rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                                    App Store
                                </div>
                            </div>
                        </a>
                        <div style={{
                            position: 'absolute', inset: 0, borderRadius: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.45)',
                        }}>
                            <span style={{
                                backgroundColor: '#f59e0b', color: '#fff',
                                fontWeight: '800', fontSize: '0.7rem', letterSpacing: '0.5px',
                                padding: '0.25rem 0.75rem', borderRadius: '99px',
                            }}>{tr('BIENTÔT', 'SOON')}</span>
                        </div>
                    </div>

                    {/* Google Play */}
                    <div style={{ position: 'relative' }}>
                        <a
                            href="#"
                            onClick={e => e.preventDefault()}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                padding: '0.9rem 1.5rem', borderRadius: '16px',
                                backgroundColor: '#1a1a2e', color: '#fff',
                                textDecoration: 'none', minWidth: '180px',
                                opacity: 0.7,
                            }}
                        >
                            <img
                                src={`${_FE}/Joystick/3D/joystick_3d.png`}
                                alt="Android"
                                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                            />
                            <div>
                                <div style={{ fontSize: '0.65rem', fontWeight: '500', opacity: 0.8, letterSpacing: '0.3px' }}>
                                    {tr('Télécharger sur', 'Get it on')}
                                </div>
                                <div style={{ fontSize: '1.05rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                                    Google Play
                                </div>
                            </div>
                        </a>
                        <div style={{
                            position: 'absolute', inset: 0, borderRadius: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.45)',
                        }}>
                            <span style={{
                                backgroundColor: '#f59e0b', color: '#fff',
                                fontWeight: '800', fontSize: '0.7rem', letterSpacing: '0.5px',
                                padding: '0.25rem 0.75rem', borderRadius: '99px',
                            }}>{tr('BIENTÔT', 'SOON')}</span>
                        </div>
                    </div>
                </div>

                {/* Web app CTA */}
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <p style={{ fontSize: '0.85rem', color: T.textSub, marginBottom: '0.75rem' }}>
                        {tr('En attendant, essayez la version web gratuite', 'In the meantime, try the free web version')}
                    </p>
                    <button
                        onClick={onBack}
                        style={{
                            padding: '0.75rem 2rem', borderRadius: '99px',
                            background: 'linear-gradient(135deg, #0056D2, #0891b2)',
                            color: '#fff', border: 'none', fontWeight: '800',
                            fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit',
                            boxShadow: '0 4px 16px rgba(0,86,210,0.3)',
                        }}
                    >
                        {tr('Utiliser la version web', 'Use the web version')} →
                    </button>
                </div>
            </div>

            {/* ── Notify Me ── */}
            <div style={{
                padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
                backgroundColor: isDark ? '#1e293b' : '#f8faff',
                borderBottom: `1px solid ${T.border}`,
                textAlign: 'center',
            }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔔</div>
                <h3 style={{ fontWeight: '800', fontSize: '1.15rem', color: T.text, marginBottom: '0.4rem' }}>
                    {tr('Soyez notifié du lancement', 'Get notified at launch')}
                </h3>
                <p style={{ fontSize: '0.85rem', color: T.textSub, marginBottom: '1.25rem', lineHeight: 1.55 }}>
                    {tr("Laissez votre email et nous vous prévenons dès que l'app est disponible.", "Leave your email and we'll let you know as soon as the app is available.")}
                </p>

                {notified ? (
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0',
                        padding: '0.75rem 1.5rem', borderRadius: '16px',
                        color: '#16a34a', fontWeight: '700', fontSize: '0.95rem',
                    }}>
                        ✅ {tr('Parfait ! On vous préviendra.', "Perfect! We'll let you know.")}
                    </div>
                ) : (
                    <form
                        onSubmit={handleNotify}
                        style={{
                            display: 'flex', gap: '0.5rem',
                            maxWidth: '420px', margin: '0 auto',
                            flexDirection: isMobile ? 'column' : 'row',
                        }}
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder={tr('votre@email.com', 'your@email.com')}
                            required
                            style={{
                                flex: 1, padding: '0.85rem 1rem', borderRadius: '12px',
                                border: `2px solid ${T.border}`, backgroundColor: T.surface,
                                color: T.text, fontFamily: 'inherit', fontSize: '0.95rem',
                                outline: 'none',
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '0.85rem 1.5rem', borderRadius: '12px',
                                background: 'linear-gradient(135deg, #0056D2, #0891b2)',
                                color: '#fff', border: 'none', fontWeight: '800',
                                fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {tr('Me notifier', 'Notify me')}
                        </button>
                    </form>
                )}
            </div>

            {/* ── Features ── */}
            <div style={{ padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem', backgroundColor: T.bg }}>
                <h3 style={{
                    fontWeight: '800', fontSize: '1.1rem', color: T.text,
                    marginBottom: '1.25rem', textAlign: 'center',
                }}>
                    {tr("Ce qui vous attend dans l'application", 'What awaits you in the app')}
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '0.75rem', maxWidth: '600px', margin: '0 auto',
                }}>
                    {features.map((f, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '0.9rem 1.1rem', borderRadius: '14px',
                            backgroundColor: T.surface, border: `1.5px solid ${T.border}`,
                        }}>
                            <span style={{ fontSize: '1.4rem' }}>{f.emoji}</span>
                            <span style={{ fontSize: '0.87rem', fontWeight: '600', color: T.text, lineHeight: 1.4 }}>
                                {tr(f.fr, f.en)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Footer ── */}
            <div style={{
                padding: '1.5rem', textAlign: 'center',
                borderTop: `1px solid ${T.border}`,
                backgroundColor: T.surface,
                marginTop: 'auto',
            }}>
                <p style={{ fontSize: '0.78rem', color: T.textSub }}>
                    © 2026 Medumba.AI — {tr('Tous droits réservés', 'All rights reserved')}
                </p>
            </div>
        </div>
    );
}
