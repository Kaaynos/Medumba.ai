import { useState } from 'react';
import logo from '../assets/logo.png';

const B = '#1B4FD8';

const QuickSetupPage = ({ onNext, onBack, nativeLang, setConnection, setProficiency, setReason, setGoals, setDailyGoal }) => {
    const isFr = nativeLang === 'french';

    const [level,   setLevel]   = useState(null);
    const [reason,  setReasonS] = useState(null);
    const [goal,    setGoalS]   = useState(null);
    const [goals,   setGoalsS]  = useState([]);

    const LEVELS = [
        { id: 1, emoji: '🌱', label: isFr ? 'Débutant absolu'  : 'Absolute beginner',  sub: isFr ? 'Je ne connais aucun mot' : 'I know no words yet' },
        { id: 2, emoji: '📖', label: isFr ? 'Quelques mots'    : 'A few words',         sub: isFr ? 'J\'ai entendu parler à la maison' : 'I\'ve heard it at home' },
        { id: 3, emoji: '💬', label: isFr ? 'Intermédiaire'    : 'Intermediate',        sub: isFr ? 'Je comprends, mais mal à l\'aise' : 'I understand but struggle' },
        { id: 4, emoji: '🏆', label: isFr ? 'Avancé'           : 'Advanced',            sub: isFr ? 'Je veux me perfectionner' : 'I want to perfect it' },
    ];

    const REASONS = [
        { id: 'family',   emoji: '🏡', label: isFr ? 'Famille'       : 'Family',        sub: isFr ? 'Parler avec mes proches' : 'Talk with my family' },
        { id: 'culture',  emoji: '🎭', label: isFr ? 'Culture'        : 'Culture',       sub: isFr ? 'Connaître mes racines' : 'Know my roots' },
        { id: 'career',   emoji: '💼', label: isFr ? 'Carrière'       : 'Career',        sub: isFr ? 'Opportunités pro' : 'Professional growth' },
        { id: 'fun',      emoji: '😁', label: isFr ? 'Plaisir'        : 'Fun',           sub: isFr ? 'Par curiosité' : 'Just curious' },
        { id: 'other',    emoji: '🧩', label: isFr ? 'Autre'          : 'Other',         sub: isFr ? 'Objectif personnel' : 'Personal goal' },
    ];

    const GOALS = [
        { id: 'relaxed', emoji: '🌿', time: 5,  label: isFr ? 'En douceur'  : 'Gentle',   sub: isFr ? '5 min / jour' : '5 min / day' },
        { id: 'normal',  emoji: '⚡', time: 10, label: isFr ? 'Régulier'    : 'Regular',  sub: isFr ? '10 min / jour' : '10 min / day' },
        { id: 'serious', emoji: '🔥', time: 15, label: isFr ? 'Sérieux'     : 'Serious',  sub: isFr ? '15 min / jour' : '15 min / day' },
        { id: 'intense', emoji: '💪', time: 30, label: isFr ? 'Intensif'    : 'Intense',  sub: isFr ? '30 min / jour' : '30 min / day' },
    ];

    const OBJECTIVES = [
        { id: 'speak', emoji: '💬', label: isFr ? 'Parler couramment' : 'Speak fluently',     sub: isFr ? 'Converser à l\'oral' : 'Hold a conversation' },
        { id: 'vocab', emoji: '📇', label: isFr ? 'Maîtriser le vocab' : 'Master vocabulary',  sub: isFr ? 'Élargir mon lexique' : 'Grow my word bank' },
        { id: 'habit', emoji: '⏰', label: isFr ? "Habitudes d'étude" : 'Build study habits', sub: isFr ? 'Pratiquer chaque jour' : 'Practice daily' },
    ];

    const toggleObjective = (id) => {
        setGoalsS(g => g.includes(id) ? g.filter(x => x !== id) : [...g, id]);
    };

    const canContinue = level && reason && goal && goals.length > 0;

    const handleNext = () => {
        setConnection('heritage');
        setProficiency(level);
        setReason(reason);
        setGoals(goals);
        setDailyGoal(goal);
        onNext();
    };

    return (
        <div style={{
            width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc',
            fontFamily: "'Outfit', system-ui, sans-serif",
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '2rem 1.25rem 4rem',
        }}>
            <style>{`
                @keyframes qs-fade { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
                .qs-card { transition: transform .15s, box-shadow .15s, border-color .15s; cursor: pointer; }
                .qs-card:hover { transform: translateY(-2px); }
            `}</style>

            {/* Header */}
            <div style={{ width: '100%', maxWidth: '520px', display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '2rem', animation: 'qs-fade .4s ease both' }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748b', padding: '.25rem', lineHeight: 1, flexShrink: 0 }}>←</button>
                <img src={logo} alt="" style={{ width: '28px' }} />
                <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: '66%', height: '100%', background: `linear-gradient(90deg,${B},#0891b2)`, borderRadius: '99px', transition: 'width .4s' }} />
                </div>
                <span style={{ fontSize: '.75rem', fontWeight: 700, color: '#64748b', flexShrink: 0 }}>2 / 3</span>
            </div>

            <div style={{ width: '100%', maxWidth: '520px', animation: 'qs-fade .45s ease .05s both' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', marginBottom: '.5rem', textAlign: 'center' }}>
                    {isFr ? 'Personnalisez votre parcours' : 'Personalize your journey'}
                </h1>
                <p style={{ fontSize: '.9rem', color: '#64748b', textAlign: 'center', marginBottom: '2rem', fontWeight: 600 }}>
                    {isFr ? '40 secondes — juste 4 questions' : '40 seconds — just 4 questions'}
                </p>

                {/* ── Section 1: Niveau ── */}
                <Section label={isFr ? '1. Quel est votre niveau en Medumba ?' : '1. What is your Medumba level?'}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                        {LEVELS.map(l => (
                            <Card key={l.id} selected={level === l.id} onClick={() => setLevel(l.id)}>
                                <span style={{ fontSize: '1.5rem' }}>{l.emoji}</span>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '.88rem', color: level === l.id ? B : '#0f172a' }}>{l.label}</div>
                                    <div style={{ fontSize: '.73rem', color: '#64748b', marginTop: '2px' }}>{l.sub}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Section>

                {/* ── Section 2: Raison ── */}
                <Section label={isFr ? '2. Pourquoi apprenez-vous le Medumba ?' : '2. Why are you learning Medumba?'}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                        {REASONS.map(r => (
                            <Card key={r.id} selected={reason === r.id} onClick={() => setReasonS(r.id)} row>
                                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{r.emoji}</span>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '.9rem', color: reason === r.id ? B : '#0f172a' }}>{r.label}</div>
                                    <div style={{ fontSize: '.75rem', color: '#64748b' }}>{r.sub}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Section>

                {/* ── Section 3: Objectif quotidien ── */}
                <Section label={isFr ? '3. Objectif quotidien ?' : '3. Daily goal?'}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                        {GOALS.map(g => (
                            <Card key={g.id} selected={goal === g.id} onClick={() => setGoalS(g.id)}>
                                <span style={{ fontSize: '1.5rem' }}>{g.emoji}</span>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '.88rem', color: goal === g.id ? B : '#0f172a' }}>{g.label}</div>
                                    <div style={{ fontSize: '.73rem', color: '#64748b', marginTop: '2px' }}>{g.sub}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Section>

                {/* ── Section 4: Objectifs d'apprentissage (multi-choix) ── */}
                <Section label={isFr ? "4. Vos objectifs d'apprentissage ? (plusieurs choix possibles)" : '4. Your learning objectives? (pick any that apply)'}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                        {OBJECTIVES.map(o => (
                            <Card key={o.id} selected={goals.includes(o.id)} onClick={() => toggleObjective(o.id)} row>
                                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{o.emoji}</span>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '.9rem', color: goals.includes(o.id) ? B : '#0f172a' }}>{o.label}</div>
                                    <div style={{ fontSize: '.75rem', color: '#64748b' }}>{o.sub}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Section>

                {/* CTA */}
                <button
                    onClick={handleNext}
                    disabled={!canContinue}
                    style={{
                        width: '100%', padding: '1.1rem', borderRadius: '9999px', marginTop: '1.5rem',
                        backgroundColor: canContinue ? B : '#e2e8f0',
                        color: canContinue ? '#fff' : '#94a3b8',
                        border: 'none', fontWeight: 800, fontSize: '1rem',
                        cursor: canContinue ? 'pointer' : 'not-allowed',
                        fontFamily: 'inherit',
                        boxShadow: canContinue ? '0 8px 24px rgba(27,79,216,0.3)' : 'none',
                        transition: 'all .2s',
                    }}
                >
                    {canContinue
                        ? (isFr ? 'Continuer →' : 'Continue →')
                        : (isFr ? 'Répondez aux 4 questions' : 'Answer all 4 questions')}
                </button>
            </div>
        </div>
    );
};

/* ── helpers ── */
const Section = ({ label, children }) => (
    <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ fontSize: '.82rem', fontWeight: 800, color: '#475569', letterSpacing: '.3px', marginBottom: '.75rem', textTransform: 'uppercase' }}>{label}</div>
        {children}
    </div>
);

const Card = ({ selected, onClick, children, row = false }) => (
    <div className="qs-card" onClick={onClick} style={{
        display: 'flex', flexDirection: row ? 'row' : 'column',
        alignItems: row ? 'center' : 'flex-start',
        gap: row ? '.75rem' : '.4rem',
        padding: '.85rem 1rem', borderRadius: '16px', backgroundColor: '#fff',
        border: `2px solid ${selected ? B : '#e2e8f0'}`,
        boxShadow: selected ? `0 4px 20px rgba(27,79,216,0.15)` : '0 1px 4px rgba(0,0,0,0.04)',
        userSelect: 'none',
    }}>
        {children}
        {selected && (
            <div style={{ marginLeft: 'auto', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: B, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontSize: '.7rem', fontWeight: 900 }}>✓</span>
            </div>
        )}
    </div>
);

export default QuickSetupPage;
