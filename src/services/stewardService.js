/* ─────────────────────────────────────────────────────────────────────────────
   stewardService.js — Cultural Steward console: review word_submissions,
   approve into dictionary_entries, or reject with a reason.
   RLS (migration 020) scopes writes to admin/content_owner roles.
───────────────────────────────────────────────────────────────────────────── */
import { supabase } from '../config/supabase';

export async function listSubmissions(status = null) {
    let query = supabase.from('word_submissions').select('*').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) { console.error('[stewardService] listSubmissions error:', error.message); return []; }
    return data;
}

export async function updateSubmissionStatus(id, status, notes) {
    const { error } = await supabase
        .from('word_submissions')
        .update({ status, franklin_notes: notes || null, reviewed_at: new Date().toISOString() })
        .eq('id', id);
    if (error) throw error;
}

/* Approves a submission straight into the public dictionary — the one
   irreversible-in-spirit action here, so it both writes dictionary_entries
   and marks the submission 'approved' in the same call. */
export async function approveToDictionary(submission) {
    const { error: dictError } = await supabase.from('dictionary_entries').insert({
        word_medumba:    submission.word_medumba,
        word_fr:         submission.word_fr,
        word_en:         submission.word_en,
        definition_fr:   submission.definition_fr,
        definition_en:   submission.definition_en,
        tone_marks:      submission.tone_marks,
        audio_url:       submission.audio_url,
        domain:          submission.domain || 'general',
        validated_by:    'steward',
    });
    if (dictError) throw dictError;

    const { error: subError } = await supabase
        .from('word_submissions')
        .update({ status: 'approved', reviewed_at: new Date().toISOString() })
        .eq('id', submission.id);
    if (subError) throw subError;
}
