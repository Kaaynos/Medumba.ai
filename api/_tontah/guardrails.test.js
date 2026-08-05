import { describe, it, expect } from 'vitest';
import { checkDistress, isMinorPersona, enforceGrounding } from './guardrails.js';

describe('checkDistress', () => {
    it('returns false for empty or missing input', () => {
        expect(checkDistress('')).toBe(false);
        expect(checkDistress(null)).toBe(false);
        expect(checkDistress(undefined)).toBe(false);
    });

    it('flags clear English crisis-language patterns', () => {
        expect(checkDistress('I want to kill myself')).toBe(true);
        expect(checkDistress('sometimes I want to die')).toBe(true);
        expect(checkDistress('I feel suicidal lately')).toBe(true);
        expect(checkDistress('I keep wanting to hurt myself')).toBe(true);
    });

    it('flags clear French crisis-language patterns', () => {
        expect(checkDistress('je veux me tuer')).toBe(true);
        expect(checkDistress('j\'ai envie de me suicider')).toBe(true);
        expect(checkDistress('j\'ai envie de mourir')).toBe(true);
        expect(checkDistress('je veux en finir avec ma vie')).toBe(true);
    });

    it('does not flag ordinary language-learning queries', () => {
        expect(checkDistress('comment dit-on chien en medumba')).toBe(false);
        expect(checkDistress('how do you say water')).toBe(false);
        expect(checkDistress('what does this word mean')).toBe(false);
        expect(checkDistress('je suis fatigué aujourd\'hui')).toBe(false);
    });

    it('does not flag unrelated uses of similar words (documented limitation, not a guarantee)', () => {
        // "mourir" appears in ordinary language content (e.g. a story or
        // proverb about death) without being a distress signal — the
        // heuristic is intentionally narrow (fixed phrases only) to avoid
        // this, at the cost of missing more indirectly-phrased distress.
        expect(checkDistress('le vieux proverbe parle de la mort et de la vie')).toBe(false);
    });
});

describe('isMinorPersona', () => {
    it('is true for young_learner and youth', () => {
        expect(isMinorPersona('young_learner')).toBe(true);
        expect(isMinorPersona('youth')).toBe(true);
    });

    it('is false for adult_learner, visitor, cultural_steward, and null', () => {
        expect(isMinorPersona('adult_learner')).toBe(false);
        expect(isMinorPersona('visitor')).toBe(false);
        expect(isMinorPersona('cultural_steward')).toBe(false);
        expect(isMinorPersona(null)).toBe(false);
        expect(isMinorPersona(undefined)).toBe(false);
    });
});

describe('enforceGrounding', () => {
    it('is not grounded for null or empty results', () => {
        expect(enforceGrounding(null)).toEqual({ grounded: false, results: [] });
        expect(enforceGrounding([])).toEqual({ grounded: false, results: [] });
    });

    it('is not grounded when the top result has no keyword match', () => {
        const results = [{ headword: 'x', has_keyword_match: false, confidence: 0.5 }];
        expect(enforceGrounding(results)).toEqual({ grounded: false, results: [] });
    });

    it('is grounded when the top result has a real keyword match', () => {
        const results = [{ headword: 'Mbʉ', has_keyword_match: true, confidence: 0.5 }];
        const out = enforceGrounding(results);
        expect(out.grounded).toBe(true);
        expect(out.results).toBe(results);
    });

    it('only looks at the TOP result — a good match buried behind a bad one still fails (order matters upstream)', () => {
        const results = [
            { headword: 'noise', has_keyword_match: false },
            { headword: 'real match', has_keyword_match: true },
        ];
        expect(enforceGrounding(results).grounded).toBe(false);
    });
});
