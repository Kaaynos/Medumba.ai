-- The 24 videos below have no youtube id and were served from /public/videos/,
-- which is stored via Git LFS. Vercel's build doesn't resolve LFS pointers, so
-- production served ~132-byte pointer text instead of the real video. Files
-- have been re-uploaded to a public Supabase Storage bucket named "videos";
-- point these rows at that bucket instead of the broken local path.

update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/intro/intro_01_salutation.mp4' where src = '/videos/intro/intro_01_salutation.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/intro/intro_02_7jours.mp4'     where src = '/videos/intro/intro_02_7jours.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/intro/intro_03_bagwud.mp4'     where src = '/videos/intro/intro_03_bagwud.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/intro/intro_04_matin.mp4'      where src = '/videos/intro/intro_04_matin.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/intro/intro_05_8jours.mp4'     where src = '/videos/intro/intro_05_8jours.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/intro/intro_06_mois.mp4'       where src = '/videos/intro/intro_06_mois.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/intro/intro_07_maison.mp4'     where src = '/videos/intro/intro_07_maison.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/intro/intro_08_mots.mp4'       where src = '/videos/intro/intro_08_mots.mp4';

update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/niveau1/n1_04_salutation1.mp4' where src = '/videos/niveau1/n1_04_salutation1.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/niveau1/n1_05_salutation2.mp4' where src = '/videos/niveau1/n1_05_salutation2.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/niveau1/n1_03_monnom.mp4'      where src = '/videos/niveau1/n1_03_monnom.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/niveau1/n1_01_marche1.mp4'     where src = '/videos/niveau1/n1_01_marche1.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/niveau1/n1_02_marche2.mp4'     where src = '/videos/niveau1/n1_02_marche2.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/niveau1/n1_06_demanderju.mp4'  where src = '/videos/niveau1/n1_06_demanderju.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/niveau1/n1_07_demander.mp4'    where src = '/videos/niveau1/n1_07_demander.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/niveau1/n1_08_manger.mp4'      where src = '/videos/niveau1/n1_08_manger.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/niveau1/n1_09_dormir.mp4'      where src = '/videos/niveau1/n1_09_dormir.mp4';

update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/niveau2/n2_01_chanson.mp4'     where src = '/videos/niveau2/n2_01_chanson.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/niveau2/n2_02_bonnenuit.mp4'   where src = '/videos/niveau2/n2_02_bonnenuit.mp4';

update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/dessin/dessin_01.mp4' where src = '/videos/dessin/dessin_01.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/dessin/dessin_02.mp4' where src = '/videos/dessin/dessin_02.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/dessin/dessin_03.mp4' where src = '/videos/dessin/dessin_03.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/dessin/dessin_04.mp4' where src = '/videos/dessin/dessin_04.mp4';
update videos set src = 'https://amhzzwiqlmewghtlmjbm.supabase.co/storage/v1/object/public/videos/dessin/dessin_05.mp4' where src = '/videos/dessin/dessin_05.mp4';
