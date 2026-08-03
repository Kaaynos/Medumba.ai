import { useState, useEffect, useCallback } from 'react';
import { playMedumbaWord } from '../utils/medumbaAudio';
import { wordOfTheDay } from '../utils/realVoiceWords';
import { supabase } from '../config/supabase';
import { logRitualPlay, getRitualPlays, countDistinctNights } from '../services/ritualService';

const B  = '#1B4FD8';
const BG = '#f8fafc';
const LULLABY_PATH = 'lullabies/lullaby_01.mp3'; // uploaded by a native speaker when available

/* ════════════════════════════════════════════════════════════════════
   BabyRitualPage — the 0-4 band
   Personas & Journeys v2: "BENEFICIARY, NOT A USER. The product is audio
   and paper — no screen product is designed for them, and we say so. A
   nightly lullaby and a word of the day... Measured in nights per week
   the audio is played. Nothing else." No lessons, no XP, no gems here —
   a guardian taps play on the child's behalf.
════════════════════════════════════════════════════════════════════ */
const BabyRitualPage = ({ babyProfileId, babyName, nativeLang, onBack, onLogout }) => {
    const isFr = nativeLang === 'french';
    const word = wordOfTheDay();

    const [lullabyState, setLullabyState] = useState('idle'); // idle | playing | unavailable
    const [wordState, setWordState] = useState('idle');
    const [nightsThisWeek, setNightsThisWeek] = useState(null);

    const refreshNights = useCallback(() => {
        if (!babyProfileId) return;
        getRitualPlays(babyProfileId, 7).then(plays => setNightsThisWeek(countDistinctNights(plays, 'lullaby')));
    }, [babyProfileId]);
    useEffect(() => { refreshNights(); }, [refreshNights]);

    const playLullaby = () => {
        setLullabyState('playing');
        const { data } = supabase.storage.from('medumba-audio').getPublicUrl(LULLABY_PATH);
        const audio = new Audio(data.publicUrl);
        audio.onended = () => setLullabyState('idle');
        audio.onerror = () => setLullabyState('unavailable');
        audio.play()
            .then(() => { logRitualPlay(babyProfileId, 'lullaby'); refreshNights(); })
            .catch(() => setLullabyState('unavailable'));
    };

    const playWordOfDay = () => {
        if (!word) return;
        setWordState('playing');
        playMedumbaWord(word.medumba,
            () => { logRitualPlay(babyProfileId, 'word_of_day', word.medumba); },
            () => setWordState('idle'));
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: "'Outfit', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: B, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>🌙 {babyName || ''}</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {onBack && (
                        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '0.45rem 0.9rem', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '700' }}>
                            {isFr ? '← Changer' : '← Switch'}
                        </button>
                    )}
                    {onLogout && (
                        <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '0.45rem 0.9rem', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '700' }}>
                            🚪 {isFr ? 'Déconnexion' : 'Log out'}
                        </button>
                    )}
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem 1.5rem', maxWidth: '480px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                    {isFr
                        ? `Un rituel du soir pour ${babyName || 'votre enfant'} — appuyez pour écouter.`
                        : `An evening ritual for ${babyName || 'your child'} — tap to listen.`}
                </p>

                <button onClick={playLullaby} style={{
                    width: '100%', padding: '2rem 1.5rem', borderRadius: '24px', border: 'none',
                    background: 'linear-gradient(135deg, #0056D2, #38bdf8)', color: '#fff',
                    cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                    boxShadow: '0 8px 24px rgba(0,86,210,0.25)',
                }}>
                    <span style={{ fontSize: '2.5rem' }}>🎵</span>
                    <span style={{ fontWeight: '900', fontSize: '1.1rem' }}>{isFr ? 'Berceuse du soir' : 'Evening lullaby'}</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>
                        {lullabyState === 'playing' ? (isFr ? '♪ En cours...' : '♪ Playing...') :
                         lullabyState === 'unavailable' ? (isFr ? 'Pas encore enregistrée' : 'Not recorded yet') :
                         (isFr ? 'Appuyer pour écouter' : 'Tap to listen')}
                    </span>
                </button>

                {word && (
                    <button onClick={playWordOfDay} style={{
                        width: '100%', padding: '1.5rem', borderRadius: '24px', border: '2px solid #e2e8f0',
                        backgroundColor: '#fff', cursor: 'pointer', fontFamily: 'inherit',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                    }}>
                        <span style={{ fontSize: '2rem' }}>💬</span>
                        <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#64748b' }}>{isFr ? 'Mot du jour' : 'Word of the day'}</span>
                        <span style={{ fontWeight: '900', fontSize: '1.3rem', color: '#0f172a' }}>{word.medumba}</span>
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{isFr ? word.french : word.english}</span>
                    </button>
                )}

                {nightsThisWeek !== null && (
                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', textAlign: 'center' }}>
                        {isFr
                            ? `Berceuse écoutée ${nightsThisWeek} soir${nightsThisWeek === 1 ? '' : 's'} cette semaine`
                            : `Lullaby played ${nightsThisWeek} night${nightsThisWeek === 1 ? '' : 's'} this week`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BabyRitualPage;
