import { useState } from 'react';

/* ════════════════════════════════════════════════════════════════
   Alphabet Medumba — 32 lettres avec prononciation TTS
════════════════════════════════════════════════════════════════ */

const LETTERS = [
    // ── Ligne 1 ──────────────────────────────────────────────
    { letter: 'a',  type: 'vowel',     ipa: '[a]',   phoneFr: 'comme "a" dans "patte"',     phoneEn: 'like "a" in "father"',      color: '#0056D2', example: 'a tə̂',    exMeanFr: 'et',         exMeanEn: 'and' },
    { letter: 'α',  type: 'vowel',     ipa: '[ɑ]',   phoneFr: '"a" postérieur / nasalisé',  phoneEn: 'back "a", nasalized',        color: '#0056D2', example: 'Mα̂',      exMeanFr: 'mère',       exMeanEn: 'mother' },
    { letter: 'ε',  type: 'vowel',     ipa: '[ɛ]',   phoneFr: 'comme "è" dans "fête"',      phoneEn: 'like "e" in "bed"',          color: '#0056D2', example: 'mεn',     exMeanFr: 'enfant',     exMeanEn: 'child' },
    { letter: 'b',  type: 'consonant', ipa: '[b]',   phoneFr: 'comme "b" français',         phoneEn: 'like "b" in "boy"',          color: '#16a34a', example: "baꞌ",     exMeanFr: 'maison',     exMeanEn: 'house' },
    { letter: 'c',  type: 'consonant', ipa: '[tʃ]',  phoneFr: 'comme "tch"',                phoneEn: 'like "ch" in "church"',      color: '#16a34a', example: "cα̂ꞌ",    exMeanFr: 'chien',      exMeanEn: 'dog' },
    { letter: 'd',  type: 'consonant', ipa: '[d]',   phoneFr: 'comme "d" français',         phoneEn: 'like "d" in "day"',          color: '#16a34a', example: 'ndα',     exMeanFr: 'main',       exMeanEn: 'hand' },
    { letter: 'e',  type: 'vowel',     ipa: '[e]',   phoneFr: 'comme "é" dans "été"',       phoneEn: 'like "ay" in "day"',         color: '#0056D2', example: 'meꞌe',    exMeanFr: 'chèvre',     exMeanEn: 'goat' },
    { letter: 'ə',  type: 'vowel',     ipa: '[ə]',   phoneFr: 'comme "e" dans "le"',        phoneEn: 'like "a" in "about"',        color: '#0056D2', example: "bwə̀ꞌə",  exMeanFr: 'neuf',       exMeanEn: 'nine' },
    // ── Ligne 2 ──────────────────────────────────────────────
    { letter: 'f',  type: 'consonant', ipa: '[f]',   phoneFr: 'comme "f" français',         phoneEn: 'like "f" in "fish"',         color: '#16a34a', example: 'fomə',    exMeanFr: 'huit',       exMeanEn: 'eight' },
    { letter: 'g',  type: 'consonant', ipa: '[g]',   phoneFr: 'comme "g" dans "gare"',      phoneEn: 'like "g" in "go"',           color: '#16a34a', example: 'ngàb',    exMeanFr: 'chèvre',     exMeanEn: 'goat' },
    { letter: 'gh', type: 'consonant', ipa: '[ɣ]',   phoneFr: 'fricative vélaire sonore',   phoneEn: 'voiced velar fricative',     color: '#7c3aed', example: 'ghom',    exMeanFr: 'corps',      exMeanEn: 'body' },
    { letter: 'h',  type: 'consonant', ipa: '[h]',   phoneFr: 'h aspiré (anglais)',          phoneEn: 'like "h" in "hello"',        color: '#16a34a', example: 'hàm',     exMeanFr: 'bouche',     exMeanEn: 'mouth' },
    { letter: 'i',  type: 'vowel',     ipa: '[i]',   phoneFr: 'comme "i" dans "vie"',       phoneEn: 'like "ee" in "see"',         color: '#0056D2', example: 'ŋgi',     exMeanFr: 'arbre',      exMeanEn: 'tree' },
    { letter: 'j',  type: 'consonant', ipa: '[dʒ]',  phoneFr: 'comme "dj"',                 phoneEn: 'like "j" in "jam"',          color: '#16a34a', example: 'jàm',     exMeanFr: 'guerre',     exMeanEn: 'war' },
    { letter: 'k',  type: 'consonant', ipa: '[k]',   phoneFr: 'comme "k" français',         phoneEn: 'like "k" in "key"',          color: '#16a34a', example: 'nkwǐ',    exMeanFr: 'singe',      exMeanEn: 'monkey' },
    { letter: 'l',  type: 'consonant', ipa: '[l]',   phoneFr: 'comme "l" français',         phoneEn: 'like "l" in "love"',         color: '#16a34a', example: "leꞌe",    exMeanFr: 'jour',       exMeanEn: 'day' },
    // ── Ligne 3 ──────────────────────────────────────────────
    { letter: 'm',  type: 'consonant', ipa: '[m]',   phoneFr: 'comme "m" français',         phoneEn: 'like "m" in "mother"',       color: '#16a34a', example: 'mɛn',     exMeanFr: 'enfant',     exMeanEn: 'child' },
    { letter: 'n',  type: 'consonant', ipa: '[n]',   phoneFr: 'comme "n" français',         phoneEn: 'like "n" in "no"',           color: '#16a34a', example: 'ntsə',    exMeanFr: 'eau',        exMeanEn: 'water' },
    { letter: 'ŋ',  type: 'consonant', ipa: '[ŋ]',   phoneFr: 'comme "ng" dans "ring"',     phoneEn: 'like "ng" in "ring"',        color: '#7c3aed', example: 'ŋgi',     exMeanFr: 'arbre',      exMeanEn: 'tree' },
    { letter: 'ny', type: 'consonant', ipa: '[ɲ]',   phoneFr: 'comme "gn" dans "agneau"',   phoneEn: 'like "ny" in "canyon"',      color: '#7c3aed', example: 'nyàm',    exMeanFr: 'soleil',     exMeanEn: 'sun' },
    { letter: 'o',  type: 'vowel',     ipa: '[o]',   phoneFr: 'comme "o" dans "eau"',       phoneEn: 'like "o" in "go"',           color: '#0056D2', example: 'o zi ὰ?', exMeanFr: 'bonjour',    exMeanEn: 'hello' },
    { letter: 'ɔ',  type: 'vowel',     ipa: '[ɔ]',   phoneFr: 'comme "o" ouvert dans "or"', phoneEn: 'like "o" in "or"',           color: '#0056D2', example: 'bɔ',      exMeanFr: 'nous',       exMeanEn: 'we' },
    { letter: 's',  type: 'consonant', ipa: '[s]',   phoneFr: 'comme "s" français',         phoneEn: 'like "s" in "sun"',          color: '#16a34a', example: 'saŋə',    exMeanFr: 'vache',      exMeanEn: 'cow' },
    { letter: 'sh', type: 'consonant', ipa: '[ʃ]',   phoneFr: 'comme "ch" français',        phoneEn: 'like "sh" in "show"',        color: '#7c3aed', example: 'nshùm',   exMeanFr: 'garçon',     exMeanEn: 'boy' },
    // ── Ligne 4 ──────────────────────────────────────────────
    { letter: 't',  type: 'consonant', ipa: '[t]',   phoneFr: 'comme "t" français',         phoneEn: 'like "t" in "top"',          color: '#16a34a', example: 'Tα̂',     exMeanFr: 'père',       exMeanEn: 'father' },
    { letter: 'ts', type: 'consonant', ipa: '[ts]',  phoneFr: 'comme "ts" dans "tsé-tsé"',  phoneEn: 'like "ts" in "bits"',        color: '#7c3aed', example: 'tswəꞌ',   exMeanFr: 'nuit',       exMeanEn: 'night' },
    { letter: 'u',  type: 'vowel',     ipa: '[u]',   phoneFr: 'comme "ou" dans "lune"',     phoneEn: 'like "oo" in "moon"',        color: '#0056D2', example: 'ntu',     exMeanFr: 'tête',       exMeanEn: 'head' },
    { letter: 'ɨ',  type: 'vowel',     ipa: '[ɨ]',   phoneFr: 'voyelle centrale non-arrondie', phoneEn: 'central unrounded vowel', color: '#0056D2', example: 'bʉn',     exMeanFr: 'lait',       exMeanEn: 'milk' },
    { letter: 'v',  type: 'consonant', ipa: '[v]',   phoneFr: 'comme "v" français',         phoneEn: 'like "v" in "very"',         color: '#16a34a', example: 'vwɔ',     exMeanFr: 'vous',       exMeanEn: 'you (pl.)' },
    { letter: 'w',  type: 'consonant', ipa: '[w]',   phoneFr: 'comme "ou" dans "oui"',      phoneEn: 'like "w" in "water"',        color: '#16a34a', example: 'wud',     exMeanFr: 'nuit',       exMeanEn: 'night' },
    { letter: 'y',  type: 'consonant', ipa: '[j]',   phoneFr: 'comme "y" dans "yeux"',      phoneEn: 'like "y" in "yes"',          color: '#16a34a', example: 'nyàm',    exMeanFr: 'soleil',     exMeanEn: 'sun' },
    { letter: 'z',  type: 'consonant', ipa: '[z]',   phoneFr: 'comme "z" français',         phoneEn: 'like "z" in "zero"',         color: '#16a34a', example: 'zα',      exMeanFr: 'moi',        exMeanEn: 'me' },
];

const VOWEL_COUNT     = LETTERS.filter(l => l.type === 'vowel').length;
const CONSONANT_COUNT = LETTERS.filter(l => l.type === 'consonant').length;

function speakLetter(letter) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(letter);
    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find(v => v.lang === 'fr-CM') || voices.find(v => v.lang.startsWith('fr'));
    if (frVoice) utt.voice = frVoice;
    utt.lang  = 'fr-FR';
    utt.rate  = 0.6;
    utt.pitch = 1.1;
    window.speechSynthesis.speak(utt);
}

/* ── Carte d'une lettre ── */
const LetterCard = ({ item, isFr, active, onSelect }) => {
    const isSpecial = item.letter.length > 1; // gh, sh, ny, ts
    const bgColor   = item.type === 'vowel' ? '#eff6ff' : '#f0fdf4';
    const borderCol = item.type === 'vowel' ? '#bfdbfe' : '#bbf7d0';

    return (
        <div
            onClick={() => { onSelect(item.letter); speakLetter(item.letter); }}
            style={{
                backgroundColor: active ? item.color : bgColor,
                border: `2px solid ${active ? item.color : borderCol}`,
                borderRadius: '18px',
                padding: isSpecial ? '0.9rem 0.5rem' : '1rem 0.5rem',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0.3rem',
                transition: 'all 0.15s ease',
                boxShadow: active ? `0 4px 14px ${item.color}40` : '0 2px 6px rgba(0,0,0,0.04)',
                transform: active ? 'scale(1.04)' : 'scale(1)',
                animation: 'letter-in 0.25s ease-out both',
            }}
        >
            <div style={{
                fontSize: isSpecial ? '1.7rem' : '2rem',
                fontWeight: '900',
                color: active ? '#fff' : item.color,
                lineHeight: 1,
                fontFamily: "'Outfit', system-ui, sans-serif",
            }}>
                {item.letter}
            </div>
            <div style={{
                fontSize: '0.6rem', fontWeight: '700',
                color: active ? 'rgba(255,255,255,0.8)' : '#64748b',
                textTransform: 'uppercase', letterSpacing: '0.3px',
            }}>
                {isFr
                    ? (item.type === 'vowel' ? 'Voyelle' : 'Consonne')
                    : (item.type === 'vowel' ? 'Vowel'   : 'Consonant')}
            </div>
            <div style={{
                fontSize: '0.65rem', fontWeight: '600',
                color: active ? 'rgba(255,255,255,0.7)' : '#94a3b8',
                fontStyle: 'italic',
            }}>
                {item.ipa}
            </div>
        </div>
    );
};

/* ── Panel de détail (lettre sélectionnée) ── */
const DetailPanel = ({ item, isFr }) => (
    <div style={{
        background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)`,
        border: `2px solid ${item.color}30`,
        borderRadius: '20px',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '0.75rem',
        animation: 'letter-in 0.2s ease-out both',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
                width: '64px', height: '64px', borderRadius: '18px',
                background: item.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.2rem', fontWeight: '900', color: '#fff',
                boxShadow: `0 6px 20px ${item.color}50`,
                flexShrink: 0,
            }}>{item.letter}</div>
            <div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>
                    {isFr ? item.phoneFr : item.phoneEn}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', marginTop: '0.2rem' }}>
                    IPA : <span style={{ fontStyle: 'italic', color: item.color }}>{item.ipa}</span>
                </div>
            </div>
        </div>
        <div style={{
            backgroundColor: '#fff', borderRadius: '12px', padding: '0.75rem 1rem',
            border: `1.5px solid ${item.color}20`,
        }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                {isFr ? 'Exemple' : 'Example'}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: item.color }}>{item.example}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '600' }}>
                {isFr ? item.exMeanFr : item.exMeanEn}
            </div>
        </div>
        <button
            onClick={() => speakLetter(item.letter)}
            style={{
                backgroundColor: item.color, color: '#fff', border: 'none',
                borderRadius: '12px', padding: '0.65rem 1.25rem',
                fontWeight: '800', fontSize: '0.88rem', cursor: 'pointer',
                fontFamily: 'inherit', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '0.5rem', width: '100%',
            }}
        >
            🔊 {isFr ? `Écouter « ${item.letter} »` : `Listen to « ${item.letter} »`}
        </button>
    </div>
);

/* ════════════════════════════════════════════════════════════════
   AlphabetPage
════════════════════════════════════════════════════════════════ */
const AlphabetPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';

    const [filter,   setFilter]   = useState('all'); // 'all' | 'vowel' | 'consonant'
    const [selected, setSelected] = useState(null);
    const [showImg,  setShowImg]  = useState(false);

    const visible = filter === 'all'
        ? LETTERS
        : LETTERS.filter(l => l.type === filter);

    const selectedItem = LETTERS.find(l => l.letter === selected);

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            backgroundColor: '#f8fafc',
            display: 'flex', flexDirection: 'column',
            fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            <style>{`
                @keyframes letter-in { from { opacity:0; transform:scale(0.88); } to { opacity:1; transform:scale(1); } }
                @keyframes fade-up   { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
            `}</style>

            {/* ── Header ── */}
            <div style={{
                background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                padding: '1.25rem 1.5rem 1rem', color: '#fff',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <button onClick={onBack} style={{
                        background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
                        width: '38px', height: '38px', cursor: 'pointer',
                        fontSize: '1.2rem', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>←</button>
                    <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: '700', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                            {isFr
                                ? `32 lettres · ${VOWEL_COUNT} voyelles · ${CONSONANT_COUNT} consonnes`
                                : `32 letters · ${VOWEL_COUNT} vowels · ${CONSONANT_COUNT} consonants`}
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>
                            🔤 {isFr ? 'Alphabet Medumba' : 'Medumba Alphabet'}
                        </div>
                    </div>
                </div>

                {/* Filtres */}
                <div style={{
                    display: 'flex', gap: '0.5rem',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '12px', padding: '0.3rem',
                }}>
                    {[
                        { id: 'all',       labelFr: `Toutes (${LETTERS.length})`,          labelEn: `All (${LETTERS.length})` },
                        { id: 'vowel',     labelFr: `Voyelles (${VOWEL_COUNT})`,            labelEn: `Vowels (${VOWEL_COUNT})` },
                        { id: 'consonant', labelFr: `Consonnes (${CONSONANT_COUNT})`,       labelEn: `Consonants (${CONSONANT_COUNT})` },
                    ].map(f => (
                        <button key={f.id} onClick={() => { setFilter(f.id); setSelected(null); }} style={{
                            flex: 1, padding: '0.5rem 0.25rem', borderRadius: '9px',
                            border: 'none', cursor: 'pointer',
                            backgroundColor: filter === f.id ? '#fff' : 'transparent',
                            color: filter === f.id ? '#d97706' : 'rgba(255,255,255,0.85)',
                            fontWeight: '800', fontSize: '0.78rem',
                            fontFamily: 'inherit', transition: 'all 0.15s',
                        }}>
                            {isFr ? f.labelFr : f.labelEn}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Contenu ── */}
            <div style={{ flex: 1, padding: '1.25rem 1rem 3rem', animation: 'fade-up 0.3s ease-out both' }}>

                {/* Référence image */}
                <div style={{
                    backgroundColor: '#fff', borderRadius: '18px', overflow: 'hidden',
                    border: '2px solid #e2e8f0', marginBottom: '1.25rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>
                    <button
                        onClick={() => setShowImg(v => !v)}
                        style={{
                            width: '100%', backgroundColor: 'transparent', border: 'none',
                            padding: '0.85rem 1.1rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            fontFamily: 'inherit',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontSize: '1.1rem' }}>📋</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0f172a' }}>
                                {isFr ? 'Tableau de référence' : 'Reference chart'}
                            </span>
                        </div>
                        <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: '700', transform: showImg ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▾</span>
                    </button>
                    {showImg && (
                        <img
                            src="/images/alphabet-medumba.png"
                            alt="Alphabet Medumba"
                            style={{ width: '100%', display: 'block', borderTop: '1.5px solid #e2e8f0' }}
                        />
                    )}
                </div>

                {/* Détail lettre sélectionnée */}
                {selectedItem && <DetailPanel item={selectedItem} isFr={isFr} />}

                {/* Grille de lettres */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.6rem',
                }}>
                    {visible.map((item, i) => (
                        <LetterCard
                            key={item.letter}
                            item={item}
                            isFr={isFr}
                            active={selected === item.letter}
                            onSelect={setSelected}
                        />
                    ))}
                </div>

                {/* Légende */}
                <div style={{
                    marginTop: '1.5rem', display: 'flex', gap: '0.75rem',
                    flexWrap: 'wrap', justifyContent: 'center',
                }}>
                    {[
                        { color: '#0056D2', bg: '#eff6ff', border: '#bfdbfe', labelFr: 'Voyelle', labelEn: 'Vowel' },
                        { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', labelFr: 'Consonne simple', labelEn: 'Simple consonant' },
                        { color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', labelFr: 'Consonne spéciale', labelEn: 'Special consonant' },
                    ].map(leg => (
                        <div key={leg.labelFr} style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            fontSize: '0.72rem', fontWeight: '700', color: '#64748b',
                        }}>
                            <div style={{
                                width: '14px', height: '14px', borderRadius: '4px',
                                backgroundColor: leg.bg, border: `1.5px solid ${leg.border}`,
                            }} />
                            <span style={{ color: leg.color }}>{isFr ? leg.labelFr : leg.labelEn}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AlphabetPage;
