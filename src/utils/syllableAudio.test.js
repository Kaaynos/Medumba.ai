import { describe, it, expect } from 'vitest';
import { toHexKey, segmentPhrase } from './syllableAudio';

describe('toHexKey', () => {
    it('encodes ASCII text to lowercase hex', () => {
        expect(toHexKey('ba')).toBe('6261');
    });

    it('encodes UTF-8 multi-byte characters (IPA symbols)', () => {
        // 'ɛ' (U+025B) is a 2-byte UTF-8 sequence: 0xC9 0x9B
        expect(toHexKey('ɛ')).toBe('c99b');
    });
});

describe('segmentPhrase (strict)', () => {
    it('returns null for a phrase with no recorded syllable coverage', () => {
        expect(segmentPhrase('zzzzqqqq')).toBeNull();
    });

    it('returns a non-empty segment list for a fully-covered word', () => {
        // "Bu" (hand) is a single recorded syllable — confirmed full coverage.
        const result = segmentPhrase('Bu');
        expect(result).not.toBeNull();
        expect(result.length).toBeGreaterThan(0);
    });

    it('fails the whole phrase if any single word is uncovered', () => {
        const result = segmentPhrase('Bu zzzzqqqq');
        expect(result).toBeNull();
    });
});
