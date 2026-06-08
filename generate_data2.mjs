/**
 * generate_data2.mjs — compact version
 * Limits phrasebook to 35 entries/chapter for lessons that map to app lessons.
 * Stores data as regular strings (not template literals) for smaller build output.
 */
import fs from 'fs';

const BASE = 'C:/Users/ndjan/Downloads/medumba';

function esc(s) {
    return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
function clean(s) { return s.replace(/\s+/g, ' ').trim(); }

/* ── phrasebook chapter→lesson mapping ── */
const chapterToLesson = {
    1:  ['l1','l10'], 2: ['l1'], 3: ['l1'], 4: ['l1','l10'],
    5:  ['l7'],       6: ['l7'], 7: ['l14'],8: ['l9'],
    9:  [],          10: [],    11: ['l1'], 12: ['l1'],
    13: ['l8'],      14: ['l12'],15: ['l12'],16: ['l12'],
    17: [],          18: [],    19: [],     20: [],
    21: ['l12'],     22: ['l12'],23: ['l12'],24: ['l9'],
    25: ['l9'],      26: ['l11'],27: ['l3','l11'],28: ['l14'],
    29: [],          30: [],    31: [],     32: [],
};

const MAX_PER_CHAPTER = 35;

console.log('Parsing phrasebook (compact)...');
const pbRaw = fs.readFileSync(`${BASE}/phrasebook_clean.txt`, 'utf8');
let currentChapter = 1;
let chapterCount = {};
const pbPairs = [];

for (const line of pbRaw.split('\n')) {
    const t = line.trim();
    if (!t) continue;

    const ch = t.match(/^\d+\)\s+Chapitre\s+(\d+)\./i);
    if (ch) { currentChapter = parseInt(ch[1]); continue; }

    const lessons = chapterToLesson[currentChapter] || [];
    if (lessons.length === 0) continue; // skip chapters with no lesson

    if (!chapterCount[currentChapter]) chapterCount[currentChapter] = 0;
    if (chapterCount[currentChapter] >= MAX_PER_CHAPTER) continue;

    const m = t.match(/^\d+\)\s+(.+?)\s*\|\s*(.+)$/);
    if (m) {
        const fr = clean(m[1]);
        const medumba = clean(m[2]);
        if (fr.length > 1 && medumba.length > 1) {
            pbPairs.push({ fr, medumba, lessons });
            chapterCount[currentChapter]++;
        }
    }
}
console.log(`  → ${pbPairs.length} phrasebook entries (capped per chapter)`);

/* ── 511 expressions (vocabulary words) — first 300 only ── */
console.log('Parsing 511 expressions (first 300)...');
const e511Raw = fs.readFileSync(`${BASE}/511_expressions_clean.txt`, 'utf8');
const e511Pairs = [];
for (const line of e511Raw.split('\n')) {
    if (e511Pairs.length >= 300) break;
    const m = line.trim().match(/^\d+\.\s+(.+?)\s*:\s*(.+)$/);
    if (m) {
        const fr = clean(m[1]); const medumba = clean(m[2]);
        if (fr.length > 1 && medumba.length > 1) e511Pairs.push({ fr, medumba });
    }
}
console.log(`  → ${e511Pairs.length} from 511 expressions`);

/* ── syllabary ── */
console.log('Parsing syllabary...');
const sylRaw = fs.readFileSync(`${BASE}/syllabes_clean.txt`, 'utf8');
const syllables = [];
for (const line of sylRaw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('I.') || t.startsWith('Voici')) continue;
    const m = t.match(/^([^\[]+?)\s+(\[.+\](?:,\s*\[.+\])*)$/);
    if (m && m[1].trim().length <= 8) {
        syllables.push({ syllable: clean(m[1]), ipa: clean(m[2]) });
    }
}
console.log(`  → ${syllables.length} syllables`);

/* ── math lexicon ── */
console.log('Parsing math lexicon...');
const mathRaw = fs.readFileSync(`${BASE}/math_lexique_extracted.txt`, 'utf8');
const mathPairs = [];
for (const line of mathRaw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('Termes') || t === 't |') continue;
    const parts = t.split(/\s*\|\s*/);
    if (parts.length >= 2) {
        const fr = clean(parts[0].replace(/^t\s+/, ''));
        const medumba = clean(parts[1].replace(/^t\s+/, ''));
        if (fr.length > 1 && medumba.length > 1) mathPairs.push({ fr, medumba });
    }
}
console.log(`  → ${mathPairs.length} math terms`);

/* ── WRITE phrasebookExpressions.js ── */
const pbJs = `// Phrasebook — ${pbPairs.length} entries (35 max/chapter, lessons only)
export const PHRASEBOOK_EXPRESSIONS = [
${pbPairs.map(p => `  { fr: '${esc(p.fr)}', medumba: '${esc(p.medumba)}', lessons: ${JSON.stringify(p.lessons)} },`).join('\n')}
];
`;
fs.writeFileSync(`${BASE}/src/data/phrasebookExpressions.js`, pbJs, 'utf8');
console.log(`\nWrote phrasebookExpressions.js — ${pbPairs.length} entries (${Buffer.byteLength(pbJs)/1024|0} KB)`);

/* ── WRITE vocabExpressions.js ── */
const vocabJs = `// Vocabulary from 511 expressions — ${e511Pairs.length} entries
export const VOCAB_EXPRESSIONS = [
${e511Pairs.map(p => `  { fr: '${esc(p.fr)}', medumba: '${esc(p.medumba)}' },`).join('\n')}
];
`;
fs.writeFileSync(`${BASE}/src/data/vocabExpressions.js`, vocabJs, 'utf8');
console.log(`Wrote vocabExpressions.js — ${e511Pairs.length} entries (${Buffer.byteLength(vocabJs)/1024|0} KB)`);

/* ── WRITE medumbaSyllables.js ── */
const sylJs = `// Syllabary Medumba — ${syllables.length} entrées avec IPA
export const MEDUMBA_SYLLABLES = [
${syllables.map(s => `  { syllable: '${esc(s.syllable)}', ipa: '${esc(s.ipa)}' },`).join('\n')}
];
`;
fs.writeFileSync(`${BASE}/src/data/medumbaSyllables.js`, sylJs, 'utf8');
console.log(`Wrote medumbaSyllables.js — ${syllables.length} entries (${Buffer.byteLength(sylJs)/1024|0} KB)`);

/* ── WRITE medumbaMath.js ── */
const mathJs = `// Lexique Mathématique primaire — ${mathPairs.length} termes
export const MEDUMBA_MATH = [
${mathPairs.map(p => `  { fr: '${esc(p.fr)}', medumba: '${esc(p.medumba)}' },`).join('\n')}
];
`;
fs.writeFileSync(`${BASE}/src/data/medumbaMath.js`, mathJs, 'utf8');
console.log(`Wrote medumbaMath.js — ${mathPairs.length} entries (${Buffer.byteLength(mathJs)/1024|0} KB)`);

console.log('\nDone.');
