/* ─────────────────────────────────────────────────────────────────────────────
   nextBestActionService.js — v1, rules-based, reading THEO's existing event
   log (theoService.js: theo_events, write-only until now). Reinforcement
   learning is a later upgrade on top of the same data, once nba_shown/
   nba_clicked outcomes have accumulated — see THEO.nbaShown/nbaClicked
   below, which exist specifically to make that upgrade possible.

   First rule to match wins. Each rule returns a suggestion the caller can
   render and, if it carries a lessonId/unitId, act on directly.
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

const INACTIVITY_DAYS = 3;
const LOOKBACK_DAYS   = 14;

function findFirstReachableLesson(units) {
    for (const unit of units) {
        for (const lesson of unit.lessons) {
            if (lesson.type === 'lesson' && lesson.status !== 'locked') return { unit, lesson };
        }
    }
    return null;
}

function findActiveLesson(units) {
    for (const unit of units) {
        for (const lesson of unit.lessons) {
            if (lesson.type === 'lesson' && lesson.status === 'active') return { unit, lesson };
        }
    }
    return null;
}

/**
 * @param {Array} units — the same applySessionProgress(applyChestUnlocks(...))
 *   shape DashboardPage already builds, so lesson.status is accurate.
 * @returns {Promise<object|null>} a suggestion, or null if there's nothing
 *   to say (e.g. every lesson locked/complete already).
 */
export async function getNextBestAction(units) {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    if (!userId) return null;

    const since = new Date(Date.now() - LOOKBACK_DAYS * 86400000).toISOString();
    const { data: events, error } = await supabase
        .from('theo_events')
        .select('event_type, payload, created_at')
        .eq('user_id', userId)
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(200);
    if (error) { console.warn('[nextBestAction] theo_events fetch failed:', error.message); return null; }

    const lessonStarts = events?.filter(e => e.event_type === 'lesson_start') ?? [];

    // Rule 1 — never started a single lesson yet.
    if (lessonStarts.length === 0) {
        const found = findFirstReachableLesson(units);
        if (found) {
            return {
                ruleId: 'first_lesson',
                titleFr: `Commencez par "${found.lesson.titleFr}" pour apprendre les bases.`,
                titleEn: `Start with "${found.lesson.titleEn}" to learn the basics.`,
                actionFr: 'Commencer', actionEn: 'Start',
                lessonId: found.lesson.id, unitId: found.unit.id, unit: found.unit, lesson: found.lesson,
            };
        }
    }

    // Rule 2 — no activity in 3+ days (re-engagement).
    const daysSinceActivity = events?.length ? (Date.now() - new Date(events[0].created_at).getTime()) / 86400000 : Infinity;
    if (daysSinceActivity >= INACTIVITY_DAYS) {
        const found = findActiveLesson(units);
        if (found) {
            return {
                ruleId: 'reengage',
                titleFr: `Ça fait ${Math.floor(daysSinceActivity)} jours — reprenez avec "${found.lesson.titleFr}".`,
                titleEn: `It's been ${Math.floor(daysSinceActivity)} days — pick back up with "${found.lesson.titleEn}".`,
                actionFr: 'Reprendre', actionEn: 'Continue',
                lessonId: found.lesson.id, unitId: found.unit.id, unit: found.unit, lesson: found.lesson,
            };
        }
    }

    // Rule 3 — recent wrong answers clustering (a real weak spot, not noise).
    const wrongAnswers = (events ?? []).filter(e => e.event_type === 'quiz_answer' && e.payload?.correct === false);
    if (wrongAnswers.length >= 3) {
        return {
            ruleId: 'weak_spot',
            titleFr: 'Vous avez raté plusieurs mots récemment — un tour de révision aiderait.',
            titleEn: "You've missed a few words recently — a quick review would help.",
            actionFr: 'Réviser', actionEn: 'Review',
            navTarget: 'wordcards',
        };
    }

    // Rule 4 — fallback: whatever's next in the path.
    const found = findActiveLesson(units);
    if (found) {
        return {
            ruleId: 'continue',
            titleFr: `Prochaine leçon : "${found.lesson.titleFr}".`,
            titleEn: `Next up: "${found.lesson.titleEn}".`,
            actionFr: 'Continuer', actionEn: 'Continue',
            lessonId: found.lesson.id, unitId: found.unit.id, unit: found.unit, lesson: found.lesson,
        };
    }

    return null;
}
