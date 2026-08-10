/* ─────────────────────────────────────────────────────────────────────────────
   contentCreatorService.js — consent recording + audio word submissions.
   RLS (migration 021) scopes storage uploads to the submissions/ prefix and
   consent_records to their own creator.
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

const BUCKET = 'medumba-audio';

export async function uploadSubmissionAudio(blob, filenamePrefix) {
    const path = `submissions/${filenamePrefix}-${Date.now()}.webm`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: 'audio/webm' });
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
}

export async function hasConsented(creatorProfileId) {
    const { data } = await supabase
        .from('consent_records')
        .select('id')
        .eq('granted_by', creatorProfileId)
        .eq('type', 'audio_recording')
        .limit(1);
    return (data?.length ?? 0) > 0;
}

export async function recordConsent(creatorProfileId, audioUrl) {
    const { error } = await supabase.from('consent_records').insert({
        subject_profile_id: creatorProfileId,
        granted_by: creatorProfileId,
        type: 'audio_recording',
        audio_url: audioUrl,
        script_version: 'v1',
    });
    if (error) throw error;
}

export async function submitWord(creatorProfileId, { wordFr, wordEn, definitionFr, domain, audioUrl }) {
    const { error } = await supabase.from('word_submissions').insert({
        submitted_by:  creatorProfileId,
        word_fr:       wordFr,
        word_en:       wordEn || null,
        definition_fr: definitionFr || null,
        domain:        domain || 'general',
        audio_url:     audioUrl || null,
    });
    if (error) throw error;

    // Best-effort — the submission is already saved above, so a failure
    // here (e.g. Resend not configured) must not surface to the submitter.
    try {
        await fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ kind: 'word_submission', wordFr, wordMedumba: null }),
        });
    } catch {
        // ignored — the submission still landed in word_submissions
    }
}

export async function listMySubmissions(creatorProfileId) {
    const { data, error } = await supabase
        .from('word_submissions')
        .select('*')
        .eq('submitted_by', creatorProfileId)
        .order('created_at', { ascending: false });
    if (error) { console.error('[contentCreatorService] listMySubmissions error:', error.message); return []; }
    return data;
}
