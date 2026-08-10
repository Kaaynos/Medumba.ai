// The five Phase-1 tools (Tontah ticket 3), thin wrappers around ticket
// 2's retrieve_corpus and the two tables migration 033 added. Deliberately
// a few lines each, not a framework — "tool calling, retrieval and a
// structured response are a few hundred lines. A framework adds
// indirection, upgrade risk, and a debugging layer between you and a bug
// a child will find."

import { sendNotifyEmail } from '../_shared/notify.js';

const BUCKET = 'medumba-audio';

async function embed(mistralKey, text) {
    const resp = await fetch('https://api.mistral.ai/v1/embeddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${mistralKey}` },
        body: JSON.stringify({ model: 'mistral-embed', input: [text] }),
    });
    if (!resp.ok) throw new Error(`embeddings failed: ${resp.status}`);
    const data = await resp.json();
    return data.data[0].embedding;
}

/** look_up_word: term, lang?, village?, level? -> entries with gloss, variant, confidence */
export async function lookUpWord(admin, mistralKey, profile, { term, level }) {
    if (!term) throw new Error('term is required');
    const embedding = await embed(mistralKey, term);

    let villageFondom = null;
    if (profile?.household_id) {
        const { data: household } = await admin.from('households').select('village_fondom').eq('id', profile.household_id).single();
        villageFondom = household?.village_fondom || null;
    }

    const { data, error } = await admin.rpc('retrieve_corpus', {
        p_query: term,
        p_query_embedding: embedding,
        p_village_fondom: villageFondom,
        p_max_level: level || null,
        p_limit: 5,
    });
    if (error) throw new Error(error.message);
    return data;
}

/** play_recording: corpus_audio_id -> signed URL, speaker, village, duration */
export async function playRecording(admin, { corpusAudioId }) {
    if (!corpusAudioId) throw new Error('corpusAudioId is required');
    const { data, error } = await admin.from('corpus_audio').select('*').eq('id', corpusAudioId).single();
    if (error) throw new Error(error.message);
    const { data: urlData } = admin.storage.from(BUCKET).getPublicUrl(data.storage_path);
    return { url: urlData.publicUrl, speaker: data.speaker_name, village: data.village, durationMs: data.duration_ms };
}

/** score_attempt: profile_id, corpus_entry_id, audio_ref -> encouragement + next action — no score */
export async function scoreAttempt(admin, profile, { corpusEntryId }) {
    if (!profile?.id) throw new Error('No profile for this session');
    if (!corpusEntryId) throw new Error('corpusEntryId is required');

    const { data: existing } = await admin.from('learner_fact')
        .select('attempts').eq('profile_id', profile.id).eq('corpus_entry_id', corpusEntryId).maybeSingle();
    const attempts = (existing?.attempts || 0) + 1;
    const nextDue = new Date(Date.now() + 86400000 * Math.min(attempts, 7)); // simple spaced repetition, caps at a week

    const { error } = await admin.from('learner_fact').upsert({
        profile_id: profile.id, corpus_entry_id: corpusEntryId,
        state: attempts >= 3 ? 'known' : 'learning', attempts,
        last_seen_at: new Date().toISOString(), next_due_at: nextDue.toISOString(),
    }, { onConflict: 'profile_id,corpus_entry_id' });
    if (error) throw new Error(error.message);

    // Deliberately no numeric score, per the doc: encouragement + next
    // action only — Tontah "celebrates real effort and does not praise nothing."
    return { encouragement: 'good_effort', nextAction: attempts >= 3 ? 'review_later' : 'try_again' };
}

/** add_to_practice: profile_id, corpus_entry_id -> next_due_at */
export async function addToPractice(admin, profile, { corpusEntryId }) {
    if (!profile?.id) throw new Error('No profile for this session');
    if (!corpusEntryId) throw new Error('corpusEntryId is required');

    const { data, error } = await admin.from('learner_fact').upsert({
        profile_id: profile.id, corpus_entry_id: corpusEntryId, next_due_at: new Date().toISOString(),
    }, { onConflict: 'profile_id,corpus_entry_id', ignoreDuplicates: true }).select().maybeSingle();
    if (error) throw new Error(error.message);

    if (data) return { nextDueAt: data.next_due_at };
    const { data: row } = await admin.from('learner_fact').select('next_due_at')
        .eq('profile_id', profile.id).eq('corpus_entry_id', corpusEntryId).single();
    return { nextDueAt: row?.next_due_at };
}

/** ask_an_elder: term, profile_id, household_id, context -> open_question id, expected window */
export async function askAnElder(admin, profile, { term }) {
    if (!term) throw new Error('term is required');
    const { data, error } = await admin.from('open_question').insert({
        profile_id: profile?.id || null, term_asked: term,
    }).select().single();
    if (error) throw new Error(error.message);

    // Best-effort — the question is already queued above, so a failure here
    // (e.g. Resend not configured) must not block the answer to the learner.
    sendNotifyEmail('open_question', { termAsked: term, askedByName: profile?.name }).catch(() => {});

    // Never a guess, never hedged — "I don't know that one yet. Let me
    // ask in Bangangté — I'll come back to you."
    return { openQuestionId: data.id, expectedWindowDays: 3 };
}
