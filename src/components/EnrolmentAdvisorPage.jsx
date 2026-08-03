import { useState, useEffect, useCallback } from 'react';
import {
    listLeads, listCohortsForTrial, createLead, bookTrial,
    recordTrialOutcome, markEnrolled, markLost, updateLeadNotes, computeAdvisorMetrics,
} from '../services/advisorService';

const B  = '#1B4FD8';
const BG = '#f8fafc';

const STATUS_LABELS = {
    new:             { fr: 'Nouveau',            en: 'New' },
    trial_booked:    { fr: 'Essai réservé',      en: 'Trial booked' },
    trial_attended:  { fr: 'Essai suivi',        en: 'Trial attended' },
    enrolled:        { fr: 'Inscrit ✅',         en: 'Enrolled ✅' },
    lost:            { fr: 'Perdu',              en: 'Lost' },
};
const STATUS_COLORS = {
    new: '#94a3b8', trial_booked: '#0891b2', trial_attended: '#7c3aed',
    enrolled: '#16a34a', lost: '#dc2626',
};

/* ════════════════════════════════════════════════════════════════════
   EnrolmentAdvisorPage
   Personas & Journeys v2: Mireille "owns lead sources, campaigns, the
   trial booking, the enrolment call, the sale, the first payment...
   measured on trials booked and trial-to-paid conversion — never on
   calls made." The metrics strip below deliberately has no call count.
════════════════════════════════════════════════════════════════════ */
const EnrolmentAdvisorPage = ({ advisorUid, advisorName, nativeLang, onLogout }) => {
    const isFr = nativeLang === 'french';

    const [filter, setFilter] = useState('active'); // active | enrolled | lost | all
    const [leads, setLeads] = useState([]);
    const [cohorts, setCohorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openId, setOpenId] = useState(null);
    const [notesDraft, setNotesDraft] = useState('');
    const [busy, setBusy] = useState(false);
    const [actionError, setActionError] = useState('');

    const [showNewLead, setShowNewLead] = useState(false);
    const [newName, setNewName] = useState('');
    const [newContact, setNewContact] = useState('');
    const [newSource, setNewSource] = useState('');

    const [trialCohortId, setTrialCohortId] = useState('');
    const [trialDate, setTrialDate] = useState('');

    const refresh = useCallback(() => {
        setLoading(true);
        Promise.all([listLeads(), listCohortsForTrial()])
            .then(([l, c]) => { setLeads(l); setCohorts(c); })
            .finally(() => setLoading(false));
    }, []);
    useEffect(() => { refresh(); }, [refresh]);

    const metrics = computeAdvisorMetrics(leads);

    const visible = leads.filter(l => {
        if (filter === 'active') return !['enrolled', 'lost'].includes(l.status);
        if (filter === 'enrolled') return l.status === 'enrolled';
        if (filter === 'lost') return l.status === 'lost';
        return true;
    });

    const openLead = (l) => {
        if (openId === l.id) { setOpenId(null); return; }
        setOpenId(l.id);
        setNotesDraft(l.notes || '');
        setTrialCohortId(l.trial_cohort_id || '');
        setTrialDate(l.trial_scheduled_at ? l.trial_scheduled_at.slice(0, 16) : '');
        setActionError('');
    };

    const withBusy = async (fn) => {
        setBusy(true);
        setActionError('');
        try { await fn(); refresh(); setOpenId(null); }
        catch (e) { setActionError(e.message); }
        finally { setBusy(false); }
    };

    const handleCreateLead = () => withBusy(async () => {
        if (!newName.trim()) return;
        await createLead({ name: newName.trim(), contact: newContact.trim(), source: newSource.trim(), advisorId: advisorUid });
        setNewName(''); setNewContact(''); setNewSource(''); setShowNewLead(false);
    });

    const handleBookTrial = (lead) => withBusy(async () => {
        await bookTrial(lead.id, { cohortId: trialCohortId || null, scheduledAt: trialDate ? new Date(trialDate).toISOString() : null });
        if (notesDraft !== (lead.notes || '')) await updateLeadNotes(lead.id, notesDraft);
    });

    const handleTrialOutcome = (lead, attended) => withBusy(() => recordTrialOutcome(lead.id, attended));
    const handleEnroll = (lead) => withBusy(() => markEnrolled(lead.id));
    const handleLost = (lead) => withBusy(() => markLost(lead.id, notesDraft));
    const handleSaveNotes = (lead) => withBusy(() => updateLeadNotes(lead.id, notesDraft));

    return (
        <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <div style={{ backgroundColor: B, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <div>
                    <div style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>📞 {isFr ? 'Espace Conseillère Inscription' : 'Enrolment Advisor Console'}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem' }}>{advisorName || ''}</div>
                </div>
                {onLogout && (
                    <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '0.45rem 0.9rem', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '700' }}>
                        🚪 {isFr ? 'Déconnexion' : 'Log out'}
                    </button>
                )}
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem' }}>
                {/* Metrics: trials booked + conversion only — no call count, by design */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a' }}>{metrics.trialsBooked}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>{isFr ? 'Essais réservés' : 'Trials booked'}</div>
                    </div>
                    <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a' }}>{metrics.enrolled}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>{isFr ? 'Inscrits' : 'Enrolled'}</div>
                    </div>
                    <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a' }}>{metrics.conversionRate !== null ? `${metrics.conversionRate}%` : '—'}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>{isFr ? 'Essai → payant' : 'Trial → paid'}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {['active', 'enrolled', 'lost', 'all'].map(f => (
                            <button key={f} onClick={() => setFilter(f)} style={{
                                padding: '0.5rem 1rem', borderRadius: '9999px',
                                border: `2px solid ${filter === f ? B : '#e2e8f0'}`,
                                backgroundColor: filter === f ? B : '#fff',
                                color: filter === f ? '#fff' : '#64748b',
                                fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
                            }}>
                                {f === 'active' ? (isFr ? 'Actifs' : 'Active') :
                                 f === 'enrolled' ? (isFr ? 'Inscrits' : 'Enrolled') :
                                 f === 'lost' ? (isFr ? 'Perdus' : 'Lost') : (isFr ? 'Tous' : 'All')}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setShowNewLead(v => !v)} style={{ padding: '0.5rem 1rem', borderRadius: '9999px', border: 'none', backgroundColor: B, color: '#fff', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                        + {isFr ? 'Nouveau prospect' : 'New lead'}
                    </button>
                </div>

                {showNewLead && (
                    <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder={isFr ? 'Nom de la famille *' : 'Family name *'}
                            style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.88rem' }} />
                        <input value={newContact} onChange={e => setNewContact(e.target.value)} placeholder={isFr ? 'Contact (WhatsApp, téléphone, email)' : 'Contact (WhatsApp, phone, email)'}
                            style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.88rem' }} />
                        <input value={newSource} onChange={e => setNewSource(e.target.value)} placeholder={isFr ? 'Source (campagne, bouche-à-oreille...)' : 'Source (campaign, word of mouth...)'}
                            style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.88rem' }} />
                        {actionError && <div style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: '600' }}>{actionError}</div>}
                        <button onClick={handleCreateLead} disabled={!newName.trim() || busy} style={{ padding: '0.6rem', borderRadius: '10px', border: 'none', backgroundColor: newName.trim() ? B : '#e2e8f0', color: '#fff', fontWeight: '700', cursor: newName.trim() ? 'pointer' : 'default', fontFamily: 'inherit', fontSize: '0.88rem' }}>
                            {isFr ? 'Ajouter le prospect' : 'Add lead'}
                        </button>
                    </div>
                )}

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Chargement...' : 'Loading...'}</div>
                ) : visible.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', backgroundColor: '#fff', borderRadius: '16px' }}>
                        {isFr ? 'Aucun prospect ici pour l\'instant.' : 'No leads here right now.'}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {visible.map(l => {
                            const color = STATUS_COLORS[l.status] || '#94a3b8';
                            const isOpen = openId === l.id;
                            const isTerminal = ['enrolled', 'lost'].includes(l.status);
                            const cohort = cohorts.find(c => c.id === l.trial_cohort_id);
                            return (
                                <div key={l.id} style={{ backgroundColor: '#fff', borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                                    <div onClick={() => openLead(l)} style={{ padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0f172a' }}>{l.name}</div>
                                            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                                {l.source || (isFr ? 'source inconnue' : 'unknown source')}{l.contact ? ` · ${l.contact}` : ''}
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '0.72rem', fontWeight: '800', padding: '0.25rem 0.7rem', borderRadius: '9999px', backgroundColor: `${color}22`, color }}>
                                            {STATUS_LABELS[l.status]?.[isFr ? 'fr' : 'en'] || l.status}
                                        </span>
                                    </div>
                                    {isOpen && (
                                        <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid #f1f5f9' }}>
                                            <div style={{ margin: '0.85rem 0', fontSize: '0.85rem', color: '#334155' }}>
                                                {l.trial_scheduled_at && (
                                                    <div><b>{isFr ? 'Essai prévu' : 'Trial scheduled'}:</b> {new Date(l.trial_scheduled_at).toLocaleString()} {cohort ? `· ${cohort.name}` : ''}</div>
                                                )}
                                                {l.enrolled_at && <div><b>{isFr ? 'Inscrit le' : 'Enrolled on'}:</b> {new Date(l.enrolled_at).toLocaleDateString()}</div>}
                                                {l.lost_reason && <div><b>{isFr ? 'Raison' : 'Reason'}:</b> {l.lost_reason}</div>}
                                            </div>

                                            {l.status === 'new' && (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                                    <select value={trialCohortId} onChange={e => setTrialCohortId(e.target.value)}
                                                        style={{ padding: '0.55rem 0.7rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                        <option value="">{isFr ? 'Cohorte (optionnel)' : 'Cohort (optional)'}</option>
                                                        {cohorts.map(c => <option key={c.id} value={c.id}>{c.name}{c.schedule_note ? ` — ${c.schedule_note}` : ''}</option>)}
                                                    </select>
                                                    <input type="datetime-local" value={trialDate} onChange={e => setTrialDate(e.target.value)}
                                                        style={{ padding: '0.55rem 0.7rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.85rem' }} />
                                                </div>
                                            )}

                                            <textarea
                                                value={notesDraft} onChange={e => setNotesDraft(e.target.value)}
                                                placeholder={isFr ? 'Notes (objections, disponibilités, contexte...)' : 'Notes (objections, availability, context...)'}
                                                rows={2}
                                                style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.85rem', resize: 'none', boxSizing: 'border-box', marginBottom: '0.6rem' }}
                                            />
                                            {actionError && <div style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: '600', marginBottom: '0.6rem' }}>{actionError}</div>}

                                            {!isTerminal ? (
                                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                    {l.status === 'new' && (
                                                        <button onClick={() => handleBookTrial(l)} disabled={busy} style={{ flex: 1, padding: '0.55rem', borderRadius: '10px', border: 'none', backgroundColor: B, color: '#fff', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                            {isFr ? 'Réserver l\'essai' : 'Book trial'}
                                                        </button>
                                                    )}
                                                    {l.status === 'trial_booked' && (
                                                        <>
                                                            <button onClick={() => handleTrialOutcome(l, true)} disabled={busy} style={{ flex: 1, padding: '0.55rem', borderRadius: '10px', border: 'none', backgroundColor: B, color: '#fff', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                                {isFr ? 'A assisté' : 'Attended'}
                                                            </button>
                                                            <button onClick={() => handleTrialOutcome(l, false)} disabled={busy} style={{ flex: 1, padding: '0.55rem', borderRadius: '10px', border: '1.5px solid #fecaca', backgroundColor: '#fee2e2', color: '#dc2626', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                                {isFr ? 'Absent' : 'No-show'}
                                                            </button>
                                                        </>
                                                    )}
                                                    {l.status === 'trial_attended' && (
                                                        <button onClick={() => handleEnroll(l)} disabled={busy} style={{ flex: 2, padding: '0.55rem', borderRadius: '10px', border: 'none', backgroundColor: '#16a34a', color: '#fff', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                            {isFr ? '✅ Marquer inscrit (payé)' : '✅ Mark enrolled (paid)'}
                                                        </button>
                                                    )}
                                                    <button onClick={() => handleLost(l)} disabled={busy} style={{ padding: '0.55rem 0.9rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                        {isFr ? 'Perdu' : 'Lost'}
                                                    </button>
                                                    <button onClick={() => handleSaveNotes(l)} disabled={busy} style={{ padding: '0.55rem 0.9rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                        {isFr ? 'Notes' : 'Notes'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <button onClick={() => handleSaveNotes(l)} disabled={busy} style={{ padding: '0.55rem 0.9rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                    {isFr ? 'Enregistrer les notes' : 'Save notes'}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnrolmentAdvisorPage;
