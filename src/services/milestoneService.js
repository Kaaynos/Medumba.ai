/* ─────────────────────────────────────────────────────────────────────────────
   milestoneService.js — reads the milestones table (migration 042), public
   and anonymous-callable like statsService.js's getActiveLearnerCount(),
   since the celebration popup shows on the landing page before login.
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

/** Most recently crossed learner-count milestone, or null if none yet / on error. */
export async function getLatestMilestone() {
    const { data, error } = await supabase
        .from('milestones')
        .select('threshold, reached_at')
        .order('reached_at', { ascending: false })
        .limit(1)
        .maybeSingle();
    if (error) { console.warn('[milestoneService] getLatestMilestone failed:', error.message); return null; }
    return data;
}
