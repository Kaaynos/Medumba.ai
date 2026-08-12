/* ─────────────────────────────────────────────────────────────────────────────
   lessonTags.js — client-side ranking hints for personalizing the lesson
   path in DashboardPage.jsx's buildUnits(). NOT authoritative content (that
   stays in src/data/ under the AGENTS.md "do not touch" rule) — this only
   scores which already-existing lesson comes first within its unit, based
   on the reason/goals a learner picked in QuickSetupPage.jsx. l0 (Alphabet)
   is intentionally absent: it's pinned first everywhere, never scored.

   reasons match QuickSetupPage.jsx's real ids: family | culture | career | fun | other
   goals   match QuickSetupPage.jsx's real ids: speak | vocab | habit
───────────────────────────────────────────────────────────────────────────── */
export const LESSON_TAGS = {
    l1:  { reasons: ['family', 'culture'], goals: ['speak'] },          // Greetings
    l2:  { reasons: ['other'],             goals: ['vocab'] },          // Body Parts
    l3:  { reasons: ['family', 'fun'],     goals: ['vocab'] },          // Food
    l4:  { reasons: ['fun'],               goals: ['vocab'] },          // Colors
    l5:  { reasons: ['career', 'other'],   goals: ['vocab', 'habit'] }, // Numbers
    l6:  { reasons: ['fun'],               goals: ['vocab'] },          // Animals
    l7:  { reasons: ['family'],            goals: ['speak', 'vocab'] }, // Family
    l8:  { reasons: ['culture'],           goals: ['vocab'] },          // Nature
    l9:  { reasons: ['career'],            goals: ['habit'] },          // Time
    l10: { reasons: ['family', 'career'],  goals: ['speak'] },          // Introductions
    l11: { reasons: ['family'],            goals: ['vocab'] },          // Kitchen
    l12: { reasons: ['other'],             goals: ['vocab'] },          // Illnesses
    l13: { reasons: ['career', 'other'],   goals: ['vocab'] },          // School
    l14: { reasons: ['career'],            goals: ['vocab'] },          // Professions
    l15: { reasons: ['family', 'culture'], goals: ['speak'] },          // Conversations
    l16: { reasons: ['culture', 'other'],  goals: ['speak', 'vocab'] }, // Action Verbs
    l17: { reasons: ['culture'],           goals: ['vocab', 'habit'] }, // Culture & Rites
};

/** Number of reason/goal tag matches for a lesson id against a profile — 0 if the lesson is untagged or nothing matches (safe no-op default). */
export function lessonScore(lessonId, reason, goals = []) {
    const tags = LESSON_TAGS[lessonId];
    if (!tags) return 0;
    let score = 0;
    if (reason && tags.reasons.includes(reason)) score += 2;
    for (const g of goals) if (tags.goals.includes(g)) score += 1;
    return score;
}
