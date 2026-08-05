/**
 * lessonGenerator.js
 * Builds a personalized question list for a lesson session based on:
 *   - proficiency level (1–4) → determines exercise types & complexity
 *   - dailyGoal → caps total question count
 *   - goals → extra variety for meaning / audio / match weighting
 *
 * Question content is read live from Supabase (lesson_questions,
 * variety_questions) — moved off static JS/JSON so lesson content has one
 * source of truth instead of several files that could silently drift out
 * of sync with each other (see migration 035).
 */
import { supabase } from '../config/supabase';

/* ── Session length cap by daily-goal ──────────────────────────── */
const GOAL_QUESTION_CAP = {
    relaxed: 5,
    normal:  7,
    serious: 10,
    great:   13,
    awesome: 13,
};

/* ── Variety mix driven by learner goals (Level 4 only) ─────────── */
function varietyMix(goals = []) {
    let meaning = 1;
    let audio   = 0;
    let match   = 1;
    if (goals.includes('speak')) audio   = Math.min(audio + 1, 2);
    if (goals.includes('vocab')) { meaning = Math.min(meaning + 1, 3); match = Math.min(match + 1, 2); }
    return { meaning, audio, match };
}

function pickRandom(pool, n) {
    return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

/** Alternate items from two arrays: [a0, b0, a1, b1, …] */
function interleave(arr1, arr2) {
    const out = [];
    const len = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < len; i++) {
        if (i < arr1.length) out.push(arr1[i]);
        if (i < arr2.length) out.push(arr2[i]);
    }
    return out;
}

/**
 * generateLessonQuestions
 *
 * Proficiency levels and their exercise style:
 *   1 – Beginner     → only meaning questions (Medumba word → pick 1 of 4)
 *   2 – Elementary   → meaning + simplified tile (bank trimmed to 4 words)
 *   3 – Intermediate → full tile + 1 lesson-specific match
 *   4 – Advanced     → full tile interleaved with meaning, audio & match
 *
 * @param {string}  lessonId  e.g. 'l1', 'e2'
 * @param {object}  profile   { dailyGoal, goals, proficiency, reason, name }
 * @param {string}  learnLang 'medumba' | 'english'
 * @returns {Promise<Array>} ordered question list for the session
 */
export async function generateLessonQuestions(lessonId, profile = {}, learnLang = 'medumba') {
    const cap = GOAL_QUESTION_CAP[profile.dailyGoal ?? 'normal'] ?? 6;

    const { data: qRows, error } = await supabase
        .from('lesson_questions')
        .select('question_type, payload')
        .eq('lesson_id', lessonId)
        .order('order_index');
    if (error) console.error('[lessonGenerator] lesson_questions fetch failed:', error.message);
    const rows = qRows ?? [];
    const tileQs    = rows.filter(r => r.question_type === 'tile').map(r => r.payload);
    const meaningQs = rows.filter(r => r.question_type === 'meaning').map(r => r.payload);
    const matchQs   = rows.filter(r => r.question_type === 'match').map(r => r.payload);

    /* ── English course: always tile questions, just cap the count.
       No more silent fallback to another lesson's content when a lesson
       has none of its own (e7-e11) — showing fewer exercises is more
       honest than showing the wrong ones. ── */
    if (learnLang === 'english') {
        return cap === Infinity ? tileQs : tileQs.slice(0, cap);
    }

    /* ── Medumba course ─────────────────────────────────────────── */
    const proficiency = profile.proficiency ?? 1;
    const { data: varietyRows, error: vError } = await supabase
        .from('variety_questions')
        .select('question_type, payload');
    if (vError) console.error('[lessonGenerator] variety_questions fetch failed:', vError.message);
    /* The Alphabet lesson (l0) teaches letters, not vocabulary — mixing in
       the shared cross-lesson variety pool (generic fruit/animal/object
       image cards) means a beginner would see e.g. "eau"/"oiseau" image
       questions inside a lesson that's supposed to be letters only. Every
       other lesson still gets the variety warmup; l0 stays pure. */
    const variety = lessonId === 'l0' ? [] : (varietyRows ?? []);
    const imageVocabPool = variety.filter(r => r.question_type === 'image_vocab').map(r => r.payload);

    let result = [];

    if (proficiency === 1) {
        /*
         * BEGINNER — image-vocab first, then meaning exercises.
         * Visual recognition before text-only meaning questions.
         */
        result = [...pickRandom(imageVocabPool, 2), ...meaningQs];

    } else if (proficiency === 2) {
        /*
         * ELEMENTARY — 1 image-vocab opener + meaning + simplified tile.
         * Tile questions use a trimmed bank (4 words) so there are fewer
         * distractors and sentence building is easier.
         */
        const simpleTiles = tileQs.map(q => ({ ...q, bank: q.bank.slice(0, 4) }));
        result = [...pickRandom(imageVocabPool, 1), ...interleave(meaningQs.slice(0, 3), simpleTiles)];

    } else if (proficiency === 3) {
        /*
         * INTERMEDIATE — 1 image-vocab + full tile exercises + 1 lesson-specific match.
         */
        result = [...pickRandom(imageVocabPool, 1), ...tileQs, ...matchQs];

    } else {
        /*
         * ADVANCED — everything: image-vocab + tile + meaning + audio + match,
         * weighted by the learner's stated goals.
         */
        const { meaning: mCount, audio: aCount, match: matchCount } = varietyMix(profile.goals ?? []);

        const meaningPool = variety.filter(r => r.question_type === 'meaning').map(r => r.payload);
        const audioPool   = variety.filter(r => r.question_type === 'audio').map(r => r.payload);
        const matchPool   = [
            ...matchQs,
            ...variety.filter(r => r.question_type === 'match').map(r => r.payload),
        ];

        const varietyItems = [
            ...pickRandom(imageVocabPool, 1),
            ...pickRandom(meaningPool, mCount),
            ...pickRandom(audioPool,   aCount),
            ...pickRandom(matchPool,   matchCount),
        ];

        result = [...tileQs];
        varietyItems.forEach((vq, i) => {
            const pos = Math.min(2 + i * 3, result.length);
            result.splice(pos, 0, vq);
        });
    }

    return cap === Infinity ? result : result.slice(0, cap);
}

/**
 * getPersonalizedTip
 * Returns a short motivational tip based on learner profile.
 */
export function getPersonalizedTip(profile = {}, isFr = false) {
    const { reason, goals = [], dailyGoal, proficiency = 1 } = profile;

    if (proficiency === 1) {
        return isFr
            ? '🌱 Débutant ? Concentrez-vous sur la reconnaissance des mots !'
            : '🌱 Beginner? Focus on recognizing words first!';
    }
    if (proficiency === 2) {
        return isFr
            ? '📈 Bien ! Vous construisez maintenant de petites phrases.'
            : '📈 Good! You are now building short sentences.';
    }
    if (proficiency === 3) {
        return isFr
            ? '💪 Niveau intermédiaire — maîtrisez les associations de mots !'
            : '💪 Intermediate level — master word matching!';
    }
    if (reason === 'vacation') {
        return isFr
            ? '✈️ Pour votre voyage : commencez par Salutations et Nourriture !'
            : '✈️ For your trip: start with Greetings and Food!';
    }
    if (reason === 'career') {
        return isFr
            ? '💼 Conseil pro : pratiquez les nombres et le temps chaque jour.'
            : '💼 Pro tip: practice Numbers and Time every day.';
    }
    if (goals.includes('speak')) {
        return isFr
            ? '💬 Écoutez bien les exercices audio pour améliorer votre prononciation !'
            : '💬 Listen carefully to audio exercises to improve your pronunciation!';
    }
    if (dailyGoal === 'awesome' || dailyGoal === 'great') {
        return isFr
            ? '🔥 Objectif ambitieux ! Chaque leçon complétée vous rapproche du niveau natif.'
            : '🔥 Ambitious goal! Each lesson brings you closer to native level.';
    }
    return isFr
        ? '⭐ Régularité avant tout — pratiquez un peu chaque jour !'
        : '⭐ Consistency above all — practice a little every day!';
}
