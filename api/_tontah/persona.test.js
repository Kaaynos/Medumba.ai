import { describe, it, expect } from 'vitest';
import { resolvePersona, isToolAllowed, TOOLS_FOR } from './persona.js';

const PHASE1_LEARNER_TOOLS = ['look_up_word', 'play_recording', 'score_attempt', 'add_to_practice', 'ask_an_elder'];

describe('resolvePersona', () => {
    it('resolves an unauthenticated caller to visitor', () => {
        expect(resolvePersona(null)).toBe('visitor');
    });

    it('resolves content_owner role to cultural_steward regardless of age', () => {
        expect(resolvePersona({ role: 'content_owner', birth_year: 1980 })).toBe('cultural_steward');
    });

    it('resolves a 0-4 profile to null — no persona, no tools, ever', () => {
        const thisYear = new Date().getFullYear();
        expect(resolvePersona({ role: 'child', birth_year: thisYear - 3 })).toBeNull();
        expect(resolvePersona({ role: 'child', age: '2' })).toBeNull();
    });

    it('resolves a 5-8 profile to young_learner', () => {
        const thisYear = new Date().getFullYear();
        expect(resolvePersona({ role: 'child', birth_year: thisYear - 7 })).toBe('young_learner');
    });

    it('resolves a 9-12 profile to youth', () => {
        const thisYear = new Date().getFullYear();
        expect(resolvePersona({ role: 'child', birth_year: thisYear - 10 })).toBe('youth');
    });

    it('resolves a 13+ profile, and any profile with no age on file, to adult_learner', () => {
        const thisYear = new Date().getFullYear();
        expect(resolvePersona({ role: 'child', birth_year: thisYear - 15 })).toBe('adult_learner');
        expect(resolvePersona({ role: 'parent', age: '34' })).toBe('adult_learner');
        expect(resolvePersona({ role: 'parent' })).toBe('adult_learner'); // no age on file at all
    });

    it('prefers birth_year over the legacy age column when both are present', () => {
        const thisYear = new Date().getFullYear();
        // birth_year says 7 (young_learner); stale age column says 34 (would be adult_learner)
        expect(resolvePersona({ role: 'child', birth_year: thisYear - 7, age: '34' })).toBe('young_learner');
    });
});

describe('isToolAllowed — the persona x tool matrix', () => {
    it('never allows any tool for a null persona (the Baby band)', () => {
        for (const tool of [...PHASE1_LEARNER_TOOLS, 'anything_else']) {
            expect(isToolAllowed(null, tool)).toBe(false);
        }
    });

    it('gives visitor look_up_word, play_recording and ask_an_elder, but never learner-progress tools', () => {
        expect(isToolAllowed('visitor', 'look_up_word')).toBe(true);
        expect(isToolAllowed('visitor', 'play_recording')).toBe(true);
        expect(isToolAllowed('visitor', 'ask_an_elder')).toBe(true);
        expect(isToolAllowed('visitor', 'score_attempt')).toBe(false);
        expect(isToolAllowed('visitor', 'add_to_practice')).toBe(false);
    });

    it('gives young_learner, youth and adult_learner the full five-tool learner set', () => {
        for (const persona of ['young_learner', 'youth', 'adult_learner']) {
            for (const tool of PHASE1_LEARNER_TOOLS) {
                expect(isToolAllowed(persona, tool)).toBe(true);
            }
        }
    });

    it('gives cultural_steward none of the five learner tools — its own tools are a separate ticket', () => {
        for (const tool of PHASE1_LEARNER_TOOLS) {
            expect(isToolAllowed('cultural_steward', tool)).toBe(false);
        }
    });

    it('rejects an unknown tool name for every persona, including adult_learner', () => {
        for (const persona of Object.keys(TOOLS_FOR)) {
            expect(isToolAllowed(persona, 'delete_all_users')).toBe(false);
        }
    });

    it('rejects a spoofed/unknown persona string outright', () => {
        expect(isToolAllowed('teacher', 'look_up_word')).toBe(false);
        expect(isToolAllowed('admin', 'look_up_word')).toBe(false);
        expect(isToolAllowed(undefined, 'look_up_word')).toBe(false);
    });
});
