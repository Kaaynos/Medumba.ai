// Guardrail layer between Tontah's tools and the caller (the doc, Part
// III: "The layer between the model and the child"). Pure, side-effect
// free — testable the same way as persona.js.
//
// Scope for this pass, and why the rest is deferred:
// - Grounding / unsourceable-number checks are about validating
//   MODEL-GENERATED text that cites retrieved facts — nothing generates
//   that kind of mixed text yet (ticket 3 is direct tool calls, not a
//   conversational loop). enforceGrounding() below covers the one place
//   this already applies: look_up_word must not hand back a weak/no
//   match as if it were a confident answer.
// - Turn cap needs multi-turn session state, which doesn't exist until
//   the real chat UI/loop is built.
// - General off-topic scope limiting for minors is deliberately NOT
//   attempted here — a keyword classifier risks false-positiving on
//   innocent language questions from a child, which would actively harm
//   the product this exists to protect. Left for a properly-designed
//   pass, not a quick heuristic.

// Deliberately a heuristic, not a classifier — catches the clearest,
// most literal crisis-language patterns in French and English (this
// app's bilingual base). It WILL miss real distress phrased differently
// and could in principle false-positive on an unlucky literal phrase;
// documented here so nobody mistakes this for a robust safety system.
const DISTRESS_PATTERNS = [
    /\b(kill myself|end my life|want to die|suicidal|hurt myself|self[\s-]?harm)\b/i,
    /\bme (tuer|suicider)\b/i,
    /\ben finir avec (ma|la) vie\b/i,
    /\bme faire du mal\b/i,
    /\benvie de mourir\b/i,
];

export function checkDistress(text) {
    if (!text) return false;
    return DISTRESS_PATTERNS.some(p => p.test(text));
}

const MINOR_PERSONAS = new Set(['young_learner', 'youth']);
export function isMinorPersona(persona) {
    return MINOR_PERSONAS.has(persona);
}

/**
 * Gate for look_up_word results. The doc: "Return the confidence. Below
 * threshold is not a weak answer — it triggers ask_an_elder." Verified
 * this session (ticket 2 tuning) that has_keyword_match is the reliable
 * signal — the scalar confidence alone can't tell a strong match from a
 * vector-only near-match at the same normalized floor score.
 * @param {Array<{has_keyword_match?: boolean}>|null} results retrieve_corpus rows
 */
export function enforceGrounding(results) {
    if (!results || results.length === 0) return { grounded: false, results: [] };
    if (!results[0].has_keyword_match) return { grounded: false, results: [] };
    return { grounded: true, results };
}
