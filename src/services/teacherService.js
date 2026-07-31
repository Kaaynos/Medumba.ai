/* ─────────────────────────────────────────────────────────────────────────────
   teacherService.js — Teacher portal: own cohorts, roster, homework note.
   RLS (migration 015) scopes every read here to cohorts this teacher owns.
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

/* ── The teacher's own cohorts ── */
export async function getMyCohorts(teacherUid) {
    const { data, error } = await supabase
        .from('cohorts')
        .select('*')
        .eq('teacher_id', teacherUid)
        .order('created_at', { ascending: true });
    if (error) { console.error('[teacherService] getMyCohorts error:', error.message); return []; }
    return data;
}

/* ── Roster for one cohort: member profile + their practice signals ── */
export async function getCohortRoster(cohortId) {
    const { data: members, error } = await supabase
        .from('cohort_members')
        .select('id, profile_id')
        .eq('cohort_id', cohortId);
    if (error) { console.error('[teacherService] getCohortRoster error:', error.message); return []; }
    if (members.length === 0) return [];

    const ids = members.map(m => m.profile_id);
    const [{ data: profiles }, { data: progress }] = await Promise.all([
        supabase.from('profiles').select('id, name, birth_year, last_seen').in('id', ids),
        supabase.from('user_progress').select('*').in('user_id', ids),
    ]);
    const profileById  = Object.fromEntries((profiles ?? []).map(p => [p.id, p]));
    const progressById = Object.fromEntries((progress ?? []).map(p => [p.user_id, p]));

    return members.map(m => ({
        memberId: m.id,
        profileId: m.profile_id,
        name: profileById[m.profile_id]?.name || null,
        birthYear: profileById[m.profile_id]?.birth_year || null,
        // Real login/usage activity — NOT user_progress.updated_at, which only
        // changes when XP/streak actually move and so reads stale for a
        // student who logged in but didn't finish a lesson.
        lastSeen: profileById[m.profile_id]?.last_seen || null,
        progress: progressById[m.profile_id] || null,
    }));
}

/* ── The one homework note for the cohort's current week ── */
export async function updateCohortHomework(cohortId, text) {
    const { error } = await supabase
        .from('cohorts')
        .update({ homework_note: text, homework_updated_at: new Date().toISOString() })
        .eq('id', cohortId);
    if (error) throw error;
}
