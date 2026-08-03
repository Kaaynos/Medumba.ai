// Persona resolution + tool-binding matrix for Tontah (ticket 3).
//
// Security boundary from the implementation doc, Part III/"Request Flow":
// "The persona is resolved server-side from the session — never trusted
// from the request body. A request for a persona the session doesn't
// hold is rejected, not downgraded." This module is pure and side-effect
// free specifically so it's easy to unit-test in isolation from any
// network/auth plumbing.
//
// Scope: the five Phase-1 tools (look_up_word, play_recording,
// score_attempt, add_to_practice, ask_an_elder — the first five rows of
// the doc's 13-tool spec table, bound to "All"/"Learners") across the
// five Phase-1 personas named in the doc's persona table: Visitor, Young
// Learner 5-8, Youth 9-12, Adult Learner, Cultural Steward. The Baby 0-4
// band gets no persona and no tools at all — "never addresses a child
// under five." Cultural Steward is Phase-1 but its own tools
// (triage_queue, flag_variant_conflict, draft_gloss) are a separate,
// later ticket — none of the five below bind to it.

const PHASE1_LEARNER_TOOLS = ['look_up_word', 'play_recording', 'score_attempt', 'add_to_practice', 'ask_an_elder'];

export const TOOLS_FOR = {
    visitor:          ['look_up_word', 'play_recording', 'ask_an_elder'], // no progress/account to score against
    young_learner:    PHASE1_LEARNER_TOOLS,
    youth:            PHASE1_LEARNER_TOOLS,
    adult_learner:    PHASE1_LEARNER_TOOLS,
    cultural_steward: [],
};

/**
 * Resolves a persona from the caller's OWN profile row (role + age),
 * looked up server-side from their authenticated session — never from
 * anything the client sent in the request body.
 * @param {{role?: string, birth_year?: number, age?: string|number}|null} profile
 * @returns {string|null} persona key, or null for "no tools at all" (unauthenticated-but-under-5, or Baby band)
 */
export function resolvePersona(profile) {
    if (!profile) return 'visitor';
    if (profile.role === 'content_owner') return 'cultural_steward';

    const age = profile.birth_year
        ? new Date().getFullYear() - profile.birth_year
        : (profile.age != null && profile.age !== '' ? Number(profile.age) : null);

    if (age !== null && Number.isFinite(age)) {
        if (age <= 4) return null;       // Baby band: no persona, no tools, ever
        if (age <= 8) return 'young_learner';
        if (age <= 12) return 'youth';
    }
    return 'adult_learner'; // includes unknown age, teens 13+, and plain 'parent'-role accounts
}

/** Whether `persona` is bound to `toolName` — the actual gate a tool call must pass. */
export function isToolAllowed(persona, toolName) {
    if (!persona) return false;
    return (TOOLS_FOR[persona] || []).includes(toolName);
}
