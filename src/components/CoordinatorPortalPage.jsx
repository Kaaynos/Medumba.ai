import CohortManager from './CohortManager';

const B  = '#1B4FD8';
const BG = '#f8fafc';

/* ════════════════════════════════════════════════════════════════════
   CoordinatorPortalPage
   Personas & Journeys v2, Class Coordinator: "Places every child, forms
   the cohorts, holds the timetable... one console showing every cohort
   running now — who joined, who is missing, which teacher hasn't
   connected." Same cohort/roster/session reach as the Admin Panel's
   Cohorts tab (see CohortManager, migration 018), without the broader
   admin surface (contact messages, testimonials, granting is_admin).
════════════════════════════════════════════════════════════════════ */
const CoordinatorPortalPage = ({ coordinatorName, nativeLang, onLogout }) => {
    const isFr = nativeLang === 'french';

    return (
        <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <div style={{ backgroundColor: B, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <div>
                    <div style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>🗂️ {isFr ? 'Espace Coordination' : 'Coordinator Portal'}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem' }}>{coordinatorName || ''}</div>
                </div>
                {onLogout && (
                    <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '0.45rem 0.9rem', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '700' }}>
                        🚪 {isFr ? 'Déconnexion' : 'Log out'}
                    </button>
                )}
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem' }}>
                <CohortManager isFr={isFr} />
            </div>
        </div>
    );
};

export default CoordinatorPortalPage;
