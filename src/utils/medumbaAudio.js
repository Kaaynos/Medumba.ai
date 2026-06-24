/**
 * medumbaAudio.js
 * Priority chain for playing Medumba audio:
 *   1. Supabase Storage (native speaker recordings — bucket: medumba-audio)
 *   2. Pre-recorded OGG clip (numbers 1-100 in vocal-count-medumba.ogg)
 *   3. Browser TTS fallback (approximate, French voice)
 */
import { supabase } from '../config/supabase';
import vocalSrc from '../assets/vocal-count-medumba.ogg';

const BUCKET = 'medumba-audio';

/* ── Firebase Storage manifest: Medumba word → filename in /audio/ ──
   Add entries here as recordings become available.
   Filename convention: {id}_{french}.mp3  (e.g. "001_chien.mp3")     */
const STORAGE_FILES = {
    // ── Animaux ──────────────────────────────────────────────────────
    'Mbʉ':          '001_chien.mp3',
    'Bùsi':         '002_chat.mp3',
    'Saŋə':         '003_vache.mp3',
    'Ngǒntsə':      '004_poisson.mp3',
    'Nyαmnaꞌ':      '005_oiseau.mp3',
    'Mbwə̂':         '006_mouton.mp3',
    'Ngàb':         '007_chevre.mp3',
    'Ngʉnyàm':      '008_porc.mp3',
    'Ngwàg':        '009_poulet.mp3',
    'Nkwǐ':         '010_singe.mp3',
    // ── Nature ───────────────────────────────────────────────────────
    'Ntsə':         '014_eau.mp3',
    'Nyàm':         '015_soleil.mp3',
    'Mαŋwʉ':        '016_lune.mp3',
    'Mbwoge':       '017_feu.mp3',
    'Tswəꞌ':        '023_nuit.mp3',
    'Leꞌe':         '024_jour.mp3',
    // ── Famille ──────────────────────────────────────────────────────
    'Mɛn':          '027_enfant.mp3',
    'Ngòn':         '028_fille.mp3',
    'Nshùm':        '029_garcon.mp3',
    'Mα̂':           '030_mere.mp3',
    'Tα̂':           '031_pere.mp3',
    'Nshûn':        '036_ami.mp3',
    // ── Nourriture ───────────────────────────────────────────────────
    'Kəlɔ̀ bàkə̀lɔ̀': '039_banane.mp3',
    'Bʉn':          '040_lait.mp3',
    'Mbαb':         '043_viande.mp3',
    // ── Maison / Objets ──────────────────────────────────────────────
    "Baꞌ":          '046_maison.mp3',
    // ── Phrases ──────────────────────────────────────────────────────
    "Ndà'ndà' lα!": '101_salut.mp3',
    'O zi ὰ?':      '102_bonjour.mp3',
    'Ndʉ̂kə?':       '103_comment_ca_va.mp3',
    'A fi tsə.':    '104_ca_va_bien.mp3',
    "Mə lὰbtə̌":    '065_merci.mp3',
    "Sə̌' mə̀bwɔ!":  '108_bienvenue.mp3',
    "Fà'a bwɔ!":    '112_au_revoir.mp3',
};

/* ── URL cache to avoid redundant Storage lookups ─────────────── */
const _urlCache = {};

function getStorageUrl(path) {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data?.publicUrl ?? null;
}

async function getWordUrl(word) {
    if (_urlCache[word] !== undefined) return _urlCache[word];
    const filename = STORAGE_FILES[word];
    if (!filename) { _urlCache[word] = null; return null; }
    const url = getStorageUrl(`audio/${filename}`);
    _urlCache[word] = url;
    return url;
}

/* ── Simple HTML5 Audio player for Storage files ─────────────── */
let _htmlAudio = null;

function _playUrl(url, onStart, onEnd) {
    if (_htmlAudio) { _htmlAudio.pause(); _htmlAudio = null; }
    const a = new Audio(url);
    _htmlAudio = a;
    a.oncanplay = () => { onStart?.(); };
    a.onended   = () => { _htmlAudio = null; onEnd?.(); };
    a.onerror   = () => { _htmlAudio = null; onEnd?.(); };
    a.play().catch(() => onEnd?.());
}

/* ── Known word → [startSec, endSec] in vocal-count-medumba.ogg ── */
const WORD_CLIPS = {
    // ── Numbers 1-10 ─────────────────────────────────────────────
    "Ncʉ'":       [5.20,  6.05],   // 1
    'Bαhα':       [7.90,  8.70],   // 2
    'Tad':        [10.90, 11.40],  // 3
    'Kuὰ':        [13.45, 14.15],  // 4
    'Tα̂n':        [16.60, 17.10],  // 5
    'Tαn':        [16.60, 17.10],  // 5 (variant)
    'Ntoge':      [18.75, 19.65],  // 6
    'Ntogə':      [18.75, 19.65],  // 6 (variant)
    'Sὰmmbαhα':   [21.30, 22.35],  // 7
    'Fomə':       [23.95, 24.70],  // 8
    "Mbwə̀ꞌə":    [26.40, 27.30],  // 9
    'Gham':       [28.95, 29.55],  // 10
    // ── Numbers 11-19 ────────────────────────────────────────────
    'NcòbNcʉ\'Gham':  [31.40, 33.35], // 11
    'NcòbBαhαGham':   [34.85, 37.00], // 12
    'NcòbTadGham':    [38.50, 40.35], // 13
    'NcòbKuὰGham':    [41.85, 43.60], // 14
    'NcòbTα̂nGham':    [45.05, 46.75], // 15
    // ── Tens ─────────────────────────────────────────────────────
    'Nkʉ':        [97.60, 99.20],  // 100
};

/* ── Web Audio singleton ─────────────────────────────────────── */
let _ctx    = null;
let _buffer = null;
let _src    = null;
let _loading = false;

function getCtx() {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    return _ctx;
}

async function ensureBuffer() {
    if (_buffer) return true;
    if (_loading) {
        // Wait for existing load
        await new Promise(r => setTimeout(r, 800));
        return !!_buffer;
    }
    _loading = true;
    try {
        const ctx = getCtx();
        const res = await fetch(vocalSrc);
        const ab  = await res.arrayBuffer();
        _buffer   = await ctx.decodeAudioData(ab);
        return true;
    } catch (e) {
        console.warn('[medumbaAudio] OGG load failed:', e);
        return false;
    } finally {
        _loading = false;
    }
}

function _stopCurrent() {
    if (_src) { try { _src.stop(); } catch (_) {} _src = null; }
}

function _playClip(start, end, onStart, onEnd) {
    _stopCurrent();
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const src = ctx.createBufferSource();
    src.buffer = _buffer;
    src.connect(ctx.destination);
    src.start(0, start, end - start);
    src.onended = () => { _src = null; onEnd?.(); };
    _src = src;
    onStart?.();
}

/* ── TTS fallback ────────────────────────────────────────────── */
function _playTTS(text, onStart, onEnd) {
    if (!window.speechSynthesis) { onEnd?.(); return; }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);

    // Prefer Cameroonian French (closer phonology); fall back to fr-FR
    const voices = window.speechSynthesis.getVoices();
    const cmVoice = voices.find(v => v.lang === 'fr-CM');
    if (cmVoice) {
        utt.voice = cmVoice;
    } else {
        utt.lang = 'fr-FR';
    }
    utt.rate  = 0.78;
    utt.pitch = 1.05;
    utt.onstart = onStart ?? null;
    utt.onend   = onEnd   ?? null;
    utt.onerror = onEnd   ?? null;
    window.speechSynthesis.speak(utt);
}

/* ── Public API ──────────────────────────────────────────────── */

/**
 * Play a Medumba word.
 * Priority: Firebase Storage recording → OGG clip → TTS fallback.
 *
 * @param {string}   word     The Medumba word to speak (matches q.audio)
 * @param {Function} onStart  Called when audio begins
 * @param {Function} onEnd    Called when audio ends (or on error)
 */
export async function playMedumbaWord(word, onStart, onEnd) {
    if (!word) { onEnd?.(); return; }

    // 1 — Supabase Storage (native speaker recording)
    const url = await getWordUrl(word);
    if (url) {
        _playUrl(url, onStart, onEnd);
        return;
    }

    // 2 — Pre-recorded OGG clip (numbers)
    const clip = WORD_CLIPS[word];
    if (clip) {
        const ok = await ensureBuffer();
        if (ok) {
            _playClip(clip[0], clip[1], onStart, onEnd);
            return;
        }
    }

    // 3 — TTS fallback
    _playTTS(word, onStart, onEnd);
}

/** Stop any currently playing audio immediately. */
export function stopMedumbaAudio() {
    if (_htmlAudio) { _htmlAudio.pause(); _htmlAudio = null; }
    _stopCurrent();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
}

/* ══════════════════════════════════════════════════════════════════
   PHRASEBOOK — enregistrements par chapitre (locuteur natif)
   Fichiers uploadés dans Firebase Storage : audio/phrasebook/
   Convention : chapitre_01.mp4  (sans espaces, extension .mp4)

   Pour uploader :
     Firebase Console → Storage → Créer dossier "audio/phrasebook/"
     → Uploader chaque fichier renommé comme ci-dessous
══════════════════════════════════════════════════════════════════ */

const PHRASEBOOK_CHAPTERS = {
    1:  'phrasebook/chapitre_01.mp4',   // Faire les présentations
    2:  'phrasebook/chapitre_02.mp4',   // Salutations et accueil
    3:  'phrasebook/chapitre_03.mp4',   // Dire au revoir
    4:  'phrasebook/chapitre_04.mp4',   // Poser les questions
    5:  'phrasebook/chapitre_05.mp4',   // Relations familiales
    6:  'phrasebook/chapitre_06.mp4',   // Relations familiales (2)
    7:  'phrasebook/chapitre_07.mp4',   // Emplois, profession, métier
    8:  'phrasebook/chapitre_08.mp4',   // Phrases pour les voyageurs
    9:  'phrasebook/chapitre_09.mp4',   // Amour, sentiments, romance
    10: 'phrasebook/chapitre_10.mp4',   // Cœur brisé
    11: 'phrasebook/chapitre_11.mp4',   // Demander pardon
    12: 'phrasebook/chapitre_12.mp4',   // Souhaits de fête
    13: 'phrasebook/chapitre_13.mp4',   // Temps et saisons
    14: 'phrasebook/chapitre_14.mp4',   // Sensations
    15: 'phrasebook/chapitre_15.mp4',   // Compassion
    16: 'phrasebook/chapitre_16.mp4',   // État d'âme, humeur
    17: 'phrasebook/chapitre_17.mp4',   // Indignation, colère
    18: 'phrasebook/chapitre_18.mp4',   // Expression de regret
    19: 'phrasebook/chapitre_19.mp4',   // Déception et désespoir
    20: 'phrasebook/chapitre_20.mp4',   // Expressions d'étonnement
    21: 'phrasebook/chapitre_21.mp4',   // Questions sur l'état de santé
    22: 'phrasebook/chapitre_22.mp4',   // Réponses sur l'état de santé
    23: 'phrasebook/chapitre_23.mp4',   // États physiques
    24: 'phrasebook/chapitre_24.mp4',   // Temps, moment
    25: 'phrasebook/chapitre_25.mp4',   // Demander et dire la date
    // 26 : pas de fichier audio
    27: 'phrasebook/chapitre_27.mp4',   // À table (le repas est prêt)
    // 28 : pas de fichier audio
    29: 'phrasebook/chapitre_29.mp4',   // Expressions générales
    30: 'phrasebook/chapitre_30.mp4',   // Chapitre 30
    31: 'phrasebook/chapitre_31.mp4',   // Grammaire
    32: 'phrasebook/chapitre_32.mp4',   // Culture
};

/* Catégorie phrasebook → liste de chapitres audio (ordre de lecture) */
export const PB_CATEGORY_CHAPTERS = {
    greetings: [1, 2, 3, 4],
    family:    [5, 6],
    school:    [7],
    travel:    [8],
    body:      [14, 21, 22, 23],
    numbers:   [13, 24, 25],
    food:      [27],
    culture:   [32],
    general:   [29, 30, 31],
};

/**
 * Joue l'enregistrement du chapitre correspondant à la catégorie phrasebook.
 * Si plusieurs chapitres pour la même catégorie, joue le premier disponible.
 */
export async function playPhrasebookChapter(categoryId, onStart, onEnd) {
    const chapters = PB_CATEGORY_CHAPTERS[categoryId] ?? [];
    for (const num of chapters) {
        const filename = PHRASEBOOK_CHAPTERS[num];
        if (!filename) continue;
        const cacheKey = `pb_${num}`;
        if (_urlCache[cacheKey] === null) continue;
        let url = _urlCache[cacheKey];
        if (url === undefined) {
            url = getStorageUrl(`phrasebook/${filename.replace('phrasebook/', '')}`);
            _urlCache[cacheKey] = url ?? null;
        }
        if (url) { _playUrl(url, onStart, onEnd); return; }
    }
    onEnd?.();
}
