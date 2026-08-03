import { useState, useEffect, useCallback } from 'react';
import { listSubmissions, updateSubmissionStatus, approveToDictionary } from '../services/stewardService';

const B  = '#1B4FD8';
const BG = '#f8fafc';

const STAGES = ['pending', 'ai_review', 'franklin_review', 'ncobnkun_review'];
const STAGE_LABELS = {
    pending:            { fr: 'En attente',         en: 'Pending' },
    ai_review:          { fr: 'Revue IA',           en: 'AI review' },
    franklin_review:    { fr: 'Revue Franklin',     en: 'Franklin review' },
    ncobnkun_review:    { fr: 'Revue Ncobnkùn',     en: 'Ncobnkùn review' },
    approved:           { fr: 'Approuvé',           en: 'Approved' },
    rejected:           { fr: 'Rejeté',             en: 'Rejected' },
};
const STAGE_COLORS = {
    pending: '#94a3b8', ai_review: '#0891b2', franklin_review: '#7c3aed',
    ncobnkun_review: '#d97706', approved: '#16a34a', rejected: '#dc2626',
};

/* ════════════════════════════════════════════════════════════════════
   CulturalStewardPage
   Personas & Journeys v2: "Holds the corpus veto... Needs a console.
   Without one that work happens in WhatsApp threads and stops being
   auditable — the one failure a preservation platform cannot afford."
   word_submissions already models the review pipeline; this is its
   first interface.
════════════════════════════════════════════════════════════════════ */
const CulturalStewardPage = ({ stewardName, nativeLang, onLogout }) => {
    const isFr = nativeLang === 'french';

    const [filter, setFilter] = useState('open'); // 'open' | 'approved' | 'rejected' | 'all'
    const [subs, setSubs]     = useState([]);
    const [loading, setLoading] = useState(true);
    const [openId, setOpenId] = useState(null);
    const [notesDraft, setNotesDraft] = useState('');
    const [busy, setBusy] = useState(false);
    const [actionError, setActionError] = useState('');

    const refresh = useCallback(() => {
        setLoading(true);
        listSubmissions().then(setSubs).finally(() => setLoading(false));
    }, []);
    useEffect(() => { refresh(); }, [refresh]);

    const visible = subs.filter(s => {
        if (filter === 'open') return !['approved', 'rejected'].includes(s.status);
        if (filter === 'approved') return s.status === 'approved';
        if (filter === 'rejected') return s.status === 'rejected';
        return true;
    });

    const openSub = (s) => {
        if (openId === s.id) { setOpenId(null); return; }
        setOpenId(s.id);
        setNotesDraft(s.franklin_notes || '');
        setActionError('');
    };

    const handleAdvance = async (sub) => {
        setBusy(true);
        setActionError('');
        try {
            const idx = STAGES.indexOf(sub.status);
            if (idx === -1 || idx === STAGES.length - 1) {
                await approveToDictionary({ ...sub, franklin_notes: notesDraft });
            } else {
                await updateSubmissionStatus(sub.id, STAGES[idx + 1], notesDraft);
            }
            refresh();
            setOpenId(null);
        } catch (e) {
            setActionError(e.message);
        } finally {
            setBusy(false);
        }
    };

    const handleReject = async (sub) => {
        setBusy(true);
        setActionError('');
        try {
            await updateSubmissionStatus(sub.id, 'rejected', notesDraft);
            refresh();
            setOpenId(null);
        } catch (e) {
            setActionError(e.message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <div style={{ backgroundColor: B, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <div>
                    <div style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>📜 {isFr ? 'Espace Gardien Culturel' : 'Cultural Steward Portal'}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem' }}>{stewardName || ''}</div>
                </div>
                {onLogout && (
                    <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '0.45rem 0.9rem', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '700' }}>
                        🚪 {isFr ? 'Déconnexion' : 'Log out'}
                    </button>
                )}
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                    {['open', 'approved', 'rejected', 'all'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            padding: '0.5rem 1rem', borderRadius: '9999px',
                            border: `2px solid ${filter === f ? B : '#e2e8f0'}`,
                            backgroundColor: filter === f ? B : '#fff',
                            color: filter === f ? '#fff' : '#64748b',
                            fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
                        }}>
                            {f === 'open' ? (isFr ? 'En cours' : 'Open') :
                             f === 'approved' ? (isFr ? 'Approuvés' : 'Approved') :
                             f === 'rejected' ? (isFr ? 'Rejetés' : 'Rejected') : (isFr ? 'Tous' : 'All')}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Chargement...' : 'Loading...'}</div>
                ) : visible.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', backgroundColor: '#fff', borderRadius: '16px' }}>
                        {isFr ? 'Rien à examiner ici pour l\'instant.' : 'Nothing to review here right now.'}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {visible.map(s => {
                            const color = STAGE_COLORS[s.status] || '#94a3b8';
                            const isOpen = openId === s.id;
                            const isTerminal = ['approved', 'rejected'].includes(s.status);
                            return (
                                <div key={s.id} style={{ backgroundColor: '#fff', borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                                    <div onClick={() => openSub(s)} style={{ padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0f172a' }}>
                                                {s.word_fr} {s.word_medumba ? `→ ${s.word_medumba}` : ''}
                                            </div>
                                            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                                {s.domain || 'general'}{s.word_en ? ` · ${s.word_en}` : ''}
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '0.72rem', fontWeight: '800', padding: '0.25rem 0.7rem', borderRadius: '9999px', backgroundColor: `${color}22`, color }}>
                                            {STAGE_LABELS[s.status]?.[isFr ? 'fr' : 'en'] || s.status}
                                        </span>
                                    </div>
                                    {isOpen && (
                                        <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', margin: '0.85rem 0' }}>
                                                <div><b>{isFr ? 'Français' : 'French'}:</b> {s.word_fr}</div>
                                                <div><b>Medumba:</b> {s.word_medumba || '—'}</div>
                                                <div><b>English:</b> {s.word_en || '—'}</div>
                                                <div><b>{isFr ? 'Tons' : 'Tone marks'}:</b> {s.tone_marks || '—'}</div>
                                                <div style={{ gridColumn: '1 / -1' }}><b>{isFr ? 'Définition (FR)' : 'Definition (FR)'}:</b> {s.definition_fr || '—'}</div>
                                                <div style={{ gridColumn: '1 / -1' }}><b>{isFr ? 'Définition (EN)' : 'Definition (EN)'}:</b> {s.definition_en || '—'}</div>
                                                {s.audio_url && (
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <audio controls src={s.audio_url} style={{ width: '100%', height: '32px' }} />
                                                    </div>
                                                )}
                                            </div>
                                            {!isTerminal && (
                                                <>
                                                    <textarea
                                                        value={notesDraft} onChange={e => setNotesDraft(e.target.value)}
                                                        placeholder={isFr ? 'Notes (raison du rejet, correction de ton, etc.)' : 'Notes (rejection reason, tone correction, etc.)'}
                                                        rows={2}
                                                        style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.85rem', resize: 'none', boxSizing: 'border-box', marginBottom: '0.6rem' }}
                                                    />
                                                    {actionError && <div style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: '600', marginBottom: '0.6rem' }}>{actionError}</div>}
                                                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                                                        <button onClick={() => handleReject(s)} disabled={busy} style={{ flex: 1, padding: '0.55rem', borderRadius: '10px', border: '1.5px solid #fecaca', backgroundColor: '#fee2e2', color: '#dc2626', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                            {isFr ? 'Rejeter' : 'Reject'}
                                                        </button>
                                                        <button onClick={() => handleAdvance(s)} disabled={busy} style={{ flex: 2, padding: '0.55rem', borderRadius: '10px', border: 'none', backgroundColor: B, color: '#fff', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                            {s.status === STAGES[STAGES.length - 1]
                                                                ? (isFr ? '✅ Approuver dans le dictionnaire' : '✅ Approve into dictionary')
                                                                : (isFr ? 'Faire avancer →' : 'Advance →')}
                                                        </button>
                                                    </div>
                                                </>
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

export default CulturalStewardPage;
