import { useState, useCallback, useEffect, useRef } from 'react';
import { MEDUMBA_SYLLABLES } from '../data/medumbaSyllables';
import { VOCAB_EXPRESSIONS } from '../data/vocabExpressions';
import { PHRASEBOOK_EXPRESSIONS } from '../data/phrasebookExpressions';
import SYLLABLE_TONS from '../data/syllableTons.json';
import { syllableAudioUrl, toneAudioUrl, segmentPhrase, playPhraseAudioLenient } from '../utils/syllableAudio';

const PURPLE = '#7c3aed';
const LIGHT  = '#faf5ff';

const TONE_KEYS  = ['bas', 'moyen', 'montant', 'descendant'];
const TONE_LABEL = { bas: 'Bas', moyen: 'Moyen', montant: 'Montant', descendant: 'Descendant' };

const SYLLABLE_TONS_MAP = new Map(SYLLABLE_TONS.map(s => [s.syllable, s]));

/* ── Pool de mots : vocab + phrasebook, mots courts prioritaires.
 * Les mots entièrement lisibles avec les vrais enregistrements (voir
 * segmentPhrase) passent en premier ; le tri est stable donc l'ordre
 * d'origine est conservé à l'intérieur de chaque groupe. ── */
const WORD_POOL = [
  ...VOCAB_EXPRESSIONS,
  ...PHRASEBOOK_EXPRESSIONS,
].filter(w => w.medumba && w.medumba.trim().length > 0 && w.medumba.trim().length < 40)
 .reduce((acc, w) => {             // déduplication sur medumba
   if (!acc.seen.has(w.medumba)) { acc.seen.add(w.medumba); acc.list.push(w); }
   return acc;
 }, { seen: new Set(), list: [] }).list
 .sort((a, b) => (segmentPhrase(b.medumba) !== null) - (segmentPhrase(a.medumba) !== null));

export default function PronunciationPage({ nativeLang, onBack }) {
  const isFr = nativeLang === 'french';

  const [tab,       setTab]       = useState('lecture');
  const [sylSearch, setSylSearch] = useState('');
  const [wordIdx,   setWordIdx]   = useState(0);
  const [speaking,  setSpeaking]  = useState(false);
  const [autoPlay,  setAutoPlay]  = useState(false);
  const [selectedSyl, setSelectedSyl] = useState(null);
  const [playingTone, setPlayingTone] = useState(null);
  const timerRef  = useRef(null);
  const audioRef  = useRef(null);

  const word = WORD_POOL[wordIdx];

  /* ── Lire un mot du pool avec les vrais enregistrements de syllabes,
   *    en les enchaînant dans l'ordre ; les mots non couverts sont sautés
   *    en silence plutôt que remplacés par de la synthèse vocale. ── */
  const playWord = useCallback((phrase, onEnd) => {
    setSpeaking(true);
    playPhraseAudioLenient(audioRef, phrase, {
      onEnd: () => { setSpeaking(false); onEnd?.(); },
      onFallback: () => { setSpeaking(false); onEnd?.(); },
    });
  }, []);

  /* ── Jouer l'enregistrement réel d'une syllabe ; reste muet si aucun
   *    enregistrement n'existe pour cette syllabe (pas de TTS de secours). ── */
  const playSyllable = useCallback((syllable) => {
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.pause();
    audio.onerror = () => {};
    audio.src = syllableAudioUrl(syllable);
    audio.play().catch(() => {});
  }, []);

  /* ── Jouer le ton spécifique d'une syllabe (bas/moyen/montant/descendant) ;
   *    reste muet si le clip n'existe pas (pas de TTS de secours). ── */
  const playTone = useCallback((syllable, tone) => {
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.pause();
    setPlayingTone(tone);
    audio.onended = () => setPlayingTone(null);
    audio.onerror = () => setPlayingTone(null);
    audio.src = toneAudioUrl(syllable, tone);
    audio.play().catch(() => setPlayingTone(null));
  }, []);

  /* ── Navigation ── */
  const goNext = useCallback(() => {
    setSpeaking(false);
    clearTimeout(timerRef.current);
    audioRef.current?.pause();
    setWordIdx(i => (i + 1) % WORD_POOL.length);
  }, []);

  const goPrev = useCallback(() => {
    setSpeaking(false);
    clearTimeout(timerRef.current);
    audioRef.current?.pause();
    setWordIdx(i => (i - 1 + WORD_POOL.length) % WORD_POOL.length);
  }, []);

  /* ── Lecture automatique ── */
  useEffect(() => {
    if (!autoPlay || tab !== 'lecture') return;
    if (!word) return;
    playWord(word.medumba, () => {
      timerRef.current = setTimeout(() => {
        setWordIdx(i => (i + 1) % WORD_POOL.length);
      }, 1800);
    });
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [wordIdx, autoPlay, tab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!autoPlay) {
      setSpeaking(false);
      clearTimeout(timerRef.current);
    }
  }, [autoPlay]);

  /* ── Syllabaire filtré ── */
  const filtered = MEDUMBA_SYLLABLES.filter(s =>
    s.syllable.toLowerCase().includes(sylSearch.toLowerCase())
  );

  const groups = {};
  filtered.forEach(s => {
    const key = s.syllable[0]?.toUpperCase() ?? '#';
    if (!groups[key]) groups[key] = [];
    groups[key].push(s);
  });

  /* ── Nettoyage au démontage ── */
  useEffect(() => () => {
    clearTimeout(timerRef.current);
    audioRef.current?.pause();
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', system-ui, sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ background: `linear-gradient(135deg, ${PURPLE}, #a78bfa)`, padding: '1.25rem 1.5rem 0', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <button onClick={() => { onBack(); }}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 38, height: 38, cursor: 'pointer', fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.7px' }}>
              {WORD_POOL.length} {isFr ? 'mots' : 'words'} · 1 147 {isFr ? 'syllabes' : 'syllables'}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>🔤 {isFr ? 'Prononciation' : 'Pronunciation'}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '12px 12px 0 0', padding: '0.4rem 0.4rem 0' }}>
          {[{ id: 'lecture', fr: 'Lecture', en: 'Reading' }, { id: 'syllabaire', fr: 'Syllabaire', en: 'Syllabary' }].map(t => (
            <button key={t.id}
              onClick={() => { setTab(t.id); setAutoPlay(false); setSpeaking(false); audioRef.current?.pause(); setPlayingTone(null); }}
              style={{
                flex: 1, padding: '0.6rem', borderRadius: '9px 9px 0 0', border: 'none', cursor: 'pointer',
                backgroundColor: tab === t.id ? '#fff' : 'transparent',
                color: tab === t.id ? PURPLE : 'rgba(255,255,255,0.85)',
                fontWeight: 800, fontSize: '0.88rem', fontFamily: 'inherit',
              }}>{isFr ? t.fr : t.en}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '1.25rem 1rem 2rem', overflowY: 'auto' }}>

        {/* ════════════════ LECTURE ════════════════ */}
        {tab === 'lecture' && word && (
          <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Barre de progression + autoplay */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ flex: 1, height: 6, background: '#e2e8f0', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${((wordIdx + 1) / WORD_POOL.length) * 100}%`, background: `linear-gradient(90deg, ${PURPLE}, #a78bfa)`, borderRadius: 99, transition: 'width 0.3s' }} />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>
                {wordIdx + 1} / {WORD_POOL.length}
              </span>
              <button
                onClick={() => setAutoPlay(a => !a)}
                style={{
                  background: autoPlay ? PURPLE : '#e2e8f0',
                  color: autoPlay ? '#fff' : '#64748b',
                  border: 'none', borderRadius: '99px', padding: '0.3rem 0.85rem',
                  fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                }}
              >
                {autoPlay ? '⏸' : '▶'} {isFr ? (autoPlay ? 'Pause' : 'Auto') : (autoPlay ? 'Pause' : 'Auto')}
              </button>
            </div>

            {/* Carte mot */}
            <div style={{
              background: '#fff', borderRadius: '24px',
              border: `2px solid ${speaking ? PURPLE : '#e2e8f0'}`,
              padding: '2.5rem 1.5rem', textAlign: 'center',
              boxShadow: speaking ? `0 6px 28px ${PURPLE}22` : '0 2px 10px rgba(0,0,0,0.05)',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}>
              {/* Traduction */}
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.65rem' }}>
                {isFr ? word.fr : (word.en || word.fr)}
              </div>

              {/* Mot Medumba */}
              <div style={{
                fontSize: 'clamp(1.6rem, 6vw, 2.6rem)', fontWeight: 900, color: PURPLE,
                lineHeight: 1.25, marginBottom: '1.5rem', wordBreak: 'break-word',
                letterSpacing: '0.02em',
              }}>
                {word.medumba}
              </div>

              {/* Bouton écouter */}
              <button
                onClick={() => playWord(word.medumba)}
                disabled={speaking}
                style={{
                  background: speaking ? `${PURPLE}12` : LIGHT,
                  border: `2px solid ${PURPLE}55`,
                  borderRadius: '99px', padding: '0.55rem 1.5rem',
                  cursor: speaking ? 'default' : 'pointer',
                  fontSize: '1rem', fontWeight: 700, color: PURPLE, fontFamily: 'inherit',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  boxShadow: speaking ? `0 0 0 5px ${PURPLE}18` : 'none',
                  transition: 'all 0.25s',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{speaking ? '🔊' : '🔈'}</span>
                {isFr ? (speaking ? 'Lecture…' : 'Écouter') : (speaking ? 'Playing…' : 'Listen')}
              </button>
            </div>

            {/* Navigation */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button onClick={goPrev} style={{
                background: '#fff', border: '2px solid #e2e8f0', borderRadius: '14px',
                padding: '0.9rem', fontWeight: 700, fontSize: '0.92rem',
                color: '#475569', cursor: 'pointer', fontFamily: 'inherit',
              }}>← {isFr ? 'Précédent' : 'Previous'}</button>
              <button onClick={goNext} style={{
                background: PURPLE, border: 'none', borderRadius: '14px',
                padding: '0.9rem', fontWeight: 700, fontSize: '0.92rem',
                color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: `0 4px 14px ${PURPLE}35`,
              }}>{isFr ? 'Suivant' : 'Next'} →</button>
            </div>
          </div>
        )}

        {/* ════════════════ SYLLABAIRE ════════════════ */}
        {tab === 'syllabaire' && (
          <div style={{ maxWidth: 520, margin: '0 auto' }}>

            {/* Recherche */}
            <input
              type="text"
              value={sylSearch}
              onChange={e => setSylSearch(e.target.value)}
              placeholder={isFr ? 'Chercher une syllabe…' : 'Search syllable…'}
              style={{
                width: '100%', padding: '0.65rem 1rem', fontSize: '0.95rem',
                border: `2px solid ${PURPLE}55`, borderRadius: '12px', outline: 'none',
                fontFamily: 'inherit', fontWeight: 600, background: LIGHT, color: '#0f172a',
                marginBottom: '0.5rem',
              }}
            />
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textAlign: 'right', marginBottom: '1rem' }}>
              {filtered.length} / {MEDUMBA_SYLLABLES.length} {isFr ? 'syllabes' : 'syllables'}
            </div>

            {/* Panneau de détail : les 4 tons de la syllabe sélectionnée */}
            {selectedSyl && (
              <div style={{
                background: '#fff', border: `2px solid ${PURPLE}`, borderRadius: '16px',
                padding: '1.1rem 1.25rem', marginBottom: '1.25rem',
                boxShadow: `0 6px 20px ${PURPLE}18`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div>
                    <span style={{ fontSize: '1.3rem', fontWeight: 900, color: PURPLE }}>{selectedSyl}</span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, marginLeft: '0.5rem' }}>
                      {SYLLABLE_TONS_MAP.get(selectedSyl)?.ipa}
                    </span>
                  </div>
                  <button onClick={() => setSelectedSyl(null)}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.1rem', cursor: 'pointer', padding: '0.2rem' }}>✕</button>
                </div>

                {SYLLABLE_TONS_MAP.has(selectedSyl) ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.6rem' }}>
                    {TONE_KEYS.map(tone => {
                      const toneChar = SYLLABLE_TONS_MAP.get(selectedSyl)[tone];
                      const isPlaying = playingTone === tone;
                      return (
                        <button key={tone}
                          onClick={() => playTone(selectedSyl, tone, toneChar)}
                          style={{
                            background: isPlaying ? PURPLE : LIGHT,
                            border: `1.5px solid ${PURPLE}55`, borderRadius: '12px',
                            padding: '0.65rem 0.5rem', cursor: 'pointer', fontFamily: 'inherit',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                            transition: 'all 0.2s',
                          }}>
                          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: isPlaying ? '#fff' : PURPLE }}>{toneChar}</span>
                          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: isPlaying ? '#fff' : '#64748b' }}>
                            {isPlaying ? '🔊 ' : ''}{TONE_LABEL[tone]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <button onClick={() => playSyllable(selectedSyl)} style={{
                    width: '100%', background: LIGHT, border: `1.5px solid ${PURPLE}55`, borderRadius: '12px',
                    padding: '0.65rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, color: PURPLE, fontSize: '0.88rem',
                  }}>🔈 {isFr ? 'Écouter' : 'Listen'}</button>
                )}
              </div>
            )}

            {/* Groupes par lettre */}
            {Object.keys(groups).sort().map(letter => (
              <div key={letter} style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  fontSize: '0.7rem', fontWeight: 900, color: PURPLE,
                  textTransform: 'uppercase', letterSpacing: '1.5px',
                  marginBottom: '0.5rem', paddingLeft: '0.25rem',
                }}>
                  — {letter} —
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.45rem' }}>
                  {groups[letter].map((s, i) => {
                    const active = selectedSyl === s.syllable;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedSyl(active ? null : s.syllable)}
                        title={s.ipa}
                        style={{
                          background: active ? PURPLE : '#fff', border: `1.5px solid ${active ? PURPLE : '#e9d5ff'}`,
                          borderRadius: '10px', padding: '0.5rem 0.3rem',
                          cursor: 'pointer', fontFamily: 'inherit',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem',
                          transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
                        }}
                        onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = PURPLE; e.currentTarget.style.boxShadow = `0 2px 8px ${PURPLE}22`; } }}
                        onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = '#e9d5ff'; e.currentTarget.style.boxShadow = 'none'; } }}
                      >
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: active ? '#fff' : PURPLE }}>{s.syllable}</span>
                        <span style={{ fontSize: '0.58rem', color: active ? 'rgba(255,255,255,.8)' : '#94a3b8', fontWeight: 600, lineHeight: 1.2, textAlign: 'center' }}>{s.ipa}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
