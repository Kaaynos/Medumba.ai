import { useState, useMemo } from 'react';
import logo from '../assets/logo.png';
import { playMedumbaWord, stopMedumbaAudio } from '../utils/medumbaAudio';
import { buildCertExam, PASS_THRESHOLD } from '../data/certification';

const B = '#0056D2';

/**
 * CertificationPage — recap exam for a unit, signed by CEPOM.
 * phase: 'exam' → one MCQ at a time → 'result' → (if passed) 'certificate'.
 */
const CertificationPage = ({ unit, learnerName, isFr, onBack, onPassed }) => {
    const questions = useMemo(() => buildCertExam(unit.unitId), [unit.unitId]);
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState(null);
    const [status, setStatus] = useState(null); // null | 'correct' | 'wrong'
    const [correctCount, setCorrectCount] = useState(0);
    const [phase, setPhase] = useState('exam'); // 'exam' | 'result' | 'certificate'
    const [speaking, setSpeaking] = useState(false);

    const q = questions[currentQ];
    const unitTitle = isFr ? unit.titleFr : unit.titleEn;

    const pick = (opt) => {
        if (status !== null) return;
        setSelected(opt);
        const correct = opt === q.answer;
        setStatus(correct ? 'correct' : 'wrong');
        if (correct) setCorrectCount(c => c + 1);
    };

    const next = () => {
        stopMedumbaAudio();
        setSpeaking(false);
        if (currentQ >= questions.length - 1) {
            setPhase('result');
        } else {
            setCurrentQ(i => i + 1);
            setSelected(null);
            setStatus(null);
        }
    };

    const listen = (word) => {
        setSpeaking(true);
        playMedumbaWord(word, null, () => setSpeaking(false));
    };

    if (questions.length === 0) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontFamily: "'Outfit', system-ui, sans-serif" }}>
                <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: '600' }}>
                    {isFr ? 'Examen pas encore disponible pour cette unité.' : 'Exam not yet available for this unit.'}
                </div>
                <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', border: 'none', background: B, color: '#fff', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {isFr ? 'Retour' : 'Back'}
                </button>
            </div>
        );
    }

    /* ════════ CERTIFICATE ════════ */
    if (phase === 'certificate') {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: "'Outfit', system-ui, sans-serif" }}>
                <div style={{
                    width: '100%', maxWidth: '440px', background: '#fff',
                    border: `3px solid ${B}`, borderRadius: '20px', padding: '2rem 1.75rem',
                    textAlign: 'center', boxShadow: '0 20px 60px rgba(0,86,210,0.18)',
                    position: 'relative',
                }}>
                    <div style={{ position: 'absolute', inset: '10px', border: `1.5px solid ${B}55`, borderRadius: '14px', pointerEvents: 'none' }} />
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎓</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: '800', color: B, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        {isFr ? 'Certificat de réussite' : 'Certificate of Achievement'}
                    </div>
                    <img src={logo} alt="Medumba.AI" style={{ width: '36px', margin: '0.5rem auto' }} />
                    <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0f172a', margin: '0.75rem 0 0.25rem' }}>
                        {learnerName || (isFr ? 'Apprenant Medumba.AI' : 'Medumba.AI Learner')}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                        {isFr ? 'a complété avec succès l\'unité' : 'has successfully completed the unit'}
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: B, marginBottom: '1.5rem' }}>
                        « {unitTitle} »
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                        {isFr ? 'Score' : 'Score'}: {Math.round((correctCount / questions.length) * 100)}%
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                        {new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div style={{ borderTop: '1.5px dashed #e2e8f0', paddingTop: '1rem', fontSize: '0.72rem', fontWeight: '700', color: '#64748b' }}>
                        {isFr ? 'Signé — CEPOM' : 'Signed — CEPOM'}
                    </div>
                </div>
                <button onClick={onBack} style={{ marginTop: '1.5rem', padding: '0.85rem 2rem', borderRadius: '9999px', border: 'none', background: B, color: '#fff', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 20px rgba(0,86,210,0.3)' }}>
                    {isFr ? 'Retour au tableau de bord' : 'Back to dashboard'}
                </button>
            </div>
        );
    }

    /* ════════ RESULT ════════ */
    if (phase === 'result') {
        const pct = correctCount / questions.length;
        const passed = pct >= PASS_THRESHOLD;
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', padding: '1.5rem', fontFamily: "'Outfit', system-ui, sans-serif", textAlign: 'center' }}>
                <div style={{ fontSize: '3.5rem' }}>{passed ? '🎉' : '😓'}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a' }}>{correctCount} / {questions.length}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#64748b' }}>{Math.round(pct * 100)}%</div>
                <div style={{
                    padding: '1rem 1.5rem', borderRadius: '16px', maxWidth: '360px',
                    backgroundColor: passed ? '#dcfce7' : '#fee2e2',
                    color: passed ? '#15803d' : '#dc2626', fontWeight: '700', fontSize: '0.9rem',
                }}>
                    {passed
                        ? (isFr ? `Bravo ! Vous avez réussi l'examen de « ${unitTitle} ».` : `Congratulations! You passed the "${unitTitle}" exam.`)
                        : (isFr ? `Score insuffisant (minimum ${Math.round(PASS_THRESHOLD * 100)}%). Réessayez !` : `Score too low (minimum ${Math.round(PASS_THRESHOLD * 100)}%). Please try again!`)}
                </div>
                {passed ? (
                    <button onClick={() => { onPassed(unit.unitId); setPhase('certificate'); }} style={{ padding: '0.9rem 2.2rem', borderRadius: '9999px', border: 'none', background: B, color: '#fff', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 20px rgba(0,86,210,0.3)' }}>
                        🎓 {isFr ? 'Voir mon certificat' : 'View my certificate'}
                    </button>
                ) : (
                    <button onClick={onBack} style={{ padding: '0.9rem 2.2rem', borderRadius: '9999px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                        {isFr ? 'Retour' : 'Back'}
                    </button>
                )}
            </div>
        );
    }

    /* ════════ EXAM (MCQ) ════════ */
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            {/* Header */}
            <div style={{ background: B, padding: '1rem 1.25rem', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: '#fff', fontSize: '1rem' }}>✕</button>
                    <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>
                        🎓 {isFr ? `Examen — ${unitTitle}` : `Exam — ${unitTitle}`}
                    </div>
                </div>
                <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${(currentQ / questions.length) * 100}%`, height: '100%', backgroundColor: '#fbbf24', borderRadius: '99px', transition: 'width 0.3s' }} />
                </div>
                <div style={{ fontSize: '0.7rem', marginTop: '0.35rem', opacity: 0.85 }}>{currentQ + 1} / {questions.length}</div>
            </div>

            {/* Question */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', gap: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    {isFr ? 'Quelle est la traduction ?' : 'What is the translation?'}
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a' }}>
                    {isFr ? q.sourceFr : q.sourceEn}
                </div>
                <button onClick={() => listen(q.audio)} style={{ background: '#eff6ff', border: `2px solid #bfdbfe`, borderRadius: '99px', padding: '0.45rem 1.1rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem', color: B, fontFamily: 'inherit' }}>
                    {speaking ? '🔊' : '🔈'} {isFr ? 'Écouter' : 'Listen'}
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem', width: '100%', maxWidth: '420px' }}>
                    {(isFr ? q.optionsFr : q.options).map((opt, i) => {
                        const isSelected = selected === opt;
                        const isCorrect  = status !== null && opt === q.answer;
                        const isWrong    = isSelected && status === 'wrong';
                        return (
                            <button key={i} onClick={() => pick(opt)} disabled={status !== null} style={{
                                padding: '1rem', borderRadius: '14px', fontFamily: 'inherit',
                                fontWeight: '800', fontSize: '1rem', cursor: status === null ? 'pointer' : 'default',
                                border: `2px solid ${isCorrect ? '#22c55e' : isWrong ? '#ef4444' : '#e2e8f0'}`,
                                backgroundColor: isCorrect ? '#dcfce7' : isWrong ? '#fee2e2' : '#fff',
                                color: isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#0f172a',
                                transition: 'all 0.15s',
                            }}>{opt}</button>
                        );
                    })}
                </div>
            </div>

            {/* Bottom action */}
            {status !== null && (
                <div style={{ padding: '1rem 1.5rem', borderTop: '2px solid #e5e7eb', backgroundColor: '#fff', maxWidth: '640px', width: '100%', margin: '0 auto' }}>
                    <button onClick={next} style={{ width: '100%', backgroundColor: B, color: '#fff', padding: '1rem', borderRadius: '9999px', fontSize: '1rem', fontWeight: '700', border: 'none', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 20px rgba(0,86,210,0.3)' }}>
                        {currentQ >= questions.length - 1 ? (isFr ? 'Voir les résultats →' : 'See results →') : (isFr ? 'Suivant →' : 'Next →')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CertificationPage;
