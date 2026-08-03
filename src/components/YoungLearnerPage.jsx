import { useState, useEffect, useRef, useCallback } from 'react';
import { playMedumbaWord } from '../utils/medumbaAudio';
import { REAL_VOICE_WORDS } from '../utils/realVoiceWords';
import { logRitualPlay, getRitualPlays, countPlays } from '../services/ritualService';

const B  = '#1B4FD8';
const BG = '#f8fafc';
const SESSION_SECONDS = 4 * 60; // "Four-minute hard cap" — Personas & Journeys v2
const REWARD_EVERY = 5; // words spoken between reward unlocks

function shuffledWords() {
    const arr = [...REAL_VOICE_WORDS];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/* ════════════════════════════════════════════════════════════════════
   YoungLearnerPage — the 5-8 band (Naya, pre-reader)
   Personas & Journeys v2: "Tap and speak only. Zero typing, zero
   reading. Four-minute hard cap... Rewards are real Ndé objects and
   masks, each with a thirty-second story attached. Measured in words
   spoken aloud per week — never time in app." Reward artwork/stories
   are real cultural content pending native-speaker curation — this
   ships the mechanism honestly rather than inventing placeholder lore.
════════════════════════════════════════════════════════════════════ */
const YoungLearnerPage = ({ learnerProfileId, learnerName, nativeLang, onBack, onLogout }) => {
    const isFr = nativeLang === 'french';

    const [words] = useState(shuffledWords);
    const [idx, setIdx] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [spokenCount, setSpokenCount] = useState(0);
    const [wordsThisWeek, setWordsThisWeek] = useState(null);
    const [showReward, setShowReward] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);
    const [sessionOver, setSessionOver] = useState(false);
    const timerRef = useRef(null);

    const refreshWeek = useCallback(() => {
        if (!learnerProfileId) return;
        getRitualPlays(learnerProfileId, 7).then(plays => setWordsThisWeek(countPlays(plays, 'tap_speak')));
    }, [learnerProfileId]);
    useEffect(() => { refreshWeek(); }, [refreshWeek]);

    useEffect(() => {
        if (sessionOver) return;
        timerRef.current = setInterval(() => {
            setSecondsLeft(s => {
                if (s <= 1) { clearInterval(timerRef.current); setSessionOver(true); return 0; }
                return s - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [sessionOver]);

    const current = words[idx % words.length];

    const handleListen = () => {
        if (!current) return;
        setPlaying(true);
        playMedumbaWord(current.medumba, null, () => setPlaying(false));
    };

    const handleSaidIt = () => {
        logRitualPlay(learnerProfileId, 'tap_speak', current.medumba);
        const next = spokenCount + 1;
        setSpokenCount(next);
        setWordsThisWeek(w => (w === null ? 1 : w + 1));
        if (next % REWARD_EVERY === 0) setShowReward(true);
        else setIdx(i => i + 1);
    };

    const handleNext = () => setIdx(i => i + 1);
    const closeReward = () => { setShowReward(false); setIdx(i => i + 1); };

    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const ss = String(secondsLeft % 60).padStart(2, '0');

    if (sessionOver) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: "'Outfit', system-ui, sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', padding: '2rem' }}>
                <span style={{ fontSize: '3rem' }}>👋</span>
                <div style={{ fontWeight: '900', fontSize: '1.3rem', color: '#0f172a', textAlign: 'center' }}>
                    {isFr ? `Bravo ${learnerName || ''} !` : `Great job, ${learnerName || ''}!`}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center' }}>
                    {isFr ? `${spokenCount} mots prononcés aujourd'hui.` : `${spokenCount} words spoken today.`}
                </div>
                <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', border: 'none', backgroundColor: B, color: '#fff', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {isFr ? 'Rendre le téléphone' : 'Hand the phone back'}
                </button>
            </div>
        );
    }

    if (showReward) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: "'Outfit', system-ui, sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', padding: '2rem' }}>
                <span style={{ fontSize: '4rem' }}>🎭</span>
                <div style={{ fontWeight: '900', fontSize: '1.2rem', color: '#0f172a', textAlign: 'center' }}>
                    {isFr ? 'Nouveau masque débloqué !' : 'New mask unlocked!'}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', maxWidth: '280px' }}>
                    {isFr ? 'Histoire de 30 secondes bientôt disponible.' : '30-second story coming soon.'}
                </div>
                <button onClick={closeReward} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', border: 'none', backgroundColor: B, color: '#fff', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {isFr ? 'Continuer' : 'Continue'}
                </button>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: "'Outfit', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: B, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>{learnerName || ''}</div>
                <div style={{ color: '#fff', fontWeight: '900', fontSize: '1rem', fontVariantNumeric: 'tabular-nums' }}>⏱ {mm}:{ss}</div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem 1.5rem' }}>
                <div style={{
                    width: '220px', height: '220px', borderRadius: '32px',
                    background: 'linear-gradient(135deg, #0056D2, #38bdf8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 12px 32px rgba(0,86,210,0.3)',
                }}>
                    <span style={{ fontSize: '3rem', fontWeight: '900', color: '#fff', textAlign: 'center', padding: '0 1rem' }}>{current?.medumba}</span>
                </div>

                <button onClick={handleListen} disabled={playing} style={{
                    width: '160px', height: '160px', borderRadius: '50%', border: 'none',
                    backgroundColor: playing ? '#94a3b8' : '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    fontSize: '3.5rem', cursor: playing ? 'default' : 'pointer', fontFamily: 'inherit',
                }}>
                    🔊
                </button>

                <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '360px' }}>
                    <button onClick={handleNext} style={{ flex: 1, padding: '1rem', borderRadius: '20px', border: '2px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                        ⏭ {isFr ? 'Suivant' : 'Next'}
                    </button>
                    <button onClick={handleSaidIt} style={{ flex: 2, padding: '1rem', borderRadius: '20px', border: 'none', backgroundColor: '#16a34a', color: '#fff', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                        ✅ {isFr ? "J'ai parlé !" : 'I said it!'}
                    </button>
                </div>

                <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#94a3b8', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {isFr ? 'Rendre le téléphone' : 'Hand the phone back'}
                </button>

                {wordsThisWeek !== null && (
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {isFr ? `${wordsThisWeek} mots parlés cette semaine` : `${wordsThisWeek} words spoken this week`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default YoungLearnerPage;
