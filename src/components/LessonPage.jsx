import { useState, useEffect, useRef, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { MEDUMBA_QUESTIONS } from '../data/medumbaDictionary';
import { MEDUMBA_EXPRESSIONS } from '../data/medumbaExpressions';
import { getExpressionsByLesson } from '../data/expressionsByLesson';
import { generateLessonQuestions } from '../utils/lessonGenerator';
import { playMedumbaWord, stopMedumbaAudio } from '../utils/medumbaAudio';
import frameImg from '../assets/Frame.png';
import celebrationImg from '../assets/Auto Layout Vertical.png';

/* ════════════════════════════════════════════════════════════════════
   QUESTION DATA
   Each question:
     sourceFr  — sentence shown when interface = French
     sourceEn  — sentence shown when interface = English
     answer    — correct word array (in target language)
     bank      — all tiles offered (answer + distractors)
     audio     — text fed to SpeechSynthesis (target lang)
════════════════════════════════════════════════════════════════════ */
const QUESTIONS = {
    /* ── English course ── */
    e1: [   // Hello!
        {
            sourceFr: 'Comment vous appelez-vous',
            sourceEn: 'What is your name',
            answer: ['What', 'is', 'your', 'name'],
            bank:   ['What', 'is', 'your', 'name', 'Who', 'are', 'you', 'my'],
            audio:  'What is your name',
        },
        {
            sourceFr: 'Je m\'appelle Marie',
            sourceEn: 'My name is Marie',
            answer: ['My', 'name', 'is', 'Marie'],
            bank:   ['My', 'name', 'is', 'Marie', 'Her', 'your', 'was', 'John'],
            audio:  'My name is Marie',
        },
        {
            sourceFr: 'Enchanté de vous rencontrer',
            sourceEn: 'Nice to meet you',
            answer: ['Nice', 'to', 'meet', 'you'],
            bank:   ['Nice', 'to', 'meet', 'you', 'Good', 'see', 'him', 'great'],
            audio:  'Nice to meet you',
        },
    ],
    e2: [   // Alphabet
        {
            sourceFr: 'Je marche et elle nage',
            sourceEn: 'I walk and she swims',
            answer: ['I', 'walk', 'and', 'she', 'swims'],
            bank:   ['I', 'walk', 'and', 'she', 'swims', 'runs', 'he', 'we'],
            audio:  'I walk and she swims',
        },
        {
            sourceFr: 'Il mange une pomme',
            sourceEn: 'He eats an apple',
            answer: ['He', 'eats', 'an', 'apple'],
            bank:   ['He', 'eats', 'an', 'apple', 'she', 'drinks', 'the', 'banana'],
            audio:  'He eats an apple',
        },
        {
            sourceFr: 'Nous jouons ensemble',
            sourceEn: 'We play together',
            answer: ['We', 'play', 'together'],
            bank:   ['We', 'play', 'together', 'I', 'run', 'alone', 'they', 'jump'],
            audio:  'We play together',
        },
        {
            sourceFr: 'Elle lit un livre',
            sourceEn: 'She reads a book',
            answer: ['She', 'reads', 'a', 'book'],
            bank:   ['She', 'reads', 'a', 'book', 'he', 'writes', 'the', 'letter'],
            audio:  'She reads a book',
        },
        {
            sourceFr: 'Je t\'aime',
            sourceEn: 'I love you',
            answer: ['I', 'love', 'you'],
            bank:   ['I', 'love', 'you', 'she', 'like', 'him', 'we', 'hate'],
            audio:  'I love you',
        },
    ],
    e3: [   // Numbers
        {
            sourceFr: 'J\'ai vingt ans',
            sourceEn: 'I am twenty years old',
            answer: ['I', 'am', 'twenty', 'years', 'old'],
            bank:   ['I', 'am', 'twenty', 'years', 'old', 'she', 'thirty', 'ten', 'new'],
            audio:  'I am twenty years old',
        },
    ],
    e4: [   // Colors
        {
            sourceFr: 'Le ciel est bleu',
            sourceEn: 'The sky is blue',
            answer: ['The', 'sky', 'is', 'blue'],
            bank:   ['The', 'sky', 'is', 'blue', 'sea', 'green', 'was', 'red'],
            audio:  'The sky is blue',
        },
    ],
    e5: [   // Animals
        {
            sourceFr: 'Le chien court vite',
            sourceEn: 'The dog runs fast',
            answer: ['The', 'dog', 'runs', 'fast'],
            bank:   ['The', 'dog', 'runs', 'fast', 'cat', 'walks', 'slow', 'a'],
            audio:  'The dog runs fast',
        },
    ],
    e6: [   // Shopping
        {
            sourceFr: 'Combien ça coûte',
            sourceEn: 'How much does it cost',
            answer: ['How', 'much', 'does', 'it', 'cost'],
            bank:   ['How', 'much', 'does', 'it', 'cost', 'what', 'is', 'the', 'price'],
            audio:  'How much does it cost',
        },
    ],
    /* ── Medumba course — from Dictionnaire Ncobnkùn.xlsx ── */
    ...MEDUMBA_QUESTIONS,
};

/* fallback pool when no specific lesson data exists */
const FALLBACK_EN = QUESTIONS.e2;
const FALLBACK_MD = QUESTIONS.l1;

const DIAMONDS_PER_Q = 5;
const XP_PER_Q       = 10;
const FLASHCARD_COUNT = 3;  // expressions shown before exercises

/* Pick N random items from an array without mutation */
function pickRandom(pool, n) {
    return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

/* Build varied exercises from the STUDIED flashcards (not random pool).
   Types generated:
   1. MCQ  Fr → Medumba  (for each studied expression)
   2. MCQ  Medumba → Fr  (for each studied expression)
   3. Tile — reconstruct Medumba from words (multi-word expressions)
   4. Match — pair studied expressions
*/
function buildExpressionQuestions(studied, pool) {
    if (!studied || studied.length === 0) return [];
    const qs = [];

    /* helpers */
    const medDistractors = (exclude) =>
        pool.filter(e => e.medumba !== exclude)
            .sort(() => Math.random() - 0.5).slice(0, 3).map(e => e.medumba);
    const frDistractors = (exclude) =>
        pool.filter(e => e.fr !== exclude)
            .sort(() => Math.random() - 0.5).slice(0, 3).map(e => e.fr);
    const trunc = (s, n) => s.length > n ? s.slice(0, n) + '…' : s;

    /* 1 & 2 — MCQ both directions for each card */
    studied.forEach(expr => {
        /* Fr → Medumba */
        const optsA = [...medDistractors(expr.medumba), expr.medumba].sort(() => Math.random() - 0.5);
        qs.push({
            type: 'meaning',
            _exprDir: 'fr2med',
            sourceFr: expr.fr, sourceEn: expr.fr,
            options: optsA, optionsFr: optsA,
            answer: expr.medumba, answerFr: expr.medumba,
        });

        /* Medumba → Fr */
        const optsB = [...frDistractors(expr.fr), expr.fr].sort(() => Math.random() - 0.5);
        qs.push({
            type: 'meaning',
            _exprDir: 'med2fr',
            sourceFr: expr.medumba, sourceEn: expr.medumba,
            options: optsB, optionsFr: optsB,
            answer: expr.fr, answerFr: expr.fr,
        });
    });

    /* 3 — Tile: reconstruct multi-word Medumba expressions */
    studied
        .filter(e => {
            const w = e.medumba.trim().split(/\s+/);
            return w.length >= 2 && w.length <= 7;
        })
        .slice(0, 3)
        .forEach(expr => {
            const words = expr.medumba.trim().split(/\s+/);
            const allPoolWords = pool
                .filter(e => e.medumba !== expr.medumba)
                .flatMap(e => e.medumba.trim().split(/\s+/));
            const distractorWords = [...new Set(allPoolWords)]
                .filter(w => !words.includes(w))
                .sort(() => Math.random() - 0.5)
                .slice(0, Math.max(2, 8 - words.length));
            const bank = [...words, ...distractorWords].sort(() => Math.random() - 0.5);
            qs.push({
                type: 'tile',
                _exprDir: 'tile',
                sourceFr: expr.fr, sourceEn: expr.fr,
                answer: words, bank,
                audio: expr.medumba,
            });
        });

    /* 4 — Match: pair all studied cards */
    const matchPairs = studied.map(e => ({
        medumba: trunc(e.medumba, 30),
        french:  trunc(e.fr, 32),
        english: trunc(e.fr, 32),
    }));
    qs.push({ type: 'match', _exprDir: 'match', pairs: matchPairs });

    /* shuffle and return */
    return qs.sort(() => Math.random() - 0.5);
}

/* format seconds as M:SS */
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ════════════════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════════════════ */
const LessonPage = ({ lesson, learnLang, isFr, profile, onFinish, onShare, onClose }) => {
    const { isDark, T } = useTheme();
    /* themed expression pool for this lesson */
    const exprPool = useMemo(
        () => getExpressionsByLesson(lesson?.id),
        [lesson?.id],
    );

    /* flashcards shown once before exercises — drawn from themed pool */
    const flashcards = useMemo(() => pickRandom(exprPool, FLASHCARD_COUNT), [exprPool]);

    /* expression questions built from the 5 studied flashcards */
    const exprQuestions = useMemo(
        () => learnLang === 'medumba' ? buildExpressionQuestions(flashcards, exprPool) : [],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [flashcards, learnLang],
    );

    const MAX_QUESTIONS = 13;
    const questions = useMemo(
        () => {
            const base = generateLessonQuestions(lesson?.id, profile ?? {}, QUESTIONS, learnLang);
            return [...base, ...exprQuestions].slice(0, MAX_QUESTIONS);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [lesson?.id, learnLang],
    );

    /* phase: 'flashcards' → show study cards, 'exercise' → show questions */
    const [phase, setPhase] = useState('flashcards');
    const [cardIdx, setCardIdx] = useState(0);   // which flashcard is showing
    const [flipped, setFlipped] = useState(false); // show Medumba side
    const [cardSpeaking, setCardSpeaking] = useState(false); // lecture audio de la flashcard en cours

    // Stoppe l'audio en cours dès qu'on change de carte ou qu'on la retourne,
    // pour éviter qu'un mot continue à jouer par-dessus le suivant.
    useEffect(() => {
        stopMedumbaAudio();
        setCardSpeaking(false);
    }, [cardIdx, flipped]);

    const startTimeRef = useRef(Date.now());

    const [currentQ,       setCurrentQ]       = useState(0);
    /* tile state */
    const [placed,         setPlaced]         = useState([]);
    /* meaning / audio state */
    const [selectedOption, setSelectedOption] = useState(null);
    /* match state */
    const [leftSel,        setLeftSel]        = useState(null);
    const [matched,        setMatched]        = useState(new Set());
    const [wrongPair,      setWrongPair]      = useState(null);  // { left, right }
    /* shared state */
    const [status,         setStatus]         = useState(null);  // null | 'correct' | 'wrong'
    const [diamondsEarned, setDiamondsEarned] = useState(0);
    const [xpEarned,       setXpEarned]       = useState(0);
    const [correctCount,   setCorrectCount]   = useState(0);
    const [failed,          setFailed]         = useState(false);
    const [continueEnabled, setContinueEnabled] = useState(false);
    const [checkReady,      setCheckReady]      = useState(false);
    const [speaking,        setSpeaking]       = useState(false);
    const [showExitModal,   setShowExitModal]  = useState(false);
    const [comboCount,      setComboCount]     = useState(0);
    const [showComboToast,  setShowComboToast] = useState(false);

    const q    = questions[currentQ];
    const type = q?.type ?? 'tile';

    /* ── shuffle columns once per match question ── */
    const [shuffledLeft,  setShuffledLeft]  = useState([]);
    const [shuffledRight, setShuffledRight] = useState([]);

    useEffect(() => {
        if (type === 'match' && q?.pairs) {
            const left  = [...q.pairs].sort(() => Math.random() - 0.5);
            const right = [...q.pairs].sort(() => Math.random() - 0.5);
            setShuffledLeft(left);
            setShuffledRight(right);
            setMatched(new Set());
            setLeftSel(null);
            setWrongPair(null);
        }
        // Reset per-question state
        stopMedumbaAudio();
        setSpeaking(false);
        setPlaced([]);
        setSelectedOption(null);
        setStatus(null);
        setContinueEnabled(false);
        setCheckReady(false);
    }, [currentQ]);

    /* ── Combo toast auto-hide ── */
    useEffect(() => {
        if (!showComboToast) return;
        const t = setTimeout(() => setShowComboToast(false), 1400);
        return () => clearTimeout(t);
    }, [showComboToast]);

    /* ── Delay Continue button to prevent accidental double-tap ── */
    useEffect(() => {
        if (status === null) { setContinueEnabled(false); return; }
        const t = setTimeout(() => setContinueEnabled(true), 350);
        return () => clearTimeout(t);
    }, [status]);

    /* ── Delay Check button so user must make a deliberate second tap ── */
    useEffect(() => {
        setCheckReady(false);
        if (selectedOption === null) return;
        const t = setTimeout(() => setCheckReady(true), 300);
        return () => clearTimeout(t);
    }, [selectedOption]);

    useEffect(() => {
        setCheckReady(false);
        if (placed.length === 0) return;
        const t = setTimeout(() => setCheckReady(true), 300);
        return () => clearTimeout(t);
    }, [placed.length]);

    /* ── Audio auto-play for audio questions ── */
    useEffect(() => {
        if (type === 'audio' && q?.audio) {
            setTimeout(() => playAudio(q.audio), 400);
        }
    }, [currentQ, type]);

    /* ── Audio playback ─────────────────────────────────────────── */
    /* No synthetic voices anywhere: only real recorded Medumba clips play.
       English-track words and any Medumba word without a real recording
       stay silent rather than fake a pronunciation. */
    const playAudio = (text, _lang) => {
        if (!text || learnLang === 'english') return;
        playMedumbaWord(text,
            () => setSpeaking(true),
            () => setSpeaking(false),
        );
    };

    /* ── Tile word selection ── */
    const bank    = q?.bank ?? [];
    const answer  = q?.answer ?? [];
    const usedSet = new Set(placed);

    const pickWord   = (idx) => { if (status !== null || usedSet.has(idx)) return; setPlaced(p => [...p, idx]); };
    const removeWord = (pos) => { if (status !== null) return; setPlaced(p => p.filter((_, i) => i !== pos)); };

    /* ── Check (tile / meaning / audio) ── */
    const checkAnswer = () => {
        let correct = false;
        if (type === 'tile') {
            const ua = placed.map(i => bank[i]);
            correct  = ua.length === answer.length && ua.every((w, i) => w === answer[i]);
        } else {
            const ans = isFr ? q.answerFr : q.answer;
            correct   = selectedOption === ans;
        }
        setStatus(correct ? 'correct' : 'wrong');
        if (correct) {
            const newCombo = comboCount + 1;
            setComboCount(newCombo);
            const xpMultiplier = newCombo >= 4 ? 2 : newCombo >= 2 ? 1.5 : 1;
            const bonusXp = Math.round(XP_PER_Q * xpMultiplier);
            setDiamondsEarned(d => d + DIAMONDS_PER_Q);
            setXpEarned(x => x + bonusXp);
            setCorrectCount(c => c + 1);
            if (newCombo >= 2) setShowComboToast(true);
        } else {
            setComboCount(0);
        }
    };

    /* ── Match pair tap ── */
    const tapLeft  = (pair) => { if (status !== null) return; setLeftSel(pair.medumba); setWrongPair(null); };
    const tapRight = (pair) => {
        if (status !== null || !leftSel) return;
        const isMatch = q.pairs.some(p => p.medumba === leftSel && p === pair);
        if (isMatch) {
            const next = new Set(matched);
            next.add(leftSel);
            setMatched(next);
            setLeftSel(null);
            setWrongPair(null);
            if (next.size === q.pairs.length) {
                // All matched — award and advance
                setDiamondsEarned(d => d + DIAMONDS_PER_Q * q.pairs.length);
                setXpEarned(x => x + XP_PER_Q * q.pairs.length);
                setCorrectCount(c => c + 1);
                setTimeout(handleContinue, 600);
            }
        } else {
            setWrongPair({ left: leftSel, right: pair.medumba });
            setLeftSel(null);
            setTimeout(() => setWrongPair(null), 700);
        }
    };

    /* ── Continue ── */
    const handleContinue = () => {
        if (currentQ >= questions.length - 1) {
            const pct = questions.length > 0 ? correctCount / questions.length : 0;
            if (pct >= 0.6) {
                const elapsed  = Math.floor((Date.now() - startTimeRef.current) / 1000);
                const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
                onFinish({ xp: xpEarned, diamonds: diamondsEarned, time: elapsed, accuracy });
            } else {
                setFailed(true);
            }
        } else {
            setCurrentQ(q => q + 1);
        }
    };

    const restartLesson = () => {
        startTimeRef.current = Date.now();
        setPhase('flashcards');
        setCardIdx(0);
        setFlipped(false);
        setCurrentQ(0);
        setPlaced([]);
        setSelectedOption(null);
        setLeftSel(null);
        setMatched(new Set());
        setWrongPair(null);
        setStatus(null);
        setContinueEnabled(false);
        setCheckReady(false);
        setDiamondsEarned(0);
        setXpEarned(0);
        setCorrectCount(0);
        setFailed(false);
        setComboCount(0);
        setShowComboToast(false);
    };

    const canCheck = type === 'tile'
        ? placed.length > 0 && status === null
        : selectedOption !== null && status === null;

    const progress = questions.length > 0
        ? Math.round((currentQ / questions.length) * 100)
        : 0;

    /* ════════════════════════════════════════════════════
       FLASHCARD PHASE — study expressions before exercises
    ════════════════════════════════════════════════════ */
    if (phase === 'flashcards' && learnLang === 'medumba') {
        const card = flashcards[cardIdx];
        const isLast = cardIdx === flashcards.length - 1;
        return (
            <div style={{
                width: '100%', height: '100vh',
                backgroundColor: '#f0f7ff',
                display: 'flex', flexDirection: 'column',
                fontFamily: "'Outfit', system-ui, sans-serif",
                overflow: 'hidden',
            }}>
                {/* Top bar */}
                <div style={{
                    backgroundColor: T.surface, borderBottom: `2px solid ${T.border}`,
                    padding: '0.85rem 1.5rem',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                }}>
                    <button onClick={() => onClose?.()} style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        border: `2px solid ${T.border}`, backgroundColor: 'transparent',
                        cursor: 'pointer', fontSize: '1rem', color: T.textMuted,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'inherit',
                    }}>✕</button>
                    <div style={{ flex: 1, height: '10px', backgroundColor: T.border, borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            width: `${((cardIdx + 1) / flashcards.length) * 100}%`,
                            background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                            borderRadius: '99px', transition: 'width 0.4s ease',
                        }} />
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#7c3aed', whiteSpace: 'nowrap' }}>
                        {cardIdx + 1} / {flashcards.length}
                    </span>
                </div>

                {/* Header */}
                <div style={{ textAlign: 'center', padding: '1.25rem 1.5rem 0.5rem' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📖</div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
                        {isFr ? 'Expressions à retenir' : 'Expressions to learn'}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: T.textMuted, margin: '0.25rem 0 0' }}>
                        {isFr
                            ? `Expressions liées à : ${lesson?.titleFr ?? 'cette leçon'} — étudiez-les avant de commencer.`
                            : `Expressions for: ${lesson?.titleEn ?? 'this lesson'} — study them before starting.`}
                    </p>
                </div>

                {/* Flashcard */}
                <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '1rem 1.5rem',
                }}>
                    <div
                        onClick={() => setFlipped(f => !f)}
                        style={{
                            width: '100%', maxWidth: '400px',
                            backgroundColor: flipped ? '#7c3aed' : '#fff',
                            border: `2px solid ${flipped ? '#6d28d9' : '#e2e8f0'}`,
                            borderRadius: '24px',
                            padding: '2.5rem 2rem',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s, border-color 0.3s',
                            minHeight: '200px',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            textAlign: 'center', gap: '0.75rem',
                        }}
                    >
                        <div style={{
                            fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase',
                            letterSpacing: '0.8px',
                            color: flipped ? 'rgba(255,255,255,0.7)' : '#94a3b8',
                        }}>
                            {flipped ? 'Medumba' : (isFr ? 'Français' : 'French')}
                        </div>
                        <div style={{
                            fontSize: '1.2rem', fontWeight: '800', lineHeight: 1.4,
                            color: flipped ? '#fff' : '#0f172a',
                        }}>
                            {flipped ? card.medumba : card.fr}
                        </div>
                        {flipped && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (cardSpeaking) { stopMedumbaAudio(); setCardSpeaking(false); return; }
                                    setCardSpeaking(true);
                                    playMedumbaWord(card.medumba, null, () => setCardSpeaking(false));
                                }}
                                style={{
                                    width: '42px', height: '42px', borderRadius: '50%',
                                    backgroundColor: cardSpeaking ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
                                    border: '2px solid rgba(255,255,255,0.5)',
                                    cursor: 'pointer', fontSize: '1.1rem', color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginTop: '0.25rem',
                                }}
                            >
                                {cardSpeaking ? '🔊' : '🔈'}
                            </button>
                        )}
                        {!flipped && (
                            <div style={{ fontSize: '0.75rem', color: T.textSub, marginTop: '0.5rem' }}>
                                {isFr ? '👆 Appuyez pour voir la traduction' : '👆 Tap to see translation'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '0.75rem', maxWidth: '400px', width: '100%', margin: '0 auto' }}>
                    {cardIdx > 0 && (
                        <button onClick={() => { setCardIdx(i => i - 1); setFlipped(false); }} style={{
                            flex: 1, padding: '0.9rem', borderRadius: '9999px',
                            backgroundColor: '#eff6ff', color: '#0056D2',
                            border: '2px solid #bfdbfe', fontWeight: '700', fontSize: '0.95rem',
                            cursor: 'pointer', fontFamily: 'inherit',
                        }}>← {isFr ? 'Précédent' : 'Previous'}</button>
                    )}
                    {!isLast ? (
                        <button onClick={() => { setCardIdx(i => i + 1); setFlipped(false); }} style={{
                            flex: 2, padding: '0.9rem', borderRadius: '9999px',
                            backgroundColor: '#7c3aed', color: '#fff',
                            border: 'none', fontWeight: '700', fontSize: '0.95rem',
                            cursor: 'pointer', fontFamily: 'inherit',
                            boxShadow: '0 6px 16px rgba(124,58,237,0.35)',
                        }}>
                            {isFr ? 'Suivant →' : 'Next →'}
                        </button>
                    ) : (
                        <button onClick={() => setPhase('exercise')} style={{
                            flex: 2, padding: '0.9rem', borderRadius: '9999px',
                            backgroundColor: '#0056D2', color: '#fff',
                            border: 'none', fontWeight: '700', fontSize: '0.95rem',
                            cursor: 'pointer', fontFamily: 'inherit',
                            boxShadow: '0 6px 16px rgba(0,86,210,0.35)',
                        }}>
                            {isFr ? '🚀 Commencer l\'exercice' : '🚀 Start exercises'}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    /* ════════════════════════════════════════════════════
       FAILED SCREEN — score < 60%
    ════════════════════════════════════════════════════ */
    if (failed) {
        const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
        return (
            <div style={{
                width: '100%', height: '100vh',
                backgroundColor: isDark ? '#2d1515' : '#fef2f2',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '2rem 1.5rem', textAlign: 'center',
                fontFamily: "'Outfit', system-ui, sans-serif",
                gap: '1.25rem',
            }}>
                <div style={{ fontSize: '5rem', lineHeight: 1 }}>😓</div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#dc2626', margin: 0 }}>
                    {isFr ? 'Score insuffisant' : 'Score too low'}
                </h1>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: T.text }}>
                    {correctCount} / {questions.length}
                    <span style={{ fontSize: '1.1rem', color: T.textMuted, marginLeft: '0.5rem' }}>({accuracy}%)</span>
                </div>
                <div style={{
                    backgroundColor: '#fee2e2', border: '2px solid #fca5a5',
                    borderRadius: '16px', padding: '1rem 1.25rem',
                    color: '#dc2626', fontWeight: '700', fontSize: '0.95rem',
                    maxWidth: '320px', width: '100%',
                }}>
                    {isFr
                        ? 'Vous devez obtenir au moins 60% pour réussir. Recommencez !'
                        : 'You need at least 60% to pass. Please try again!'}
                </div>
                <button
                    onClick={restartLesson}
                    style={{
                        backgroundColor: '#ef4444', color: '#fff',
                        border: 'none', borderRadius: '9999px',
                        padding: '1rem 2.5rem', fontWeight: '800',
                        fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit',
                        boxShadow: '0 6px 16px rgba(239,68,68,0.35)',
                    }}
                >
                    {isFr ? '🔄 Recommencer' : '🔄 Restart lesson'}
                </button>
            </div>
        );
    }

    /* ════════════════════════════════════════════════════
       MAIN EXERCISE SCREEN
    ════════════════════════════════════════════════════ */
    const feedbackCorrect = status === 'correct';

    /* ── Meaning / Audio options ── */
    const options    = isFr ? (q?.optionsFr ?? []) : (q?.options ?? []);
    const correctAns = isFr ? q?.answerFr : q?.answer;

    return (
        <div style={{
            width: '100%', height: '100vh',
            backgroundColor: T.bg,
            display: 'flex', flexDirection: 'column',
            fontFamily: "'Outfit', system-ui, sans-serif",
            overflow: 'hidden',
        }}>
            <style>{`
                @keyframes tile-pop {
                    0%   { transform: scale(0.8); opacity: 0; }
                    60%  { transform: scale(1.08); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes feedback-slide {
                    from { transform: translateY(100%); }
                    to   { transform: translateY(0); }
                }
                @keyframes speaker-wave {
                    0%, 100% { transform: scale(1); }
                    50%      { transform: scale(1.25); }
                }
                @keyframes wrong-flash {
                    0%, 100% { background-color: #fef2f2; }
                    50%      { background-color: #fecaca; }
                }
                @keyframes audio-pulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,86,210,0.4); }
                    50%      { transform: scale(1.06); box-shadow: 0 0 0 16px rgba(0,86,210,0); }
                }
                @keyframes modal-in {
                    from { transform: scale(0.85) translateY(20px); opacity: 0; }
                    to   { transform: scale(1) translateY(0);        opacity: 1; }
                }
                @keyframes combo-pop {
                    0%   { transform: scale(0.5) translateY(0);   opacity: 0; }
                    40%  { transform: scale(1.25) translateY(-8px); opacity: 1; }
                    70%  { transform: scale(1) translateY(-4px);   opacity: 1; }
                    100% { transform: scale(0.9) translateY(-16px); opacity: 0; }
                }
                @keyframes shake {
                    0%,100% { transform: translateX(0); }
                    20%     { transform: translateX(-6px); }
                    40%     { transform: translateX(6px); }
                    60%     { transform: translateX(-4px); }
                    80%     { transform: translateX(4px); }
                }
            `}</style>

            {/* ── Combo toast ── */}
            {showComboToast && (
                <div style={{
                    position: 'fixed', top: '22%', left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 200, pointerEvents: 'none',
                    animation: 'combo-pop 1.4s ease-out forwards',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    backgroundColor: '#fff7ed', border: '2.5px solid #f97316',
                    borderRadius: '99px', padding: '0.5rem 1.25rem',
                    boxShadow: '0 6px 24px rgba(249,115,22,0.35)',
                    whiteSpace: 'nowrap',
                }}>
                    <span style={{ fontSize: '1.4rem' }}>🔥</span>
                    <span style={{ fontWeight: '900', fontSize: '1.05rem', color: '#ea580c' }}>
                        x{comboCount} COMBO!
                    </span>
                    {comboCount >= 4 && <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#f97316', backgroundColor: T.surface, borderRadius: '6px', padding: '1px 6px' }}>x2 XP</span>}
                    {comboCount >= 2 && comboCount < 4 && <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#f97316', backgroundColor: T.surface, borderRadius: '6px', padding: '1px 6px' }}>+50% XP</span>}
                </div>
            )}

            {/* ── Exit confirmation modal ── */}
            {showExitModal && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 999,
                    backgroundColor: 'rgba(15,23,42,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '1.5rem',
                }}>
                    <div style={{
                        backgroundColor: T.surface, borderRadius: '28px',
                        padding: '2.25rem 1.75rem', width: '100%', maxWidth: '340px',
                        textAlign: 'center', boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
                        animation: 'modal-in 0.25s cubic-bezier(0.175,0.885,0.32,1.275) both',
                        fontFamily: "'Outfit', system-ui, sans-serif",
                    }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem', lineHeight: 1 }}>😟</div>
                        <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: T.text, marginBottom: '0.5rem' }}>
                            {isFr ? 'Quitter la leçon ?' : 'Leave the lesson?'}
                        </h2>
                        <p style={{ fontSize: '0.9rem', color: T.textMuted, marginBottom: '1.75rem', lineHeight: 1.6 }}>
                            {isFr
                                ? 'Votre progression dans cet exercice sera perdue.'
                                : 'Your progress in this exercise will be lost.'}
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={onClose}
                                style={{
                                    flex: 1, padding: '0.9rem', borderRadius: '9999px',
                                    backgroundColor: '#fee2e2', color: '#dc2626',
                                    border: '2px solid #fecaca', fontWeight: '700',
                                    fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit',
                                }}
                            >
                                {isFr ? 'Quitter' : 'Leave'}
                            </button>
                            <button
                                onClick={() => setShowExitModal(false)}
                                style={{
                                    flex: 2, padding: '0.9rem', borderRadius: '9999px',
                                    backgroundColor: '#0056D2', color: '#fff',
                                    border: 'none', fontWeight: '700',
                                    fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit',
                                    boxShadow: '0 6px 16px rgba(0,86,210,0.35)',
                                }}
                            >
                                {isFr ? 'Continuer ✊' : 'Keep going ✊'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Top bar ── */}
            <div style={{
                backgroundColor: T.surface, borderBottom: `2px solid ${T.border}`,
                padding: '0.85rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0,
            }}>
                <button onClick={() => setShowExitModal(true)} style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    border: `2px solid ${T.border}`, backgroundColor: 'transparent',
                    cursor: 'pointer', fontSize: '1rem', fontWeight: '700',
                    color: T.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontFamily: 'inherit',
                }}>✕</button>

                <div style={{ flex: 1, height: '14px', backgroundColor: T.border, borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%', width: `${progress}%`,
                        background: 'linear-gradient(90deg, #0056D2, #38bdf8)',
                        borderRadius: '99px', transition: 'width 0.5s ease',
                    }} />
                </div>

                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0056D2', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {currentQ + 1} / {questions.length}
                </span>

                <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0',
                    borderRadius: '99px', padding: '0.3rem 0.75rem', flexShrink: 0,
                }}>
                    <span style={{ fontSize: '0.9rem' }}>💎</span>
                    <span style={{ fontWeight: '800', fontSize: '0.82rem', color: '#16a34a' }}>+{diamondsEarned}</span>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="lesson-content" style={{
                flex: 1, overflowY: 'auto',
                padding: '1.75rem 1.5rem 0',
                display: 'flex', flexDirection: 'column',
                maxWidth: '640px', width: '100%', margin: '0 auto',
                position: 'relative',
            }}>
                {/* Frame decoration */}
                <img src={frameImg} alt="" aria-hidden="true" style={{
                    position: 'absolute', top: '0.5rem', right: '1rem',
                    width: '72px', height: 'auto', opacity: 0.9,
                    pointerEvents: 'none',
                }} />

                {/* ── Instruction ── */}
                <p style={{
                    fontSize: '0.78rem', fontWeight: '700', color: T.textMuted,
                    textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.35rem',
                }}>
                    {type === 'tile'        && (q?._exprDir === 'tile'
                        ? (isFr ? 'Reconstruisez l\'expression' : 'Reconstruct the expression')
                        : (isFr ? 'Traduisez cette phrase' : 'Translate this sentence'))}
                    {type === 'meaning'     && (q?._exprDir === 'med2fr'
                        ? (isFr ? 'Quelle est la traduction française ?' : 'What is the French translation?')
                        : (isFr ? 'Quel mot Medumba correspond ?' : 'Which Medumba word matches?'))}
                    {type === 'audio'       && (isFr ? "Qu'est-ce que dit l'audio ?" : 'What does the audio say?')}
                    {type === 'match'       && (isFr ? 'Associez les mots' : 'Match the words')}
                    {type === 'image_vocab' && (isFr ? 'Comment dit-on cela en Medumba ?' : 'How do you say this in Medumba?')}
                </p>

                {/* ════ TILE exercise ════ */}
                {type === 'tile' && (<>
                    {/* Source sentence card */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        backgroundColor: T.surface, border: `2px solid ${T.border}`,
                        borderRadius: '18px', padding: '1.1rem 1.3rem',
                        marginBottom: '1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}>
                        <button type="button" onClick={(e) => { e.stopPropagation(); playAudio(q?.audio); }} style={{
                            width: '48px', height: '48px', borderRadius: '50%',
                            backgroundColor: speaking ? '#eff6ff' : '#f8fafc',
                            border: `2px solid ${speaking ? '#0056D2' : '#e2e8f0'}`,
                            cursor: 'pointer', fontSize: '1.4rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, transition: 'all 0.15s',
                            animation: speaking ? 'speaker-wave 0.6s ease-in-out infinite' : 'none',
                        }}>
                            {speaking ? '🔊' : '🔈'}
                        </button>
                        <span style={{ fontSize: '1.25rem', fontWeight: '700', color: T.text, lineHeight: 1.4 }}>
                            {isFr ? (q?.sourceFr ?? '') : (q?.sourceEn ?? '')}
                        </span>
                    </div>

                    {/* Answer area */}
                    <div style={{
                        minHeight: '72px',
                        border: `2px dashed ${placed.length > 0 ? '#0056D2' : '#cbd5e1'}`,
                        borderRadius: '16px',
                        backgroundColor: placed.length > 0 ? '#eff6ff' : '#f8fafc',
                        padding: '0.75rem 1rem',
                        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem',
                        marginBottom: '1.5rem', transition: 'all 0.2s',
                    }}>
                        {placed.length === 0 ? (
                            <span style={{ color: T.textSub, fontSize: '0.85rem', fontWeight: '600' }}>
                                {isFr ? 'Sélectionnez les mots ci-dessous…' : 'Tap words below to build your answer…'}
                            </span>
                        ) : placed.map((bankIdx, pos) => (
                            <button key={pos} onClick={() => removeWord(pos)} disabled={status !== null} style={{
                                padding: '0.45rem 1rem', borderRadius: '10px',
                                backgroundColor: '#0056D2', color: '#fff',
                                border: '2px solid #0041a3', fontWeight: '700', fontSize: '0.95rem',
                                cursor: status !== null ? 'default' : 'pointer', fontFamily: 'inherit',
                                animation: 'tile-pop 0.2s ease-out both',
                                boxShadow: '0 3px 0 #0041a3', transition: 'transform 0.1s',
                            }}
                                onMouseDown={e => { if (status === null) e.currentTarget.style.transform = 'translateY(3px)'; }}
                                onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >{bank[bankIdx]}</button>
                        ))}
                    </div>

                    {/* Word bank */}
                    <div style={{ fontSize: '0.7rem', fontWeight: '700', color: T.textSub, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.65rem' }}>
                        {isFr ? 'Mots disponibles' : 'Available words'}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '1.5rem' }}>
                        {bank.map((word, idx) => {
                            const used = usedSet.has(idx);
                            return (
                                <button key={idx} onClick={() => pickWord(idx)} disabled={used || status !== null} style={{
                                    padding: '0.48rem 1rem', borderRadius: '10px',
                                    backgroundColor: used ? '#f1f5f9' : '#fff',
                                    color: used ? '#cbd5e1' : '#0f172a',
                                    border: `2px solid ${used ? '#e2e8f0' : '#cbd5e1'}`,
                                    fontWeight: '700', fontSize: '0.95rem',
                                    cursor: used || status !== null ? 'default' : 'pointer', fontFamily: 'inherit',
                                    boxShadow: used ? 'none' : '0 3px 0 #cbd5e1',
                                    transition: 'all 0.12s', opacity: used ? 0.4 : 1,
                                }}
                                    onMouseDown={e => { if (!used && status === null) e.currentTarget.style.transform = 'translateY(3px)'; }}
                                    onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >{word}</button>
                            );
                        })}
                    </div>
                </>)}

                {/* ════ MEANING exercise ════ */}
                {type === 'meaning' && (<>
                    <div style={{
                        backgroundColor: T.surface, border: `2px solid ${T.border}`,
                        borderRadius: '18px', padding: '1.4rem 1.5rem',
                        marginBottom: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: '700', color: T.textSub, textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.5rem' }}>
                            {q?._exprDir === 'med2fr'
                                ? (isFr ? 'Expression Medumba' : 'Medumba expression')
                                : (isFr ? 'Mot en français' : 'Word in English')}
                        </div>
                        <span style={{ fontSize: q?._exprDir ? '1.3rem' : '2rem', fontWeight: '900', color: T.text, lineHeight: 1.3 }}>
                            {isFr ? q?.sourceFr : q?.sourceEn}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: q?._exprDir === 'med2fr' ? '1fr' : '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {options.map(opt => {
                            const isSelected = selectedOption === opt;
                            const isCorrect  = status !== null && opt === correctAns;
                            const isWrong    = status === 'wrong' && isSelected;
                            return (
                                <button key={opt} onClick={() => { if (status === null) setSelectedOption(opt); }} disabled={status !== null} style={{
                                    padding: '1rem 0.75rem', borderRadius: '14px', fontFamily: 'inherit',
                                    fontSize: q?._exprDir === 'med2fr' ? '0.9rem' : '1rem', fontWeight: '700', cursor: status !== null ? 'default' : 'pointer',
                                    textAlign: 'left',
                                    backgroundColor: isCorrect ? '#dcfce7' : isWrong ? '#fee2e2' : isSelected ? '#eff6ff' : '#fff',
                                    border: `2px solid ${isCorrect ? '#22c55e' : isWrong ? '#ef4444' : isSelected ? '#0056D2' : '#e2e8f0'}`,
                                    color: isCorrect ? '#16a34a' : isWrong ? '#dc2626' : isSelected ? '#0056D2' : '#0f172a',
                                    transition: 'all 0.15s', boxShadow: isSelected && status === null ? '0 4px 12px rgba(0,86,210,0.2)' : 'none',
                                }}>{opt}</button>
                            );
                        })}
                    </div>
                </>)}

                {/* ════ AUDIO exercise ════ */}
                {type === 'audio' && (<>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.75rem', gap: '0.75rem' }}>
                        <button type="button" onClick={(e) => { e.stopPropagation(); playAudio(q?.audio); }} style={{
                            width: '96px', height: '96px', borderRadius: '50%',
                            backgroundColor: '#eff6ff', border: '4px solid #0056D2',
                            cursor: 'pointer', fontSize: '2.5rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            animation: speaking ? 'speaker-wave 0.6s ease-in-out infinite' : 'audio-pulse 2s ease-in-out infinite',
                        }}>{speaking ? '🔊' : '🔈'}</button>
                        <span style={{ fontSize: '0.82rem', fontWeight: '700', color: T.textMuted }}>
                            {isFr ? 'Appuyer pour rejouer' : 'Tap to replay'}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {options.map(opt => {
                            const isSelected = selectedOption === opt;
                            const isCorrect  = status !== null && opt === correctAns;
                            const isWrong    = status === 'wrong' && isSelected;
                            return (
                                <button key={opt} onClick={() => { if (status === null) setSelectedOption(opt); }} disabled={status !== null} style={{
                                    padding: '1rem 0.75rem', borderRadius: '14px', fontFamily: 'inherit',
                                    fontSize: '1rem', fontWeight: '700', cursor: status !== null ? 'default' : 'pointer',
                                    backgroundColor: isCorrect ? '#dcfce7' : isWrong ? '#fee2e2' : isSelected ? '#eff6ff' : '#fff',
                                    border: `2px solid ${isCorrect ? '#22c55e' : isWrong ? '#ef4444' : isSelected ? '#0056D2' : '#e2e8f0'}`,
                                    color: isCorrect ? '#16a34a' : isWrong ? '#dc2626' : isSelected ? '#0056D2' : '#0f172a',
                                    transition: 'all 0.15s',
                                }}>{opt}</button>
                            );
                        })}
                    </div>
                </>)}

                {/* ════ IMAGE VOCAB exercise ════ */}
                {type === 'image_vocab' && (<>
                    {/* Emoji image card */}
                    <div style={{
                        backgroundColor: T.surface, border: `2px solid ${T.border}`,
                        borderRadius: '20px', padding: '1.5rem 1.5rem 1.25rem',
                        marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            fontSize: '6rem', lineHeight: 1, marginBottom: '0.85rem',
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))',
                        }}>
                            {q?.emoji}
                        </div>
                        <div style={{ fontSize: '0.68rem', fontWeight: '700', color: T.textSub, textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.25rem' }}>
                            {isFr ? 'En français' : 'In English'}
                        </div>
                        <div style={{ fontSize: '1.6rem', fontWeight: '900', color: T.text }}>
                            {isFr ? q?.labelFr : q?.labelEn}
                        </div>
                        {q?.audio && (
                            <button type="button" onClick={(e) => { e.stopPropagation(); playAudio(q.audio); }} style={{
                                marginTop: '0.75rem',
                                width: '40px', height: '40px', borderRadius: '50%',
                                backgroundColor: speaking ? '#eff6ff' : '#f8fafc',
                                border: `2px solid ${speaking ? '#0056D2' : '#e2e8f0'}`,
                                cursor: 'pointer', fontSize: '1.1rem',
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.15s',
                                animation: speaking ? 'speaker-wave 0.6s ease-in-out infinite' : 'none',
                            }}>
                                {speaking ? '🔊' : '🔈'}
                            </button>
                        )}
                    </div>

                    {/* 2×2 Medumba word options */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {(q?.options ?? []).map(opt => {
                            const isSelected = selectedOption === opt;
                            const isCorrect  = status !== null && opt === q?.answer;
                            const isWrong    = status === 'wrong' && isSelected;
                            return (
                                <button key={opt} onClick={() => { if (status === null) setSelectedOption(opt); }} disabled={status !== null} style={{
                                    padding: '1rem 0.75rem', borderRadius: '14px', fontFamily: 'inherit',
                                    fontSize: '1rem', fontWeight: '700', cursor: status !== null ? 'default' : 'pointer',
                                    backgroundColor: isCorrect ? '#dcfce7' : isWrong ? '#fee2e2' : isSelected ? '#eff6ff' : '#fff',
                                    border: `2px solid ${isCorrect ? '#22c55e' : isWrong ? '#ef4444' : isSelected ? '#0056D2' : '#e2e8f0'}`,
                                    color: isCorrect ? '#16a34a' : isWrong ? '#dc2626' : isSelected ? '#0056D2' : '#0f172a',
                                    transition: 'all 0.15s', boxShadow: isSelected && status === null ? '0 4px 12px rgba(0,86,210,0.2)' : 'none',
                                }}>{opt}</button>
                            );
                        })}
                    </div>
                </>)}

                {/* ════ MATCH exercise ════ */}
                {type === 'match' && (
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {/* Left column — Medumba */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: T.textSub, textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.25rem' }}>
                                Medumba
                            </div>
                            {shuffledLeft.map(pair => {
                                const isMatched = matched.has(pair.medumba);
                                const isSelected = leftSel === pair.medumba;
                                const isWrong  = wrongPair?.left === pair.medumba;
                                return (
                                    <button key={pair.medumba} onClick={() => !isMatched && tapLeft(pair)} disabled={isMatched} style={{
                                        padding: '0.75rem', borderRadius: '12px', fontFamily: 'inherit',
                                        fontSize: '0.95rem', fontWeight: '700', cursor: isMatched ? 'default' : 'pointer',
                                        backgroundColor: isMatched ? '#dcfce7' : isWrong ? '#fee2e2' : isSelected ? '#eff6ff' : '#fff',
                                        border: `2px solid ${isMatched ? '#22c55e' : isWrong ? '#ef4444' : isSelected ? '#0056D2' : '#e2e8f0'}`,
                                        color: isMatched ? '#16a34a' : isWrong ? '#dc2626' : isSelected ? '#0056D2' : '#0f172a',
                                        transition: 'all 0.15s',
                                        animation: isWrong ? 'wrong-flash 0.35s ease-in-out 2' : 'none',
                                    }}>{pair.medumba}</button>
                                );
                            })}
                        </div>

                        {/* Right column — Translation */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: T.textSub, textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.25rem' }}>
                                {isFr ? 'Français' : 'English'}
                            </div>
                            {shuffledRight.map(pair => {
                                const label     = isFr ? pair.french : pair.english;
                                const isMatched = matched.has(pair.medumba);
                                const isWrong   = wrongPair?.right === pair.medumba;
                                return (
                                    <button key={pair.medumba} onClick={() => !isMatched && tapRight(pair)} disabled={isMatched || !leftSel} style={{
                                        padding: '0.75rem', borderRadius: '12px', fontFamily: 'inherit',
                                        fontSize: '0.95rem', fontWeight: '700',
                                        cursor: isMatched || !leftSel ? 'default' : 'pointer',
                                        backgroundColor: isMatched ? '#dcfce7' : isWrong ? '#fee2e2' : leftSel ? '#fffbeb' : '#fff',
                                        border: `2px solid ${isMatched ? '#22c55e' : isWrong ? '#ef4444' : leftSel ? '#f59e0b' : '#e2e8f0'}`,
                                        color: isMatched ? '#16a34a' : isWrong ? '#dc2626' : '#0f172a',
                                        transition: 'all 0.15s',
                                        animation: isWrong ? 'wrong-flash 0.35s ease-in-out 2' : 'none',
                                    }}>{label}</button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Bottom action / feedback ── */}
            {status === 'wrong' && (
                <style>{`.lesson-content { animation: shake 0.35s ease-out; }`}</style>
            )}
            {type === 'match' ? null : status === null ? (
                <div style={{
                    padding: '1rem 1.5rem', borderTop: '2px solid #e5e7eb',
                    backgroundColor: T.surface, maxWidth: '640px', width: '100%', margin: '0 auto',
                }}>
                    <button type="button" onClick={checkAnswer} disabled={!canCheck || !checkReady} style={{
                        width: '100%',
                        backgroundColor: (canCheck && checkReady) ? '#0056D2' : '#cbd5e1',
                        color: '#fff', padding: '1rem', borderRadius: '9999px',
                        fontSize: '1rem', fontWeight: '700', border: 'none',
                        cursor: (canCheck && checkReady) ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
                        boxShadow: (canCheck && checkReady) ? '0 8px 20px rgba(0,86,210,0.3)' : 'none',
                        letterSpacing: '0.4px', transition: 'all 0.15s',
                    }}>
                        {isFr ? 'Vérifier →' : 'Check →'}
                    </button>
                </div>
            ) : (
                <div style={{
                    backgroundColor: feedbackCorrect ? '#f0fdf4' : '#fef2f2',
                    borderTop: `3px solid ${feedbackCorrect ? '#22c55e' : '#ef4444'}`,
                    padding: '1.25rem 1.5rem',
                    animation: 'feedback-slide 0.3s ease-out',
                    maxWidth: '640px', width: '100%', margin: '0 auto',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: feedbackCorrect ? '0.75rem' : '0.4rem' }}>
                        <span style={{ fontSize: '1.4rem' }}>{feedbackCorrect ? '✅' : '❌'}</span>
                        <span style={{ fontWeight: '800', fontSize: '1.05rem', color: feedbackCorrect ? '#16a34a' : '#dc2626' }}>
                            {feedbackCorrect ? (isFr ? 'Correct !' : 'Correct!') : (isFr ? 'Pas tout à fait…' : 'Not quite…')}
                        </span>
                        {feedbackCorrect && (
                            <span style={{
                                marginLeft: 'auto', backgroundColor: '#dcfce7', color: '#16a34a',
                                borderRadius: '99px', padding: '0.2rem 0.7rem',
                                fontSize: '0.78rem', fontWeight: '800',
                            }}>+{DIAMONDS_PER_Q} 💎  +{XP_PER_Q} XP</span>
                        )}
                    </div>
                    {!feedbackCorrect && (
                        <p style={{ fontSize: '0.88rem', color: T.textMuted, marginBottom: '0.75rem', fontWeight: '600' }}>
                            {isFr ? 'Bonne réponse : ' : 'Correct answer: '}
                            <strong style={{ color: T.text }}>
                                {type === 'tile' ? answer.join(' ') : correctAns}
                            </strong>
                        </p>
                    )}
                    <button type="button" onClick={handleContinue} disabled={!continueEnabled} style={{
                        width: '100%',
                        backgroundColor: continueEnabled ? (feedbackCorrect ? '#22c55e' : '#ef4444') : '#cbd5e1',
                        color: '#fff', padding: '0.9rem', borderRadius: '9999px',
                        fontSize: '1rem', fontWeight: '700', border: 'none',
                        cursor: continueEnabled ? 'pointer' : 'not-allowed', fontFamily: 'inherit', letterSpacing: '0.4px',
                        boxShadow: continueEnabled ? `0 6px 16px ${feedbackCorrect ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.35)'}` : 'none',
                        transition: 'all 0.2s',
                    }}>
                        {isFr ? 'Continuer →' : 'Continue →'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default LessonPage;
