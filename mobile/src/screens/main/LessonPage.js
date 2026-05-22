import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  StatusBar, Animated, BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { getExpressionsByLesson } from '../../data/expressionsByLesson';
import { generateLessonQuestions } from '../../utils/lessonGenerator';
import { MEDUMBA_QUESTIONS } from '../../data/medumbaDictionary';
import { speakMedumba, getIPA } from '../../utils/medumbaAudio';

const DIAMONDS_PER_Q = 5;
const XP_PER_Q = 10;
const FLASHCARD_COUNT = 5;

function pickRandom(pool, n) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

function buildExpressionQuestions(studied, pool) {
  if (!studied || studied.length === 0) return [];
  const qs = [];

  const medDistractors = (exclude) =>
    pool.filter(e => e.medumba !== exclude)
      .sort(() => Math.random() - 0.5).slice(0, 3).map(e => e.medumba);
  const frDistractors = (exclude) =>
    pool.filter(e => e.fr !== exclude)
      .sort(() => Math.random() - 0.5).slice(0, 3).map(e => e.fr);
  const trunc = (s, n) => s.length > n ? s.slice(0, n) + '…' : s;

  studied.forEach(expr => {
    const optsA = [...medDistractors(expr.medumba), expr.medumba].sort(() => Math.random() - 0.5);
    qs.push({
      type: 'meaning', _exprDir: 'fr2med',
      sourceFr: expr.fr, sourceEn: expr.fr,
      options: optsA, optionsFr: optsA,
      answer: expr.medumba, answerFr: expr.medumba,
    });
    const optsB = [...frDistractors(expr.fr), expr.fr].sort(() => Math.random() - 0.5);
    qs.push({
      type: 'meaning', _exprDir: 'med2fr',
      sourceFr: expr.medumba, sourceEn: expr.medumba,
      options: optsB, optionsFr: optsB,
      answer: expr.fr, answerFr: expr.fr,
    });
  });

  studied.filter(e => {
    const w = e.medumba.trim().split(/\s+/);
    return w.length >= 2 && w.length <= 7;
  }).slice(0, 3).forEach(expr => {
    const words = expr.medumba.trim().split(/\s+/);
    const allPoolWords = pool
      .filter(e => e.medumba !== expr.medumba)
      .flatMap(e => e.medumba.trim().split(/\s+/));
    const distractorWords = [...new Set(allPoolWords)]
      .filter(w => !words.includes(w))
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.max(2, 8 - words.length));
    const bank = [...words, ...distractorWords].sort(() => Math.random() - 0.5);
    qs.push({ type: 'tile', _exprDir: 'tile', sourceFr: expr.fr, sourceEn: expr.fr, answer: words, bank });
  });

  const matchPairs = studied.map(e => ({
    medumba: trunc(e.medumba, 30),
    french:  trunc(e.fr, 32),
    english: trunc(e.fr, 32),
  }));
  qs.push({ type: 'match', _exprDir: 'match', pairs: matchPairs });

  return qs.sort(() => Math.random() - 0.5);
}

const QUESTIONS = { ...MEDUMBA_QUESTIONS };

export default function LessonPage({ route, navigation }) {
  const { lesson, profile } = route.params ?? {};

  const exprPool = useMemo(() => getExpressionsByLesson(lesson?.id), [lesson?.id]);
  const flashcards = useMemo(() => pickRandom(exprPool, FLASHCARD_COUNT), [exprPool]);
  const exprQuestions = useMemo(() => buildExpressionQuestions(flashcards, exprPool), [flashcards]);
  const questions = useMemo(() => {
    const base = generateLessonQuestions(lesson?.id, profile ?? {}, QUESTIONS, 'medumba');
    return [...base, ...exprQuestions];
  }, [lesson?.id]);

  const [phase, setPhase]               = useState('flashcards');
  const [cardIdx, setCardIdx]           = useState(0);
  const [flipped, setFlipped]           = useState(false);
  const [currentQ, setCurrentQ]         = useState(0);
  const [placed, setPlaced]             = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [leftSel, setLeftSel]           = useState(null);
  const [matched, setMatched]           = useState(new Set());
  const [wrongPair, setWrongPair]       = useState(null);
  const [status, setStatus]             = useState(null);
  const [diamondsEarned, setDiamondsEarned] = useState(0);
  const [xpEarned, setXpEarned]         = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted]       = useState(false);
  const [failed, setFailed]             = useState(false);
  const [continueEnabled, setContinueEnabled] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [shuffledLeft, setShuffledLeft]   = useState([]);
  const [shuffledRight, setShuffledRight] = useState([]);

  const startTime = useRef(Date.now());
  const feedbackAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const q = questions[currentQ];
    const type = q?.type;
    if (type === 'match' && q?.pairs) {
      setShuffledLeft([...q.pairs].sort(() => Math.random() - 0.5));
      setShuffledRight([...q.pairs].sort(() => Math.random() - 0.5));
      setMatched(new Set());
      setLeftSel(null);
      setWrongPair(null);
    }
    setPlaced([]);
    setSelectedOption(null);
    setStatus(null);
    setContinueEnabled(false);
  }, [currentQ]);

  useEffect(() => {
    if (status === null) { setContinueEnabled(false); return; }
    Animated.timing(feedbackAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start();
    const t = setTimeout(() => setContinueEnabled(true), 350);
    return () => clearTimeout(t);
  }, [status]);

  useEffect(() => {
    const onBack = () => { setShowExitModal(true); return true; };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => sub.remove();
  }, []);

  const q = questions[currentQ];
  const type = q?.type ?? 'tile';
  const bank = q?.bank ?? [];
  const answer = q?.answer ?? [];
  const usedSet = new Set(placed);

  const pickWord   = (idx) => { if (status !== null || usedSet.has(idx)) return; setPlaced(p => [...p, idx]); };
  const removeWord = (pos) => { if (status !== null) return; setPlaced(p => p.filter((_, i) => i !== pos)); };

  const checkAnswer = () => {
    let correct = false;
    if (type === 'tile') {
      const ua = placed.map(i => bank[i]);
      correct = ua.length === answer.length && ua.every((w, i) => w === answer[i]);
    } else {
      correct = selectedOption === (q.answerFr ?? q.answer);
    }
    feedbackAnim.setValue(0);
    setStatus(correct ? 'correct' : 'wrong');
    if (correct) {
      setDiamondsEarned(d => d + DIAMONDS_PER_Q);
      setXpEarned(x => x + XP_PER_Q);
      setCorrectCount(c => c + 1);
    }
  };

  const tapLeft  = (pair) => { if (status !== null) return; setLeftSel(pair.medumba); setWrongPair(null); };
  const tapRight = (pair) => {
    if (status !== null || !leftSel) return;
    const isMatch = q.pairs.some(p => p.medumba === leftSel && p === pair);
    if (isMatch) {
      const next = new Set(matched); next.add(leftSel);
      setMatched(next); setLeftSel(null); setWrongPair(null);
      if (next.size === q.pairs.length) {
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

  const handleContinue = () => {
    if (currentQ >= questions.length - 1) {
      const pct = questions.length > 0 ? correctCount / questions.length : 0;
      if (pct >= 0.6) setCompleted(true);
      else setFailed(true);
    } else {
      setCurrentQ(q => q + 1);
    }
  };

  const restartLesson = () => {
    startTime.current = Date.now();
    setPhase('flashcards'); setCardIdx(0); setFlipped(false);
    setCurrentQ(0); setPlaced([]); setSelectedOption(null);
    setLeftSel(null); setMatched(new Set()); setWrongPair(null);
    setStatus(null); setContinueEnabled(false);
    setDiamondsEarned(0); setXpEarned(0); setCorrectCount(0);
    setCompleted(false); setFailed(false);
  };

  const progress = questions.length > 0 ? Math.round((currentQ / questions.length) * 100) : 0;
  const canCheck = type === 'tile'
    ? placed.length > 0 && status === null
    : selectedOption !== null && status === null;
  const feedbackCorrect = status === 'correct';
  const options = q?.optionsFr ?? q?.options ?? [];
  const correctAns = q?.answerFr ?? q?.answer;

  /* ─── FLASHCARD PHASE ─── */
  if (phase === 'flashcards') {
    const card   = flashcards[cardIdx] ?? { fr: '…', medumba: '…' };
    const isLast = cardIdx === flashcards.length - 1;
    return (
      <SafeAreaView style={[s.safe, { backgroundColor: '#f0f7ff' }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#f0f7ff" />
        {/* Top bar */}
        <View style={s.topBar}>
          <TouchableOpacity style={s.closeBtn} onPress={() => navigation.goBack()}>
            <Text style={s.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: `${((cardIdx + 1) / flashcards.length) * 100}%`, backgroundColor: '#7c3aed' }]} />
          </View>
          <Text style={[s.progressLabel, { color: '#7c3aed' }]}>{cardIdx + 1} / {flashcards.length}</Text>
        </View>

        <View style={s.flashHeader}>
          <Text style={s.flashIcon}>📖</Text>
          <Text style={[s.flashMeta, { color: '#7c3aed' }]}>EXPRESSIONS À RETENIR</Text>
          <Text style={s.flashSub}>Expressions liées à : {lesson?.title ?? 'cette leçon'}</Text>
        </View>

        <View style={s.flashCenter}>
          <TouchableOpacity
            style={[s.flashCard, flipped && { backgroundColor: '#7c3aed', borderColor: '#6d28d9' }]}
            onPress={() => setFlipped(f => !f)}
            activeOpacity={0.85}
          >
            <Text style={[s.flashSide, { color: flipped ? 'rgba(255,255,255,0.7)' : '#94a3b8' }]}>
              {flipped ? 'Medumba' : 'Français'}
            </Text>
            <Text style={[s.flashWord, { color: flipped ? '#fff' : '#0f172a' }]}>
              {flipped ? card.medumba : card.fr}
            </Text>
            {!flipped && <Text style={s.flashHint}>👆 Appuyez pour voir la traduction</Text>}
          </TouchableOpacity>
        </View>

        <View style={s.flashNav}>
          {cardIdx > 0 && (
            <TouchableOpacity style={s.btnSecondary} onPress={() => { setCardIdx(i => i - 1); setFlipped(false); }}>
              <Text style={s.btnSecondaryText}>← Précédent</Text>
            </TouchableOpacity>
          )}
          {!isLast ? (
            <TouchableOpacity style={[s.btnPrimary, { backgroundColor: '#7c3aed', flex: 2 }]} onPress={() => { setCardIdx(i => i + 1); setFlipped(false); }}>
              <Text style={s.btnPrimaryText}>Suivant →</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[s.btnPrimary, { flex: 2 }]} onPress={() => setPhase('exercise')}>
              <Text style={s.btnPrimaryText}>🚀 Commencer l'exercice</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  /* ─── FAILED SCREEN ─── */
  if (failed) {
    const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    return (
      <SafeAreaView style={[s.safe, s.centerScreen, { backgroundColor: '#fef2f2' }]}>
        <Text style={{ fontSize: 64 }}>😓</Text>
        <Text style={[s.bigTitle, { color: '#dc2626' }]}>Score insuffisant</Text>
        <Text style={s.scoreText}>{correctCount} / {questions.length} ({accuracy}%)</Text>
        <View style={s.failBox}>
          <Text style={s.failBoxText}>Vous devez obtenir au moins 60% pour réussir.</Text>
        </View>
        <TouchableOpacity style={[s.btnPrimary, { backgroundColor: '#ef4444', marginTop: 8, paddingHorizontal: 40 }]} onPress={restartLesson}>
          <Text style={s.btnPrimaryText}>🔄 Recommencer</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  /* ─── COMPLETION SCREEN ─── */
  if (completed) {
    const elapsed  = Math.floor((Date.now() - startTime.current) / 1000);
    const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const m = Math.floor(elapsed / 60), sec = elapsed % 60;
    const timeStr = `${m}:${sec.toString().padStart(2, '0')}`;
    return (
      <SafeAreaView style={[s.safe, s.centerScreen]}>
        <Text style={[s.bigTitle, { color: colors.primary }]}>Leçon terminée ! 🎉</Text>
        <Text style={{ fontSize: 72 }}>🏆</Text>
        <View style={[s.diamondCard, { backgroundColor: colors.primary }]}>
          <Text style={s.diamondLabel}>Diamants</Text>
          <Text style={s.diamondVal}>💎 {diamondsEarned}</Text>
        </View>
        <View style={s.statsRow}>
          {[
            { icon: '⚡', val: xpEarned, label: 'XP', bg: '#f59e0b' },
            { icon: '⏱', val: timeStr, label: 'Temps', bg: '#22c55e' },
            { icon: '🎯', val: `${accuracy}%`, label: 'Précision', bg: '#ef4444' },
          ].map(s2 => (
            <View key={s2.label} style={[s.statBox, { backgroundColor: s2.bg }]}>
              <Text style={{ fontSize: 20 }}>{s2.icon}</Text>
              <Text style={s.statBoxVal}>{s2.val}</Text>
              <Text style={s.statBoxLabel}>{s2.label}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={[s.btnPrimary, { marginTop: 8, paddingHorizontal: 40 }]} onPress={() => navigation.goBack()}>
          <Text style={s.btnPrimaryText}>Continuer →</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  /* ─── EXIT MODAL ─── */
  const ExitModal = () => showExitModal ? (
    <View style={s.overlay}>
      <View style={s.modal}>
        <Text style={{ fontSize: 48 }}>😟</Text>
        <Text style={s.modalTitle}>Quitter la leçon ?</Text>
        <Text style={s.modalSub}>Votre progression dans cet exercice sera perdue.</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
          <TouchableOpacity style={[s.btnSecondary, { flex: 1, borderColor: '#fca5a5', backgroundColor: '#fee2e2' }]} onPress={() => navigation.goBack()}>
            <Text style={[s.btnSecondaryText, { color: '#dc2626' }]}>Quitter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.btnPrimary, { flex: 2 }]} onPress={() => setShowExitModal(false)}>
            <Text style={s.btnPrimaryText}>Continuer ✊</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : null;

  /* ─── MAIN EXERCISE SCREEN ─── */
  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ExitModal />

      {/* Top bar */}
      <View style={s.topBar}>
        <TouchableOpacity style={s.closeBtn} onPress={() => setShowExitModal(true)}>
          <Text style={s.closeBtnText}>✕</Text>
        </TouchableOpacity>
        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={s.progressLabel}>{currentQ + 1} / {questions.length}</Text>
        <View style={s.gemBadge}>
          <Text style={{ fontSize: 14 }}>💎</Text>
          <Text style={s.gemText}>+{diamondsEarned}</Text>
        </View>
      </View>

      <ScrollView style={s.content} contentContainerStyle={{ padding: 16, paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
        {/* Instruction */}
        <Text style={s.instruction}>
          {type === 'tile'        && (q?._exprDir === 'tile' ? 'Reconstruisez l\'expression' : 'Traduisez cette phrase')}
          {type === 'meaning'     && (q?._exprDir === 'med2fr' ? 'Quelle est la traduction française ?' : 'Quel mot Medumba correspond ?')}
          {type === 'image_vocab' && 'Comment dit-on cela en Medumba ?'}
          {type === 'match'       && 'Associez les mots'}
        </Text>

        {/* ── TILE ── */}
        {type === 'tile' && (
          <>
            <View style={s.sourceCard}>
              <Text style={s.sourceText}>{q?.sourceFr ?? ''}</Text>
              {q?.audio && (
                <TouchableOpacity onPress={() => speakMedumba(q.audio)} style={s.audioBtn}>
                  <Text style={s.audioBtnText}>🔊</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={[s.answerArea, placed.length > 0 && { borderColor: colors.primary, backgroundColor: '#eff6ff' }]}>
              {placed.length === 0
                ? <Text style={s.answerPlaceholder}>Sélectionnez les mots ci-dessous…</Text>
                : placed.map((bankIdx, pos) => (
                  <TouchableOpacity key={pos} style={s.tilePlaced} onPress={() => removeWord(pos)} disabled={status !== null}>
                    <Text style={s.tilePlacedText}>{bank[bankIdx]}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
            <Text style={s.bankLabel}>MOTS DISPONIBLES</Text>
            <View style={s.bankRow}>
              {bank.map((word, idx) => {
                const used = usedSet.has(idx);
                return (
                  <TouchableOpacity key={idx} style={[s.tileBank, used && s.tileBankUsed]} onPress={() => pickWord(idx)} disabled={used || status !== null}>
                    <Text style={[s.tileBankText, used && { color: '#cbd5e1' }]}>{word}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* ── MEANING ── */}
        {type === 'meaning' && (
          <>
            <View style={[s.sourceCard, { alignItems: 'center', paddingVertical: 24 }]}>
              <Text style={s.meaningLabel}>
                {q?._exprDir === 'med2fr' ? 'Expression Medumba' : 'Mot en français'}
              </Text>
              <Text style={[s.sourceText, { fontSize: q?._exprDir ? 20 : 28 }]}>{q?.sourceFr ?? ''}</Text>
              {q?.audio && (
                <TouchableOpacity onPress={() => speakMedumba(q.audio)} style={[s.audioBtn, { marginTop: 12 }]}>
                  <Text style={s.audioBtnText}>🔊  Écouter</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={[s.optionsGrid, q?._exprDir === 'med2fr' && { flexDirection: 'column' }]}>
              {options.map(opt => {
                const isSel     = selectedOption === opt;
                const isCorrect = status !== null && opt === correctAns;
                const isWrong   = status === 'wrong' && isSel;
                return (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      s.optionBtn,
                      q?._exprDir === 'med2fr' ? { width: '100%' } : { width: '48%' },
                      isSel && !status && { backgroundColor: '#eff6ff', borderColor: colors.primary },
                      isCorrect && { backgroundColor: '#dcfce7', borderColor: '#22c55e' },
                      isWrong   && { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
                    ]}
                    onPress={() => { if (status === null) setSelectedOption(opt); }}
                    disabled={status !== null}
                  >
                    <Text style={[s.optionText, isCorrect && { color: '#16a34a' }, isWrong && { color: '#dc2626' }, isSel && !status && { color: colors.primary }]}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* ── IMAGE VOCAB ── */}
        {type === 'image_vocab' && (
          <>
            <View style={[s.sourceCard, { alignItems: 'center', paddingVertical: 24 }]}>
              <Text style={{ fontSize: 72, lineHeight: 88 }}>{q?.emoji}</Text>
              <Text style={s.meaningLabel}>En français</Text>
              <Text style={[s.sourceText, { fontSize: 24, textAlign: 'center' }]}>{q?.labelFr ?? q?.labelEn ?? ''}</Text>
              {q?.audio && (
                <TouchableOpacity onPress={() => speakMedumba(q.audio)} style={[s.audioBtn, { marginTop: 12 }]}>
                  <Text style={s.audioBtnText}>🔊  Écouter</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={s.optionsGrid}>
              {options.map(opt => {
                const isSel     = selectedOption === opt;
                const isCorrect = status !== null && opt === correctAns;
                const isWrong   = status === 'wrong' && isSel;
                return (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      s.optionBtn, { width: '48%' },
                      isSel && !status && { backgroundColor: '#eff6ff', borderColor: colors.primary },
                      isCorrect && { backgroundColor: '#dcfce7', borderColor: '#22c55e' },
                      isWrong   && { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
                    ]}
                    onPress={() => { if (status === null) setSelectedOption(opt); }}
                    disabled={status !== null}
                  >
                    <Text style={[s.optionText, isCorrect && { color: '#16a34a' }, isWrong && { color: '#dc2626' }, isSel && !status && { color: colors.primary }]}>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* ── MATCH ── */}
        {type === 'match' && (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={s.matchColLabel}>Medumba</Text>
              {shuffledLeft.map(pair => {
                const isMatched  = matched.has(pair.medumba);
                const isSel      = leftSel === pair.medumba;
                const isWrong    = wrongPair?.left === pair.medumba;
                return (
                  <TouchableOpacity
                    key={pair.medumba}
                    style={[s.matchBtn, isMatched && s.matchBtnDone, isSel && s.matchBtnSel, isWrong && s.matchBtnWrong]}
                    onPress={() => !isMatched && tapLeft(pair)}
                    disabled={isMatched}
                  >
                    <Text style={[s.matchBtnText, isMatched && { color: '#16a34a' }, isWrong && { color: '#dc2626' }, isSel && { color: colors.primary }]}>{pair.medumba}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.matchColLabel}>Français</Text>
              {shuffledRight.map(pair => {
                const isMatched = matched.has(pair.medumba);
                const isWrong   = wrongPair?.right === pair.medumba;
                return (
                  <TouchableOpacity
                    key={pair.medumba}
                    style={[s.matchBtn, isMatched && s.matchBtnDone, isWrong && s.matchBtnWrong, leftSel && !isMatched && { backgroundColor: '#fffbeb', borderColor: '#f59e0b' }]}
                    onPress={() => !isMatched && tapRight(pair)}
                    disabled={isMatched || !leftSel}
                  >
                    <Text style={[s.matchBtnText, isMatched && { color: '#16a34a' }, isWrong && { color: '#dc2626' }]}>{pair.french}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom action */}
      {type === 'match' ? null : status === null ? (
        <View style={s.bottomBar}>
          <TouchableOpacity style={[s.checkBtn, !canCheck && s.checkBtnDisabled]} onPress={checkAnswer} disabled={!canCheck}>
            <Text style={s.checkBtnText}>Vérifier →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Animated.View style={[s.feedback, { backgroundColor: feedbackCorrect ? '#f0fdf4' : '#fef2f2', borderTopColor: feedbackCorrect ? '#22c55e' : '#ef4444' }, { opacity: feedbackAnim }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Text style={{ fontSize: 22 }}>{feedbackCorrect ? '✅' : '❌'}</Text>
            <Text style={[s.feedbackTitle, { color: feedbackCorrect ? '#16a34a' : '#dc2626' }]}>
              {feedbackCorrect ? 'Correct !' : 'Pas tout à fait…'}
            </Text>
            {feedbackCorrect && (
              <View style={s.xpBadge}>
                <Text style={s.xpBadgeText}>+{DIAMONDS_PER_Q} 💎  +{XP_PER_Q} XP</Text>
              </View>
            )}
          </View>
          {!feedbackCorrect && (
            <Text style={s.correctAnswerText}>
              Bonne réponse : <Text style={{ fontWeight: '800', color: '#0f172a' }}>{type === 'tile' ? answer.join(' ') : correctAns}</Text>
            </Text>
          )}
          <TouchableOpacity
            style={[s.continueBtn, { backgroundColor: feedbackCorrect ? '#22c55e' : '#ef4444' }, !continueEnabled && s.continueBtnDisabled]}
            onPress={handleContinue}
            disabled={!continueEnabled}
          >
            <Text style={s.btnPrimaryText}>Continuer →</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: colors.white },
  centerScreen: { justifyContent: 'center', alignItems: 'center', padding: 24, gap: 16 },
  topBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 12, paddingHorizontal: 16,
    borderBottomWidth: 1, borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  closeBtn: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  closeBtnText: { fontSize: 14, color: '#64748b', fontWeight: '700' },
  progressTrack: { flex: 1, height: 12, backgroundColor: '#e2e8f0', borderRadius: 99, overflow: 'hidden' },
  progressFill:  { height: '100%', backgroundColor: colors.primary, borderRadius: 99 },
  progressLabel: { fontSize: 12, fontWeight: '700', color: colors.primary },
  gemBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#f0fdf4', borderWidth: 2, borderColor: '#bbf7d0', borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4 },
  gemText:  { fontWeight: '800', fontSize: 12, color: '#16a34a' },
  content:  { flex: 1 },
  instruction: { fontSize: 12, fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 },
  sourceCard: { backgroundColor: colors.white, borderWidth: 2, borderColor: '#e2e8f0', borderRadius: 18, padding: 20, marginBottom: 16 },
  sourceText: { fontSize: 20, fontWeight: '700', color: '#0f172a', lineHeight: 28 },
  answerArea: { minHeight: 60, borderWidth: 2, borderStyle: 'dashed', borderColor: '#cbd5e1', borderRadius: 14, padding: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 16, backgroundColor: '#f8fafc' },
  answerPlaceholder: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  tilePlaced: { backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 2, borderColor: '#0041a3' },
  tilePlacedText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  bankLabel: { fontSize: 11, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  bankRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  tileBank: { backgroundColor: colors.white, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 2, borderColor: '#cbd5e1' },
  tileBankUsed: { backgroundColor: '#f1f5f9', borderColor: '#e2e8f0', opacity: 0.4 },
  tileBankText: { fontWeight: '700', fontSize: 15, color: '#0f172a' },
  meaningLabel: { fontSize: 11, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 8 },
  audioBtn: { backgroundColor: '#eff6ff', borderWidth: 1.5, borderColor: '#bfdbfe', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8, alignSelf: 'center' },
  audioBtnText: { fontSize: 16, color: '#1d4ed8', fontWeight: '600' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 },
  optionBtn: { width: '48%', padding: 14, borderRadius: 14, borderWidth: 2, borderColor: '#e2e8f0', backgroundColor: colors.white },
  optionText: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  matchColLabel: { fontSize: 11, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 8 },
  matchBtn: { padding: 12, borderRadius: 12, borderWidth: 2, borderColor: '#e2e8f0', backgroundColor: colors.white, marginBottom: 8 },
  matchBtnDone:  { backgroundColor: '#dcfce7', borderColor: '#22c55e' },
  matchBtnSel:   { backgroundColor: '#eff6ff', borderColor: colors.primary },
  matchBtnWrong: { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
  matchBtnText:  { fontSize: 13, fontWeight: '700', color: '#0f172a' },
  bottomBar: { padding: 16, borderTopWidth: 1, borderTopColor: '#e5e7eb', backgroundColor: colors.white },
  checkBtn: { backgroundColor: colors.primary, borderRadius: 999, paddingVertical: 16, alignItems: 'center' },
  checkBtnDisabled: { backgroundColor: '#cbd5e1' },
  checkBtnText: { color: colors.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.4 },
  feedback: { borderTopWidth: 3, padding: 16, backgroundColor: colors.white },
  feedbackTitle: { fontSize: 17, fontWeight: '800' },
  xpBadge: { marginLeft: 'auto', backgroundColor: '#dcfce7', borderRadius: 99, paddingHorizontal: 10, paddingVertical: 3 },
  xpBadgeText: { fontSize: 12, fontWeight: '800', color: '#16a34a' },
  correctAnswerText: { fontSize: 14, color: '#64748b', fontWeight: '600', marginBottom: 10 },
  continueBtn: { borderRadius: 999, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  continueBtnDisabled: { opacity: 0.5 },
  btnPrimary: { backgroundColor: colors.primary, borderRadius: 999, paddingVertical: 14, paddingHorizontal: 24, alignItems: 'center' },
  btnPrimaryText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  btnSecondary: { flex: 1, borderRadius: 999, paddingVertical: 14, paddingHorizontal: 16, alignItems: 'center', borderWidth: 2, borderColor: '#bfdbfe', backgroundColor: '#eff6ff' },
  btnSecondaryText: { color: colors.primary, fontSize: 15, fontWeight: '700' },
  bigTitle: { fontSize: 28, fontWeight: '900', color: '#0f172a', textAlign: 'center' },
  scoreText: { fontSize: 22, fontWeight: '900', color: '#0f172a' },
  failBox: { backgroundColor: '#fee2e2', borderWidth: 2, borderColor: '#fca5a5', borderRadius: 16, padding: 16, maxWidth: 300, alignItems: 'center' },
  failBoxText: { color: '#dc2626', fontWeight: '700', fontSize: 14, textAlign: 'center' },
  diamondCard: { borderRadius: 16, padding: 20, width: '100%', maxWidth: 280, alignItems: 'center' },
  diamondLabel: { fontSize: 13, fontWeight: '700', color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  diamondVal: { fontSize: 32, fontWeight: '900', color: colors.white },
  statsRow: { flexDirection: 'row', gap: 10, width: '100%', maxWidth: 280 },
  statBox: { flex: 1, alignItems: 'center', borderRadius: 14, padding: 12 },
  statBoxVal: { fontSize: 18, fontWeight: '900', color: colors.white, marginTop: 4 },
  statBoxLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  flashHeader: { alignItems: 'center', paddingTop: 16, paddingHorizontal: 20 },
  flashIcon: { fontSize: 28 },
  flashMeta: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 4 },
  flashSub: { fontSize: 13, color: '#64748b', marginTop: 4, textAlign: 'center' },
  flashCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  flashCard: { width: '100%', maxWidth: 380, backgroundColor: colors.white, borderWidth: 2, borderColor: '#e2e8f0', borderRadius: 24, padding: 32, alignItems: 'center', minHeight: 180, justifyContent: 'center', gap: 12 },
  flashSide: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
  flashWord: { fontSize: 22, fontWeight: '800', textAlign: 'center', lineHeight: 30 },
  flashHint: { fontSize: 12, color: '#94a3b8', marginTop: 8 },
  flashNav: { flexDirection: 'row', gap: 10, padding: 16 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.55)', zIndex: 100, justifyContent: 'center', alignItems: 'center', padding: 24 },
  modal: { backgroundColor: colors.white, borderRadius: 28, padding: 28, width: '100%', maxWidth: 340, alignItems: 'center', gap: 8 },
  modalTitle: { fontSize: 22, fontWeight: '900', color: '#0f172a' },
  modalSub: { fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 20 },
});
