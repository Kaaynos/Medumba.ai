/**
 * upload_syllabes_audio.mjs
 * Uploade les enregistrements audio des syllabes vers Supabase Storage (bucket: medumba-audio)
 *
 * Usage:
 *   1. Récupère la SERVICE_ROLE KEY : supabase.com → Settings → API → service_role
 *   2. node upload_syllabes_audio.mjs <SERVICE_ROLE_KEY>
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL     = 'https://amhzzwiqlmewghtlmjbm.supabase.co';
const SERVICE_ROLE_KEY = process.argv[2];
const AUDIO_FOLDER     = 'C:/Users/ndjan/Downloads/modif/Syllabe medumba';
const BUCKET           = 'medumba-audio';
const PREFIX           = 'syllabes';

if (!SERVICE_ROLE_KEY) {
    console.error('Usage: node upload_syllabes_audio.mjs <SERVICE_ROLE_KEY>');
    console.error('Récupère la clé sur : supabase.com → Settings → API → service_role');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Certaines syllabes contiennent des caractères IPA (ŋ, ɛ, α, ə, ʉ, ') que
// Supabase Storage refuse dans une clé d'objet ("Invalid key"). On encode donc
// la syllabe en hexadécimal UTF-8 pour obtenir une clé toujours valide.
// Le même encodage est reproduit côté web (voir syllableAudioUrl côté front).
function toHexKey(str) {
    return Buffer.from(str, 'utf8').toString('hex');
}

async function upload() {
    const files = readdirSync(AUDIO_FOLDER);
    const audioFiles = files.filter(f => /\.ogg$/i.test(f));

    console.log(`\n${audioFiles.length} fichiers .ogg trouvés dans ${AUDIO_FOLDER}\n`);

    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some(b => b.name === BUCKET);
    if (!exists) {
        await supabase.storage.createBucket(BUCKET, { public: true });
        console.log(`Bucket "${BUCKET}" créé.`);
    } else {
        console.log(`Bucket "${BUCKET}" déjà existant.`);
    }

    let ok = 0, fail = 0;

    for (const filename of audioFiles) {
        const syllable = filename.replace(/\.ogg$/i, '');
        const destPath = `${PREFIX}/${toHexKey(syllable)}.ogg`;
        const localPath = join(AUDIO_FOLDER, filename);
        const data = readFileSync(localPath);

        const { error } = await supabase.storage
            .from(BUCKET)
            .upload(destPath, data, {
                contentType: 'audio/ogg',
                upsert: true,
            });

        if (error) {
            console.log(`  ✗ ${syllable} — ${error.message}`);
            fail++;
        } else {
            ok++;
            if (ok % 50 === 0) console.log(`  ... ${ok} uploadés`);
        }
    }

    console.log(`\n✅ Terminé : ${ok} uploadés, ${fail} erreurs`);

    if (ok > 0) {
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(`${PREFIX}/${toHexKey('a')}.ogg`);
        console.log('\nURL publique de vérification (syllabe "a") :');
        console.log(' ', data.publicUrl);
    }
}

upload().catch(console.error);
