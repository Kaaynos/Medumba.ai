import logo from '../assets/logo.png';

const B = '#1B4FD8';

const WelcomePage = ({ onNext, onLogin, onCalendar, onVideo, onCounting, onDictionary }) => (
    <div style={{
        width: '100%', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '3rem 2rem 2.5rem',
        textAlign: 'center',
        fontFamily: "'Outfit', system-ui, sans-serif",
    }}>
        <style>{`
            @keyframes welcome-fade { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
            @keyframes badge-pop    { 0%{transform:scale(0.7);opacity:0;} 70%{transform:scale(1.08);} 100%{transform:scale(1);opacity:1;} }
            @keyframes pulse-dot    { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.5);opacity:0.6;} }
            @keyframes count-pop    { 0%{transform:scale(0.85);opacity:0;} 70%{transform:scale(1.04);} 100%{transform:scale(1);opacity:1;} }
        `}</style>

        {/* Logo */}
        <img src={logo} alt="Medumba" style={{ width: '100px', height: 'auto', marginBottom: '1.5rem', animation: 'welcome-fade 0.5s ease-out both' }} />

        {/* Heritage badge */}
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            backgroundColor: '#eff6ff', border: '1.5px solid #bfdbfe',
            borderRadius: '99px', padding: '0.35rem 1rem',
            fontSize: '0.78rem', fontWeight: '800', color: B,
            letterSpacing: '0.3px', marginBottom: '1.25rem',
            animation: 'badge-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.1s both',
        }}>
            🇨🇲 Heritage Learner Edition
        </div>

        {/* Title + tagline — centered, fills remaining space */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', animation: 'welcome-fade 0.5s ease-out 0.2s both' }}>
            <h1 style={{
                fontSize: '2.4rem', fontWeight: '900', color: '#0f172a',
                marginBottom: '1rem', letterSpacing: '-0.03em', lineHeight: 1.15,
            }}>
                La langue de votre<br />
                <span style={{ color: B }}>famille</span>,<br />
                redécouverte.
            </h1>
            <p style={{
                fontSize: '1rem', fontWeight: '500', color: '#64748b',
                lineHeight: 1.7, maxWidth: '290px', margin: '0 auto 0.85rem',
            }}>
                Des milliers de locuteurs d'héritage reconnectent avec le Medumba — chaque jour, à leur propre rythme.
            </p>

            {/* Social proof — live-looking learner count */}
            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: '#f0fdf4', border: '1.5px solid #bbf7d0',
                borderRadius: '99px', padding: '0.35rem 1rem',
                fontSize: '0.8rem', fontWeight: '700', color: '#15803d',
                margin: '0 auto 1.5rem',
                animation: 'count-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.3s both',
            }}>
                <span style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: '#22c55e', flexShrink: 0,
                    animation: 'pulse-dot 1.8s ease-in-out infinite',
                }} />
                2 847 apprenants actifs cette semaine
            </div>

            {/* Quick-access feature buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginTop: '0.5rem' }}>
                {[
                    { icon: '📅', label: 'Calendrier',   color: '#0056D2', bg: '#eff6ff',  border: '#bfdbfe', onClick: onCalendar },
                    { icon: '📖', label: 'Dictionnaire', color: '#16a34a', bg: '#f0fdf4',  border: '#bbf7d0', onClick: onDictionary },
                    { icon: '🔢', label: 'Numérotation', color: '#0891b2', bg: '#f0f9ff',  border: '#bae6fd', onClick: onCounting },
                    { icon: '🎥', label: 'Vidéos',       color: '#7c3aed', bg: '#f5f3ff',  border: '#ddd6fe', onClick: onVideo },
                ].map(({ icon, label, color, bg, border, onClick }) => (
                    <button key={label} onClick={onClick} style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        backgroundColor: bg, border: `1.5px solid ${border}`,
                        borderRadius: '14px', padding: '0.75rem 0.9rem',
                        fontSize: '0.82rem', fontWeight: '700', color,
                        cursor: 'pointer', textAlign: 'left',
                    }}>
                        <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                        {label}
                    </button>
                ))}
            </div>
        </div>

        {/* Action buttons */}
        <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '0.85rem', animation: 'welcome-fade 0.5s ease-out 0.35s both' }}>
            <button onClick={onNext}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(27,79,216,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = '0 8px 24px rgba(27,79,216,0.35)'; }}
                style={{
                    width: '100%', backgroundColor: B, color: '#fff',
                    padding: '1.15rem', borderRadius: '9999px',
                    fontSize: '1rem', fontWeight: '800', border: 'none',
                    cursor: 'pointer', letterSpacing: '0.4px',
                    boxShadow: '0 8px 24px rgba(27,79,216,0.35)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                }}>
                COMMENCER MON VOYAGE
            </button>
            <button onClick={onLogin}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.backgroundColor = '#dbeafe'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.backgroundColor = '#eff6ff'; }}
                style={{
                    width: '100%', backgroundColor: '#eff6ff', color: B,
                    padding: '1.1rem', borderRadius: '9999px',
                    fontSize: '1rem', fontWeight: '700', border: '2px solid #bfdbfe',
                    cursor: 'pointer', letterSpacing: '0.3px',
                    transition: 'transform 0.15s, background-color 0.15s',
                }}>
                J'AI DÉJÀ UN COMPTE
            </button>
        </div>
    </div>
);

export default WelcomePage;
