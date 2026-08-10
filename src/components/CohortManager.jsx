import { useState, useEffect, useCallback } from 'react';
import {
    getAllUsers, setUserRole, listCohorts, createCohort,
    getCohortMembers, addCohortMember, removeCohortMember,
} from '../services/adminService';
import {
    listCohortSessions, createClassSession, getSessionAttendance, markAttendance, getPunctualityStats,
} from '../services/teacherService';

const B  = '#1B4FD8';

/* ════════════════════════════════════════════════════════════════════
   CohortManager — full cohort/roster/session/attendance management.
   Shared by AdminPage (Cohorts tab) and CoordinatorPortalPage, since both
   roles have the same reach here (migration 018): create cohorts, assign
   teachers, manage rosters, schedule sessions, mark attendance.
════════════════════════════════════════════════════════════════════ */
const CohortManager = ({ isFr }) => {
    const [users, setUsers]     = useState([]);
    const [cohorts, setCohorts] = useState([]);
    const [cohortsLoading, setCohortsLoading] = useState(true);
    const [newCohortName, setNewCohortName]   = useState('');
    const [newCohortTeacher, setNewCohortTeacher] = useState('');
    const [newCohortSchedule, setNewCohortSchedule] = useState('');
    const [cohortError, setCohortError] = useState('');
    const [openCohortId, setOpenCohortId] = useState(null);
    const [cohortMembers, setCohortMembers] = useState([]);
    const [addMemberSearch, setAddMemberSearch] = useState('');

    /* ── Sessions & attendance for whichever cohort is open ── */
    const [sessions, setSessions] = useState([]);
    const [newSessionDate, setNewSessionDate] = useState('');
    const [newSessionLink, setNewSessionLink] = useState('');
    const [creatingSession, setCreatingSession] = useState(false);
    const [openSessionId, setOpenSessionId] = useState(null);
    const [attendance, setAttendance] = useState({});

    const teachers = users.filter(u => u.role === 'teacher');

    useEffect(() => { getAllUsers().then(setUsers); }, []);

    const refreshCohorts = useCallback(() => {
        setCohortsLoading(true);
        listCohorts().then(setCohorts).finally(() => setCohortsLoading(false));
    }, []);
    useEffect(() => { refreshCohorts(); }, [refreshCohorts]);

    /* ── Punctuality flag per teacher — the reliability signal that drives
       whether she can hold more cohorts (Personas & Journeys v2). One fetch
       per distinct teacher across all cohorts, not per cohort. ── */
    const [teacherPunctuality, setTeacherPunctuality] = useState({}); // teacherId -> stats
    useEffect(() => {
        const teacherIds = [...new Set(cohorts.map(c => c.teacher_id).filter(Boolean))];
        teacherIds.forEach(id => {
            if (teacherPunctuality[id]) return;
            getPunctualityStats(id).then(stats => setTeacherPunctuality(prev => ({ ...prev, [id]: stats })));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cohorts]);

    const handleSetRole = async (uid, role) => {
        setUsers(prev => prev.map(u => u.uid === uid ? { ...u, role } : u));
        try { await setUserRole(uid, role); } catch { /* surfaced elsewhere */ }
    };

    const handleCreateCohort = async () => {
        if (!newCohortName.trim()) return;
        setCohortError('');
        try {
            await createCohort({
                teacherId: newCohortTeacher || null,
                name: newCohortName.trim(),
                scheduleNote: newCohortSchedule.trim() || null,
            });
            setNewCohortName(''); setNewCohortTeacher(''); setNewCohortSchedule('');
            refreshCohorts();
        } catch (e) { setCohortError(e.message); }
    };

    const openCohort = async (cohortId) => {
        if (openCohortId === cohortId) { setOpenCohortId(null); return; }
        setOpenCohortId(cohortId);
        setOpenSessionId(null);
        setCohortMembers(await getCohortMembers(cohortId));
        setSessions(await listCohortSessions(cohortId));
    };

    const handleAddMember = async (profileId) => {
        await addCohortMember(openCohortId, profileId);
        setCohortMembers(await getCohortMembers(openCohortId));
        refreshCohorts();
        setAddMemberSearch('');
    };

    const handleRemoveMember = async (memberRowId) => {
        await removeCohortMember(memberRowId);
        setCohortMembers(await getCohortMembers(openCohortId));
        refreshCohorts();
    };

    const handleCreateSession = async () => {
        if (!newSessionDate || !openCohortId) return;
        setCreatingSession(true);
        try {
            await createClassSession(openCohortId, { sessionDate: newSessionDate, meetingLink: newSessionLink.trim() || null });
            setNewSessionDate(''); setNewSessionLink('');
            setSessions(await listCohortSessions(openCohortId));
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
        <div>
            {/* New cohort form */}
            <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: '800', fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                    {isFr ? '+ Nouvelle cohorte' : '+ New cohort'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr auto', gap: '0.6rem', alignItems: 'center' }}>
                    <input value={newCohortName} onChange={e => setNewCohortName(e.target.value)}
                        placeholder={isFr ? 'Nom (ex. Cohorte A)' : 'Name (e.g. Cohort A)'}
                        style={{ padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.85rem' }} />
                    <select value={newCohortTeacher} onChange={e => setNewCohortTeacher(e.target.value)}
                        style={{ padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                        <option value="">{isFr ? '— Enseignant —' : '— Teacher —'}</option>
                        {teachers.map(t => <option key={t.uid} value={t.uid}>{t.name || t.email}</option>)}
                    </select>
                    <input value={newCohortSchedule} onChange={e => setNewCohortSchedule(e.target.value)}
                        placeholder={isFr ? 'Horaire (ex. Samedi 10h)' : 'Schedule (e.g. Saturdays 10am)'}
                        style={{ padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.85rem' }} />
                    <button onClick={handleCreateCohort} disabled={!newCohortName.trim()} style={{
                        padding: '0.55rem 1rem', borderRadius: '8px', border: 'none',
                        backgroundColor: newCohortName.trim() ? B : '#e2e8f0', color: '#fff',
                        fontWeight: '700', fontSize: '0.85rem', cursor: newCohortName.trim() ? 'pointer' : 'default', fontFamily: 'inherit',
                    }}>{isFr ? 'Créer' : 'Create'}</button>
                </div>
                {teachers.length === 0 && (
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.6rem' }}>
                        {isFr
                            ? 'Aucun enseignant pour l\'instant — donnez le rôle "teacher" à un utilisateur ci-dessous.'
                            : 'No teachers yet — grant a user the "teacher" role below.'}
                    </div>
                )}
                {cohortError && <div style={{ fontSize: '0.8rem', color: '#dc2626', marginTop: '0.5rem', fontWeight: '600' }}>{cohortError}</div>}
            </div>

            {/* Cohort list */}
            {cohortsLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Chargement...' : 'Loading...'}</div>
            ) : cohorts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Aucune cohorte' : 'No cohorts yet'}</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                    {cohorts.map(c => (
                        <div key={c.id} style={{ backgroundColor: '#fff', borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                            <div onClick={() => openCohort(c.id)} style={{ padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: '800', fontSize: '0.92rem', color: '#0f172a' }}>{c.name}</div>
                                    <div style={{ fontSize: '0.78rem', color: c.teacherName ? '#64748b' : '#d97706', fontWeight: c.teacherName ? '400' : '700' }}>
                                        {c.teacherName || (isFr ? '⚠ Aucun enseignant assigné' : '⚠ No teacher assigned')}
                                        {c.schedule_note ? ` · ${c.schedule_note}` : ''}
                                        {c.teacher_id && teacherPunctuality[c.teacher_id]?.sessionsStarted > 0 && (
                                            <span style={{
                                                marginLeft: '0.5rem', fontWeight: '700',
                                                color: teacherPunctuality[c.teacher_id].avgLateMinutes <= 2 ? '#16a34a' : teacherPunctuality[c.teacher_id].avgLateMinutes <= 10 ? '#d97706' : '#dc2626',
                                            }}>
                                                · {isFr ? `${teacherPunctuality[c.teacher_id].avgLateMinutes} min retard moy.` : `avg ${teacherPunctuality[c.teacher_id].avgLateMinutes} min late`}
                                                {teacherPunctuality[c.teacher_id].sessionsMissed > 0 && ` · ${teacherPunctuality[c.teacher_id].sessionsMissed} ${isFr ? 'manquée(s)' : 'missed'}`}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: B }}>
                                    {c.memberCount} {isFr ? 'élève(s)' : 'student(s)'}
                                </div>
                            </div>
                            {openCohortId === c.id && (
                                <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid #f1f5f9' }}>
                                    {/* Roster */}
                                    <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748b', margin: '0.85rem 0 0.5rem' }}>
                                        {isFr ? 'Élèves' : 'Roster'}
                                    </div>
                                    {cohortMembers.length === 0 && (
                                        <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{isFr ? 'Aucun élève' : 'No students yet'}</div>
                                    )}
                                    {cohortMembers.map(m => (
                                        <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f8fafc' }}>
                                            <span style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: '600' }}>{m.name || m.email || m.profileId.slice(0, 8)}</span>
                                            <button onClick={() => handleRemoveMember(m.id)} style={{ border: 'none', background: 'none', color: '#dc2626', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>{isFr ? 'Retirer' : 'Remove'}</button>
                                        </div>
                                    ))}
                                    <div style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
                                        <input
                                            value={addMemberSearch} onChange={e => setAddMemberSearch(e.target.value)}
                                            placeholder={isFr ? 'Chercher un élève par nom/email...' : 'Search a student by name/email...'}
                                            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.82rem', boxSizing: 'border-box' }}
                                        />
                                        {addMemberSearch.trim() && (
                                            <div style={{ marginTop: '0.4rem', maxHeight: '160px', overflowY: 'auto', border: '1px solid #f1f5f9', borderRadius: '8px' }}>
                                                {users
                                                    .filter(u =>
                                                        !cohortMembers.some(m => m.profileId === u.uid) &&
                                                        ((u.name || '').toLowerCase().includes(addMemberSearch.toLowerCase()) ||
                                                         (u.email || '').toLowerCase().includes(addMemberSearch.toLowerCase())))
                                                    .slice(0, 8)
                                                    .map(u => (
                                                        <div key={u.uid} onClick={() => handleAddMember(u.uid)} style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.82rem', borderBottom: '1px solid #f8fafc' }}>
                                                            {u.name || '(no name)'} <span style={{ color: '#94a3b8' }}>{u.email}</span>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Sessions */}
                                    <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748b', margin: '0.85rem 0 0.5rem' }}>
                                        📅 {isFr ? 'Séances' : 'Sessions'}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr auto', gap: '0.5rem', marginBottom: '0.75rem' }}>
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
                                                <div onClick={() => openSession(s.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0', cursor: 'pointer' }}>
                                                    <div>
                                                        <span style={{ fontWeight: '700', fontSize: '0.84rem', color: '#0f172a' }}>
                                                            {new Date(s.session_date).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                        </span>
                                                        {s.meeting_link && (
                                                            <a href={s.meeting_link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ marginLeft: '0.6rem', fontSize: '0.76rem', color: B, fontWeight: '700' }}>
                                                                {isFr ? 'Lien' : 'Link'} ↗
                                                            </a>
                                                        )}
                                                    </div>
                                                    <span style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: '700' }}>
                                                        {isFr ? 'Présences' : 'Attendance'} {openSessionId === s.id ? '▾' : '▸'}
                                                    </span>
                                                </div>
                                                {openSessionId === s.id && (
                                                    <div style={{ paddingBottom: '0.6rem' }}>
                                                        {cohortMembers.map(m => (
                                                            <div key={m.profileId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.3rem 0.5rem' }}>
                                                                <span style={{ fontSize: '0.8rem', color: '#0f172a' }}>{m.name || '(no name)'}</span>
                                                                <div style={{ display: 'flex', gap: '0.4rem' }}>
                                                                    <button onClick={() => toggleAttendance(m.profileId, true)} style={{
                                                                        padding: '0.22rem 0.55rem', borderRadius: '999px', border: `1.5px solid ${attendance[m.profileId] === true ? '#16a34a' : '#e2e8f0'}`,
                                                                        backgroundColor: attendance[m.profileId] === true ? '#dcfce7' : '#fff', color: '#16a34a', fontSize: '0.72rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
                                                                    }}>✓</button>
                                                                    <button onClick={() => toggleAttendance(m.profileId, false)} style={{
                                                                        padding: '0.22rem 0.55rem', borderRadius: '999px', border: `1.5px solid ${attendance[m.profileId] === false ? '#dc2626' : '#e2e8f0'}`,
                                                                        backgroundColor: attendance[m.profileId] === false ? '#fee2e2' : '#fff', color: '#dc2626', fontSize: '0.72rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
                                                                    }}>✕</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Quick role grant — needed to create teachers to assign, without
                switching to a separate Users screen (Coordinator has none). */}
            <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: '800', fontSize: '0.92rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                    {isFr ? 'Rôles' : 'Roles'}
                </div>
                <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
                    {users.map(u => (
                        <div key={u.uid} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #f8fafc' }}>
                            <span style={{ fontSize: '0.82rem', color: '#0f172a' }}>{u.name || '(no name)'} <span style={{ color: '#94a3b8' }}>{u.email}</span></span>
                            <select value={u.role || 'child'} onChange={e => handleSetRole(u.uid, e.target.value)} style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.78rem' }}>
                                <option value="child">child</option>
                                <option value="parent">parent</option>
                                <option value="teacher">teacher</option>
                                <option value="coordinator">coordinator</option>
                                <option value="content_owner">content_owner</option>
                                <option value="content_creator">content_creator</option>
                                <option value="advisor">advisor</option>
                                <option value="bizmgr">bizmgr</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CohortManager;
