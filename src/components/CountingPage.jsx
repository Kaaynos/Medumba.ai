import { useState, useRef, useCallback, useEffect } from 'react';
import vocalSrc from '../assets/vocal-count-medumba.ogg';
import { MEDUMBA_MATH } from '../data/medumbaMath';

// ─── Medumba number translator (ported from medumba_counter.jar) ───────────
const _U = ["bαnbαn","ncʉ'","bα̂","tad","kuὰ","tὰn","ntogə","sὰmbα̂","fomə","bwə̀'ə"];
const _C = ["",      "ncʉ'","bα̂","tad","kuὰ","tὰn","ntôg", "sὰmbα̂","fôm", "bwə̀'ə̂"];
const _T = ["","gham","ŋambα̂","ŋamntad","ŋamkuὰ","ŋamntὰn","ŋamntogə","ŋamsὰmbα̂","ŋamfomə","ŋambwə̀'ə"];
const _B = ["","","bonbα̂","bontad","bonkuὰ","bontὰn","bonntôg","bonsὰmbα̂","bonfôm","bonbwə̀'ə"];
const _H = ["","nkʉ","nkʉbα̂","nkʉtad","nkʉkuὰ","nkʉtὰn","nkʉntogə","nkʉsὰmbα̂","nkʉfomə","nkʉbwə̀'ə"];

function toMedumba(n) {
    if (n === 0)    return "bαnbαn";
    if (n === 1000) return "ncaꞌ";
    const h = Math.floor(n / 100);
    const r = n % 100;
    const d = Math.floor(r / 10);
    const u = r % 10;
    if (h > 0) {
        const hun = _H[h];
        if (r === 0)        return hun;
        if (r <= 9)         return _C[r] + "tû " + hun;
        if (r === 10)       return "mɛnmbʉ̂m " + hun;
        if (r <= 19)        return "ncòb" + _C[u] + " mɛnmbʉ̂m " + hun;
        const bt = _B[d];
        return u === 0 ? bt + " " + hun : "ncòb" + _C[u] + " " + bt + " " + hun;
    }
    if (n <= 9)  return _U[n];
    if (n === 10) return "gham";
    if (n <= 19) return "ncòb" + _C[u] + " gham";
    return u === 0 ? _T[d] : "ncòb" + _C[u] + " " + _T[d];
}

// Medumba numbers — fully extracted from medumba_counter.jar (2016)
// Compound forms: 6→ntôg, 8→fôm, 9→bwə̀'ə̂ (after ncòb); 100=nkʉ, 1000=ncaꞌ
const NUMBERS = [
    { n:   0, medumba: 'bαnbαn',                      frEn: ['Zéro', 'Zero'] },
    { n:   1, medumba: "ncʉ'",                         frEn: ['Un', 'One'] },
    { n:   2, medumba: 'bα̂',                           frEn: ['Deux', 'Two'] },
    { n:   3, medumba: 'tad',                          frEn: ['Trois', 'Three'] },
    { n:   4, medumba: 'kuὰ',                          frEn: ['Quatre', 'Four'] },
    { n:   5, medumba: 'tὰn',                          frEn: ['Cinq', 'Five'] },
    { n:   6, medumba: 'ntogə',                        frEn: ['Six', 'Six'] },
    { n:   7, medumba: 'sὰmbα̂',                       frEn: ['Sept', 'Seven'] },
    { n:   8, medumba: 'fomə',                         frEn: ['Huit', 'Eight'] },
    { n:   9, medumba: "bwə̀'ə",                       frEn: ['Neuf', 'Nine'] },
    { n:  10, medumba: 'gham',                         frEn: ['Dix', 'Ten'] },
    { n:  11, medumba: "ncòbncʉ' gham",                frEn: ['Onze', 'Eleven'] },
    { n:  12, medumba: 'ncòbbα̂ gham',                  frEn: ['Douze', 'Twelve'] },
    { n:  13, medumba: 'ncòbtad gham',                 frEn: ['Treize', 'Thirteen'] },
    { n:  14, medumba: 'ncòbkuὰ gham',                 frEn: ['Quatorze', 'Fourteen'] },
    { n:  15, medumba: 'ncòbtὰn gham',                 frEn: ['Quinze', 'Fifteen'] },
    { n:  16, medumba: 'ncòbntôg gham',                frEn: ['Seize', 'Sixteen'] },
    { n:  17, medumba: 'ncòbsὰmbα̂ gham',              frEn: ['Dix-sept', 'Seventeen'] },
    { n:  18, medumba: 'ncòbfôm gham',                 frEn: ['Dix-huit', 'Eighteen'] },
    { n:  19, medumba: "ncòbbwə̀'ə̂ gham",              frEn: ['Dix-neuf', 'Nineteen'] },
    { n:  20, medumba: 'ŋambα̂',                        frEn: ['Vingt', 'Twenty'] },
    { n:  21, medumba: "ncòbncʉ' ŋambα̂",              frEn: ['Vingt et un', 'Twenty-one'] },
    { n:  22, medumba: 'ncòbbα̂ ŋambα̂',                frEn: ['Vingt-deux', 'Twenty-two'] },
    { n:  23, medumba: 'ncòbtad ŋambα̂',               frEn: ['Vingt-trois', 'Twenty-three'] },
    { n:  24, medumba: 'ncòbkuὰ ŋambα̂',               frEn: ['Vingt-quatre', 'Twenty-four'] },
    { n:  25, medumba: 'ncòbtὰn ŋambα̂',               frEn: ['Vingt-cinq', 'Twenty-five'] },
    { n:  26, medumba: 'ncòbntôg ŋambα̂',              frEn: ['Vingt-six', 'Twenty-six'] },
    { n:  27, medumba: 'ncòbsὰmbα̂ ŋambα̂',            frEn: ['Vingt-sept', 'Twenty-seven'] },
    { n:  28, medumba: 'ncòbfôm ŋambα̂',               frEn: ['Vingt-huit', 'Twenty-eight'] },
    { n:  29, medumba: "ncòbbwə̀'ə̂ ŋambα̂",            frEn: ['Vingt-neuf', 'Twenty-nine'] },
    { n:  30, medumba: 'ŋamntad',                      frEn: ['Trente', 'Thirty'] },
    { n:  31, medumba: "ncòbncʉ' ŋamntad",             frEn: ['Trente et un', 'Thirty-one'] },
    { n:  32, medumba: 'ncòbbα̂ ŋamntad',               frEn: ['Trente-deux', 'Thirty-two'] },
    { n:  33, medumba: 'ncòbtad ŋamntad',              frEn: ['Trente-trois', 'Thirty-three'] },
    { n:  34, medumba: 'ncòbkuὰ ŋamntad',              frEn: ['Trente-quatre', 'Thirty-four'] },
    { n:  35, medumba: 'ncòbtὰn ŋamntad',              frEn: ['Trente-cinq', 'Thirty-five'] },
    { n:  36, medumba: 'ncòbntôg ŋamntad',             frEn: ['Trente-six', 'Thirty-six'] },
    { n:  37, medumba: 'ncòbsὰmbα̂ ŋamntad',           frEn: ['Trente-sept', 'Thirty-seven'] },
    { n:  38, medumba: 'ncòbfôm ŋamntad',              frEn: ['Trente-huit', 'Thirty-eight'] },
    { n:  39, medumba: "ncòbbwə̀'ə̂ ŋamntad",           frEn: ['Trente-neuf', 'Thirty-nine'] },
    { n:  40, medumba: 'ŋamkuὰ',                       frEn: ['Quarante', 'Forty'] },
    { n:  41, medumba: "ncòbncʉ' ŋamkuὰ",              frEn: ['Quarante et un', 'Forty-one'] },
    { n:  42, medumba: 'ncòbbα̂ ŋamkuὰ',                frEn: ['Quarante-deux', 'Forty-two'] },
    { n:  43, medumba: 'ncòbtad ŋamkuὰ',               frEn: ['Quarante-trois', 'Forty-three'] },
    { n:  44, medumba: 'ncòbkuὰ ŋamkuὰ',               frEn: ['Quarante-quatre', 'Forty-four'] },
    { n:  45, medumba: 'ncòbtὰn ŋamkuὰ',               frEn: ['Quarante-cinq', 'Forty-five'] },
    { n:  46, medumba: 'ncòbntôg ŋamkuὰ',              frEn: ['Quarante-six', 'Forty-six'] },
    { n:  47, medumba: 'ncòbsὰmbα̂ ŋamkuὰ',            frEn: ['Quarante-sept', 'Forty-seven'] },
    { n:  48, medumba: 'ncòbfôm ŋamkuὰ',               frEn: ['Quarante-huit', 'Forty-eight'] },
    { n:  49, medumba: "ncòbbwə̀'ə̂ ŋamkuὰ",            frEn: ['Quarante-neuf', 'Forty-nine'] },
    { n:  50, medumba: 'ŋamntὰn',                      frEn: ['Cinquante', 'Fifty'] },
    { n:  51, medumba: "ncòbncʉ' ŋamntὰn",             frEn: ['Cinquante et un', 'Fifty-one'] },
    { n:  52, medumba: 'ncòbbα̂ ŋamntὰn',               frEn: ['Cinquante-deux', 'Fifty-two'] },
    { n:  53, medumba: 'ncòbtad ŋamntὰn',              frEn: ['Cinquante-trois', 'Fifty-three'] },
    { n:  54, medumba: 'ncòbkuὰ ŋamntὰn',              frEn: ['Cinquante-quatre', 'Fifty-four'] },
    { n:  55, medumba: 'ncòbtὰn ŋamntὰn',              frEn: ['Cinquante-cinq', 'Fifty-five'] },
    { n:  56, medumba: 'ncòbntôg ŋamntὰn',             frEn: ['Cinquante-six', 'Fifty-six'] },
    { n:  57, medumba: 'ncòbsὰmbα̂ ŋamntὰn',           frEn: ['Cinquante-sept', 'Fifty-seven'] },
    { n:  58, medumba: 'ncòbfôm ŋamntὰn',              frEn: ['Cinquante-huit', 'Fifty-eight'] },
    { n:  59, medumba: "ncòbbwə̀'ə̂ ŋamntὰn",           frEn: ['Cinquante-neuf', 'Fifty-nine'] },
    { n:  60, medumba: 'ŋamntogə',                     frEn: ['Soixante', 'Sixty'] },
    { n:  61, medumba: "ncòbncʉ' ŋamntogə",            frEn: ['Soixante et un', 'Sixty-one'] },
    { n:  62, medumba: 'ncòbbα̂ ŋamntogə',              frEn: ['Soixante-deux', 'Sixty-two'] },
    { n:  63, medumba: 'ncòbtad ŋamntogə',             frEn: ['Soixante-trois', 'Sixty-three'] },
    { n:  64, medumba: 'ncòbkuὰ ŋamntogə',             frEn: ['Soixante-quatre', 'Sixty-four'] },
    { n:  65, medumba: 'ncòbtὰn ŋamntogə',             frEn: ['Soixante-cinq', 'Sixty-five'] },
    { n:  66, medumba: 'ncòbntôg ŋamntogə',            frEn: ['Soixante-six', 'Sixty-six'] },
    { n:  67, medumba: 'ncòbsὰmbα̂ ŋamntogə',          frEn: ['Soixante-sept', 'Sixty-seven'] },
    { n:  68, medumba: 'ncòbfôm ŋamntogə',             frEn: ['Soixante-huit', 'Sixty-eight'] },
    { n:  69, medumba: "ncòbbwə̀'ə̂ ŋamntogə",          frEn: ['Soixante-neuf', 'Sixty-nine'] },
    { n:  70, medumba: 'ŋamsὰmbα̂',                    frEn: ['Soixante-dix', 'Seventy'] },
    { n:  71, medumba: "ncòbncʉ' ŋamsὰmbα̂",           frEn: ['Soixante et onze', 'Seventy-one'] },
    { n:  72, medumba: 'ncòbbα̂ ŋamsὰmbα̂',             frEn: ['Soixante-douze', 'Seventy-two'] },
    { n:  73, medumba: 'ncòbtad ŋamsὰmbα̂',            frEn: ['Soixante-treize', 'Seventy-three'] },
    { n:  74, medumba: 'ncòbkuὰ ŋamsὰmbα̂',            frEn: ['Soixante-quatorze', 'Seventy-four'] },
    { n:  75, medumba: 'ncòbtὰn ŋamsὰmbα̂',            frEn: ['Soixante-quinze', 'Seventy-five'] },
    { n:  76, medumba: 'ncòbntôg ŋamsὰmbα̂',           frEn: ['Soixante-seize', 'Seventy-six'] },
    { n:  77, medumba: 'ncòbsὰmbα̂ ŋamsὰmbα̂',         frEn: ['Soixante-dix-sept', 'Seventy-seven'] },
    { n:  78, medumba: 'ncòbfôm ŋamsὰmbα̂',            frEn: ['Soixante-dix-huit', 'Seventy-eight'] },
    { n:  79, medumba: "ncòbbwə̀'ə̂ ŋamsὰmbα̂",         frEn: ['Soixante-dix-neuf', 'Seventy-nine'] },
    { n:  80, medumba: 'ŋamfomə',                      frEn: ['Quatre-vingts', 'Eighty'] },
    { n:  81, medumba: "ncòbncʉ' ŋamfomə",             frEn: ['Quatre-vingt-un', 'Eighty-one'] },
    { n:  82, medumba: 'ncòbbα̂ ŋamfomə',               frEn: ['Quatre-vingt-deux', 'Eighty-two'] },
    { n:  83, medumba: 'ncòbtad ŋamfomə',              frEn: ['Quatre-vingt-trois', 'Eighty-three'] },
    { n:  84, medumba: 'ncòbkuὰ ŋamfomə',              frEn: ['Quatre-vingt-quatre', 'Eighty-four'] },
    { n:  85, medumba: 'ncòbtὰn ŋamfomə',              frEn: ['Quatre-vingt-cinq', 'Eighty-five'] },
    { n:  86, medumba: 'ncòbntôg ŋamfomə',             frEn: ['Quatre-vingt-six', 'Eighty-six'] },
    { n:  87, medumba: 'ncòbsὰmbα̂ ŋamfomə',           frEn: ['Quatre-vingt-sept', 'Eighty-seven'] },
    { n:  88, medumba: 'ncòbfôm ŋamfomə',              frEn: ['Quatre-vingt-huit', 'Eighty-eight'] },
    { n:  89, medumba: "ncòbbwə̀'ə̂ ŋamfomə",           frEn: ['Quatre-vingt-neuf', 'Eighty-nine'] },
    { n:  90, medumba: "ŋambwə̀'ə",                    frEn: ['Quatre-vingt-dix', 'Ninety'] },
    { n:  91, medumba: "ncòbncʉ' ŋambwə̀'ə",           frEn: ['Quatre-vingt-onze', 'Ninety-one'] },
    { n:  92, medumba: "ncòbbα̂ ŋambwə̀'ə",             frEn: ['Quatre-vingt-douze', 'Ninety-two'] },
    { n:  93, medumba: "ncòbtad ŋambwə̀'ə",            frEn: ['Quatre-vingt-treize', 'Ninety-three'] },
    { n:  94, medumba: "ncòbkuὰ ŋambwə̀'ə",            frEn: ['Quatre-vingt-quatorze', 'Ninety-four'] },
    { n:  95, medumba: "ncòbtὰn ŋambwə̀'ə",            frEn: ['Quatre-vingt-quinze', 'Ninety-five'] },
    { n:  96, medumba: "ncòbntôg ŋambwə̀'ə",           frEn: ['Quatre-vingt-seize', 'Ninety-six'] },
    { n:  97, medumba: "ncòbsὰmbα̂ ŋambwə̀'ə",         frEn: ['Quatre-vingt-dix-sept', 'Ninety-seven'] },
    { n:  98, medumba: "ncòbfôm ŋambwə̀'ə",            frEn: ['Quatre-vingt-dix-huit', 'Ninety-eight'] },
    { n:  99, medumba: "ncòbbwə̀'ə̂ ŋambwə̀'ə",         frEn: ['Quatre-vingt-dix-neuf', 'Ninety-nine'] },
    { n: 100, medumba: 'nkʉ',                          frEn: ['Cent', 'One hundred'] },
    { n: 200, medumba: 'nkʉbα̂',                        frEn: ['Deux cents', 'Two hundred'] },
    { n: 300, medumba: 'nkʉtad',                       frEn: ['Trois cents', 'Three hundred'] },
    { n: 400, medumba: 'nkʉkuὰ',                       frEn: ['Quatre cents', 'Four hundred'] },
    { n: 500, medumba: 'nkʉtὰn',                       frEn: ['Cinq cents', 'Five hundred'] },
    { n: 600, medumba: 'nkʉntogə',                     frEn: ['Six cents', 'Six hundred'] },
    { n: 700, medumba: 'nkʉsὰmbα̂',                    frEn: ['Sept cents', 'Seven hundred'] },
    { n: 800, medumba: 'nkʉfomə',                      frEn: ['Huit cents', 'Eight hundred'] },
    { n: 900, medumba: "nkʉbwə̀'ə",                    frEn: ['Neuf cents', 'Nine hundred'] },
    { n: 1000, medumba: 'ncaꞌ',                        frEn: ['Mille', 'One thousand'] },
];

// Audio timestamps (seconds) from vocal-count-medumba.ogg
// 0 & 1 are in the continuous intro block — no isolated clip available.
// Paired counting (Medumba then French) begins at seg1 for number 2.
// Medumba = odd-indexed segments; shift: seg(2k-1) = MD(k+1) for k≥1
const AUDIO_MAP = {
    // 0 & 1 — extracted from intro via RMS energy analysis
    0:    [2.50,  3.60],    // bαnbαn
    1:    [5.20,  6.05],    // ncʉ'
    // 2–9  (odd segs 1,3,5,7,9,11,13,15)
    2:    [7.90,  8.70],    // bα̂
    3:    [10.90, 11.40],   // tad
    4:    [13.45, 14.15],   // kuὰ
    5:    [16.60, 17.10],   // tὰn
    6:    [18.75, 19.65],   // ntogə
    7:    [21.30, 22.35],   // sὰmbα̂
    8:    [23.95, 24.70],   // fomə
    9:    [26.40, 27.30],   // bwə̀'ə
    // 10–19  (odd segs 17,19,21,23,25,27,29,31,33,35)
    10:   [28.95, 29.55],   // gham
    11:   [31.40, 33.35],   // ncòbncʉ' gham
    12:   [34.85, 37.00],   // ncòbbα̂ gham
    13:   [38.50, 40.35],   // ncòbtad gham
    14:   [41.85, 43.60],   // ncòbkuὰ gham
    15:   [45.05, 46.75],   // ncòbtὰn gham
    16:   [48.20, 50.05],   // ncòbntogə gham
    17:   [51.35, 53.45],   // ncòbsὰmbα̂ gham
    18:   [54.70, 56.70],   // ncòbfomə gham
    19:   [57.95, 60.00],   // ncòbbwə̀'ə gham
    // 20 — clip removed (2026-07-24): confirmed incorrect, doesn't match the
    // word — muted instead of playing a wrong pronunciation, until a real
    // isolated recording is available.
    // tens 30–1000
    30:   [74.70, 76.45],   // ŋamntad
    40:   [77.95, 79.80],   // ŋamkuὰ
    50:   [80.10, 83.00],   // ŋamntὰn
    60:   [83.35, 84.15],   // ŋamntogə
    70:   [86.85, 87.65],   // ŋamsὰmbα̂     
    80:   [90.20, 93.30],   // ŋamfomə
    90:   [94.65, 95.80],   // ŋambwə̀'ə
    100:  [97.60, 99.20],   // nkʉ
    1000: [100.75, 102.55], // ncaꞌ
};

// Simple quiz pool (0–30 for manageable choices)
const makeQuiz = () => {
    const pool = NUMBERS.slice(0, 31);
    const q    = pool[Math.floor(Math.random() * pool.length)];
    const wrong = pool.filter(x => x.n !== q.n).sort(() => Math.random() - 0.5).slice(0, 3);
    const opts  = [q, ...wrong].sort(() => Math.random() - 0.5);
    return { q, opts };
};

const CountingPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';
    const QUIZ_TOTAL = 10;

    const [tab,       setTab]      = useState('list');
    const [speaking,  setSpeaking] = useState(null);
    const [quiz,      setQuiz]     = useState(() => makeQuiz());
    const [picked,    setPicked]   = useState(null);
    const [score,     setScore]    = useState(0);
    const [quizNum,   setQuizNum]  = useState(1);
    const [quizDone,  setQuizDone] = useState(false);
    const [convInput, setConvInput] = useState('');
    const [mathSearch, setMathSearch] = useState('');

    // Ouvrir la page doit toujours montrer le début (zéro), pas la position
    // de scroll héritée de la page précédente (Dashboard, etc.)
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const audioCtxRef    = useRef(null);
    const audioBufferRef = useRef(null);
    const loadingRef     = useRef(false);
    const sourceRef      = useRef(null);

    const getCtx = () => {
        if (!audioCtxRef.current)
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        return audioCtxRef.current;
    };

    const loadAudio = useCallback(async () => {
        if (audioBufferRef.current || loadingRef.current) return;
        loadingRef.current = true;
        try {
            const ctx = getCtx();
            const res = await fetch(vocalSrc);
            const ab  = await res.arrayBuffer();
            audioBufferRef.current = await ctx.decodeAudioData(ab);
        } catch (e) {
            console.warn('Audio load failed:', e);
        }
        loadingRef.current = false;
    }, []);

    // Pas de synthèse vocale de secours : un TTS français lisant du texte
    // Medumba phonétique donnerait une fausse prononciation. Les nombres sans
    // enregistrement réel (voir AUDIO_MAP) restent muets — cf. AlphabetPage,
    // même choix produit (pas de faux bouton "Écouter").
    const playNumber = useCallback(async (n) => {
        const seg = AUDIO_MAP[n];
        if (!seg) return;

        await loadAudio();
        if (!audioBufferRef.current) return;

        const ctx = getCtx();
        if (ctx.state === 'suspended') await ctx.resume();

        if (sourceRef.current) {
            try { sourceRef.current.stop(); } catch (_) {}
        }

        const source = ctx.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(ctx.destination);
        source.start(0, seg[0], seg[1] - seg[0]);
        source.onended = () => setSpeaking(null);
        sourceRef.current = source;
        setSpeaking(n);
    }, [loadAudio]);

    const pick = (opt) => {
        if (picked !== null) return;
        const correct = opt.n === quiz.q.n;
        setPicked(opt.n);
        if (correct) setScore(s => s + 1);
    };

    const nextQuiz = () => {
        if (quizNum >= QUIZ_TOTAL) {
            setQuizDone(true);
        } else {
            setQuizNum(n => n + 1);
            setPicked(null);
            setQuiz(makeQuiz());
        }
    };

    const restartQuiz = () => {
        setScore(0);
        setQuizNum(1);
        setQuizDone(false);
        setPicked(null);
        setQuiz(makeQuiz());
    };

    const SpeakerBtn = ({ n }) => {
        const active = speaking === n;
        const hasAudio = Boolean(AUDIO_MAP[n]);
        if (!hasAudio) {
            return (
                <div
                    title={isFr ? 'Pas encore de voix réelle' : 'No real voice recording yet'}
                    style={{
                        background: '#f8fafc', border: '2px solid #e2e8f0',
                        borderRadius: '50%', width: '40px', height: '40px',
                        fontSize: '1.2rem', opacity: 0.4,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', flexShrink: 0,
                    }}
                >
                    🔇
                </div>
            );
        }
        return (
            <button
                onClick={() => playNumber(n)}
                title={isFr ? 'Écouter' : 'Listen'}
                style={{
                    background: active ? '#eff6ff' : '#f8fafc',
                    border: `2px solid ${active ? '#0891b2' : '#e2e8f0'}`,
                    borderRadius: '50%', width: '40px', height: '40px',
                    cursor: 'pointer', fontSize: '1.2rem',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0,
                }}
            >
                {active ? '🔊' : '🔈'}
            </button>
        );
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <style>{`
                @keyframes num-in { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
            `}</style>

            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #0891b2, #67e8f9)', padding: '1.25rem 1.5rem 1.25rem', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                    <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: '700', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                            {isFr ? '110 nombres · 0 – 1 000' : '110 numbers · 0 – 1,000'}
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>🔢 {isFr ? 'Compter' : 'Counting'}</div>
                    </div>
                </div>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '0.3rem' }}>
                    {[{ id: 'list', en: 'Numbers', fr: 'Liste' }, { id: 'quiz', en: 'Quiz', fr: 'Quiz' }, { id: 'conv', en: 'Converter', fr: 'Convertir' }, { id: 'math', en: 'Maths', fr: 'Maths' }].map(t => (
                        <button key={t.id} onClick={() => { setTab(t.id); setPicked(null); setQuiz(makeQuiz()); }} style={{
                            flex: 1, padding: '0.5rem', borderRadius: '9px', border: 'none', cursor: 'pointer',
                            backgroundColor: tab === t.id ? '#fff' : 'transparent',
                            color: tab === t.id ? '#0891b2' : 'rgba(255,255,255,0.85)',
                            fontWeight: '800', fontSize: '0.85rem', fontFamily: 'inherit', transition: 'all 0.15s',
                        }}>{isFr ? t.fr : t.en}</button>
                    ))}
                </div>
            </div>

            <div style={{ flex: 1, padding: '1.25rem 1rem', animation: 'num-in 0.3s ease-out both' }}>
                {tab === 'list' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {NUMBERS.map((num, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', backgroundColor: '#fff', borderRadius: '16px', border: '2px solid #e2e8f0', padding: '0.85rem 1rem', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #0891b2, #67e8f9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem', color: '#fff', flexShrink: 0 }}>
                                    {num.n}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0891b2' }}>{num.medumba}</div>
                                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>{isFr ? num.frEn[0] : num.frEn[1]}</div>
                                </div>
                                <SpeakerBtn n={num.n} />
                            </div>
                        ))}
                    </div>
                )}

                {tab === 'quiz' && (
                    <div>
                        {quizDone ? (
                            /* ── Results screen ── */
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>
                                    {score / QUIZ_TOTAL >= 0.6 ? '🎉' : '😓'}
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.25rem' }}>
                                    {score} / {QUIZ_TOTAL}
                                </div>
                                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#64748b', marginBottom: '1.5rem' }}>
                                    {Math.round(score / QUIZ_TOTAL * 100)}%
                                </div>

                                {score / QUIZ_TOTAL >= 0.6 ? (
                                    <div>
                                        <div style={{ backgroundColor: '#dcfce7', border: '2px solid #86efac', borderRadius: '16px', padding: '1rem 1.25rem', marginBottom: '1.25rem', color: '#15803d', fontWeight: '700' }}>
                                            {isFr ? '✅ Bravo ! Vous avez réussi.' : '✅ Well done! You passed.'}
                                        </div>
                                        <button onClick={restartQuiz} style={{ backgroundColor: '#0891b2', color: '#fff', border: 'none', borderRadius: '9999px', padding: '0.9rem 2.5rem', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 16px rgba(8,145,178,0.35)' }}>
                                            {isFr ? '🔄 Rejouer' : '🔄 Play again'}
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{ backgroundColor: '#fee2e2', border: '2px solid #fca5a5', borderRadius: '16px', padding: '1rem 1.25rem', marginBottom: '1.25rem', color: '#dc2626', fontWeight: '700' }}>
                                            {isFr
                                                ? `❌ Score insuffisant (minimum 60%). Recommencez !`
                                                : `❌ Score too low (minimum 60%). Please restart!`}
                                        </div>
                                        <button onClick={restartQuiz} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '9999px', padding: '0.9rem 2.5rem', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 16px rgba(239,68,68,0.35)' }}>
                                            {isFr ? '🔄 Recommencer' : '🔄 Restart'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* ── Active quiz ── */
                            <div>
                                {/* Progress bar */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${((quizNum - 1) / QUIZ_TOTAL) * 100}%`, background: 'linear-gradient(90deg,#0891b2,#67e8f9)', borderRadius: '99px', transition: 'width 0.3s' }} />
                                    </div>
                                    <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0891b2', whiteSpace: 'nowrap' }}>
                                        {quizNum} / {QUIZ_TOTAL}
                                    </div>
                                    <div style={{ backgroundColor: '#eff6ff', borderRadius: '99px', padding: '0.2rem 0.7rem', fontSize: '0.82rem', fontWeight: '800', color: '#0891b2' }}>
                                        ⭐ {score}
                                    </div>
                                </div>

                                {/* Question card */}
                                <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '2px solid #bae6fd', padding: '2rem 1.5rem', textAlign: 'center', marginBottom: '1.25rem', boxShadow: '0 4px 16px rgba(8,145,178,0.1)' }}>
                                    <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.5rem' }}>
                                        {isFr ? 'Que signifie ce mot Medumba ?' : 'What does this Medumba word mean?'}
                                    </div>
                                    <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0891b2', marginBottom: '0.5rem' }}>
                                        {quiz.q.medumba}
                                    </div>
                                    {AUDIO_MAP[quiz.q.n] ? (
                                        <button onClick={() => playNumber(quiz.q.n)} style={{ background: '#f0f9ff', border: '2px solid #bae6fd', borderRadius: '99px', padding: '0.4rem 1rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700', color: '#0891b2', fontFamily: 'inherit' }}>
                                            {speaking === quiz.q.n ? '🔊' : '🔈'} {isFr ? 'Écouter' : 'Listen'}
                                        </button>
                                    ) : (
                                        <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '99px', padding: '0.4rem 1rem', fontSize: '0.85rem', fontWeight: '700', color: '#94a3b8', opacity: 0.7, display: 'inline-block' }}>
                                            {isFr ? '🔇 Pas de voix réelle' : '🔇 No real voice yet'}
                                        </div>
                                    )}
                                </div>

                                {/* Answer options — pointer-events off after pick */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem', marginBottom: '1rem', pointerEvents: picked !== null ? 'none' : 'auto' }}>
                                    {quiz.opts.map(opt => {
                                        const isCorrect = picked !== null && opt.n === quiz.q.n;
                                        const isWrong   = picked === opt.n && opt.n !== quiz.q.n;
                                        return (
                                            <button key={opt.n} onClick={() => pick(opt)} style={{
                                                padding: '1rem', borderRadius: '16px',
                                                border: `2px solid ${isCorrect ? '#22c55e' : isWrong ? '#ef4444' : picked !== null ? '#e2e8f0' : '#bae6fd'}`,
                                                backgroundColor: isCorrect ? '#dcfce7' : isWrong ? '#fee2e2' : picked !== null ? '#f8fafc' : '#fff',
                                                color: isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#0f172a',
                                                fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
                                                fontFamily: 'inherit', transition: 'all 0.2s',
                                            }}>
                                                <div style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{opt.n}</div>
                                                <div style={{ fontSize: '0.78rem', fontWeight: '700', opacity: 0.8 }}>
                                                    {isFr ? opt.frEn[0] : opt.frEn[1]}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Feedback + Next — only shown after picking */}
                                {picked !== null && (
                                    <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                                        <div style={{ marginBottom: '1rem', fontWeight: '800', fontSize: '1rem', color: picked === quiz.q.n ? '#16a34a' : '#dc2626' }}>
                                            {picked === quiz.q.n
                                                ? (isFr ? '✅ Correct !' : '✅ Correct!')
                                                : (isFr ? `❌ C'était : ${quiz.q.n} — ${quiz.q.medumba}` : `❌ It was: ${quiz.q.n} — ${quiz.q.medumba}`)}
                                        </div>
                                        <button onClick={nextQuiz} style={{ backgroundColor: '#0891b2', color: '#fff', border: 'none', borderRadius: '9999px', padding: '0.9rem 2.5rem', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 16px rgba(8,145,178,0.35)' }}>
                                            {quizNum >= QUIZ_TOTAL
                                                ? (isFr ? 'Voir les résultats →' : 'See results →')
                                                : (isFr ? 'Suivant →' : 'Next →')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {tab === 'conv' && (() => {
                    const raw = convInput.trim();
                    const num = raw === '' ? null : parseInt(raw, 10);
                    const valid = num !== null && !isNaN(num) && num >= 0 && num <= 1000;
                    const medumba = valid ? toMedumba(num) : null;
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '2px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.75rem' }}>
                                    {isFr ? 'Entrez un nombre (0 – 1000)' : 'Enter a number (0 – 1,000)'}
                                </div>
                                <input
                                    type="number"
                                    min="0"
                                    max="1000"
                                    value={convInput}
                                    onChange={e => setConvInput(e.target.value)}
                                    placeholder={isFr ? 'ex: 347' : 'e.g. 347'}
                                    style={{
                                        width: '100%', boxSizing: 'border-box',
                                        fontSize: '2rem', fontWeight: '900', fontFamily: 'inherit',
                                        color: '#0f172a', textAlign: 'center',
                                        border: '2px solid #bae6fd', borderRadius: '14px',
                                        padding: '0.75rem 1rem', outline: 'none',
                                        background: '#f0f9ff',
                                    }}
                                />
                                {raw !== '' && !valid && (
                                    <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#ef4444', fontWeight: '700', textAlign: 'center' }}>
                                        {isFr ? 'Nombre invalide (0 – 1000)' : 'Invalid number (0 – 1,000)'}
                                    </div>
                                )}
                            </div>

                            {medumba && (
                                <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '2px solid #bae6fd', padding: '2rem 1.5rem', textAlign: 'center', boxShadow: '0 4px 16px rgba(8,145,178,0.1)' }}>
                                    <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.5rem' }}>
                                        {isFr ? 'En Medumba' : 'In Medumba'}
                                    </div>
                                    <div style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0891b2', lineHeight: 1.25, marginBottom: '0.75rem', fontFamily: "'Noto Sans', sans-serif" }}>
                                        {medumba}
                                    </div>
                                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#475569', marginBottom: '1rem' }}>
                                        = {num}
                                    </div>
                                    {medumba && (AUDIO_MAP[num] ? (
                                        <button onClick={() => playNumber(num)} style={{
                                            background: '#f0f9ff', border: '2px solid #bae6fd', borderRadius: '99px',
                                            padding: '0.5rem 1.25rem', cursor: 'pointer', fontSize: '0.9rem',
                                            fontWeight: '700', color: '#0891b2', fontFamily: 'inherit',
                                        }}>
                                            {speaking === num ? '🔊' : '🔈'} {isFr ? 'Écouter' : 'Listen'}
                                        </button>
                                    ) : (
                                        <div style={{
                                            background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '99px',
                                            padding: '0.5rem 1.25rem', fontSize: '0.9rem', opacity: 0.7,
                                            fontWeight: '700', color: '#94a3b8', display: 'inline-block',
                                        }}>
                                            {isFr ? '🔇 Pas de voix réelle' : '🔇 No real voice yet'}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!medumba && raw === '' && (
                                <div style={{ textAlign: 'center', color: '#94a3b8', fontWeight: '600', fontSize: '0.95rem', paddingTop: '1rem' }}>
                                    {isFr ? 'Tapez un nombre pour voir sa traduction Medumba' : 'Type a number to see its Medumba translation'}
                                </div>
                            )}
                        </div>
                    );
                })()}
                {tab === 'math' && (() => {
                    const filtered = MEDUMBA_MATH.filter(m =>
                        m.fr.toLowerCase().includes(mathSearch.toLowerCase()) ||
                        m.en.toLowerCase().includes(mathSearch.toLowerCase()) ||
                        m.medumba.toLowerCase().includes(mathSearch.toLowerCase())
                    );
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <input
                                type="text"
                                value={mathSearch}
                                onChange={e => setMathSearch(e.target.value)}
                                placeholder={isFr ? 'Rechercher un terme…' : 'Search a term…'}
                                style={{
                                    width: '100%', padding: '0.65rem 1rem', fontSize: '0.95rem',
                                    border: '2px solid #bae6fd', borderRadius: '12px', outline: 'none',
                                    fontFamily: 'inherit', fontWeight: 600, background: '#f0f9ff', color: '#0f172a',
                                }}
                            />
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textAlign: 'right' }}>
                                {filtered.length} {isFr ? 'termes' : 'terms'}
                            </div>
                            {filtered.map((m, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                                    backgroundColor: '#fff', borderRadius: '14px',
                                    border: '2px solid #e2e8f0', padding: '0.75rem 1rem',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                                }}>
                                    <div style={{
                                        width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                                        background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.7rem', fontWeight: 900, color: '#fff',
                                    }}>
                                        {i + 1}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>{isFr ? m.fr : m.en}</div>
                                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#7c3aed' }}>{m.medumba}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

export default CountingPage;
