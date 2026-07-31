import logo from '../assets/logo.png';

/* ════════════════════════════════════════════════════════════════════
   WhoIsLearningPage
   Shown once per session, right after login, only when the household
   has more than one profile (a guardian plus at least one child). The
   guardian's own profile is always offered too — picking it is how an
   adult continues using their own account normally.

   Deliberately tap-only: a pre-reading child (5-8) can use this without
   any text entry — "enters by tapping her own face" (Personas & Journeys
   v2). Big circles, no forms, no back button — just pick and go.
════════════════════════════════════════════════════════════════════ */
const WhoIsLearningPage = ({ members, nativeLang, onPick }) => {
    const isFr = nativeLang === 'french';

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            background: 'linear-gradient(180deg, #eff6ff, #ffffff)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '2rem 1.5rem', fontFamily: "'Outfit', system-ui, sans-serif",
            gap: '2rem',
        }}>
            <img src={logo} alt="Medumba.AI" style={{ width: '72px', height: 'auto' }} />

            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a', margin: 0 }}>
                    {isFr ? 'Qui apprend aujourd\'hui ?' : 'Who\'s learning today?'}
                </h1>
            </div>

            <div style={{
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                gap: '1.5rem', maxWidth: '520px',
            }}>
                {members.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => onPick(m.id)}
                        style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
                            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                            width: '120px',
                        }}
                    >
                        <div style={{
                            width: '96px', height: '96px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #0056D2, #38bdf8)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2.4rem', fontWeight: '900', color: '#fff',
                            boxShadow: '0 8px 24px rgba(0,86,210,0.3)',
                            border: '4px solid #fff',
                            transition: 'transform 0.15s',
                        }}>
                            {(m.name || '?').trim().charAt(0).toUpperCase()}
                        </div>
                        <span style={{
                            fontSize: '0.95rem', fontWeight: '700', color: '#0f172a',
                            textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap', maxWidth: '100%',
                        }}>
                            {m.name || (isFr ? 'Sans nom' : 'Unnamed')}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WhoIsLearningPage;
