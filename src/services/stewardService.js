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

/* ─────────────────────────────────────────────────────────────────────────────
   Ask-an-elder loop (Tontah ticket 3's open_question, migration 034's write
   policies) — the same console, a second intake path, not a separate one.
───────────────────────────────────────────────────────────────────────────── */
export async function listOpenQuestions(status = null) {
    let query = supabase.from('open_question').select('*').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) { console.error('[stewardService] listOpenQuestions error:', error.message); return []; }
    return data;
}

/* The question turns out to already be in the corpus — just wasn't found
   (a retrieval gap, not a real gap). Links it, no new data written. */
export async function linkQuestionToExistingEntry(questionId, corpusEntryId) {
    const { error } = await supabase.from('open_question').update({
        status: 'answered', answered_corpus_entry_id: corpusEntryId, answered_at: new Date().toISOString(),
    }).eq('id', questionId);
    if (error) throw error;
}

/* The real case the loop exists for: the word genuinely wasn't in the
   corpus. Steward provides it — text always, audio when an elder's
   recording is in hand — creating the entry and (optionally) linking a
   real recording, never a synthesized one. */
export async function answerQuestionWithNewEntry(questionId, { headword, glossFr, glossEn }, audioBlob = null) {
    const { data: entry, error: entryError } = await supabase.from('corpus_entry').insert({
        headword, gloss_fr: glossFr || null, gloss_en: glossEn || null, tags: ['word'],
    }).select().single();
    if (entryError) throw entryError;

    if (audioBlob) {
        const path = `corpus/${entry.id}-${Date.now()}.webm`;
        const { error: uploadError } = await supabase.storage.from('medumba-audio').upload(path, audioBlob, { contentType: 'audio/webm' });
        if (uploadError) throw uploadError;
        const { error: audioError } = await supabase.from('corpus_audio').insert({
            corpus_entry_id: entry.id, storage_path: path,
        });
        if (audioError) throw audioError;
    }

    const { error: qError } = await supabase.from('open_question').update({
        status: 'answered', answered_corpus_entry_id: entry.id, answered_at: new Date().toISOString(),
    }).eq('id', questionId);
    if (qError) throw qError;

    return entry;
}

export async function declineQuestion(questionId) {
    const { error } = await supabase.from('open_question').update({
        status: 'declined', answered_at: new Date().toISOString(),
    }).eq('id', questionId);
    if (error) throw error;
}
