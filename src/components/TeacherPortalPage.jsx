import { useState, useEffect, useCallback } from 'react';
import {
    getMyCohorts, getCohortRoster, updateCohortHomework,
    listCohortSessions, createClassSession, getSessionAttendance, markAttendance,
} from '../services/teacherService';

const B  = '#1B4FD8';
const BG = '#f8fafc';

/* ════════════════════════════════════════════════════════════════════
   TeacherPortalPage
   Personas & Journeys v2, Teacher: "To know how many students she has,
   to follow up on homework, and to see whether she is being paid."
   This ships the first two. Payment/payout is real money and needs
   Stripe/mobile-money configuration this repo doesn't have yet — shown
   honestly as "not set up" rather than a fabricated number.
════════════════════════════════════════════════════════════════════ */
const TeacherPortalPage = ({ teacherUid, teacherName, nativeLang, onLogout }) => {
    const isFr = nativeLang === 'french';

    const [cohorts, setCohorts]         = useState([]);
    const [loading, setLoading]         = useState(true);
    const [activeCohortId, setActiveCohortId] = useState(null);
    const [roster, setRoster]           = useState([]);
    const [rosterLoading, setRosterLoading] = useState(false);
    const [homeworkDraft, setHomeworkDraft] = useState('');
    const [savingHomework, setSavingHomework] = useState(false);

    useEffect(() => {
        if (!teacherUid) return;
        getMyCohorts(teacherUid).then((c) => {
            setCohorts(c);
            setLoading(false);
            if (c.length > 0) setActiveCohortId(c[0].id);
        });
    }, [teacherUid]);

    const activeCohort = cohorts.find(c => c.id === activeCohortId) || null;

    const loadRoster = useCallback((cohortId) => {
        setRosterLoading(true);
        getCohortRoster(cohortId).then((r) => { setRoster(r); setRosterLoading(false); });
    }, []);

    useEffect(() => {
        if (!activeCohortId) return;
        loadRoster(activeCohortId);
        const c = cohorts.find(x => x.id === activeCohortId);
        setHomeworkDraft(c?.homework_note || '');
    }, [activeCohortId, cohorts, loadRoster]);

    const saveHomework = async () => {
        if (!activeCohortId) return;
        setSavingHomework(true);
        try {
            await updateCohortHomework(activeCohortId, homeworkDraft.trim());
            setCohorts(prev => prev.map(c => c.id === activeCohortId ? { ...c, homework_note: homeworkDraft.trim() } : c));
        } finally {
            setSavingHomework(false);
        }
    };

    const daysAgo = (iso) => {
        if (!iso) return null;
        const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
        return Math.max(0, d); // clock skew between client/server can read as "the future"
    };

    /* ── Sessions ── */
    const [sessions, setSessions] = useState([]);
    const [newSessionDate, setNewSessionDate] = useState('');
    const [newSessionLink, setNewSessionLink] = useState('');
    const [creatingSession, setCreatingSession] = useState(false);
    const [openSessionId, setOpenSessionId] = useState(null);
    const [attendance, setAttendance] = useState({}); // profileId -> present (bool|null)

    const loadSessions = useCallback((cohortId) => {
        listCohortSessions(cohortId).then(setSessions);
    }, []);

    useEffect(() => {
        if (!activeCohortId) return;
        loadSessions(activeCohortId);
        setOpenSessionId(null);
    }, [activeCohortId, loadSessions]);

    const handleCreateSession = async () => {
        if (!newSessionDate || !activeCohortId) return;
        setCreatingSession(true);
        try {
            await createClassSession(activeCohortId, { sessionDate: newSessionDate, meetingLink: newSessionLink.trim() || null });
            setNewSessionDate(''); setNewSessionLink('');
            loadSessions(activeCohortId);
        } finally {
            setCreatingSession(false);
        }
    };

    const openSession = async (sessionId) => {
        if (openSessionId === sessionId) { setOpenSessionId(null); return; }
        setOpenSessionId(sessionId);
        const rows = await getSessionAttendance(sessionId);
        setAttendance(Object.fromEntries(rows.map(r => [r.profile_id, r.present])));
    };

    const toggleAttendance = async (profileId, present) => {
        setAttendance(prev => ({ ...prev, [profileId]: present }));
        await markAttendance(openSessionId, profileId, present);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: "'Outfit', system-ui, sans-serif" }}>
            {/* Header */}
            <div style={{ backgroundColor: B, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <div>
                    <div style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>🎓 {isFr ? 'Espace Enseignant' : 'Teacher Portal'}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem' }}>{teacherName || ''}</div>
                </div>
                {onLogout && (
                    <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '0.45rem 0.9rem', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '700' }}>
                        🚪 {isFr ? 'Déconnexion' : 'Log out'}
                    </button>
                )}
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Chargement...' : 'Loading...'}</div>
                ) : cohorts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', backgroundColor: '#fff', borderRadius: '16px' }}>
                        {isFr
                            ? 'Aucune cohorte ne vous a encore été assignée. Contactez votre coordinateur.'
                            : 'No cohort assigned to you yet. Contact your coordinator.'}
                    </div>
                ) : (
                    <>
                        {/* Cohort tabs */}
                        {cohorts.length > 1 && (
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                                {cohorts.map(c => (
                                    <button key={c.id} onClick={() => setActiveCohortId(c.id)} style={{
                                        padding: '0.5rem 1rem', borderRadius: '9999px',
                                        border: `2px solid ${activeCohortId === c.id ? B : '#e2e8f0'}`,
                                        backgroundColor: activeCohortId === c.id ? B : '#fff',
                                        color: activeCohortId === c.id ? '#fff' : '#64748b',
                                        fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
                                    }}>{c.name}</button>
                                ))}
                            </div>
                        )}

                        {activeCohort && (
                            <>
                                {/* Cohort header card */}
                                <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                                    <div style={{ fontWeight: '900', fontSize: '1.15rem', color: '#0f172a' }}>{activeCohort.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
                                        {activeCohort.schedule_note || (isFr ? 'Horaire non défini' : 'Schedule not set')}
                                        {activeCohort.level ? ` · ${activeCohort.level}` : ''}
                                    </div>
                                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.85rem' }}>
                                        <div>
                                            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: B }}>{roster.length}</div>
                                            <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>{isFr ? 'Élèves' : 'Students'}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#94a3b8' }}>—</div>
                                            <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>
                                                {isFr ? 'Paiement (non configuré)' : 'Payout (not set up)'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Homework note */}
                                <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                                    <div style={{ fontWeight: '800', fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.6rem' }}>
                                        📝 {isFr ? 'Devoir de la semaine' : 'This week\'s homework'}
                                    </div>
                                    <textarea
                                        value={homeworkDraft}
                                        onChange={e => setHomeworkDraft(e.target.value)}
                                        placeholder={isFr ? 'Ex. Revoir les salutations, pratiquer avec un parent...' : 'e.g. Review greetings, practise with a parent...'}
                                        rows={3}
                                        style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.88rem', resize: 'none', boxSizing: 'border-box', color: '#0f172a' }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.6rem' }}>
                                        <button onClick={saveHomework} disabled={savingHomework} style={{
                                            padding: '0.5rem 1.1rem', borderRadius: '9999px', border: 'none',
                                            backgroundColor: B, color: '#fff', fontWeight: '700', fontSize: '0.85rem',
                                            cursor: savingHomework ? 'default' : 'pointer', fontFamily: 'inherit', opacity: savingHomework ? 0.6 : 1,
                                        }}>{savingHomework ? (isFr ? 'Enregistrement...' : 'Saving...') : (isFr ? 'Enregistrer' : 'Save')}</button>
                                    </div>
                                </div>

                                {/* Sessions */}
                                <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                                    <div style={{ fontWeight: '800', fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                                        📅 {isFr ? 'Séances' : 'Class sessions'}
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr auto', gap: '0.5rem', marginBottom: '1rem' }}>
                                        <input type="date" value={newSessionDate} onChange={e => setNewSessionDate(e.target.value)}
                                            style={{ padding: '0.5rem 0.6rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.82rem' }} />
                                        <input value={newSessionLink} onChange={e => setNewSessionLink(e.target.value)}
                                            placeholder={isFr ? 'Lien (Zoom, Meet...)' : 'Meeting link (Zoom, Meet...)'}
                                            style={{ padding: '0.5rem 0.6rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.82rem' }} />
                                        <button onClick={handleCreateSession} disabled={!newSessionDate || creatingSession} style={{
                                            padding: '0.5rem 1rem', borderRadius: '8px', border: 'none',
                                            backgroundColor: newSessionDate ? B : '#e2e8f0', color: '#fff',
                                            fontWeight: '700', fontSize: '0.82rem', cursor: newSessionDate ? 'pointer' : 'default', fontFamily: 'inherit',
                                        }}>{isFr ? 'Ajouter' : 'Add'}</button>
                                    </div>

                                    {sessions.length === 0 ? (
                                        <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{isFr ? 'Aucune séance planifiée' : 'No sessions scheduled'}</div>
                                    ) : (
                                        sessions.map(s => (
                                            <div key={s.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                                                <div onClick={() => openSession(s.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0', cursor: 'pointer' }}>
                                                    <div>
                                                        <span style={{ fontWeight: '700', fontSize: '0.86rem', color: '#0f172a' }}>
                                                            {new Date(s.session_date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                        </span>
                                                        {s.meeting_link && (
                                                            <a href={s.meeting_link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ marginLeft: '0.6rem', fontSize: '0.78rem', color: B, fontWeight: '700' }}>
                                                                {isFr ? 'Lien' : 'Link'} ↗
                                                            </a>
                                                        )}
                                                    </div>
                                                    <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '700' }}>
                                                        {isFr ? 'Présences' : 'Attendance'} {openSessionId === s.id ? '▾' : '▸'}
                                                    </span>
                                                </div>
                                                {openSessionId === s.id && (
                                                    <div style={{ paddingBottom: '0.75rem' }}>
                                                        {roster.map(r => (
                                                            <div key={r.profileId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.35rem 0.5rem' }}>
                                                                <span style={{ fontSize: '0.82rem', color: '#0f172a' }}>{r.name || '(no name)'}</span>
                                                                <div style={{ display: 'flex', gap: '0.4rem' }}>
                                                                    <button onClick={() => toggleAttendance(r.profileId, true)} style={{
                                                                        padding: '0.25rem 0.6rem', borderRadius: '999px', border: `1.5px solid ${attendance[r.profileId] === true ? '#16a34a' : '#e2e8f0'}`,
                                                                        backgroundColor: attendance[r.profileId] === true ? '#dcfce7' : '#fff', color: '#16a34a', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
                                                                    }}>✓ {isFr ? 'Présent' : 'Present'}</button>
                                                                    <button onClick={() => toggleAttendance(r.profileId, false)} style={{
                                                                        padding: '0.25rem 0.6rem', borderRadius: '999px', border: `1.5px solid ${attendance[r.profileId] === false ? '#dc2626' : '#e2e8f0'}`,
                                                                        backgroundColor: attendance[r.profileId] === false ? '#fee2e2' : '#fff', color: '#dc2626', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
                                                                    }}>✕ {isFr ? 'Absent' : 'Absent'}</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Roster */}
                                <div style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                                    <div style={{ padding: '1rem 1.25rem', fontWeight: '800', fontSize: '0.92rem', color: '#0f172a', borderBottom: '1px solid #f1f5f9' }}>
                                        👥 {isFr ? 'Mes élèves' : 'My students'}
                                    </div>
                                    {rosterLoading ? (
                                        <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>{isFr ? 'Chargement...' : 'Loading...'}</div>
                                    ) : roster.length === 0 ? (
                                        <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>{isFr ? 'Aucun élève' : 'No students yet'}</div>
                                    ) : (
                                        roster.map(r => {
                                            const last = daysAgo(r.lastSeen);
                                            return (
                                                <div key={r.memberId} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.9rem 1.25rem', borderBottom: '1px solid #f8fafc' }}>
                                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: B, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', flexShrink: 0 }}>
                                                        {(r.name || '?').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>{r.name || (isFr ? '(sans nom)' : '(no name)')}</div>
                                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>
                                                            🔥 {r.progress?.streak ?? 0} · ⚡ {r.progress?.xp ?? 0} XP · {(r.progress?.completed_lessons ?? []).length} {isFr ? 'leçons' : 'lessons'}
                                                        </div>
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: last === null ? '#94a3b8' : last <= 2 ? '#16a34a' : '#dc2626', flexShrink: 0 }}>
                                                        {last === null
                                                            ? (isFr ? 'Jamais actif' : 'Never active')
                                                            : last === 0
                                                                ? (isFr ? 'Actif aujourd\'hui' : 'Active today')
                                                                : isFr ? `Actif il y a ${last}j` : `Active ${last}d ago`}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TeacherPortalPage;
