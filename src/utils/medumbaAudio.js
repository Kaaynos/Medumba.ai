/**
 * medumbaAudio.js
 * Priority chain for playing Medumba audio — exact recordings only, never a
 * word "created" by joining several syllable clips together (that doesn't
 * sound natural — see hasRealVoice below):
 *   1. Supabase Storage (native speaker recordings — bucket: medumba-audio)
 *   2. A single recorded syllable that IS the whole word (no joining)
 *   3. Pre-recorded OGG clip (numbers 1-100 in vocal-count-medumba.ogg)
 */
import { supabase } from '../config/supabase';
import vocalSrc from '../assets/vocal-count-medumba.ogg';
import { segmentPhrase, toneAudioUrl } from './syllableAudio';

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

// `onError` est appelé si le fichier n'existe pas / ne peut pas être lu
// (getPublicUrl() renvoie toujours une URL, existence non garantie) — par
// défaut identique à onEnd si l'appelant ne fournit pas de repli distinct.
function _playUrl(url, onStart, onError, onEnd) {
    if (_htmlAudio) { _htmlAudio.pause(); _htmlAudio = null; }
    const a = new Audio(url);
    _htmlAudio = a;
    a.oncanplay = () => { onStart?.(); };
    a.onended   = () => { _htmlAudio = null; onEnd?.(); };
    a.onerror   = () => { _htmlAudio = null; (onError ?? onEnd)?.(); };
    a.play().catch(() => (onError ?? onEnd)?.());
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

/* ── Public API ──────────────────────────────────────────────── */

// Pseudo-ref (même forme qu'un useRef) pour réutiliser playPhraseAudio
// en dehors d'un composant React.
const _syllableAudioRef = { current: null };

/**
 * Play a Medumba word or phrase.
 * Priority: Firebase Storage recording (mot exact) → syllabes enregistrées,
 * mélangées avec TTS mot par mot pour les tokens non couverts (voir
 * syllableAudio.js) → OGG clip (nombres) → TTS de la phrase entière.
 *
 * IMPORTANT : getPublicUrl() de Supabase renvoie toujours une URL, que le
 * fichier existe ou non côté serveur (elle ne vérifie rien). Le manifeste
 * STORAGE_FILES contient des entrées dont le fichier n'a en réalité jamais
 * été uploadé — si on s'arrêtait dès qu'une URL est construite, ces mots
 * échouaient en silence (erreur de lecture audio) sans jamais essayer la
 * suite de la chaîne. On bascule donc vers l'étape suivante à la moindre
 * erreur de lecture, plutôt que de considérer l'étape 1 comme définitive.
 *
 * @param {string}   word     The Medumba word/phrase to speak (matches q.audio)
 * @param {Function} onStart  Called when audio begins
 * @param {Function} onEnd    Called when audio ends (or on error)
 */
export async function playMedumbaWord(word, onStart, onEnd) {
    if (!word) { onEnd?.(); return; }

    // 1 — Supabase Storage (native speaker recording, mot exact)
    const url = await getWordUrl(word);
    if (url) {
        _playUrl(url, onStart, () => _playSingleSyllableOrNumber(word, onStart, onEnd), onEnd);
        return;
    }

    _playSingleSyllableOrNumber(word, onStart, onEnd);
}

// Seul cas de syllabe autorisé : le mot ENTIER correspond à une seule
// syllabe enregistrée — jamais un enchaînement de plusieurs clips (cf.
// hasRealVoice ci-dessous ; décision produit : pas de son "recréé").
function _playSingleSyllableOrNumber(word, onStart, onEnd) {
    const seg = segmentPhrase(word);
    if (seg && seg.length === 1) {
        if (!_syllableAudioRef.current) _syllableAudioRef.current = new Audio();
        const audio = _syllableAudioRef.current;
        audio.pause();
        audio.src = toneAudioUrl(seg[0].root, seg[0].tone);
        audio.onended = () => onEnd?.();
        audio.onerror = () => _playNumberClip(word, onStart, onEnd);
        audio.play().then(() => onStart?.()).catch(() => _playNumberClip(word, onStart, onEnd));
        return;
    }

    _playNumberClip(word, onStart, onEnd);
}

async function _playNumberClip(word, onStart, onEnd) {
    // 3 — Pre-recorded OGG clip (numbers) — nothing left to fall back to
    // beyond this: no real recording means no sound, ever (no TTS).
    const clip = WORD_CLIPS[word];
    if (clip) {
        const ok = await ensureBuffer();
        if (ok) {
            _playClip(clip[0], clip[1], onStart, onEnd);
            return;
        }
    }

    onEnd?.();
}

/**
 * True si `word` a une vraie voix EXACTE — un enregistrement exact du mot/
 * de la phrase entière (STORAGE_FILES, clip de nombre), ou une seule syllabe
 * enregistrée qui constitue le mot en entier. Exclut délibérément les mots
 * "créés" en enchaînant plusieurs clips de syllabes bout à bout : ça ne
 * sonne pas comme un enregistrement naturel et fluide (cf. réunion :
 * "Remove the created vocals for words" / "Remove the words that don't
 * have exact vocals"). Sert à filtrer les listes (Dictionnaire, Phrasebook,
 * Fiches de vocabulaire) pour le lancement du 26 juillet : moins de mots
 * affichés, mais 100% authentiques plutôt qu'une composition artificielle.
 */
export function hasRealVoice(word) {
    if (!word) return false;
    if (STORAGE_FILES[word]) return true;
    if (WORD_CLIPS[word]) return true;
    const seg = segmentPhrase(word);
    return seg !== null && seg.length === 1;
}

/** Stop any currently playing audio immediately. */
export function stopMedumbaAudio() {
    if (_htmlAudio) { _htmlAudio.pause(); _htmlAudio = null; }
    _syllableAudioRef.current?.pause();
    _stopCurrent();
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

/* Titre bilingue de chaque chapitre */
export const PHRASEBOOK_CHAPTER_TITLES = {
    1:  { fr: 'Faire les présentations',                    en: 'Making introductions' },
    2:  { fr: 'Salutations et accueil',                     en: 'Greetings & welcome' },
    3:  { fr: 'Dire au revoir',                             en: 'Saying goodbye' },
    4:  { fr: 'Poser les questions',                        en: 'Asking questions' },
    5:  { fr: 'Relations familiales',                       en: 'Family relationships' },
    6:  { fr: 'Relations familiales (2)',                    en: 'Family relationships (2)' },
    7:  { fr: 'Emplois, profession, métier',                en: 'Jobs & professions' },
    8:  { fr: 'Phrases pour les voyageurs',                 en: 'Traveler phrases' },
    9:  { fr: 'Amour, sentiments, romance, mariage',        en: 'Love, feelings & romance' },
    10: { fr: 'Cœur brisé',                                en: 'Heartbreak' },
    11: { fr: 'Demander pardon',                            en: 'Asking for forgiveness' },
    12: { fr: 'Souhaits de fête',                           en: 'Holiday wishes' },
    13: { fr: 'Temps et saisons',                           en: 'Weather & seasons' },
    14: { fr: 'Sensations',                                 en: 'Sensations' },
    15: { fr: 'Compassion',                                 en: 'Compassion' },
    16: { fr: 'État d\'âme, humeur',                        en: 'Moods & feelings' },
    17: { fr: 'Indignation, colère',                        en: 'Anger & indignation' },
    18: { fr: 'Expression de regret',                       en: 'Expressing regret' },
    19: { fr: 'Déception et désespoir',                     en: 'Disappointment & despair' },
    20: { fr: 'Expressions d\'étonnement',                  en: 'Expressions of surprise' },
    21: { fr: 'Questions sur l\'état de santé',             en: 'Health questions' },
    22: { fr: 'Réponses sur l\'état de santé',              en: 'Health answers' },
    23: { fr: 'États physiques',                            en: 'Physical states' },
    24: { fr: 'Temps, moment',                              en: 'Time & moments' },
    25: { fr: 'Demander et dire la date',                   en: 'Asking & telling the date' },
    26: { fr: 'Pièces et équipements de la maison',         en: 'Rooms & home equipment' },
    27: { fr: 'À table — le repas est prêt',               en: 'At the table — meal is ready' },
    28: { fr: 'Au travail',                                 en: 'At work' },
    29: { fr: 'Expressions générales',                      en: 'General expressions' },
    30: { fr: 'J\'ai déjà… / Je viens de… / Je n\'ai jamais…', en: 'Already / Just did / Never…' },
    31: { fr: 'Grammaire',                                  en: 'Grammar' },
    32: { fr: 'Culture Medumba',                            en: 'Medumba culture' },
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

/* ID de leçon → chapitres audio associés (locuteur natif) */
export const LESSON_CHAPTERS = {
    l1:  [2, 3, 4, 11],        // Salutations, au revoir, questions, pardon
    l2:  [23],                  // Corps, sensations physiques
    l3:  [27],                  // Nourriture, repas
    l7:  [5, 6],                // Relations familiales
    l8:  [13],                  // Nature, temps et saisons
    l9:  [13, 24, 25],          // Heure, date, calendrier
    l10: [1, 4],                // Se présenter, poser des questions
    l11: [27],                  // Maison, cuisine
    l12: [14, 21, 22, 23],      // Santé, sensations, états physiques
    l13: [31],                  // École, grammaire
    l14: [7],                   // Emplois, profession
};

/**
 * Joue l'enregistrement du chapitre correspondant à la catégorie phrasebook.
 * Si plusieurs chapitres pour la même catégorie, joue le premier disponible.
 */
export async function playPhrasebookChapter(categoryId, onStart, onEnd) {
    const chapters = PB_CATEGORY_CHAPTERS[categoryId] ?? [];
    await _playChapterList(chapters, onStart, onEnd);
}

/**
 * Joue le chapitre audio associé à une leçon (écran de chargement de leçon).
 */
export async function playLessonChapter(lessonId, onStart, onEnd) {
    const chapters = LESSON_CHAPTERS[lessonId] ?? [];
    await _playChapterList(chapters, onStart, onEnd);
}

async function _playChapterList(chapters, onStart, onEnd) {
    for (const num of chapters) {
        const filename = PHRASEBOOK_CHAPTERS[num];
        if (!filename) continue;
        const cacheKey = `pb_${num}`;
        if (_urlCache[cacheKey] === null) continue;
        let url = _urlCache[cacheKey];
        if (url === undefined) {
            url = getStorageUrl(filename);
            _urlCache[cacheKey] = url ?? null;
        }
        if (url) {
            // onStart reçoit le numéro du chapitre effectivement joué
            _playUrl(url, () => onStart?.(num), onEnd, onEnd);
            return;
        }
    }
    onEnd?.();
}
