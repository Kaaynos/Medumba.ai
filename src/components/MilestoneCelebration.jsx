import { useState } from 'react';

const B = '#1B4FD8';
const AMB = '#f59e0b';

const FLOATERS = ['🥳', '🎉', '🎊', '🎆', '✨', '🎉', '🥳', '🎊'];

/**
 * Dismissible full-screen popup celebrating a learner-count milestone.
 * Shown by LandingPage.jsx whenever the latest milestone (migration 042,
 * milestoneService.js) is within its celebration window and hasn't been
 * dismissed yet in this browser (localStorage-gated, one show per
 * threshold, not once per page load).
 */
const MilestoneCelebration = ({ threshold, nativeLang, onDismiss }) => {
    const isFr = nativeLang === 'french';
    const [closing, setClosing] = useState(false);

    const handleDismiss = () => {
        setClosing(true);
        setTimeout(onDismiss, 200);
    };

    return (
        <div
            onClick={handleDismiss}
            style={{
                position: 'fixed', inset: 0, zIndex: 200,
                backgroundColor: 'rgba(15,23,42,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1.5rem', opacity: closing ? 0 : 1, transition: 'opacity 0.2s ease-out',
            }}
        >
            <style>{`
                @keyframes milestone-pop { 0%{transform:scale(0.85);opacity:0} 70%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }
                @keyframes milestone-float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(8deg)} }
                @media (prefers-reduced-motion: reduce) {
                    .milestone-card, .milestone-floater { animation: none !important; }
                }
            `}</style>

            <div
                onClick={(e) => e.stopPropagation()}
                className="milestone-card"
                style={{
                    position: 'relative', maxWidth: '420px', width: '100%',
                    backgroundColor: '#fff', borderRadius: '24px', padding: '2.5rem 2rem 2rem',
                    textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
                    animation: closing ? 'none' : 'milestone-pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) both',
                }}
            >
                <div style={{ position: 'absolute', top: '-18px', left: 0, right: 0, display: 'flex', justifyContent: 'space-around', fontSize: '1.8rem', pointerEvents: 'none' }}>
                    {FLOATERS.map((e, i) => (
                        <span key={i} className="milestone-floater" style={{ animation: `milestone-float ${1.6 + (i % 3) * 0.3}s ease-in-out ${i * 0.12}s infinite` }}>{e}</span>
                    ))}
                </div>

                <div style={{ fontSize: '3rem', marginBottom: '0.75rem', marginTop: '0.5rem' }}>🎉</div>

                <div style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: AMB, marginBottom: '0.5rem' }}>
                    {isFr ? 'Étape franchie' : 'Milestone reached'}
                </div>

                <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a', margin: '0 0 0.75rem', lineHeight: 1.3 }}>
                    {isFr
                        ? `Nous sommes ${threshold} apprenants du Medumba !`
                        : `We're ${threshold} Medumba learners strong!`}
                </h2>

                <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, margin: '0 0 2rem' }}>
                    {isFr
                        ? "Merci de faire vivre la langue avec nous — chaque leçon, chaque mot appris compte."
                        : "Thank you for keeping the language alive with us — every lesson, every word learned counts."}
                </p>

                <button
                    onClick={handleDismiss}
                    style={{
                        width: '100%', backgroundColor: B, color: '#fff',
                        padding: '0.9rem', borderRadius: '9999px', fontSize: '1rem',
                        fontWeight: '700', border: 'none', cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(27,79,216,0.3)', fontFamily: 'inherit',
                    }}
                >{isFr ? 'Continuer' : 'Continue'}</button>
            </div>
        </div>
    );
};

export default MilestoneCelebration;
