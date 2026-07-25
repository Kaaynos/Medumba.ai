import SYLLABLE_TONS from '../data/syllableTons.json';
import RECORDED_SYLLABLES from '../data/recordedSyllables.json';
import { supabase } from '../config/supabase';

/* ── Lecture des mots avec les vrais enregistrements de syllabes plutôt
 * que la synthèse vocale. Partagé entre PronunciationPage (Syllabaire /
 * Lecture) et DictionaryPage.
 *
 * La clé d'objet Supabase Storage est l'encodage hexadécimal UTF-8 de la
 * syllabe (les caractères IPA comme ŋ, ɛ, α, ə, ʉ, ' sont refusés tels
 * quels par Supabase Storage). Voir upload_syllabes_audio.mjs / upload_tons.mjs.
 *
 * Seules les 383 syllabes de recordedSyllables.json ont un enregistrement
 * réel (sur les 1147 de syllableTons.json) : sans ce filtre, une syllabe
 * pourrait matcher le texte sans que son audio existe. ── */

const TONE_KEYS = ['bas', 'moyen', 'montant', 'descendant'];

export function toHexKey(str) {
  return Array.from(new TextEncoder().encode(str))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function syllableAudioUrl(syllable) {
  return supabase.storage.from('medumba-audio').getPublicUrl(`syllabes/${toHexKey(syllable)}.ogg`).data.publicUrl;
}

export function toneAudioUrl(syllable, tone) {
  return supabase.storage.from('medumba-audio').getPublicUrl(`syllabes/${toHexKey(syllable)}_${tone}.ogg`).data.publicUrl;
}

const RECORDED_SET = new Set(RECORDED_SYLLABLES.map(s => s.toLowerCase().normalize('NFC')));

const TONE_VARIANT_MAP = new Map();
for (const s of SYLLABLE_TONS) {
  const root = s.syllable.toLowerCase().normalize('NFC');
  if (!RECORDED_SET.has(root)) continue;
  for (const tone of TONE_KEYS) {
    const variant = s[tone];
    if (variant) TONE_VARIANT_MAP.set(variant.toLowerCase().normalize('NFC'), { root: s.syllable, tone });
  }
  // Forme neutre (sans marque de ton) : beaucoup de mots du lexique
  // n'indiquent pas le ton explicitement. Correspond au segment d'annonce
  // de l'enregistrement original (avant les 4 tons) — voir split_neutral_tons.mjs.
  TONE_VARIANT_MAP.set(root, { root: s.syllable, tone: 'neutre' });
}

const NASAL_PREFIX_RE = /^[nmŋ][̀-ͯ᷀-᷿]?/i;

// Backtracking mémoïsé : essaie tous les découpages possibles plutôt que de
// s'engager sur le plus long match glouton (qui peut mener à une impasse,
// ex: "tumə" -> "tum"+"ə"(invalide) alors que "tu"+"mə" fonctionne).
function segmentSyllables(str, memo = new Map()) {
  if (str.length === 0) return [];
  if (memo.has(str)) return memo.get(str);
  let result = null;
  for (let len = Math.min(8, str.length); len >= 1; len--) {
    const candidate = str.slice(0, len);
    if (TONE_VARIANT_MAP.has(candidate)) {
      const rest = segmentSyllables(str.slice(len), memo);
      if (rest !== null) { result = [TONE_VARIANT_MAP.get(candidate), ...rest]; break; }
    }
  }
  memo.set(str, result);
  return result;
}

function segmentToken(token) {
  const w = token.toLowerCase().normalize('NFC');
  const direct = segmentSyllables(w);
  if (direct) return direct;
  const m = w.match(NASAL_PREFIX_RE);
  if (m && m[0].length < w.length) {
    const rest = segmentSyllables(w.slice(m[0].length));
    if (rest) return rest; // préfixe nasal ignoré (pas de clip dédié)
  }
  return null;
}

// Découpe une phrase entière en clips à jouer, ou null si un seul mot est
// impossible à décomposer avec les syllabes enregistrées.
export function segmentPhrase(phrase) {
  const tokens = phrase.split(/[\s,.;:!?()/]+/).filter(Boolean).map(t => t.replace(/[’‘]/g, "'"));
  if (tokens.length === 0) return null;
  const segments = [];
  for (const token of tokens) {
    const result = segmentToken(token);
    if (!result) return null;
    segments.push(...result);
  }
  return segments;
}

// Joue une phrase avec les vrais enregistrements en les enchaînant.
// Retombe sur `onFallback(phrase)` (à fournir par l'appelant, ex. TTS)
// si le mot ne peut pas être décomposé ou si un clip venait à manquer.
export function playPhraseAudio(audioRef, phrase, { onEnd, onFallback } = {}) {
  const segments = segmentPhrase(phrase);
  if (!segments || segments.length === 0) {
    onFallback?.(phrase);
    return false;
  }

  if (!audioRef.current) audioRef.current = new Audio();
  const audio = audioRef.current;
  audio.pause();

  let i = 0;
  const playNext = () => {
    if (i >= segments.length) { onEnd?.(); return; }
    const seg = segments[i++];
    audio.src = toneAudioUrl(seg.root, seg.tone);
    audio.onended = playNext;
    // En cas d'échec en cours de lecture, le repli (TTS) est seul responsable
    // d'appeler onEnd une fois terminé — ne pas l'appeler ici aussi.
    audio.onerror = () => onFallback?.(phrase);
    audio.play().catch(() => onFallback?.(phrase));
  };
  playNext();
  return true;
}

// Découpe "tolérante" : contrairement à segmentPhrase, un mot non couvert ne
// fait pas échouer toute la phrase — il est simplement marqué pour la
// synthèse vocale, pendant que le reste garde la vraie voix. Ne renvoie null
// que si RIEN n'est couvert (dans ce cas une seule synthèse vocale de la
// phrase entière sonne mieux qu'un TTS mot par mot haché).
export function segmentPhraseLenient(phrase) {
  const tokens = phrase.split(/[\s,.;:!?()/]+/).filter(Boolean).map(t => t.replace(/[’‘]/g, "'"));
  if (tokens.length === 0) return null;
  const items = [];
  let anyAudio = false;
  for (const token of tokens) {
    const result = segmentToken(token);
    if (result) { items.push(...result.map(seg => ({ type: 'audio', ...seg }))); anyAudio = true; }
    else { items.push({ type: 'tts', text: token }); }
  }
  return anyAudio ? items : null;
}

// Joue une phrase en n'utilisant que les vrais clips couverts par
// segmentPhraseLenient — les tokens non couverts sont silencieusement
// sautés (jamais de synthèse vocale, cf. décision produit "no fake voices").
// Retombe sur `onFallback(phrase)` si rien n'est couvert du tout.
export function playPhraseAudioLenient(audioRef, phrase, { onEnd, onFallback } = {}) {
  const items = segmentPhraseLenient(phrase);
  if (!items) {
    onFallback?.(phrase);
    return false;
  }

  if (!audioRef.current) audioRef.current = new Audio();
  const audio = audioRef.current;
  audio.pause();

  let i = 0;
  const playNext = () => {
    if (i >= items.length) { onEnd?.(); return; }
    const item = items[i++];
    if (item.type === 'tts') { playNext(); return; } // pas de vraie voix : on saute ce mot
    audio.src = toneAudioUrl(item.root, item.tone);
    audio.onended = playNext;
    audio.onerror = playNext; // clip manquant : on saute au suivant plutôt que d'abandonner toute la phrase
    audio.play().catch(playNext);
  };
  playNext();
  return true;
}
