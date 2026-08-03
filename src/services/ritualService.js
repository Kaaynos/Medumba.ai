/* ─────────────────────────────────────────────────────────────────────────────
   ritualService.js — 0-4 and 5-8 age-banded experiences (migration 023).
   0-4 is measured in nights/week a ritual is played; 5-8 in words spoken
   aloud per week — never time in app, so this deliberately logs plays, not
   session duration.
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

export async function logRitualPlay(profileId, kind, wordMedumba = null) {
    const { error } = await supabase.from('ritual_plays').insert({
        profile_id: profileId, kind, word_medumba: wordMedumba,
    });
    if (error) console.error('[ritualService] logRitualPlay error:', error.message);
}

export async function getRitualPlays(profileId, sinceDays = 7) {
    const since = new Date(Date.now() - sinceDays * 86400000).toISOString();
    const { data, error } = await supabase
        .from('ritual_plays')
        .select('*')
        .eq('profile_id', profileId)
        .gte('played_at', since)
        .order('played_at', { ascending: false });
    if (error) { console.error('[ritualService] getRitualPlays error:', error.message); return []; }
    return data;
}

/* Distinct calendar nights a lullaby was played in the last 7 days — the
   0-4 metric is "nights per week", never a raw play count. */
export function countDistinctNights(plays, kind) {
    const nights = new Set(
        plays.filter(p => p.kind === kind).map(p => p.played_at.slice(0, 10))
    );
    return nights.size;
}

export function countPlays(plays, kind) {
    return plays.filter(p => p.kind === kind).length;
}
