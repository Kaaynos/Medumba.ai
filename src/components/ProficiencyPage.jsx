import React, { useState } from 'react';
import maleTutor from '../assets/teacher 1.png';

const B = '#1B4FD8';

const ProficiencyPage = ({ onNext, onBack, nativeLang, learningLang }) => {
    const [selectedLevel, setSelectedLevel] = useState(null);
    const isFrench = nativeLang === 'french';

    const questionText = isFrench
        ? 'Quelle est votre connexion avec le Medumba ?'
        : 'What is your connection to Medumba?';

    const levels = [
        {
            id: 1,
            emoji: '👂',
            text: isFrench
                ? "Je l'ai entendu à la maison, mais je ne peux pas encore le parler"
                : "I've heard it at home but can't speak it yet",
            bars: 1,
        },
        {
            id: 2,
            emoji: '🗣️',
            text: isFrench
                ? 'Je comprends quelques mots et expressions de ma famille'
                : 'I understand some words and phrases from family',
            bars: 2,
        },
        {
            id: 3,
            emoji: '💬',
            text: isFrench
                ? 'Je peux suivre des conversations mais j\'ai du mal à répondre'
                : "I can follow conversations but struggle to respond",
            bars: 3,
        },
        {
            id: 4,
            emoji: '🌿',
            text: isFrench
                ? 'Je le parlais enfant mais j\'ai perdu ma fluidité'
                : "I spoke it as a child but have lost fluency",
            bars: 4,
        },
    ];

    const ProgressBars = ({ level }) => (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '18px', flexShrink: 0 }}>
            {[1, 2, 3, 4].map((bar) => (
                <div key={bar} style={{
                    width: '4px',
                    height: `${4 + bar * 4}px`,
                    backgroundColor: bar <= level ? B : '#cbd5e1',
                    borderRadius: '2px',
                }} />
            ))}
        </div>
    );

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            {/* Top Bar */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#fff', flexShrink: 0 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.5rem', borderRadius: '50%' }}>←</button>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '40%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0 1.5rem' }}>
                {/* Tutor + Bubble */}
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.25rem', marginBottom: '1rem' }}>
                    <div style={{ position: 'relative', zIndex: 1, width: 'fit-content' }}>
                        <img src={maleTutor} alt="Tutor" style={{ width: '160px', height: 'auto', display: 'block' }} />
                        <div style={{
                            position: 'absolute', top: '5px', right: '-90px',
                            backgroundColor: 'white', padding: '0.9rem 1rem',
                            borderRadius: '16px', borderBottomLeftRadius: '4px',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                            width: '175px', textAlign: 'left',
                            border: '1.5px solid #e2e8f0',
                        }}>
                            <p style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: '700', lineHeight: '1.4', margin: 0 }}>
                                {questionText}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingBottom: '1rem' }}>
                    {levels.map((level) => (
                        <div
                            key={level.id}
                            onClick={() => setSelectedLevel(level.id)}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '0.85rem 1.25rem', borderRadius: '16px',
                                border: selectedLevel === level.id ? `2px solid ${B}` : '1px solid #cbd5e1',
                                backgroundColor: selectedLevel === level.id ? '#eff6ff' : 'white',
                                cursor: 'pointer', transition: 'all 0.2s', gap: '0.75rem',
                            }}
                        >
                            <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{level.emoji}</span>
                            <span style={{
                                fontWeight: '600', color: selectedLevel === level.id ? B : '#334155',
                                fontSize: '0.9rem', flex: 1, lineHeight: 1.4,
                            }}>
                                {level.text}
                            </span>
                            <ProgressBars level={level.bars} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer — always visible */}
            <div style={{ flexShrink: 0, width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0.75rem 1.5rem 1.5rem' }}>
                <button
                    onClick={() => onNext(selectedLevel)}
                    disabled={!selectedLevel}
                    style={{
                        width: '100%',
                        backgroundColor: selectedLevel ? B : '#cbd5e1',
                        color: 'white', padding: '1.125rem', borderRadius: '9999px',
                        fontSize: '1.125rem', fontWeight: '600', border: 'none',
                        cursor: selectedLevel ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                        boxShadow: selectedLevel ? '0 10px 15px -3px rgba(27,79,216,0.3)' : 'none',
                    }}
                >
                    {isFrench ? 'Continuer' : 'Continue'}
                </button>
            </div>
        </div>
    );
};

export default ProficiencyPage;
