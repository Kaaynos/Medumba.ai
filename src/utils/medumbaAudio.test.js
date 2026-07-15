import { describe, it, expect } from 'vitest';
import { hasRealVoice } from './medumbaAudio';

describe('hasRealVoice', () => {
    it('returns false for empty or missing input', () => {
        expect(hasRealVoice('')).toBe(false);
        expect(hasRealVoice(null)).toBe(false);
        expect(hasRealVoice(undefined)).toBe(false);
    });

    it('returns true for a word with an exact Storage recording', () => {
        // 'Mbʉ' (dog) is in the STORAGE_FILES manifest.
        expect(hasRealVoice('Mbʉ')).toBe(true);
    });

    it('returns true for a word fully covered by recorded syllables', () => {
        // 'Bu' (hand) is a single recorded syllable.
        expect(hasRealVoice('Bu')).toBe(true);
    });

    it('returns false for a word with no real audio source at all', () => {
        expect(hasRealVoice('zzzzqqqq')).toBe(false);
    });

    it('returns false for a "created" word assembled from 2+ concatenated syllables', () => {
        // 'Fikɛ̀d' (slowness) decomposes into 2 recorded syllables, but there is
        // no single natural recording of the whole word — per the meeting
        // decision ("Remove the created vocals for words"), this must not
        // count as real voice even though each piece individually exists.
        expect(hasRealVoice('Fikɛ̀d')).toBe(false);
    });
});
