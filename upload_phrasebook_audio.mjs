/**
 * upload_phrasebook_audio.mjs
 * Uploade les 30 chapitres audio vers Supabase Storage (bucket: medumba-audio)
 *
 * Usage:
 *   1. Récupère la SERVICE_ROLE KEY : supabase.com → Settings → API → service_role
 *   2. node upload_phrasebook_audio.mjs <SERVICE_ROLE_KEY>
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';

const SUPABASE_URL      = 'https://amhzzwiqlmewghtlmjbm.supabase.co';
const SERVICE_ROLE_KEY  = process.argv[2];
const AUDIO_FOLDER      = 'C:/Users/ndjan/Downloads/audio medumba';
const BUCKET            = 'medumba-audio';

if (!SERVICE_ROLE_KEY) {
    console.error('Usage: node upload_phrasebook_audio.mjs <SERVICE_ROLE_KEY>');
    console.error('Récupère la clé sur : supabase.com → Settings → API → service_role');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Extrait le numéro de chapitre depuis le nom de fichier (ex: "chapitre 07.m4a.mp4" → 7)
function parseChapterNum(filename) {
    const m = filename.match(/(?:Chapitre|chapitre)\s+(\d+)/i);
    return m ? parseInt(m[1], 10) : null;
}

async function upload() {
    const files = readdirSync(AUDIO_FOLDER);
    const audioFiles = files.filter(f => /\.(mp4|mpeg|m4a)$/i.test(f));

    console.log(`\n${audioFiles.length} fichiers trouvés dans ${AUDIO_FOLDER}\n`);

    // Crée le bucket s'il n'existe pas
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some(b => b.name === BUCKET);
    if (!exists) {
        await supabase.storage.createBucket(BUCKET, { public: true });
        console.log(`Bucket "${BUCKET}" créé.`);
    } else {
        console.log(`Bucket "${BUCKET}" déjà existant.`);
    }

    let ok = 0, skip = 0, fail = 0;

    for (const filename of audioFiles) {
        const num = parseChapterNum(filename);
        if (!num) { console.log(`  ⚠ Ignoré (pas de numéro) : ${filename}`); skip++; continue; }

        const destPath = `phrasebook/chapitre_${String(num).padStart(2,'0')}.mp4`;
        const localPath = join(AUDIO_FOLDER, filename);
        const data = readFileSync(localPath);

        const { error } = await supabase.storage
            .from(BUCKET)
            .upload(destPath, data, {
                contentType: 'audio/mp4',
                upsert: true,
            });

        if (error) {
            console.log(`  ✗ ch.${String(num).padStart(2,'0')} — ${error.message}`);
            fail++;
        } else {
            console.log(`  ✓ ch.${String(num).padStart(2,'0')} → ${destPath}`);
            ok++;
        }
    }

    console.log(`\n✅ Terminé : ${ok} uploadés, ${skip} ignorés, ${fail} erreurs`);

    if (ok > 0) {
        console.log('\nURL publique de vérification :');
        const { data } = supabase.storage.from(BUCKET).getPublicUrl('phrasebook/chapitre_01.mp4');
        console.log(' ', data.publicUrl);
    }
}

upload().catch(console.error);
