import { useRef, useEffect } from 'react';
import welcomeVec from '../assets/welcom vector.png';

const B = '#1B4FD8';

const SuccessPage = ({ onNext, nativeLang, userName, onNavigate, onLanding }) => {
    const isFr = nativeLang === 'french';
    const firstName = (userName || '').split(' ')[0] || '';
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();

        const colors = ['#1B4FD8', '#f59e0b', '#22c55e', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];
        const particles = Array.from({ length: 150 }, () => ({
            x:        Math.random() * canvas.width,
            y:        -20 - Math.random() * 350,
            w:        6 + Math.random() * 10,
            h:        9 + Math.random() * 12,
            color:    colors[Math.floor(Math.random() * colors.length)],
            rot:      Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.16,
            vx:       (Math.random() - 0.5) * 4.5,
            vy:       1.8 + Math.random() * 4,
        }));

        let frame;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let anyVisible = false;
            particles.forEach(p => {
                p.x   += p.vx;
                p.y   += p.vy;
                p.rot += p.rotSpeed;
                if (p.y < canvas.height + 30) anyVisible = true;
                const alpha = Math.max(0, 1 - Math.max(0, p.y - canvas.height * 0.65) / (canvas.height * 0.35));
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });
            if (anyVisible) frame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            padding: '2.5rem 1.5rem', backgroundColor: '#fff', textAlign: 'center',
            fontFamily: "'Outfit', system-ui, sans-serif",
            position: 'relative', overflow: 'hidden',
        }}>
            <canvas ref={canvasRef} style={{
                position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
            }} />

            <style>{`
                @keyframes suc-pop  { 0%{transform:scale(0.7);opacity:0;} 70%{transform:scale(1.06);} 100%{transform:scale(1);opacity:1;} }
                @keyframes suc-fade { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
                @keyframes suc-btn:hover { transform: scale(1.03); }
            `}</style>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {/* "Hurray!!" speech bubble */}
                <div style={{
                    backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0',
                    borderRadius: '20px 20px 20px 4px',
                    padding: '0.7rem 1.5rem', marginBottom: '1rem',
                    fontSize: '1rem', fontWeight: '700', color: '#0f172a',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    animation: 'suc-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both',
                }}>
                    {isFr ? 'Hourra !!' : 'Hurray!!'}
                </div>

                {/* Welcom vector illustration */}
                <div style={{ width: '100%', maxWidth: '320px', marginBottom: '1.5rem', animation: 'suc-pop 0.55s cubic-bezier(0.175,0.885,0.32,1.275) 0.1s both' }}>
                    <img src={welcomeVec} alt="Celebration" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>

                {/* Heading */}
                <h1 style={{
                    fontSize: '2rem', fontWeight: '900', color: B,
                    marginBottom: '0.6rem', letterSpacing: '-0.02em',
                    animation: 'suc-fade 0.5s ease-out 0.2s both',
                }}>
                    {isFr
                        ? `Bienvenue${firstName ? `, ${firstName}` : ''} 👋`
                        : `Welcome${firstName ? `, ${firstName}` : ''} 👋`}
                </h1>

                {/* Subtext */}
                <p style={{
                    fontSize: '1rem', color: '#64748b', maxWidth: '280px',
                    lineHeight: 1.6, marginBottom: '1.5rem', fontWeight: '500',
                    animation: 'suc-fade 0.5s ease-out 0.3s both',
                }}>
                    {isFr ? 'Votre profil a été créé avec succès.' : 'Your profile has been created successfully.'}
                </p>

                {/* Quick-access buttons */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    gap: '0.65rem', width: '100%', maxWidth: '340px',
                    marginBottom: '1.25rem',
                    animation: 'suc-fade 0.5s ease-out 0.35s both',
                }}>
                    {[
                        { icon: '📖', labelFr: 'Dictionnaire', labelEn: 'Dictionary', view: 'dictionary' },
                        { icon: '🔢', labelFr: 'Comptage',     labelEn: 'Counting',   view: 'counting'   },
                        { icon: '📅', labelFr: 'Calendrier',   labelEn: 'Calendar',   view: 'calendar'   },
                        { icon: '🎬', labelFr: 'Vidéos',       labelEn: 'Videos',     view: 'video'      },
                    ].map(btn => (
                        <button
                            key={btn.view}
                            onClick={() => onNavigate?.(btn.view)}
                            style={{
                                padding: '0.8rem 0.6rem', borderRadius: '14px',
                                backgroundColor: '#eff6ff', border: '2px solid #bfdbfe',
                                color: B, fontWeight: '700', fontSize: '0.9rem',
                                cursor: 'pointer', fontFamily: 'inherit',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: '0.3rem',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dbeafe'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#eff6ff'}
                        >
                            <span style={{ fontSize: '1.4rem' }}>{btn.icon}</span>
                            <span>{isFr ? btn.labelFr : btn.labelEn}</span>
                        </button>
                    ))}
                </div>

                {/* CTA */}
                <button onClick={onNext} style={{
                    width: '100%', maxWidth: '340px',
                    backgroundColor: B, color: '#fff',
                    padding: '1.1rem', borderRadius: '9999px',
                    fontSize: '1.05rem', fontWeight: '800', border: 'none',
                    cursor: 'pointer', boxShadow: '0 8px 24px rgba(27,79,216,0.3)',
                    letterSpacing: '0.5px',
                    animation: 'suc-fade 0.5s ease-out 0.4s both',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    marginBottom: '0.75rem',
                }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(27,79,216,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = '0 8px 24px rgba(27,79,216,0.3)'; }}
                >
                    {isFr ? "CONTINUER VERS L'ACCUEIL" : 'CONTINUE TO HOME'}
                </button>

                {/* Back to landing */}
                <button onClick={onLanding} style={{
                    width: '100%', maxWidth: '340px',
                    backgroundColor: 'transparent', color: '#64748b',
                    padding: '0.75rem', borderRadius: '9999px',
                    fontSize: '0.9rem', fontWeight: '600',
                    border: '2px solid #e2e8f0', cursor: 'pointer',
                    fontFamily: 'inherit',
                    animation: 'suc-fade 0.5s ease-out 0.45s both',
                }}>
                    {isFr ? '← Retour à la page d\'accueil' : '← Back to landing page'}
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
