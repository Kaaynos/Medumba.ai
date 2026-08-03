/* ─────────────────────────────────────────────────────────────────────────────
   realVoiceWords.js — dictionary entries backed by a real recorded speaker
   (hasRealVoice), shared by every feature that needs an honest "word of the
   day" style prompt: BabyRitualPage, YoungLearnerPage, the practice recorder.
───────────────────────────────────────────────────────────────────────────── */
import { DICTIONARY } from '../data/medumbaDictionary';
import { hasRealVoice } from './medumbaAudio';

export const REAL_VOICE_WORDS = DICTIONARY.filter(e => hasRealVoice(e.medumba));

export function wordOfTheDay() {
    if (REAL_VOICE_WORDS.length === 0) return null;
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return REAL_VOICE_WORDS[dayOfYear % REAL_VOICE_WORDS.length];
}
