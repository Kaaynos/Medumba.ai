import { useState } from 'react';

const B = '#1B4FD8';

/* Teacher/coordinator/advisor/etc. are deliberately absent here — those
   stay admin-provisioned only (migration 041), never self-selectable. */
const ROLES = [
    { id: 'parent',          emoji: '👨‍👩‍👧', fr: "Je m'inscris pour mon enfant",              en: "I'm signing up for my child",              descFr: 'Vous suivrez ses progrès et gérerez son compte.', descEn: "You'll follow their progress and manage their account." },
    { id: '',                emoji: '🙋',     fr: "J'apprends moi-même",                        en: "I'm learning myself",                       descFr: 'Votre âge déterminera votre expérience.',         descEn: 'Your age will shape your own experience.' },
    { id: 'content_creator',  emoji: '🎙️',     fr: 'Je veux contribuer du contenu',              en: 'I want to contribute content',              descFr: 'Mots, histoires, enregistrements — révisés avant publication.', descEn: 'Words, stories, recordings — reviewed before anything publishes.' },
];

const RoleChoicePage = ({ onNext, onBack, nativeLang }) => {
    const isFr = nativeLang === 'french';
    const [selected, setSelected] = useState(null); // role id, '' for "learning myself"
    const [hasSelected, setHasSelected] = useState(false);

    const h = isFr ? "Qu'est-ce qui vous amène ? 🌱" : "What brings you here? 🌱";
    const btn = isFr ? 'Continuer' : 'Continue';

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 50 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
                <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '60%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '2rem 1.5rem 2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '2rem' }}>{h}</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {ROLES.map((r) => {
                        const isSelected = hasSelected && selected === r.id;
                        return (
                            <button
                                key={r.id || 'self'}
                                onClick={() => { setSelected(r.id); setHasSelected(true); }}
                                style={{
                                    display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
                                    padding: '1.1rem 1.25rem', borderRadius: '16px', textAlign: 'left',
                                    border: `2px solid ${isSelected ? B : '#e2e8f0'}`,
                                    backgroundColor: isSelected ? '#eff6ff' : '#fff',
                                    cursor: 'pointer', fontFamily: 'inherit', width: '100%',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{r.emoji}</span>
                                <span>
                                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>{isFr ? r.fr : r.en}</div>
                                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem', lineHeight: 1.4 }}>{isFr ? r.descFr : r.descEn}</div>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div style={{ flex: 1 }} />
                <button
                    onClick={() => onNext(selected)}
                    disabled={!hasSelected}
                    style={{
                        width: '100%', backgroundColor: hasSelected ? B : '#cbd5e1', color: '#fff',
                        padding: '1.1rem', borderRadius: '9999px', fontSize: '1.05rem',
                        fontWeight: '700', border: 'none', cursor: hasSelected ? 'pointer' : 'not-allowed',
                        boxShadow: hasSelected ? `0 8px 24px rgba(27,79,216,0.3)` : 'none',
                        letterSpacing: '0.3px', marginTop: '2rem',
                    }}
                >{btn}</button>
            </div>
        </div>
    );
};

export default RoleChoicePage;
