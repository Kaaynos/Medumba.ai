import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../config/supabase';
import {
    listSubmissions, updateSubmissionStatus, approveToDictionary,
    listOpenQuestions, linkQuestionToExistingEntry, answerQuestionWithNewEntry, declineQuestion,
} from '../services/stewardService';
import AudioRecorder from './AudioRecorder';

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

const Q_LABELS = {
    pending:  { fr: 'En attente',  en: 'Pending' },
    answered: { fr: 'Répondue',    en: 'Answered' },
    declined: { fr: 'Refusée',     en: 'Declined' },
};
const Q_COLORS = { pending: '#94a3b8', answered: '#16a34a', declined: '#dc2626' };

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

    const [section, setSection] = useState('submissions'); // 'submissions' | 'questions'

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

    /* ── Ask-an-elder loop — the same console, a second intake path ── */
    const [qFilter, setQFilter] = useState('pending'); // 'pending' | 'answered' | 'declined' | 'all'
    const [questions, setQuestions] = useState([]);
    const [qLoading, setQLoading] = useState(true);
    const [openQId, setOpenQId] = useState(null);
    const [qError, setQError] = useState('');
    const [qBusy, setQBusy] = useState(false);

    const [existingSearch, setExistingSearch] = useState('');
    const [existingResults, setExistingResults] = useState([]);
    const [newHeadword, setNewHeadword] = useState('');
    const [newGlossFr, setNewGlossFr] = useState('');
    const [newGlossEn, setNewGlossEn] = useState('');
    const [newAudioBlob, setNewAudioBlob] = useState(null);

    const refreshQuestions = useCallback(() => {
        setQLoading(true);
        listOpenQuestions().then(setQuestions).finally(() => setQLoading(false));
    }, []);
    useEffect(() => { if (section === 'questions') refreshQuestions(); }, [section, refreshQuestions]);

    const visibleQuestions = questions.filter(q => qFilter === 'all' ? true : q.status === qFilter);

    const openQuestion = (q) => {
        if (openQId === q.id) { setOpenQId(null); return; }
        setOpenQId(q.id);
        setQError('');
        setExistingSearch(''); setExistingResults([]);
        setNewHeadword(q.term_asked || ''); setNewGlossFr(''); setNewGlossEn(''); setNewAudioBlob(null);
    };

    useEffect(() => {
        if (!existingSearch.trim()) { setExistingResults([]); return; }
        const t = setTimeout(async () => {
            const { data } = await supabase.from('corpus_entry').select('id, headword, gloss_fr, gloss_en')
                .or(`headword.ilike.%${existingSearch}%,gloss_fr.ilike.%${existingSearch}%,gloss_en.ilike.%${existingSearch}%`)
                .limit(8);
            setExistingResults(data || []);
        }, 300);
        return () => clearTimeout(t);
    }, [existingSearch]);

    const handleLinkExisting = async (questionId, corpusEntryId) => {
        setQBusy(true); setQError('');
        try { await linkQuestionToExistingEntry(questionId, corpusEntryId); refreshQuestions(); setOpenQId(null); }
        catch (e) { setQError(e.message); }
        finally { setQBusy(false); }
    };

    const handleAnswerNew = async (questionId) => {
        if (!newHeadword.trim()) return;
        setQBusy(true); setQError('');
        try {
            await answerQuestionWithNewEntry(questionId, { headword: newHeadword.trim(), glossFr: newGlossFr.trim(), glossEn: newGlossEn.trim() }, newAudioBlob);
            refreshQuestions(); setOpenQId(null);
        } catch (e) { setQError(e.message); }
        finally { setQBusy(false); }
    };

    const handleDecline = async (questionId) => {
        setQBusy(true); setQError('');
        try { await declineQuestion(questionId); refreshQuestions(); setOpenQId(null); }
        catch (e) { setQError(e.message); }
        finally { setQBusy(false); }
    };

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
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {['submissions', 'questions'].map(s => (
                        <button key={s} onClick={() => setSection(s)} style={{
                            flex: 1, padding: '0.7rem', borderRadius: '12px',
                            border: `2px solid ${section === s ? B : '#e2e8f0'}`,
                            backgroundColor: section === s ? B : '#fff',
                            color: section === s ? '#fff' : '#64748b',
                            fontWeight: '800', fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit',
                        }}>
                            {s === 'submissions'
                                ? `📝 ${isFr ? 'Soumissions' : 'Submissions'}`
                                : `🗣️ ${isFr ? 'Questions (demande à un ancien)' : 'Questions (ask an elder)'}`}
                        </button>
                    ))}
                </div>

                {section === 'submissions' && (
                <>
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
                </>
                )}

                {section === 'questions' && (
                <>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                    {['pending', 'answered', 'declined', 'all'].map(f => (
                        <button key={f} onClick={() => setQFilter(f)} style={{
                            padding: '0.5rem 1rem', borderRadius: '9999px',
                            border: `2px solid ${qFilter === f ? B : '#e2e8f0'}`,
                            backgroundColor: qFilter === f ? B : '#fff',
                            color: qFilter === f ? '#fff' : '#64748b',
                            fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
                        }}>
                            {Q_LABELS[f]?.[isFr ? 'fr' : 'en'] || (isFr ? 'Toutes' : 'All')}
                        </button>
                    ))}
                </div>

                {qLoading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Chargement...' : 'Loading...'}</div>
                ) : visibleQuestions.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', backgroundColor: '#fff', borderRadius: '16px' }}>
                        {isFr ? 'Rien ici pour l\'instant.' : 'Nothing here right now.'}
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {visibleQuestions.map(q => {
                            const color = Q_COLORS[q.status] || '#94a3b8';
                            const isOpen = openQId === q.id;
                            const isTerminal = q.status !== 'pending';
                            return (
                                <div key={q.id} style={{ backgroundColor: '#fff', borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                                    <div onClick={() => openQuestion(q)} style={{ padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0f172a' }}>{q.term_asked}</div>
                                            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{new Date(q.created_at).toLocaleDateString()}</div>
                                        </div>
                                        <span style={{ fontSize: '0.72rem', fontWeight: '800', padding: '0.25rem 0.7rem', borderRadius: '9999px', backgroundColor: `${color}22`, color }}>
                                            {Q_LABELS[q.status]?.[isFr ? 'fr' : 'en'] || q.status}
                                        </span>
                                    </div>
                                    {isOpen && !isTerminal && (
                                        <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid #f1f5f9' }}>
                                            <div style={{ margin: '0.85rem 0', fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>
                                                {isFr ? 'Option 1 — ce mot existe déjà dans le corpus' : 'Option 1 — this word already exists in the corpus'}
                                            </div>
                                            <input
                                                value={existingSearch} onChange={e => setExistingSearch(e.target.value)}
                                                placeholder={isFr ? 'Chercher un mot existant...' : 'Search an existing word...'}
                                                style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.85rem', boxSizing: 'border-box', marginBottom: '0.5rem' }}
                                            />
                                            {existingResults.length > 0 && (
                                                <div style={{ marginBottom: '1rem', border: '1px solid #f1f5f9', borderRadius: '8px', maxHeight: '160px', overflowY: 'auto' }}>
                                                    {existingResults.map(r => (
                                                        <div key={r.id} onClick={() => handleLinkExisting(q.id, r.id)} style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.82rem', borderBottom: '1px solid #f8fafc' }}>
                                                            <b>{r.headword}</b> — {r.gloss_fr} / {r.gloss_en}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div style={{ margin: '0.85rem 0', fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>
                                                {isFr ? 'Option 2 — ajouter cette réponse au corpus' : 'Option 2 — add this answer to the corpus'}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                                <input value={newHeadword} onChange={e => setNewHeadword(e.target.value)}
                                                    placeholder={isFr ? 'Mot en Medumba *' : 'Word in Medumba *'}
                                                    style={{ padding: '0.55rem 0.75rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.85rem' }} />
                                                <input value={newGlossFr} onChange={e => setNewGlossFr(e.target.value)}
                                                    placeholder={isFr ? 'Définition (FR)' : 'Definition (FR)'}
                                                    style={{ padding: '0.55rem 0.75rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.85rem' }} />
                                                <input value={newGlossEn} onChange={e => setNewGlossEn(e.target.value)}
                                                    placeholder={isFr ? 'Définition (EN)' : 'Definition (EN)'}
                                                    style={{ padding: '0.55rem 0.75rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.85rem' }} />
                                                <AudioRecorder isFr={isFr} onRecorded={setNewAudioBlob} label={isFr ? "Enregistrement de l'ancien (optionnel)" : "Elder's recording (optional)"} />
                                            </div>

                                            {qError && <div style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: '600', marginBottom: '0.6rem' }}>{qError}</div>}
                                            <div style={{ display: 'flex', gap: '0.6rem' }}>
                                                <button onClick={() => handleDecline(q.id)} disabled={qBusy} style={{ flex: 1, padding: '0.55rem', borderRadius: '10px', border: '1.5px solid #fecaca', backgroundColor: '#fee2e2', color: '#dc2626', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                    {isFr ? 'Refuser' : 'Decline'}
                                                </button>
                                                <button onClick={() => handleAnswerNew(q.id)} disabled={qBusy || !newHeadword.trim()} style={{ flex: 2, padding: '0.55rem', borderRadius: '10px', border: 'none', backgroundColor: B, color: '#fff', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                                                    {isFr ? '✅ Ajouter et répondre' : '✅ Add and answer'}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {isOpen && isTerminal && q.answered_corpus_entry_id && (
                                        <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid #f1f5f9', fontSize: '0.85rem', color: '#64748b' }}>
                                            {isFr ? 'Répondu — voir le mot dans le corpus.' : 'Answered — see the word in the corpus.'}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
                </>
                )}
            </div>
        </div>
    );
};

export default CulturalStewardPage;
