/* ─────────────────────────────────────────────────────────────────────────────
   userService.js — Profil utilisateur + progression (Supabase PostgreSQL)
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

/* ── Lire le profil du compte connecté (par auth_user_id, pas id — voir
   authService.js:getUserProfile pour le même choix et pourquoi) ── */
export async function getProfile(uid) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', uid)
        .single();
    if (error) return null;
    return data;
}

/* ── Lire un profil par son id (pas auth_user_id) — utilisé pour dériver la
   tranche d'âge du profil actif, qui peut être un enfant sans compte auth ── */
export async function getProfileById(id) {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, name, birth_year, native_lang')
        .eq('id', id)
        .single();
    if (error) return null;
    return data;
}

/* ── Marque un profil comme actif à l'instant ── */
// authService.js does this for the account holder on real Supabase sign-in,
// but a child profile (no auth account of its own) never fires that event —
// its own "last active" needs to be touched whenever ITS Hub is in use,
// account-holder or child alike.
export async function touchLastSeen(profileId) {
    if (!profileId) return;
    try { await supabase.from('profiles').update({ last_seen: new Date().toISOString() }).eq('id', profileId); }
    catch { /* best-effort, never block the Hub on this */ }
}

/* ── Mettre à jour le profil ── */
export async function updateProfile(uid, fields) {
    const { error } = await supabase
        .from('profiles')
        .upsert({ id: uid, ...fields });
    if (error) throw error;
}

/* ── Lire la progression (XP, gems, cœurs, streak, leçons) ── */
export async function getProgress(uid) {
    const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', uid)
        .single();
    if (error) return null;
    return data;
}

/* ── Sauvegarder la progression ── */
export async function saveProgress(uid, fields) {
    const { error } = await supabase
        .from('user_progress')
        .upsert({ user_id: uid, ...fields, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    if (error) console.error('[userService] saveProgress error:', error.message);
}

/* ── Ajouter des gems ── */
export async function addGems(uid, amount) {
    const { error } = await supabase.rpc('increment_gems', { uid, amount });
    if (error) {
        // fallback si la fonction RPC n'existe pas encore
        const curr = await getProgress(uid);
        await saveProgress(uid, { gems: (curr?.gems ?? 50) + amount });
    }
}

/* ── Mettre à jour le streak ── */
export async function updateStreak(uid) {
    const today    = new Date().toISOString().slice(0, 10);
    const progress = await getProgress(uid);
    if (!progress) return;

    const lastDate = progress.streak_last_date;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    let newStreak = progress.streak ?? 0;
    if (lastDate === today)      return; // déjà mis à jour aujourd'hui
    if (lastDate === yesterday)  newStreak += 1;
    else                         newStreak  = 1; // série cassée

    await saveProgress(uid, { streak: newStreak, streak_last_date: today });
    return newStreak;
}

/* ── Marquer une leçon comme complétée ── */
export async function completeLesson(uid, lessonId) {
    const progress = await getProgress(uid);
    if (!progress) return;
    const completed = new Set(progress.completed_lessons ?? []);
    if (completed.has(lessonId)) return; // déjà faite
    completed.add(lessonId);
    await saveProgress(uid, { completed_lessons: [...completed] });
}

/* ── Marquer une certification d'unité comme obtenue ── */
export async function completeCertification(uid, unitId) {
    const progress = await getProgress(uid);
    if (!progress) return;
    const completed = new Set(progress.completed_certifications ?? []);
    if (completed.has(unitId)) return; // déjà obtenue
    completed.add(unitId);
    await saveProgress(uid, { completed_certifications: [...completed] });
}

/* ── Classement réel (top N par XP) ── */
export async function getLeaderboard(limitN = 10) {
    const { data, error } = await supabase.rpc('get_leaderboard', { limit_n: limitN });
    if (error) { console.error('[userService] getLeaderboard error:', error.message); return []; }
    return data || [];
}

/* ── Rang réel de l'utilisateur (1-indexé), même hors du top N ── */
export async function getMyRank(uid) {
    const { data, error } = await supabase.rpc('get_my_rank', { uid });
    if (error) { console.error('[userService] getMyRank error:', error.message); return null; }
    return data;
}

/* ── Vérifier si admin ── */
export async function checkIsAdmin(uid) {
    const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', uid)
        .single();
    return data?.is_admin ?? false;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Household / guardian model — one account holder, several learner profiles.
   A "child" profile has no auth_user_id of its own: it only exists inside its
   guardian's household, and the guardian's session is what grants access to
   it (see migration 014's household RLS policies).
───────────────────────────────────────────────────────────────────────────── */

/* ── Tous les profils du foyer de `uid` (lui-même compris), avec leur progression ── */
export async function listHouseholdMembers(uid) {
    const me = await getProfile(uid);
    if (!me?.household_id) return [];

    const { data: members, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('household_id', me.household_id)
        .order('created_at', { ascending: true });
    if (error) { console.error('[userService] listHouseholdMembers error:', error.message); return []; }

    const ids = members.map(m => m.id);
    const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .in('user_id', ids);
    const progressByUid = Object.fromEntries((progress ?? []).map(p => [p.user_id, p]));

    return members.map(m => ({ ...m, progress: progressByUid[m.id] ?? null }));
}

/* ── Ajoute un profil enfant (sans compte auth) au foyer de `guardianUid` ── */
export async function addChildProfile(guardianUid, { name, birthYear }) {
    const guardian = await getProfile(guardianUid);
    if (!guardian?.household_id) throw new Error('No household found for this account.');

    // profiles.id has no DB-side default — every prior row got it from the
    // signup trigger (id = auth user's own id). A child profile has no auth
    // user, so it must be generated here.
    const { data: child, error } = await supabase
        .from('profiles')
        .insert({
            id:           crypto.randomUUID(),
            household_id: guardian.household_id,
            name,
            birth_year:   birthYear || null,
            role:         'child',
            native_lang:  guardian.native_lang,
            learning_lang: guardian.learning_lang,
        })
        .select()
        .single();
    if (error) throw error;

    // The auth.users signup trigger creates user_progress automatically for
    // account holders; a child profile has no auth row, so create it here.
    const { error: progressError } = await supabase
        .from('user_progress')
        .insert({ user_id: child.id });
    if (progressError) console.error('[userService] addChildProfile progress error:', progressError.message);

    return child;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Student-facing cohort info — "what class am I in, what's this week's
   homework, when's the next session". Read-only from the learner's side;
   RLS (migration 016) scopes this to cohorts the active profile actually
   belongs to.
───────────────────────────────────────────────────────────────────────────── */
export async function getMyCohortInfo(profileId) {
    const { data: memberships, error } = await supabase
        .from('cohort_members')
        .select('cohort_id')
        .eq('profile_id', profileId);
    if (error || !memberships || memberships.length === 0) return null;

    const cohortId = memberships[0].cohort_id;
    const { data: cohort } = await supabase.from('cohorts').select('*').eq('id', cohortId).single();
    if (!cohort) return null;

    const today = new Date().toISOString().slice(0, 10);
    const { data: sessions } = await supabase
        .from('class_sessions')
        .select('*')
        .eq('cohort_id', cohortId)
        .eq('status', 'scheduled')
        .gte('session_date', today)
        .order('session_date', { ascending: true })
        .limit(1);

    return {
        cohortName: cohort.name,
        homeworkNote: cohort.homework_note,
        homeworkUpdatedAt: cohort.homework_updated_at,
        nextSession: sessions?.[0] || null,
    };
}
