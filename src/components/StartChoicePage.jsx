const B = '#0056D2';

/** Shown right after "Start the course", before the personalization quiz —
 *  offers to save progress via an account instead of defaulting silently
 *  to free access. */
const StartChoicePage = ({ onBack, onRegister, onLogin, onContinue, nativeLang }) => {
    const isFr = nativeLang === 'french';

    return (
        <div style={{
            width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc',
            fontFamily: "'Outfit', system-ui, sans-serif",
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '2rem 1.25rem 3rem',
        }}>
            <div style={{ width: '100%', maxWidth: '440px', display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748b', padding: '.25rem', lineHeight: 1 }}>←</button>
            </div>

            <div style={{ width: '100%', maxWidth: '440px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>💾</div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '.6rem', textAlign: 'center' }}>
                    {isFr ? 'Sauvegarder ta progression ?' : 'Save your progress?'}
                </h1>
                <p style={{ fontSize: '.92rem', color: '#64748b', textAlign: 'center', marginBottom: '2.5rem', fontWeight: 500, lineHeight: 1.5 }}>
                    {isFr
                        ? 'Connecte-toi ou crée un profil pour ne jamais perdre ton XP et ta série, même en changeant d\'appareil.'
                        : 'Log in or create a profile so you never lose your XP and streak, even if you switch devices.'}
                </p>

                <button
                    onClick={onRegister}
                    style={{
                        width: '100%', padding: '1rem', borderRadius: '9999px', border: 'none', marginBottom: '.75rem',
                        backgroundColor: B, color: '#fff', fontWeight: 800, fontSize: '1rem',
                        cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 24px rgba(0,86,210,0.3)',
                    }}
                >
                    {isFr ? 'Créer un profil' : 'Create a profile'}
                </button>
                <button
                    onClick={onLogin}
                    style={{
                        width: '100%', padding: '1rem', borderRadius: '9999px', marginBottom: '1.5rem',
                        border: `2px solid ${B}`, backgroundColor: 'transparent', color: B,
                        fontWeight: 800, fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                >
                    {isFr ? 'Se connecter' : 'Log in'}
                </button>

                <button
                    onClick={onContinue}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: '#94a3b8', fontWeight: 700, fontSize: '.85rem', fontFamily: 'inherit',
                        textAlign: 'center', margin: '0 auto',
                    }}
                >
                    {isFr ? 'Continuer sans compte' : 'Continue without an account'}
                </button>
            </div>
        </div>
    );
};

export default StartChoicePage;
