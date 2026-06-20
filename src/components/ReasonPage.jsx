import React, { useState } from 'react';
import tutor from '../assets/tutor.png';

const B = '#1B4FD8';

const ReasonPage = ({ onNext, onBack, nativeLang, learningLang }) => {
    const [selectedReason, setSelectedReason] = useState(null);
    const isFrench = nativeLang === 'french';

    const questionText = isFrench
        ? 'Qu\'est-ce qui vous ramène au Medumba ?'
        : 'What brings you back to Medumba?';

    const reasons = [
        {
            id: 'family',
            emoji: '🏡',
            text: isFrench
                ? 'Pour parler avec mes parents ou grands-parents'
                : 'To speak with my parents or grandparents',
        },
        {
            id: 'roots',
            emoji: '🌍',
            text: isFrench
                ? 'Pour me reconnecter à mes racines camerounaises'
                : 'To reconnect with my Cameroonian roots',
        },
        {
            id: 'children',
            emoji: '👶',
            text: isFrench
                ? 'Pour transmettre la langue à mes enfants'
                : 'To pass the language on to my children',
        },
        {
            id: 'culture',
            emoji: '🎵',
            text: isFrench
                ? 'Pour comprendre les chants et histoires traditionnels'
                : 'To understand traditional songs & stories',
        },
        {
            id: 'preservation',
            emoji: '🌱',
            text: isFrench
                ? 'Pour aider à préserver la langue'
                : 'To help preserve the language',
        },
    ];

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            {/* Top Bar */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#fff', flexShrink: 0 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.5rem', borderRadius: '50%' }}>←</button>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '60%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0 1.5rem' }}>
                {/* Tutor + Bubble */}
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.25rem', marginBottom: '1rem' }}>
                    <div style={{ position: 'relative', zIndex: 1, width: 'fit-content' }}>
                        <img src={tutor} alt="Tutor" style={{ width: '160px', height: 'auto', display: 'block' }} />
                        <div style={{
                            position: 'absolute', top: '20px', right: '-65px',
                            backgroundColor: 'white', padding: '1rem',
                            borderRadius: '20px', borderBottomLeftRadius: '4px',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                            width: '180px', textAlign: 'left',
                        }}>
                            <p style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: '600', lineHeight: '1.4', margin: 0 }}>
                                {questionText}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingBottom: '1rem' }}>
                    {reasons.map((reason) => (
                        <div
                            key={reason.id}
                            onClick={() => setSelectedReason(reason.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '1rem',
                                padding: '0.85rem 1.25rem', borderRadius: '16px',
                                border: selectedReason === reason.id ? `2px solid ${B}` : '1px solid #cbd5e1',
                                backgroundColor: selectedReason === reason.id ? '#eff6ff' : 'white',
                                cursor: 'pointer', transition: 'all 0.2s',
                            }}
                        >
                            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{reason.emoji}</span>
                            <span style={{
                                fontWeight: '600',
                                color: selectedReason === reason.id ? B : '#334155',
                                fontSize: '0.9rem', lineHeight: 1.4,
                            }}>
                                {reason.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer — always visible */}
            <div style={{ flexShrink: 0, width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0.75rem 1.5rem 1.5rem' }}>
                <button
                    onClick={() => selectedReason && onNext(selectedReason)}
                    disabled={!selectedReason}
                    style={{
                        width: '100%',
                        backgroundColor: selectedReason ? B : '#cbd5e1',
                        color: 'white', padding: '1.125rem', borderRadius: '9999px',
                        fontSize: '1.125rem', fontWeight: '600', border: 'none',
                        cursor: selectedReason ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                        boxShadow: selectedReason ? '0 10px 15px -3px rgba(27,79,216,0.3)' : 'none',
                    }}
                >
                    {isFrench ? 'Continuer' : 'Continue'}
                </button>
            </div>
        </div>
    );
};

export default ReasonPage;
