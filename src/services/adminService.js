import { supabase } from '../config/supabase';

export async function getAllUsers() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*, user_progress(*)')
        .order('created_at', { ascending: false });
    if (error) { console.error('[adminService] getAllUsers error:', error.message); return []; }
    return data.map(p => {
        const progress = Array.isArray(p.user_progress) ? p.user_progress[0] : p.user_progress;
        return {
            uid: p.id,
            name: p.name,
            email: p.email,
            role: p.role,
            locationType: p.location_type,
            age: p.age,
            reason: p.reason,
            dailyGoal: p.daily_goal,
            nativeLang: p.native_lang,
            learningLang: p.learning_lang,
            proficiency: p.proficiency,
            createdAt: p.created_at,
            xp: progress?.xp ?? 0,
            gems: progress?.gems ?? 0,
            hearts: progress?.hearts ?? 0,
            streak: progress?.streak ?? 0,
            completedLessons: progress?.completed_lessons ?? [],
            lastActive: progress?.updated_at ?? null,
        };
    });
}

export async function isAdmin(uid) {
    if (!uid) return false;
    const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', uid)
        .single();
    return data?.is_admin ?? false;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Cohorts — admin manages these by hand until the Class Coordinator console
   exists (Personas & Journeys v2). A cohort is a recurring weekly class:
   one teacher, a fixed small group, a fixed term — distinct from `bookings`,
   which is a one-off 1:1 session.
───────────────────────────────────────────────────────────────────────────── */

export async function setUserRole(uid, role) {
    const { error } = await supabase.from('profiles').update({ role }).eq('id', uid);
    if (error) throw error;
}

export async function listCohorts() {
    const { data, error } = await supabase
        .from('cohorts')
        .select('*, teacher:teacher_id(name, email), cohort_members(count)')
        .order('created_at', { ascending: false });
    if (error) { console.error('[adminService] listCohorts error:', error.message); return []; }
    return data.map(c => ({
        ...c,
        teacherName: c.teacher?.name || c.teacher?.email || null,
        memberCount: c.cohort_members?.[0]?.count ?? 0,
    }));
}

export async function createCohort({ teacherId, name, level, scheduleNote, termStart, termEnd }) {
    const { data, error } = await supabase
        .from('cohorts')
        .insert({
            teacher_id: teacherId || null,
            name,
            level: level || null,
            schedule_note: scheduleNote || null,
            term_start: termStart || null,
            term_end: termEnd || null,
        })
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function getCohortMembers(cohortId) {
    const { data, error } = await supabase
        .from('cohort_members')
        .select('id, profile_id, profiles:profile_id(name, email)')
        .eq('cohort_id', cohortId);
    if (error) { console.error('[adminService] getCohortMembers error:', error.message); return []; }
    return data.map(m => ({ id: m.id, profileId: m.profile_id, name: m.profiles?.name, email: m.profiles?.email }));
}

export async function addCohortMember(cohortId, profileId) {
    const { error } = await supabase.from('cohort_members').insert({ cohort_id: cohortId, profile_id: profileId });
    if (error) throw error;
}

export async function removeCohortMember(memberRowId) {
    const { error } = await supabase.from('cohort_members').delete().eq('id', memberRowId);
    if (error) throw error;
}
