/**
 * generate_data.mjs
 * Parse all extracted Medumba text files and generate JS data modules.
 * Run: node generate_data.mjs
 */
import fs from 'fs';
import path from 'path';

const BASE = 'C:/Users/ndjan/Downloads/medumba';

/* ──────────────────────────────────────────────────────
   UTIL
────────────────────────────────────────────────────── */
function clean(s) {
    return s.replace(/\s+/g, ' ').trim();
}
function escapeJs(s) {
    return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

/* ──────────────────────────────────────────────────────
   1. PHRASEBOOK — 2033 bilingual sentence pairs
   Format per line: "N) French text | Medumba text"
   Chapter headers: "N) Chapitre X. Title | Medumba title"
────────────────────────────────────────────────────── */
console.log('Parsing phrasebook...');
const pbRaw = fs.readFileSync(`${BASE}/phrasebook_clean.txt`, 'utf8');
const pbLines = pbRaw.split('\n');

// chapter map: line content → chapter number
const chapters = {
    1:  'intro',      // Présentations
    2:  'greetings',  // Salutations
    3:  'farewells',  // Adieux
    4:  'questions',  // Questions
    5:  'family',     // Relations famille
    6:  'family',     // Suite famille
    7:  'professions',// Professions
    8:  'travel',     // Voyages
    9:  'love',       // Amour
    10: 'love',       // Chagrin amour
    11: 'apology',    // Pardon
    12: 'celebrations',// Fêtes
    13: 'weather',    // Météo
    14: 'feelings',   // Sensations
    15: 'feelings',   // Compassion
    16: 'feelings',   // Humeur
    17: 'feelings',   // Colère
    18: 'feelings',   // Regret
    19: 'feelings',   // Déception
    20: 'feelings',   // Surprise
    21: 'health',     // Santé questions
    22: 'health',     // Santé réponses
    23: 'health',     // États physiques
    24: 'time',       // Temps
    25: 'time',       // Dates
    26: 'house',      // Maison
    27: 'food',       // Repas
    28: 'work',       // Travail
    29: 'general',    // Expressions générales
    30: 'grammar',    // Temps verbaux
    31: 'grammar',    // Grammaire
    32: 'culture',    // Culture
};

// chapter-to-lesson-id mapping
const chapterToLesson = {
    intro:        ['l1', 'l10'],
    greetings:    ['l1'],
    farewells:    ['l1'],
    questions:    ['l1', 'l10'],
    family:       ['l7'],
    professions:  ['l14'],
    travel:       ['l9'],
    love:         ['l10'],
    apology:      ['l1'],
    celebrations: ['l1'],
    weather:      ['l8'],
    feelings:     ['l12'],
    health:       ['l12'],
    time:         ['l9'],
    house:        ['l11'],
    food:         ['l3', 'l11'],
    work:         ['l14'],
    general:      [],
    grammar:      [],
    culture:      [],
};

let currentChapter = 1;
const pbPairs = [];

for (const line of pbLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // detect chapter header (contains "Chapitre" or "Mbwə̀ kàm" — starts new chapter)
    const chapterMatch = trimmed.match(/^\d+\)\s+Chapitre\s+(\d+)\./i);
    if (chapterMatch) {
        currentChapter = parseInt(chapterMatch[1]);
        continue;
    }

    // parse bilingual pair: "N) French | Medumba"
    const pairMatch = trimmed.match(/^\d+\)\s+(.+?)\s*\|\s*(.+)$/);
    if (pairMatch) {
        const fr = clean(pairMatch[1]);
        const medumba = clean(pairMatch[2]);
        if (fr.length > 1 && medumba.length > 1) {
            const theme = chapters[currentChapter] || 'general';
            const lessons = chapterToLesson[theme] || [];
            pbPairs.push({ fr, medumba, lessons });
        }
    }
}
console.log(`  → ${pbPairs.length} phrasebook pairs`);

/* ──────────────────────────────────────────────────────
   2. 511 EXPRESSIONS
   Format: "N. French : Medumba"
────────────────────────────────────────────────────── */
console.log('Parsing 511 expressions...');
const e511Raw = fs.readFileSync(`${BASE}/511_expressions_clean.txt`, 'utf8');
const e511Lines = e511Raw.split('\n');
const e511Pairs = [];

for (const line of e511Lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // "67. Un : Ncʉ'" or "498. Le chien mange la viande : Mbʉ cwɛ̌d mfɛd mbαb"
    const m = trimmed.match(/^\d+\.\s+(.+?)\s*:\s*(.+)$/);
    if (m) {
        const fr = clean(m[1]);
        const medumba = clean(m[2]);
        if (fr.length > 1 && medumba.length > 1 && !fr.includes('511')) {
            e511Pairs.push({ fr, medumba });
        }
    }
}
console.log(`  → ${e511Pairs.length} from 511 expressions`);

/* ──────────────────────────────────────────────────────
   3. 259 EXPRESSIONS
   Format: "French | Medumba" (tab or pipe separated)
────────────────────────────────────────────────────── */
console.log('Parsing 259 expressions...');
const e259Raw = fs.readFileSync(`${BASE}/259_expressions_extracted.txt`, 'utf8');
const e259Lines = e259Raw.split('\n');
const e259Pairs = [];

for (const line of e259Lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('FR') || trimmed.startsWith('French')) continue;
    // split on | or tab
    const parts = trimmed.split(/\s*\|\s*|\t/);
    if (parts.length >= 2) {
        const fr = clean(parts[0]);
        const medumba = clean(parts[1]);
        if (fr.length > 1 && medumba.length > 1 && fr !== 't' && medumba !== 't') {
            e259Pairs.push({ fr, medumba });
        }
    }
}
console.log(`  → ${e259Pairs.length} from 259 expressions`);

/* ──────────────────────────────────────────────────────
   4. SYLLABARY — 1148 syllables with IPA
   Format: "syllable [ipa]" or "syllable [ipa1], [ipa2]"
────────────────────────────────────────────────────── */
console.log('Parsing syllabary...');
const sylRaw = fs.readFileSync(`${BASE}/syllabes_clean.txt`, 'utf8');
const sylLines = sylRaw.split('\n');
const syllables = [];

for (const line of sylLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('I.') || trimmed.startsWith('Voici')) continue;
    // Match: syllable [ipa] (optionally followed by ", [ipa2]")
    const m = trimmed.match(/^([^\[]+?)\s+(\[.+\](?:,\s*\[.+\])*)$/);
    if (m) {
        const syllable = clean(m[1]);
        const ipa = clean(m[2]);
        if (syllable.length >= 1 && syllable.length <= 8) {
            syllables.push({ syllable, ipa });
        }
    }
}
console.log(`  → ${syllables.length} syllables`);

/* ──────────────────────────────────────────────────────
   5. MATH LEXICON — 68 terms
   Format: "French Term | Medumba equivalent"
────────────────────────────────────────────────────── */
console.log('Parsing math lexicon...');
const mathRaw = fs.readFileSync(`${BASE}/math_lexique_extracted.txt`, 'utf8');
const mathLines = mathRaw.split('\n');
const mathPairs = [];

for (const line of mathLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('Termes') || trimmed.startsWith('t |')) continue;
    const parts = trimmed.split(/\s*\|\s*/);
    if (parts.length >= 2) {
        const fr = clean(parts[0].replace(/^t\s+/, '').replace(/^t$/, ''));
        const medumba = clean(parts[1].replace(/^t\s+/, '').replace(/^t$/, ''));
        if (fr.length > 1 && medumba.length > 1) {
            mathPairs.push({ fr, medumba });
        }
    }
}
console.log(`  → ${mathPairs.length} math terms`);

/* ──────────────────────────────────────────────────────
   DEDUPLICATION
────────────────────────────────────────────────────── */
// Read existing expressions to avoid duplication
let existingFr = new Set();
try {
    const existing = fs.readFileSync(`${BASE}/src/data/medumbaExpressions.js`, 'utf8');
    const matches = [...existing.matchAll(/fr:\s*["'`](.+?)["'`]/g)];
    existingFr = new Set(matches.map(m => m[1].toLowerCase().trim()));
    console.log(`  Existing expressions: ${existingFr.size}`);
} catch(e) { console.log('  Could not read existing expressions'); }

function isNew(fr) {
    return !existingFr.has(fr.toLowerCase().trim());
}

const newFromPhrasebook = pbPairs.filter(p => isNew(p.fr));
const newFrom511 = e511Pairs.filter(p => isNew(p.fr));
const newFrom259 = e259Pairs.filter(p => isNew(p.fr));

console.log(`\nNew entries after dedup:`);
console.log(`  Phrasebook: ${newFromPhrasebook.length}`);
console.log(`  511 expr:   ${newFrom511.length}`);
console.log(`  259 expr:   ${newFrom259.length}`);

/* ──────────────────────────────────────────────────────
   GENERATE: medumbaExpressions.js ADDITIONS
────────────────────────────────────────────────────── */
// Generate phrasebook additions as a separate exportable array
const pbJs = `// Auto-generated from phrasebook — ${newFromPhrasebook.length} entries
export const PHRASEBOOK_EXPRESSIONS = [
${newFromPhrasebook.map(p => `  { fr: \`${escapeJs(p.fr)}\`, medumba: \`${escapeJs(p.medumba)}\`, lessons: ${JSON.stringify(p.lessons)} },`).join('\n')}
];
`;
fs.writeFileSync(`${BASE}/src/data/phrasebookExpressions.js`, pbJs, 'utf8');
console.log(`\nWrote phrasebookExpressions.js (${newFromPhrasebook.length} entries)`);

// Generate vocab additions (511 + 259) as vocabulary words
const allVocab = [...newFrom511, ...newFrom259];
const vocabJs = `// Auto-generated from 511 expressions + 259 expressions — ${allVocab.length} entries
export const VOCAB_EXPRESSIONS = [
${allVocab.map(p => `  { fr: \`${escapeJs(p.fr)}\`, medumba: \`${escapeJs(p.medumba)}\` },`).join('\n')}
];
`;
fs.writeFileSync(`${BASE}/src/data/vocabExpressions.js`, vocabJs, 'utf8');
console.log(`Wrote vocabExpressions.js (${allVocab.length} entries)`);

/* ──────────────────────────────────────────────────────
   GENERATE: medumbaSyllables.js
────────────────────────────────────────────────────── */
const sylJs = `// Auto-generated from "Les syllabes medumba.docx" — ${syllables.length} entries
export const MEDUMBA_SYLLABLES = [
${syllables.map(s => `  { syllable: \`${escapeJs(s.syllable)}\`, ipa: \`${escapeJs(s.ipa)}\` },`).join('\n')}
];
`;
fs.writeFileSync(`${BASE}/src/data/medumbaSyllables.js`, sylJs, 'utf8');
console.log(`Wrote medumbaSyllables.js (${syllables.length} entries)`);

/* ──────────────────────────────────────────────────────
   GENERATE: medumbaMath.js
────────────────────────────────────────────────────── */
const mathJs = `// Auto-generated from "Lexique Mathematique du primaire.xlsx" — ${mathPairs.length} entries
export const MEDUMBA_MATH = [
${mathPairs.map(p => `  { fr: \`${escapeJs(p.fr)}\`, medumba: \`${escapeJs(p.medumba)}\` },`).join('\n')}
];
`;
fs.writeFileSync(`${BASE}/src/data/medumbaMath.js`, mathJs, 'utf8');
console.log(`Wrote medumbaMath.js (${mathPairs.length} entries)`);

/* ──────────────────────────────────────────────────────
   GENERATE: phrasebook lesson keyword additions (for expressionsByLesson.js)
────────────────────────────────────────────────────── */
// Collect new keywords per lesson from phrasebook
const kwByLesson = {};
for (const p of newFromPhrasebook) {
    for (const lid of p.lessons) {
        if (!kwByLesson[lid]) kwByLesson[lid] = new Set();
        // extract short keywords from the french text
        const words = p.fr.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        words.slice(0, 3).forEach(w => kwByLesson[lid].add(w.replace(/[^a-zàâéèêëîïôùûüç]/g, '')));
    }
}
console.log(`\nLesson keyword additions from phrasebook:`);
for (const [lid, kws] of Object.entries(kwByLesson)) {
    console.log(`  ${lid}: ${[...kws].slice(0, 8).join(', ')}`);
}

console.log('\nDone! Files written to src/data/');
