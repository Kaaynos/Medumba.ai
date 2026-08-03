import { useState, useEffect, useCallback } from 'react';
import AudioRecorder from './AudioRecorder';
import {
    hasConsented, recordConsent, uploadSubmissionAudio, submitWord, listMySubmissions,
} from '../services/contentCreatorService';

const B  = '#1B4FD8';
const BG = '#f8fafc';

const STATUS_LABELS = {
    pending:         { fr: 'En attente',      en: 'Pending' },
    ai_review:       { fr: 'Revue IA',        en: 'AI review' },
    franklin_review: { fr: 'Revue Franklin',  en: 'Franklin review' },
    ncobnkun_review: { fr: 'Revue Ncobnkùn',  en: 'Ncobnkùn review' },
    approved:        { fr: 'Approuvé ✅',     en: 'Approved ✅' },
    rejected:        { fr: 'Rejeté',          en: 'Rejected' },
};
const STATUS_COLORS = {
    pending: '#94a3b8', ai_review: '#0891b2', franklin_review: '#7c3aed',
    ncobnkun_review: '#d97706', approved: '#16a34a', rejected: '#dc2626',
};

const CONSENT_SCRIPT_FR = `J'accepte que cet enregistrement audio de ma voix soit utilisé par Medumba.AI pour préserver et enseigner la langue Medumba. Je comprends qu'il pourra être écouté par des apprenants et publié dans le dictionnaire, avec mon attribution si je le souhaite.`;
const CONSENT_SCRIPT_EN = `I agree that this audio recording of my voice may be used by Medumba.AI to preserve and teach the Medumba language. I understand it may be heard by learners and published in the dictionary, with attribution if I choose.`;

/* ════════════════════════════════════════════════════════════════════
   ContentCreatorPage
   Personas & Journeys v2, Content Creator: "no capture tool, no consent
   flow, no validation queue, no contributor view." Consent here is a
   spoken recording, not a checkbox — "a checkbox is not consent from a
   76-year-old." Submissions feed the same word_submissions queue the
   Cultural Steward already reviews (migration 020).
════════════════════════════════════════════════════════════════════ */
const ContentCreatorPage = ({ creatorUid, creatorName, nativeLang, onLogout }) => {
    const isFr = nativeLang === 'french';

    const [checkingConsent, setCheckingConsent] = useState(true);
    const [consented, setConsented] = useState(false);
    const [consentBlob, setConsentBlob] = useState(null);
    const [consentSaving, setConsentSaving] = useState(false);
    const [consentError, setConsentError] = useState('');

    const [wordFr, setWordFr] = useState('');
    const [wordEn, setWordEn] = useState('');
    const [definitionFr, setDefinitionFr] = useState('');
    const [domain, setDomain] = useState('general');
    const [wordBlob, setWordBlob] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitOk, setSubmitOk] = useState(false);

    const [mySubs, setMySubs] = useState([]);

    const refreshSubs = useCallback(() => {
        if (!creatorUid) return;
        listMySubmissions(creatorUid).then(setMySubs);
    }, [creatorUid]);

    useEffect(() => {
        if (!creatorUid) return;
        hasConsented(creatorUid).then((c) => { setConsented(c); setCheckingConsent(false); });
        refreshSubs();
    }, [creatorUid, refreshSubs]);

    const handleConfirmConsent = async () => {
        if (!consentBlob) return;
        setConsentSaving(true);
        setConsentError('');
        try {
            const url = await uploadSubmissionAudio(consentBlob, `consent-${creatorUid}`);
            await recordConsent(creatorUid, url);
            setConsented(true);
        } catch (e) {
            setConsentError(e.message);
        } finally {
            setConsentSaving(false);
        }
    };

    const handleSubmitWord = async () => {
        if (!wordFr.trim()) return;
        setSubmitting(true);
        setSubmitError('');
        setSubmitOk(false);
        try {
            let audioUrl = null;
            if (wordBlob) audioUrl = await uploadSubmissionAudio(wordBlob, `word-${wordFr.trim().slice(0, 20)}`);
            await submitWord(creatorUid, { wordFr: wordFr.trim(), wordEn: wordEn.trim(), definitionFr: definitionFr.trim(), domain, audioUrl });
            setWordFr(''); setWordEn(''); setDefinitionFr(''); setWordBlob(null);
            setSubmitOk(true);
            refreshSubs();
        } catch (e) {
            setSubmitError(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <div style={{ backgroundColor: B, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
                <div>
                    <div style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>🎙️ {isFr ? 'Espace Créateur de Contenu' : 'Content Creator Studio'}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem' }}>{creatorName || ''}</div>
                </div>
                {onLogout && (
                    <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '0.45rem 0.9rem', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '700' }}>
                        🚪 {isFr ? 'Déconnexion' : 'Log out'}
                    </button>
                )}
            </div>

            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1.5rem' }}>
                {checkingConsent ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>{isFr ? 'Chargement...' : 'Loading...'}</div>
                ) : !consented ? (
                    <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                        <div style={{ fontWeight: '900', fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                            🖊️ {isFr ? 'Consentement requis' : 'Consent required'}
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, marginBottom: '1rem' }}>
                            {isFr
                                ? 'Avant d\'enregistrer quoi que ce soit, lisez ce texte à voix haute et enregistrez-vous en train de le dire. Ce n\'est pas une case à cocher — c\'est votre voix qui donne son accord.'
                                : 'Before recording anything, read this aloud and record yourself saying it. This isn\'t a checkbox — it\'s your own voice giving consent.'}
                        </p>
                        <div style={{ backgroundColor: BG, borderRadius: '12px', padding: '1rem', fontSize: '0.9rem', color: '#0f172a', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                            "{isFr ? CONSENT_SCRIPT_FR : CONSENT_SCRIPT_EN}"
                        </div>
                        <AudioRecorder isFr={isFr} onRecorded={setConsentBlob} label={isFr ? 'Votre consentement enregistré' : 'Your recorded consent'} />
                        {consentError && <div style={{ fontSize: '0.82rem', color: '#dc2626', fontWeight: '600', marginTop: '0.75rem' }}>{consentError}</div>}
                        <button
                            onClick={handleConfirmConsent}
                            disabled={!consentBlob || consentSaving}
                            style={{
                                marginTop: '1rem', width: '100%', padding: '0.75rem', borderRadius: '9999px', border: 'none',
                                backgroundColor: consentBlob ? B : '#e2e8f0', color: '#fff', fontWeight: '700',
                                cursor: consentBlob ? 'pointer' : 'default', fontFamily: 'inherit', fontSize: '0.9rem',
                            }}
                        >
                            {consentSaving ? (isFr ? 'Enregistrement...' : 'Saving...') : (isFr ? 'Confirmer mon consentement' : 'Confirm my consent')}
                        </button>
                    </div>
                ) : (
                    <>
                        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                            <div style={{ fontWeight: '900', fontSize: '1.05rem', color: '#0f172a', marginBottom: '1rem' }}>
                                📝 {isFr ? 'Soumettre un mot' : 'Submit a word'}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <input value={wordFr} onChange={e => setWordFr(e.target.value)} placeholder={isFr ? 'Mot ou phrase en français *' : 'Word or phrase in French *'}
                                    style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.88rem' }} />
                                <input value={wordEn} onChange={e => setWordEn(e.target.value)} placeholder={isFr ? 'Traduction anglaise (optionnel)' : 'English translation (optional)'}
                                    style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.88rem' }} />
                                <textarea value={definitionFr} onChange={e => setDefinitionFr(e.target.value)} placeholder={isFr ? 'Définition ou contexte' : 'Definition or context'} rows={2}
                                    style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.88rem', resize: 'none' }} />
                                <select value={domain} onChange={e => setDomain(e.target.value)}
                                    style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.88rem' }}>
                                    <option value="general">{isFr ? 'Général' : 'General'}</option>
                                    <option value="stem_math">{isFr ? 'Mathématiques' : 'Math'}</option>
                                    <option value="stem_cs">{isFr ? 'Informatique' : 'Computer science'}</option>
                                    <option value="stem_bio">{isFr ? 'Biologie' : 'Biology'}</option>
                                    <option value="modern_life">{isFr ? 'Vie moderne' : 'Modern life'}</option>
                                </select>
                                <AudioRecorder isFr={isFr} onRecorded={setWordBlob} label={isFr ? 'Prononciation (recommandé)' : 'Pronunciation (recommended)'} />
                                {submitError && <div style={{ fontSize: '0.82rem', color: '#dc2626', fontWeight: '600' }}>{submitError}</div>}
                                {submitOk && <div style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: '600' }}>✅ {isFr ? 'Envoyé pour révision !' : 'Sent for review!'}</div>}
                                <button
                                    onClick={handleSubmitWord}
                                    disabled={!wordFr.trim() || submitting}
                                    style={{ padding: '0.75rem', borderRadius: '9999px', border: 'none', backgroundColor: wordFr.trim() ? B : '#e2e8f0', color: '#fff', fontWeight: '700', cursor: wordFr.trim() ? 'pointer' : 'default', fontFamily: 'inherit', fontSize: '0.9rem' }}
                                >
                                    {submitting ? (isFr ? 'Envoi...' : 'Sending...') : (isFr ? 'Envoyer pour révision' : 'Send for review')}
                                </button>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                            <div style={{ padding: '1rem 1.25rem', fontWeight: '800', fontSize: '0.92rem', color: '#0f172a', borderBottom: '1px solid #f1f5f9' }}>
                                📚 {isFr ? 'Mes contributions' : 'My contributions'}
                            </div>
                            {mySubs.length === 0 ? (
                                <div style={{ padding: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>{isFr ? 'Aucune contribution pour l\'instant' : 'No contributions yet'}</div>
                            ) : (
                                mySubs.map(s => (
                                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.25rem', borderBottom: '1px solid #f8fafc' }}>
                                        <span style={{ fontSize: '0.88rem', color: '#0f172a', fontWeight: '600' }}>{s.word_fr}</span>
                                        <span style={{ fontSize: '0.72rem', fontWeight: '800', padding: '0.2rem 0.6rem', borderRadius: '9999px', backgroundColor: `${STATUS_COLORS[s.status]}22`, color: STATUS_COLORS[s.status] }}>
                                            {STATUS_LABELS[s.status]?.[isFr ? 'fr' : 'en'] || s.status}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContentCreatorPage;
