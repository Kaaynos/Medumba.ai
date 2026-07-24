import logo from '../assets/logo.png';

const B = '#0056D2';

/** Shown right after "Start the course", before the personalization quiz —
 *  offers to save progress via an account instead of defaulting silently
 *  to free access. Styled to match WelcomePage.jsx rather than a bare form. */
const StartChoicePage = ({ onBack, onRegister, onContinue, nativeLang }) => {
    const isFr = nativeLang === 'french';

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '2rem 1.5rem 2.5rem',
            textAlign: 'center',
            fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            <style>{`
                @keyframes sc-fade { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
                @keyframes sc-pop  { 0%{transform:scale(0.7);opacity:0;} 70%{transform:scale(1.08);} 100%{transform:scale(1);opacity:1;} }
            `}</style>

            <div style={{ width: '100%', maxWidth: '440px', display: 'flex', alignItems: 'center' }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748b', padding: '.25rem', lineHeight: 1 }}>←</button>
            </div>

            <img src={logo} alt="Medumba" style={{ width: '84px', height: 'auto', margin: '1rem 0 1.25rem', animation: 'sc-fade 0.5s ease-out both' }} />

            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                backgroundColor: '#eff6ff', border: '1.5px solid #bfdbfe',
                borderRadius: '99px', padding: '0.35rem 1rem',
                fontSize: '0.78rem', fontWeight: '800', color: B,
                letterSpacing: '0.3px', marginBottom: '1.5rem',
                animation: 'sc-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.1s both',
            }}>
                💾 {isFr ? 'Sauvegarde ta progression' : 'Save your progress'}
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '400px', animation: 'sc-fade 0.5s ease-out 0.15s both' }}>
                <h1 style={{
                    fontSize: '2rem', fontWeight: '900', color: '#0f172a',
                    marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2,
                }}>
                    {isFr ? <>Ne perds jamais<br /><span style={{ color: B }}>ton avancement</span></> : <>Never lose<br /><span style={{ color: B }}>your progress</span></>}
                </h1>
                <p style={{ fontSize: '0.95rem', fontWeight: '500', color: '#64748b', lineHeight: 1.7, maxWidth: '320px', margin: '0 auto' }}>
                    {isFr
                        ? 'Crée un profil pour sauvegarder ton XP et ta série, même en changeant d\'appareil.'
                        : 'Create a profile to save your XP and streak, even if you switch devices.'}
                </p>
            </div>

            <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '0.85rem', animation: 'sc-fade 0.5s ease-out 0.3s both' }}>
                <button onClick={onRegister}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,86,210,0.45)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,86,210,0.35)'; }}
                    style={{
                        width: '100%', backgroundColor: B, color: '#fff',
                        padding: '1.15rem', borderRadius: '9999px',
                        fontSize: '1rem', fontWeight: '800', border: 'none',
                        cursor: 'pointer', letterSpacing: '0.4px', fontFamily: 'inherit',
                        boxShadow: '0 8px 24px rgba(0,86,210,0.35)',
                        transition: 'transform 0.15s, box-shadow 0.15s',
                    }}>
                    {isFr ? 'CRÉER UN PROFIL' : 'CREATE A PROFILE'}
                </button>
                <button onClick={onContinue}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.backgroundColor = '#dbeafe'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.backgroundColor = '#eff6ff'; }}
                    style={{
                        width: '100%', backgroundColor: '#eff6ff', color: B,
                        padding: '1.1rem', borderRadius: '9999px',
                        fontSize: '1rem', fontWeight: '700', border: '2px solid #bfdbfe',
                        cursor: 'pointer', letterSpacing: '0.3px', fontFamily: 'inherit',
                        transition: 'transform 0.15s, background-color 0.15s',
                    }}>
                    {isFr ? 'CONTINUER SANS COMPTE' : 'CONTINUE WITHOUT AN ACCOUNT'}
                </button>
            </div>
        </div>
    );
};

export default StartChoicePage;
