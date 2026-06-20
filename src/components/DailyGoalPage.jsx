import { useState } from 'react';
import teacher from '../assets/teacher 1.png';

const B = '#1B4FD8';

const DailyGoalPage = ({ onNext, onBack, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [selectedGoal, setSelectedGoal] = useState(null);

    const q   = isFrench ? "Combien de temps pouvez-vous consacrer à votre héritage chaque jour ?" : "How much time can you give to your heritage each day?";
    const btn = isFrench ? 'Continuer' : 'Continue';

    const goals = [
        {
            id: 'relaxed',
            time: 5,
            label: isFrench ? 'En douceur' : 'Gentle pace',
            sub: isFrench ? 'Une petite habitude, chaque jour' : 'A small habit, every day',
            emoji: '🌿',
        },
        {
            id: 'normal',
            time: 10,
            label: isFrench ? 'Régulier' : 'Regular',
            sub: isFrench ? 'Des progrès constants et durables' : 'Steady, sustainable progress',
            emoji: '🌱',
        },
        {
            id: 'serious',
            time: 15,
            label: isFrench ? 'Engagé' : 'Committed',
            sub: isFrench ? 'Vous ressentez déjà la connexion revenir' : 'You can already feel the connection returning',
            emoji: '💪',
        },
        {
            id: 'great',
            time: 30,
            label: isFrench ? 'Passionné' : 'Passionate',
            sub: isFrench ? 'La langue coule à nouveau dans vos veines' : 'The language is flowing through you again',
            emoji: '🔥',
        },
        {
            id: 'awesome',
            time: 60,
            label: isFrench ? 'Immersif' : 'Immersive',
            sub: isFrench ? 'Tout pour honorer vos racines' : 'All in for your roots',
            emoji: '🌍',
        },
    ];

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            {/* Top bar */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '90%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                {/* Character + speech bubble */}
                <div style={{ display: 'flex', justifyContent: 'center', padding: '0.25rem 1.5rem 0' }}>
                    <div style={{ position: 'relative', width: 'fit-content' }}>
                        <img src={teacher} alt="Teacher" style={{ width: '140px', height: 'auto', display: 'block' }} />
                        <div style={{
                            position: 'absolute', top: '5px', right: '-90px',
                            backgroundColor: '#fff', border: '1.5px solid #e2e8f0',
                            borderRadius: '16px', borderBottomLeftRadius: '4px',
                            padding: '0.75rem 1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', width: '165px',
                        }}>
                            <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: '700', color: '#0f172a', lineHeight: 1.4 }}>{q}</p>
                        </div>
                    </div>
                </div>

                {/* Goals list */}
                <div style={{ display: 'flex', flexDirection: 'column', padding: '0.75rem 1.5rem 1rem', gap: '0.55rem' }}>
                    {goals.map((goal) => {
                        const sel = selectedGoal === goal.id;
                        return (
                            <div key={goal.id} onClick={() => setSelectedGoal(goal.id)} style={{
                                display: 'flex', alignItems: 'center', gap: '1rem',
                                padding: '0.8rem 1.25rem', borderRadius: '16px',
                                border: sel ? `2px solid ${B}` : '1.5px solid #e2e8f0',
                                backgroundColor: sel ? '#eff6ff' : '#fff',
                                cursor: 'pointer', transition: 'all 0.15s',
                            }}>
                                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{goal.emoji}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                                        <span style={{ fontWeight: '800', color: sel ? B : '#0f172a', fontSize: '1rem' }}>
                                            {goal.time} {isFrench ? 'min / jour' : 'min / day'}
                                        </span>
                                        <span style={{ fontSize: '0.85rem', color: sel ? B : '#64748b', fontWeight: '700' }}>
                                            · {goal.label}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '500', marginTop: '0.1rem' }}>
                                        {goal.sub}
                                    </div>
                                </div>
                                <div style={{
                                    width: '20px', height: '20px', borderRadius: '50%',
                                    border: `2px solid ${sel ? B : '#cbd5e1'}`,
                                    backgroundColor: sel ? B : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    {sel && <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '900' }}>✓</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer — always visible */}
            <div style={{ flexShrink: 0, width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0.75rem 1.5rem 1.5rem' }}>
                <button
                    onClick={() => onNext(selectedGoal)} disabled={!selectedGoal}
                    style={{
                        width: '100%',
                        backgroundColor: selectedGoal ? B : '#cbd5e1',
                        color: '#fff', padding: '1.125rem', borderRadius: '9999px',
                        fontSize: '1.125rem', fontWeight: '600', border: 'none',
                        cursor: selectedGoal ? 'pointer' : 'not-allowed',
                        boxShadow: selectedGoal ? '0 10px 15px -3px rgba(27,79,216,0.3)' : 'none',
                        transition: 'all 0.2s',
                    }}
                >
                    {btn}
                </button>
            </div>
        </div>
    );
};

export default DailyGoalPage;
