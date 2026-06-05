import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import loadingVec from '../assets/loading vec.png';

const B = '#1B4FD8';

const LessonLoadingPage = ({ onReady, isFr, lessonTitle, onClose }) => {
    const { T } = useTheme();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) { clearInterval(id); return 100; }
                return Math.min(p + 1.6, 100);
            });
        }, 40);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const t = setTimeout(onReady, 600);
            return () => clearTimeout(t);
        }
    }, [progress, onReady]);

    return (
        <div style={{
            width: '100%', height: '100vh', backgroundColor: T.surface,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            fontFamily: "'Outfit', system-ui, sans-serif", overflow: 'hidden',
            position: 'relative',
        }}>
            {/* X close button */}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute', top: '1.25rem', left: '1.25rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '1.3rem', color: T.textMuted, padding: '0.35rem',
                    lineHeight: 1, zIndex: 10,
                }}
            >
                ✕
            </button>

            {/* Illustration — centered, takes up most of the screen */}
            <div style={{
                flex: '1 1 auto', display: 'flex', alignItems: 'center',
                justifyContent: 'center', paddingTop: '4rem', width: '100%',
            }}>
                <img
                    src={loadingVec}
                    alt="Loading"
                    style={{
                        height: 'min(55vh, 320px)', width: 'auto',
                        objectFit: 'contain',
                    }}
                />
            </div>

            {/* Bottom section */}
            <div style={{
                width: '100%', maxWidth: '400px',
                padding: '0 1.75rem 2.5rem',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1rem',
            }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: B, margin: 0, textAlign: 'center' }}>
                    {isFr ? 'Chargement...' : 'Loading...'}
                </h2>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '8px', backgroundColor: T.border, borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${progress}%`, height: '100%',
                        backgroundColor: B, borderRadius: '99px',
                        transition: 'width 0.08s linear',
                    }} />
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', maxWidth: '280px', lineHeight: 1.6, fontWeight: '500', margin: 0 }}>
                    {isFr
                        ? 'Terminez le cours plus vite pour gagner plus de XP et de Diamants.'
                        : 'Complete the course faster to get more XP and Diamonds.'}
                </p>
            </div>
        </div>
    );
};

export default LessonLoadingPage;
