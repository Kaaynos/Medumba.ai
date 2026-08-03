/* ─────────────────────────────────────────────────────────────────────────────
   practiceClipService.js — the parent's "proof artefact" (Personas & Journeys
   v2: "Every Sunday, forty seconds of her children's voices... redesign the
   artefact, not the prompt"). Clips are the learner's own practice voice —
   not curated corpus audio — uploaded under medumba-audio/practice/
   (migration 024).
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

const BUCKET = 'medumba-audio';

export async function uploadPracticeClip(blob, profileId) {
    const path = `practice/${profileId}-${Date.now()}.webm`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: 'audio/webm' });
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
}

export async function saveClip(profileId, audioUrl, promptWord) {
    const { error } = await supabase.from('practice_clips').insert({
        profile_id: profileId, audio_url: audioUrl, prompt_word: promptWord || null,
    });
    if (error) throw error;
}

export async function getWeeklyClips(profileId, sinceDays = 7) {
    const since = new Date(Date.now() - sinceDays * 86400000).toISOString();
    const { data, error } = await supabase
        .from('practice_clips')
        .select('*')
        .eq('profile_id', profileId)
        .gte('created_at', since)
        .order('created_at', { ascending: true });
    if (error) { console.error('[practiceClipService] getWeeklyClips error:', error.message); return []; }
    return data;
}
