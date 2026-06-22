/* ─────────────────────────────────────────────────────────────────────────────
   userService.js — Profil utilisateur + progression (Supabase PostgreSQL)
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

/* ── Lire le profil complet ── */
export async function getProfile(uid) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .single();
    if (error) return null;
    return data;
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
        .upsert({ user_id: uid, ...fields, updated_at: new Date().toISOString() });
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

/* ── Vérifier si admin ── */
export async function checkIsAdmin(uid) {
    const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', uid)
        .single();
    return data?.is_admin ?? false;
}
