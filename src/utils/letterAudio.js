/**
 * letterAudio.js
 * Real speaker recordings of each Medumba letter's own isolated sound —
 * distinct from medumbaAudio.js, which plays whole words/phrases. Shared
 * between AlphabetPage (reference chart) and the Alphabet lesson quiz so
 * there's one map instead of two copies drifting apart.
 * Every letter except α and ə has a recording (see AlphabetPage.jsx history).
 */
import audioA from '../assets/alphabet/a.mp4';
import audioB from '../assets/alphabet/b.mp4';
import audioBarU from '../assets/alphabet/bar_u.mp4';
import audioC from '../assets/alphabet/c.mp4';
import audioD from '../assets/alphabet/d.mp4';
import audioE from '../assets/alphabet/e.mp4';
import audioEng from '../assets/alphabet/eng.mp4';
import audioF from '../assets/alphabet/f.mp4';
import audioG from '../assets/alphabet/g.mp4';
import audioGh from '../assets/alphabet/gh.mp4';
import audioGlottal from '../assets/alphabet/glottal.mp4';
import audioH from '../assets/alphabet/h.mp4';
import audioI from '../assets/alphabet/i.mp4';
import audioJ from '../assets/alphabet/j.mp4';
import audioK from '../assets/alphabet/k.mp4';
import audioL from '../assets/alphabet/l.mp4';
import audioM from '../assets/alphabet/m.mp4';
import audioN from '../assets/alphabet/n.mp4';
import audioNy from '../assets/alphabet/ny.mp4';
import audioO from '../assets/alphabet/o.mp4';
import audioOpenE from '../assets/alphabet/open_e.mp4';
import audioOpenO from '../assets/alphabet/open_o.mp4';
import audioS from '../assets/alphabet/s.mp4';
import audioSh from '../assets/alphabet/sh.mp4';
import audioT from '../assets/alphabet/t.mp4';
import audioTs from '../assets/alphabet/ts.mp4';
import audioU from '../assets/alphabet/u.mp4';
import audioV from '../assets/alphabet/v.mp4';
import audioW from '../assets/alphabet/w.mp4';
import audioY from '../assets/alphabet/y.mp4';
import audioZ from '../assets/alphabet/z.mp4';

export const LETTER_AUDIO_MAP = {
    a: audioA, b: audioB, ɨ: audioBarU, c: audioC, d: audioD, e: audioE,
    ŋ: audioEng, f: audioF, g: audioG, gh: audioGh, 'ꞌ': audioGlottal,
    h: audioH, i: audioI, j: audioJ, k: audioK, l: audioL, m: audioM,
    n: audioN, ny: audioNy, o: audioO, ε: audioOpenE, ɔ: audioOpenO,
    s: audioS, sh: audioSh, t: audioT, ts: audioTs, u: audioU, v: audioV,
    w: audioW, y: audioY, z: audioZ,
};

export function hasLetterAudio(letter) {
    return !!LETTER_AUDIO_MAP[letter];
}

let _audio = null;

export function playLetterAudio(letter, onStart, onEnd) {
    const src = LETTER_AUDIO_MAP[letter];
    if (!src) { onEnd?.(); return; }
    if (_audio) _audio.pause();
    const audio = new Audio(src);
    _audio = audio;
    audio.onended = () => onEnd?.();
    audio.onerror = () => onEnd?.();
    audio.play().then(() => onStart?.()).catch(() => onEnd?.());
}

export function stopLetterAudio() {
    if (_audio) { _audio.pause(); _audio = null; }
}
