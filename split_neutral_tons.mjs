import { readdirSync } from 'fs';
import { spawnSync } from 'child_process';

const FFMPEG = 'C:/Users/ndjan/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.2-full_build/bin/ffmpeg.exe';
const FOLDER = 'C:/Users/ndjan/Downloads/modif/Syllabe medumba';
const OUT    = 'C:/Users/ndjan/Downloads/modif/tons_split';

const PAD = 0.08;

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
console.log(`Extraction du segment neutre pour ${files.length} fichiers...\n`);

let ok = 0, bad = 0;
const badFiles = [];

for (const filename of files) {
  const syllable = filename.replace(/\.ogg$/i, '');
  const path = `${FOLDER}/${filename}`;
  const segments = getSpeechSegments(path);

  if (segments.length !== 5) { badFiles.push(syllable); bad++; continue; }

  const [start, end] = segments[0]; // segment neutre (avant les 4 tons)
  const ss = Math.max(0, start - PAD);
  const to = end + PAD;
  const outPath = `${OUT}/${syllable}__neutre.ogg`;
  const res = spawnSync(FFMPEG, ['-y', '-i', path, '-ss', ss.toFixed(3), '-to', to.toFixed(3), '-c', 'copy', outPath], { encoding: 'utf8' });
  if (res.status !== 0) { badFiles.push(syllable); bad++; } else { ok++; }
  if (ok % 50 === 0 && ok > 0) console.log(`  ... ${ok} extraits`);
}

console.log(`\n✅ Terminé : ${ok} clips neutres extraits, ${bad} échecs`);
if (badFiles.length) console.log('Échecs:', badFiles.join(', '));
