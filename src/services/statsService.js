/* ─────────────────────────────────────────────────────────────────────────────
   statsService.js — Statistiques publiques (landing page)
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

/**
 * Nombre d'apprenants actifs (connectés au cours des 30 derniers jours).
 * Passe par une fonction Postgres "security definer" (get_active_learner_count)
 * pour ne jamais exposer les profils individuels — seule la landing page
 * anonyme appelle cette fonction.
 */
export async function getActiveLearnerCount() {
    const { data, error } = await supabase.rpc('get_active_learner_count');
    if (error) return null;
    return data ?? null;
}
