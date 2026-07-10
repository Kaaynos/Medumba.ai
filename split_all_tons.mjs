import { readdirSync } from 'fs';
import { spawnSync } from 'child_process';

const FFMPEG = 'C:/Users/ndjan/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.2-full_build/bin/ffmpeg.exe';
const FOLDER = 'C:/Users/ndjan/Downloads/modif/Syllabe medumba';
const OUT    = 'C:/Users/ndjan/Downloads/modif/tons_split';

const PAD = 0.08;
const TONE_NAMES = ['bas', 'moyen', 'montant', 'descendant'];

function getSpeechSegments(path) {
  const res = spawnSync(FFMPEG, ['-i', path, '-af', 'silencedetect=noise=-30dB:d=0.3', '-f', 'null', '-'], { encoding: 'utf8' });
  const out = (res.stderr || '') + (res.stdout || '');
  const starts = [...out.matchAll(/silence_start:\s*([\d.]+)/g)].map(m => parseFloat(m[1]));
  const ends   = [...out.matchAll(/silence_end:\s*([\d.]+)/g)].map(m => parseFloat(m[1]));
  const segments = [];
  for (let i = 0; i < ends.length && i + 1 < starts.length; i++) {
    segments.push([ends[i], starts[i + 1]]);
  }
  return segments;
}

const files = readdirSync(FOLDER).filter(f => /\.ogg$/i.test(f));
console.log(`Traitement de ${files.length} fichiers...\n`);

let ok = 0, badCount = 0, cutErrors = 0;
const badFiles = [];

for (const filename of files) {
  const syllable = filename.replace(/\.ogg$/i, '');
  const path = `${FOLDER}/${filename}`;
  const segments = getSpeechSegments(path);

  if (segments.length !== 5) {
    console.log(`  ⚠ ${syllable}: ${segments.length} segments (attendu 5) — ignoré`);
    badFiles.push(syllable);
    badCount++;
    continue;
  }

  const toneSegments = segments.slice(1, 5);
  let fileOk = true;

  toneSegments.forEach(([start, end], i) => {
    const toneName = TONE_NAMES[i];
    const ss = Math.max(0, start - PAD);
    const to = end + PAD;
    const outPath = `${OUT}/${syllable}__${toneName}.ogg`;
    const res = spawnSync(FFMPEG, ['-y', '-i', path, '-ss', ss.toFixed(3), '-to', to.toFixed(3), '-c', 'copy', outPath], { encoding: 'utf8' });
    if (res.status !== 0) { fileOk = false; cutErrors++; }
  });

  if (fileOk) ok++;
  if (ok % 50 === 0) console.log(`  ... ${ok} syllabes traitées`);
}

console.log(`\n✅ Terminé : ${ok} syllabes découpées en 4 tons (${ok * 4} clips), ${badCount} syllabes ignorées (segments ≠ 5), ${cutErrors} erreurs de découpe`);
if (badFiles.length) console.log('Syllabes ignorées:', badFiles.join(', '));
