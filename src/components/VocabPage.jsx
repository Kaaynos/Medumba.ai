import { useState, useEffect, useCallback } from 'react';
import { THEMES_META, LEVEL_QUESTIONS } from '../data/medumbaDictionary';
import { playMedumbaWord, stopMedumbaAudio } from '../utils/medumbaAudio';

const THEME_EMOJIS = {
  l1: '👋', l2: '🫀', l3: '🍽️', l4: '🎨', l5: '🔢',
  l6: '🦁', l7: '👨‍👩‍👧', l8: '🌿', l9: '⏰', l10: '🤝',
  l11: '🍳', l12: '🏥', l13: '📚', l14: '💼',
  l15: '💬', l16: '⚡', l17: '🥁',
};

const LESSON_IDS = ['l1','l2','l3','l4','l5','l6','l7','l8','l9','l10','l11','l12','l13','l14','l15','l16','l17'];

const BLUE = '#1B4FD8';
const BG = '#f8fafc';
const FONT = "'Outfit', system-ui, sans-serif";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildCards(lessonId) {
  return (LEVEL_QUESTIONS[lessonId]?.meaning ?? []).map(q => ({
    medumba: q.answer,
    french: q.sourceFr,
    english: q.sourceEn,
    audio: q.audio,
    options: q.options ?? [],
    optionsFr: q.optionsFr ?? [],
  }));
}

export default function VocabPage({ nativeLang, learnLang }) {
  const isFr = nativeLang === 'fr';

  const [theme, setTheme] = useState(null);
  const [mode, setMode] = useState(null);
  const [cards, setCards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // When theme changes, build+shuffle cards and reset all state
  useEffect(() => {
    if (theme !== null) {
      setCards(shuffle(buildCards(theme)));
      setMode(null);
      setIdx(0);
      setFlipped(false);
      setSelectedOpt(null);
      setChecked(false);
      setScore(0);
      setDone(false);
      setSpeaking(false);
    }
  }, [theme]);

  // When mode changes to an exercise, reset exercise state
  useEffect(() => {
    if (mode !== null) {
      setIdx(0);
      setScore(0);
      setDone(false);
      setFlipped(false);
      setSelectedOpt(null);
      setChecked(false);
      setSpeaking(false);
    }
  }, [mode]);

  // Auto-play in listen mode when idx changes
  useEffect(() => {
    if (mode === 'listen' && cards.length > 0 && !done) {
      stopMedumbaAudio();
      setSpeaking(false);
      const card = cards[idx];
      if (card?.audio) {
        const timer = setTimeout(() => {
          playMedumbaWord(
            card.audio,
            () => setSpeaking(true),
            () => setSpeaking(false),
          );
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [mode, idx, cards, done]);

  // Reset selectedOpt and checked when idx changes (quiz/listen)
  useEffect(() => {
    setSelectedOpt(null);
    setChecked(false);
  }, [idx]);

  const handlePlayAudio = useCallback((audioWord) => {
    stopMedumbaAudio();
    setSpeaking(false);
    playMedumbaWord(
      audioWord,
      () => setSpeaking(true),
      () => setSpeaking(false),
    );
  }, []);

  function advance(addScore) {
    if (addScore) setScore(s => s + 1);
    stopMedumbaAudio();
    setSpeaking(false);
    if (idx < cards.length - 1) {
      setIdx(i => i + 1);
      setFlipped(false);
      setSelectedOpt(null);
      setChecked(false);
    } else {
      setDone(true);
    }
  }

  function handleRestart() {
    setCards(shuffle(buildCards(theme)));
    setIdx(0);
    setScore(0);
    setDone(false);
    setFlipped(false);
    setSelectedOpt(null);
    setChecked(false);
    setSpeaking(false);
  }

  const card = cards[idx] ?? null;
  const total = cards.length;
  const themeTitle = theme
    ? (isFr
        ? THEMES_META[theme]?.titleFr
        : THEMES_META[theme]?.titleEn) ?? theme
    : '';
  const themeEmoji = theme ? THEME_EMOJIS[theme] ?? '' : '';

  // ─── View 1: Theme Selector ────────────────────────────────────────────────
  if (theme === null) {
    return (
      <div style={{
        width: '100%', minHeight: '100vh', backgroundColor: BG,
        fontFamily: FONT, overflowY: 'auto',
      }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1rem 3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '0.35rem' }}>📖</div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
              {isFr ? 'Vocabulaire' : 'Vocabulary'}
            </h1>
            <p style={{ color: '#64748b', marginTop: '0.4rem', fontSize: '0.95rem' }}>
              {isFr ? 'Choisissez un thème' : 'Choose a theme'}
            </p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem',
          }}>
            {LESSON_IDS.map(id => {
              const meta = THEMES_META[id];
              const title = isFr ? meta?.titleFr : meta?.titleEn;
              const wordCount = LEVEL_QUESTIONS[id]?.meaning?.length ?? 0;
              const emoji = THEME_EMOJIS[id] ?? '📝';
              return (
                <div
                  key={id}
                  onClick={() => setTheme(id)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '1rem',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                    border: '1.5px solid #e2e8f0',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    display: 'flex', flexDirection: 'column', gap: '0.3rem',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = BLUE;
                    e.currentTarget.style.boxShadow = `0 2px 10px rgba(27,79,216,0.13)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)';
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.3 }}>
                    {title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {wordCount} {isFr ? 'mots' : 'words'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─── View 2: Mode Selector ─────────────────────────────────────────────────
  if (theme !== null && mode === null) {
    const modes = [
      {
        id: 'flashcard',
        emoji: '🃏',
        label: isFr ? 'Cartes' : 'Flashcards',
        desc: isFr ? 'Retournez les cartes' : 'Flip the cards',
      },
      {
        id: 'quiz',
        emoji: '🎯',
        label: 'Quiz',
        desc: isFr ? 'Choisissez la bonne réponse' : 'Choose the right answer',
      },
      {
        id: 'listen',
        emoji: '🔊',
        label: isFr ? 'Écoute' : 'Listening',
        desc: isFr ? 'Écoutez et trouvez le mot' : 'Listen and find the word',
      },
    ];

    return (
      <div style={{
        width: '100%', minHeight: '100vh', backgroundColor: BG,
        fontFamily: FONT, overflowY: 'auto',
      }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1rem 3rem' }}>
          {/* Back */}
          <button
            onClick={() => setTheme(null)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              color: '#64748b', fontSize: '0.9rem', padding: '0.25rem 0',
              marginBottom: '1.25rem', fontFamily: FONT,
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>‹</span>
            {isFr ? 'Thèmes' : 'Themes'}
          </button>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '0.35rem' }}>{themeEmoji}</div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
              {themeTitle}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.35rem' }}>
              {total} {isFr ? 'mots' : 'words'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {modes.map(m => (
              <div
                key={m.id}
                onClick={() => setMode(m.id)}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '0.875rem',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
                  border: '1.5px solid #e2e8f0',
                  padding: '1.25rem 1.25rem',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'row',
                  alignItems: 'center', gap: '1rem',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = BLUE;
                  e.currentTarget.style.boxShadow = `0 3px 12px rgba(27,79,216,0.13)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.08)';
                }}
              >
                <span style={{ fontSize: '2rem', minWidth: 40, textAlign: 'center' }}>{m.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>{m.label}</div>
                  <div style={{ fontSize: '0.83rem', color: '#64748b', marginTop: '0.15rem' }}>{m.desc}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: '1.2rem' }}>›</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── View 3: Exercise ──────────────────────────────────────────────────────

  const modeLabel =
    mode === 'flashcard' ? (isFr ? 'Cartes' : 'Flashcards')
    : mode === 'quiz' ? 'Quiz'
    : (isFr ? 'Écoute' : 'Listening');

  const modeEmoji =
    mode === 'flashcard' ? '🃏'
    : mode === 'quiz' ? '🎯'
    : '🔊';

  return (
    <div style={{
      width: '100%', minHeight: '100vh', backgroundColor: BG,
      fontFamily: FONT, overflowY: 'auto',
    }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '1.5rem 1rem 3rem' }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '0.6rem', marginBottom: '1.4rem', flexWrap: 'wrap',
        }}>
          <button
            onClick={() => { stopMedumbaAudio(); setSpeaking(false); setMode(null); }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              color: '#64748b', fontSize: '0.9rem', padding: '0.25rem 0',
              fontFamily: FONT,
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>‹</span>
            {modeEmoji} {modeLabel}
          </button>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {/* Progress pill */}
            <span style={{
              backgroundColor: '#e2e8f0', color: '#475569',
              borderRadius: '999px', padding: '0.2rem 0.7rem',
              fontSize: '0.82rem', fontWeight: 600,
            }}>
              {done ? total : idx + 1} / {total}
            </span>
            {/* Score pill */}
            <span style={{
              backgroundColor: '#dcfce7', color: '#16a34a',
              borderRadius: '999px', padding: '0.2rem 0.7rem',
              fontSize: '0.82rem', fontWeight: 600,
            }}>
              ✓ {score}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%', height: 4, backgroundColor: '#e2e8f0',
          borderRadius: 2, marginBottom: '1.5rem', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 2,
            backgroundColor: BLUE,
            width: `${total > 0 ? ((done ? total : idx + 1) / total) * 100 : 0}%`,
            transition: 'width 0.3s ease',
          }} />
        </div>

        {/* Done screen */}
        {done && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>✅</div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.4rem' }}>
              {isFr ? 'Terminé !' : 'Done!'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {isFr ? 'Votre score' : 'Your score'}
            </p>
            <div style={{
              fontSize: '3rem', fontWeight: 800, color: BLUE, marginBottom: '1.75rem',
            }}>
              {score} <span style={{ color: '#94a3b8', fontSize: '2rem', fontWeight: 400 }}>/ {total}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxWidth: 280, margin: '0 auto' }}>
              <button
                onClick={handleRestart}
                style={{
                  backgroundColor: BLUE, color: '#fff',
                  border: 'none', borderRadius: '0.75rem',
                  padding: '0.8rem 1.5rem', fontSize: '1rem',
                  fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {isFr ? 'Recommencer' : 'Restart'}
              </button>
              <button
                onClick={() => { stopMedumbaAudio(); setSpeaking(false); setMode(null); }}
                style={{
                  backgroundColor: '#f1f5f9', color: '#475569',
                  border: 'none', borderRadius: '0.75rem',
                  padding: '0.8rem 1.5rem', fontSize: '1rem',
                  fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.78'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {isFr ? 'Changer de mode' : 'Change mode'}
              </button>
            </div>
          </div>
        )}

        {/* FLASHCARD mode */}
        {!done && mode === 'flashcard' && card && (
          <FlashcardExercise
            card={card}
            isFr={isFr}
            flipped={flipped}
            setFlipped={setFlipped}
            speaking={speaking}
            onPlay={handlePlayAudio}
            onAdvance={advance}
          />
        )}

        {/* QUIZ mode */}
        {!done && mode === 'quiz' && card && (
          <QuizExercise
            card={card}
            isFr={isFr}
            selectedOpt={selectedOpt}
            setSelectedOpt={setSelectedOpt}
            checked={checked}
            setChecked={setChecked}
            speaking={speaking}
            onPlay={handlePlayAudio}
            onAdvance={advance}
            showWord={true}
          />
        )}

        {/* LISTEN mode */}
        {!done && mode === 'listen' && card && (
          <QuizExercise
            card={card}
            isFr={isFr}
            selectedOpt={selectedOpt}
            setSelectedOpt={setSelectedOpt}
            checked={checked}
            setChecked={setChecked}
            speaking={speaking}
            onPlay={handlePlayAudio}
            onAdvance={advance}
            showWord={false}
          />
        )}

      </div>
    </div>
  );
}

// ─── Flashcard sub-component ──────────────────────────────────────────────────

function FlashcardExercise({ card, isFr, flipped, setFlipped, speaking, onPlay, onAdvance }) {
  const displayLabel = isFr ? card.french : card.english;

  const sharedCardStyle = {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    borderRadius: '1.25rem', padding: '1.5rem',
    transition: 'transform 0.45s, opacity 0.45s',
    backfaceVisibility: 'hidden',
  };

  return (
    <div>
      {/* Card */}
      <div
        onClick={() => setFlipped(f => !f)}
        style={{
          position: 'relative',
          width: '100%', height: 220,
          cursor: 'pointer',
          marginBottom: '1.25rem',
        }}
      >
        {/* Front */}
        <div style={{
          ...sharedCardStyle,
          backgroundColor: '#fff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
          border: '1.5px solid #e2e8f0',
          opacity: flipped ? 0 : 1,
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}>
          <p style={{
            fontSize: '1.6rem', fontWeight: 700, color: '#1e293b',
            textAlign: 'center', margin: 0,
          }}>
            {displayLabel}
          </p>
          <span style={{
            position: 'absolute', bottom: '1rem',
            fontSize: '0.78rem', color: '#94a3b8', letterSpacing: '0.02em',
          }}>
            {isFr ? 'Appuyez pour révéler' : 'Tap to reveal'}
          </span>
        </div>

        {/* Back */}
        <div style={{
          ...sharedCardStyle,
          backgroundColor: '#eff6ff',
          boxShadow: '0 4px 20px rgba(27,79,216,0.13)',
          border: `1.5px solid ${BLUE}33`,
          opacity: flipped ? 1 : 0,
          transform: flipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
        }}>
          <p style={{
            fontSize: '2rem', fontWeight: 700, color: BLUE,
            textAlign: 'center', margin: '0 0 1rem',
          }}>
            {card.medumba}
          </p>
          <button
            onClick={e => { e.stopPropagation(); onPlay(card.audio); }}
            style={{
              background: 'none', border: `1.5px solid ${BLUE}55`,
              borderRadius: '999px', padding: '0.35rem 0.9rem',
              cursor: 'pointer', fontSize: '1.2rem', color: BLUE,
              fontFamily: "'Outfit', system-ui, sans-serif",
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = `${BLUE}15`}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
            title={speaking ? 'Playing…' : 'Play audio'}
          >
            {speaking ? '🔊' : '🔈'}
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={() => onAdvance(false)}
          style={{
            flex: 1, backgroundColor: '#fff1f2',
            color: '#dc2626', border: '1.5px solid #fecaca',
            borderRadius: '0.75rem', padding: '0.75rem 0.5rem',
            fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
            fontFamily: FONT, transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.78'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          ✗ {isFr ? 'À revoir' : 'Review again'}
        </button>
        <button
          onClick={() => onAdvance(true)}
          style={{
            flex: 1, backgroundColor: '#f0fdf4',
            color: '#16a34a', border: '1.5px solid #bbf7d0',
            borderRadius: '0.75rem', padding: '0.75rem 0.5rem',
            fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
            fontFamily: FONT, transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.78'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          ✓ {isFr ? 'Je sais !' : 'I know!'}
        </button>
      </div>
    </div>
  );
}

// ─── Quiz / Listen sub-component ──────────────────────────────────────────────

function QuizExercise({
  card, isFr, selectedOpt, setSelectedOpt,
  checked, setChecked, speaking, onPlay, onAdvance, showWord,
}) {
  const options = isFr ? card.optionsFr : card.options;
  const correctAnswer = isFr ? card.french : card.english;
  const isCorrect = selectedOpt === correctAnswer;

  function handleCheck() {
    if (!checked && selectedOpt !== null) {
      setChecked(true);
    }
  }

  function getOptStyle(opt) {
    const base = {
      border: '1.5px solid #e2e8f0',
      borderRadius: '0.75rem',
      padding: '0.7rem 0.85rem',
      fontSize: '0.95rem',
      fontWeight: 500,
      cursor: checked ? 'default' : 'pointer',
      textAlign: 'left',
      fontFamily: FONT,
      transition: 'background 0.15s, border-color 0.15s',
      width: '100%',
    };

    if (!checked) {
      if (selectedOpt === opt) {
        return { ...base, backgroundColor: '#eff6ff', borderColor: BLUE, color: BLUE, fontWeight: 600 };
      }
      return { ...base, backgroundColor: '#fff', color: '#374151' };
    }

    // After check
    if (opt === correctAnswer) {
      return { ...base, backgroundColor: '#f0fdf4', borderColor: '#22c55e', color: '#15803d', fontWeight: 600 };
    }
    if (selectedOpt === opt && opt !== correctAnswer) {
      return { ...base, backgroundColor: '#fff1f2', borderColor: '#ef4444', color: '#dc2626' };
    }
    return { ...base, backgroundColor: '#fafafa', color: '#94a3b8' };
  }

  return (
    <div>
      {/* Source card */}
      <div style={{
        backgroundColor: '#fff', borderRadius: '1.25rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1.5px solid #e2e8f0',
        padding: '1.5rem',
        textAlign: 'center',
        marginBottom: '1.25rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
      }}>
        {showWord ? (
          <>
            <p style={{
              fontSize: '2rem', fontWeight: 700, color: BLUE,
              margin: 0, wordBreak: 'break-word',
            }}>
              {card.medumba}
            </p>
            <button
              onClick={() => onPlay(card.audio)}
              style={{
                background: 'none', border: `1.5px solid ${BLUE}55`,
                borderRadius: '999px', padding: '0.35rem 0.9rem',
                cursor: 'pointer', fontSize: '1.2rem', color: BLUE,
                fontFamily: FONT, transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = `${BLUE}15`}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
              title={speaking ? 'Playing…' : 'Play audio'}
            >
              {speaking ? '🔊' : '🔈'}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onPlay(card.audio)}
              style={{
                width: 96, height: 96,
                borderRadius: '50%',
                border: `2.5px solid ${BLUE}`,
                backgroundColor: '#eff6ff',
                cursor: 'pointer',
                fontSize: '2.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: speaking ? `0 0 0 6px ${BLUE}22` : 'none',
                transition: 'box-shadow 0.3s',
                animation: speaking ? 'pulse 1.2s infinite' : 'none',
              }}
              title="Play audio"
            >
              {speaking ? '🔊' : '🔈'}
            </button>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
              {isFr ? 'Quel mot entendez-vous ?' : 'What word do you hear?'}
            </p>
          </>
        )}
      </div>

      {/* Options grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '0.6rem', marginBottom: '1rem',
      }}>
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => { if (!checked) setSelectedOpt(opt); }}
            style={getOptStyle(opt)}
          >
            {checked && opt === correctAnswer && <span style={{ marginRight: '0.3rem' }}>✓</span>}
            {checked && selectedOpt === opt && opt !== correctAnswer && <span style={{ marginRight: '0.3rem' }}>✗</span>}
            {opt}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {checked && (
        <div style={{
          backgroundColor: isCorrect ? '#f0fdf4' : '#fff1f2',
          border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
          borderRadius: '0.75rem',
          padding: '0.65rem 1rem',
          marginBottom: '0.9rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          fontSize: '0.9rem', fontWeight: 500,
          color: isCorrect ? '#15803d' : '#dc2626',
        }}>
          <span style={{ fontSize: '1.1rem' }}>{isCorrect ? '🎉' : '💡'}</span>
          {isCorrect
            ? (isFr ? 'Bonne réponse !' : 'Correct!')
            : (isFr
                ? `La bonne réponse est : ${correctAnswer}`
                : `The correct answer is: ${correctAnswer}`)}
        </div>
      )}

      {/* Check / Continue button */}
      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={selectedOpt === null}
          style={{
            width: '100%',
            backgroundColor: selectedOpt !== null ? BLUE : '#e2e8f0',
            color: selectedOpt !== null ? '#fff' : '#94a3b8',
            border: 'none', borderRadius: '0.75rem',
            padding: '0.8rem', fontSize: '1rem',
            fontWeight: 600, cursor: selectedOpt !== null ? 'pointer' : 'not-allowed',
            fontFamily: FONT, transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => { if (selectedOpt !== null) e.currentTarget.style.opacity = '0.88'; }}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {isFr ? 'Vérifier →' : 'Check →'}
        </button>
      ) : (
        <button
          onClick={() => onAdvance(isCorrect)}
          style={{
            width: '100%',
            backgroundColor: BLUE, color: '#fff',
            border: 'none', borderRadius: '0.75rem',
            padding: '0.8rem', fontSize: '1rem',
            fontWeight: 600, cursor: 'pointer',
            fontFamily: FONT, transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {isFr ? 'Continuer →' : 'Continue →'}
        </button>
      )}
    </div>
  );
}
