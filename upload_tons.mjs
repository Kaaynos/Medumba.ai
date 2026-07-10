/**
 * upload_tons.mjs
 * Uploade les 1532 clips de tons (4 par syllabe) vers Supabase Storage (bucket: medumba-audio)
 *
 * Usage:
 *   node upload_tons.mjs <SERVICE_ROLE_KEY>
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL     = 'https://amhzzwiqlmewghtlmjbm.supabase.co';
const SERVICE_ROLE_KEY = process.argv[2];
const FOLDER           = 'C:/Users/ndjan/Downloads/modif/tons_split';
const BUCKET           = 'medumba-audio';
const PREFIX           = 'syllabes';

if (!SERVICE_ROLE_KEY) {
    console.error('Usage: node upload_tons.mjs <SERVICE_ROLE_KEY>');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function toHexKey(str) {
    return Buffer.from(str, 'utf8').toString('hex');
}

async function upload() {
    const files = readdirSync(FOLDER).filter(f => /\.ogg$/i.test(f));
    console.log(`\n${files.length} clips trouvés dans ${FOLDER}\n`);

    let ok = 0, fail = 0;

    for (const filename of files) {
        // format: "<syllabe>__<ton>.ogg"
        const m = filename.match(/^(.*)__(bas|moyen|montant|descendant)\.ogg$/i);
        if (!m) { console.log(`  ⚠ nom inattendu, ignoré: ${filename}`); fail++; continue; }
        const [, syllable, tone] = m;

        const destPath = `${PREFIX}/${toHexKey(syllable)}_${tone}.ogg`;
        const localPath = join(FOLDER, filename);
        const data = readFileSync(localPath);

        const { error } = await supabase.storage
            .from(BUCKET)
            .upload(destPath, data, { contentType: 'audio/ogg', upsert: true });

        if (error) {
            console.log(`  ✗ ${filename} — ${error.message}`);
            fail++;
        } else {
            ok++;
            if (ok % 100 === 0) console.log(`  ... ${ok} uploadés`);
        }
    }

    console.log(`\n✅ Terminé : ${ok} uploadés, ${fail} erreurs`);
}

upload().catch(console.error);
