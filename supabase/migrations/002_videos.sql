-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Vidéos & Catégories
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── CATÉGORIES VIDÉO ────────────────────────────────────────────────────────
create table if not exists public.video_categories (
    id          text primary key,
    icon        text    not null,
    color       text    not null,
    grad        text    not null,
    label_fr    text    not null,
    label_en    text    not null,
    desc_fr     text    not null,
    desc_en     text    not null,
    sort_order  integer default 0
);

-- ─── VIDÉOS ──────────────────────────────────────────────────────────────────
create table if not exists public.videos (
    id          uuid    primary key default uuid_generate_v4(),
    category_id text    not null references public.video_categories(id) on delete cascade,
    src         text    default '',     -- chemin local /videos/...
    youtube     text    default null,   -- ID YouTube (si dispo)
    title_fr    text    not null,
    title_en    text    not null,
    desc_fr     text    not null,
    desc_en     text    not null,
    thumb       text    not null,       -- emoji miniature
    bg          text    not null,       -- dégradé CSS
    sort_order  integer default 0
);

-- ─── RLS : lecture publique ──────────────────────────────────────────────────
alter table public.video_categories enable row level security;
alter table public.videos           enable row level security;

create policy "video_categories_public_read" on public.video_categories
    for select using (true);

create policy "videos_public_read" on public.videos
    for select using (true);

-- ─── SEED : CATÉGORIES ──────────────────────────────────────────────────────
insert into public.video_categories (id, icon, color, grad, label_fr, label_en, desc_fr, desc_en, sort_order)
values
    ('intro',   '🎬', '#7c3aed', 'linear-gradient(135deg,#7c3aed,#a855f7)', 'Introduction',              'Introduction',              'Commencez ici — bases du Medumba',       'Start here — Medumba basics',          1),
    ('niveau1', '📗', '#16a34a', 'linear-gradient(135deg,#16a34a,#4ade80)', 'Niveau 1',                  'Level 1',                   'Conversations du quotidien',             'Everyday conversations',               2),
    ('niveau2', '📘', '#0891b2', 'linear-gradient(135deg,#0891b2,#22d3ee)', 'Niveau 2',                  'Level 2',                   'Sujets avancés',                         'Advanced topics',                      3),
    ('dessin',  '🎨', '#e11d48', 'linear-gradient(135deg,#e11d48,#fb7185)', 'Dessins Medumba',           'Drawings',                  'Leçons animées visuelles',               'Animated visual lessons',              4),
    ('zenu',    '📖', '#7c3aed', 'linear-gradient(135deg,#7c3aed,#c084fc)', 'Zenù — Contes & Culture',  'Zenù — Stories & Culture',  'Patrimoine & tradition orale Medumba',   'Medumba heritage & oral tradition',    5)
on conflict (id) do update set
    icon     = excluded.icon,
    color    = excluded.color,
    grad     = excluded.grad,
    label_fr = excluded.label_fr,
    label_en = excluded.label_en,
    desc_fr  = excluded.desc_fr,
    desc_en  = excluded.desc_en,
    sort_order = excluded.sort_order;

-- ─── SEED : VIDÉOS — Introduction ────────────────────────────────────────────
insert into public.videos (category_id, src, title_fr, title_en, desc_fr, desc_en, thumb, bg, sort_order) values
    ('intro', '/videos/intro/intro_01_salutation.mp4', 'Salutation (Cà''tə̀)',   'Greeting (Cà''tə̀)',     'Comment saluer',              'How to greet',            '👋', 'linear-gradient(135deg,#7c3aed,#a855f7)', 1),
    ('intro', '/videos/intro/intro_02_7jours.mp4',     '7 jours de la semaine', '7 days of the week',    'Les 7 jours en Medumba',      '7 days in Medumba',       '📅', 'linear-gradient(135deg,#0891b2,#06b6d4)', 2),
    ('intro', '/videos/intro/intro_03_bagwud.mp4',     'Bǎgwud',                'Bǎgwud',                'Vocabulaire culturel',        'Cultural vocabulary',     '🏺', 'linear-gradient(135deg,#d97706,#f59e0b)', 3),
    ('intro', '/videos/intro/intro_04_matin.mp4',      'Le matin',              'The morning',           'Expressions du matin',        'Morning expressions',     '🌅', 'linear-gradient(135deg,#f97316,#fb923c)', 4),
    ('intro', '/videos/intro/intro_05_8jours.mp4',     '8 jours (calendrier)',  '8-day calendar',        'Calendrier Medumba',          'Medumba calendar',        '🗓️', 'linear-gradient(135deg,#0f766e,#14b8a6)', 5),
    ('intro', '/videos/intro/intro_06_mois.mp4',       'Mois de l''année',      'Months of the year',    'Les 12 mois en Medumba',      '12 months in Medumba',   '📆', 'linear-gradient(135deg,#4f46e5,#818cf8)', 6),
    ('intro', '/videos/intro/intro_07_maison.mp4',     'La maison (Tǔnndα)',    'The house (Tǔnndα)',    'Vocabulaire de la maison',    'Home vocabulary',         '🏠', 'linear-gradient(135deg,#16a34a,#4ade80)', 7),
    ('intro', '/videos/intro/intro_08_mots.mp4',       'Les mots (Tʉntə̀)',     'Words (Tʉntə̀)',         'Mots et chiffres de base',    'Basic words & numbers',   '🔢', 'linear-gradient(135deg,#dc2626,#f87171)', 8);

-- ─── SEED : VIDÉOS — Niveau 1 ────────────────────────────────────────────────
insert into public.videos (category_id, src, title_fr, title_en, desc_fr, desc_en, thumb, bg, sort_order) values
    ('niveau1', '/videos/niveau1/n1_04_salutation1.mp4', 'Salutations 1',          'Greetings 1',           'Formules de salutation',      'Greeting formulas',       '🤝', 'linear-gradient(135deg,#16a34a,#4ade80)', 1),
    ('niveau1', '/videos/niveau1/n1_05_salutation2.mp4', 'Salutations 2',          'Greetings 2',           'Salutations approfondies',    'Extended greetings',      '😊', 'linear-gradient(135deg,#0891b2,#22d3ee)', 2),
    ('niveau1', '/videos/niveau1/n1_03_monnom.mp4',      'Mon nom (Mfǎ'' nὰ)',     'My name (Mfǎ'' nὰ)',    'Se présenter',                'Introducing yourself',    '🪪', 'linear-gradient(135deg,#7c3aed,#a78bfa)', 3),
    ('niveau1', '/videos/niveau1/n1_01_marche1.mp4',     'Au marché — partie 1',  'At the market — part 1','Dialogue au marché',          'Market dialogue',         '🛒', 'linear-gradient(135deg,#d97706,#fbbf24)', 4),
    ('niveau1', '/videos/niveau1/n1_02_marche2.mp4',     'Au marché — partie 2',  'At the market — part 2','Négocier et acheter',         'Haggling & buying',       '💰', 'linear-gradient(135deg,#b45309,#f59e0b)', 5),
    ('niveau1', '/videos/niveau1/n1_06_demanderju.mp4',  'Demander le jour',       'Asking the day',        'Demander la date',            'Asking for the date',     '❓', 'linear-gradient(135deg,#0f766e,#2dd4bf)', 6),
    ('niveau1', '/videos/niveau1/n1_07_demander.mp4',    'Demander quelque chose', 'Asking for something',  'Formuler une demande',        'Making a request',        '🙏', 'linear-gradient(135deg,#4f46e5,#6366f1)', 7),
    ('niveau1', '/videos/niveau1/n1_08_manger.mp4',      'Manger un repas',        'Eating a meal',         'Vocabulaire des repas',       'Meal vocabulary',         '🍽️','linear-gradient(135deg,#dc2626,#fb7185)', 8),
    ('niveau1', '/videos/niveau1/n1_09_dormir.mp4',      'Dormir (tswǐ wud)',      'Sleeping (tswǐ wud)',   'Expressions du soir',         'Evening expressions',     '😴', 'linear-gradient(135deg,#1e3a5f,#3b82f6)', 9);

-- ─── SEED : VIDÉOS — Niveau 2 ────────────────────────────────────────────────
insert into public.videos (category_id, src, title_fr, title_en, desc_fr, desc_en, thumb, bg, sort_order) values
    ('niveau2', '/videos/niveau2/n2_01_chanson.mp4',    'Chanson Medumba (Caŋ)', 'Medumba song (Caŋ)',    'Apprendre par la chanson',    'Learn through song',      '🎵', 'linear-gradient(135deg,#7c3aed,#c084fc)', 1),
    ('niveau2', '/videos/niveau2/n2_02_bonnenuit.mp4',  'Bonne nuit, enfant',    'Goodnight, child',      'Expressions pour enfants',    'For children',            '🌙', 'linear-gradient(135deg,#1e3a5f,#6366f1)', 2);

-- ─── SEED : VIDÉOS — Dessins ─────────────────────────────────────────────────
insert into public.videos (category_id, src, youtube, title_fr, title_en, desc_fr, desc_en, thumb, bg, sort_order) values
    ('dessin', '/videos/dessin/dessin_01.mp4', null,           'Dessin 01',                     'Drawing 01',                    'Leçon animée n°1',            'Lesson #1',                '✏️', 'linear-gradient(135deg,#e11d48,#f43f5e)', 1),
    ('dessin', '/videos/dessin/dessin_02.mp4', null,           'Dessin 02',                     'Drawing 02',                    'Leçon animée n°2',            'Lesson #2',                '🖍️','linear-gradient(135deg,#d97706,#fb923c)', 2),
    ('dessin', '/videos/dessin/dessin_03.mp4', null,           'Dessin 03',                     'Drawing 03',                    'Leçon animée n°3',            'Lesson #3',                '🎨', 'linear-gradient(135deg,#16a34a,#4ade80)', 3),
    ('dessin', '/videos/dessin/dessin_04.mp4', null,           'Dessin 04',                     'Drawing 04',                    'Leçon animée n°4',            'Lesson #4',                '🖌️','linear-gradient(135deg,#0891b2,#22d3ee)', 4),
    ('dessin', '/videos/dessin/dessin_05.mp4', null,           'Dessin 05',                     'Drawing 05',                    'Leçon animée n°5',            'Lesson #5',                '✏️', 'linear-gradient(135deg,#7c3aed,#a78bfa)', 5),
    ('dessin', '/videos/dessin/dessin_06.mp4', 'avB2s12HFlY', 'Lecture du temps',              'Telling Time',                  'Lire et dire l''heure',       'Reading & telling time',   '⏰', 'linear-gradient(135deg,#0f766e,#14b8a6)', 6),
    ('dessin', '/videos/dessin/dessin_07.mp4', 'O5eIMhubaQM', 'Animaux de la savane',          'Savanna Animals',               'Faune de la savane',          'African savanna wildlife', '🦁', 'linear-gradient(135deg,#d97706,#fb923c)', 7),
    ('dessin', '/videos/dessin/dessin_08.mp4', 'wcKfYEYkGqA', 'Les couleurs',                  'Colors',                        'Nommer les couleurs',         'Naming colors',            '🌈', 'linear-gradient(135deg,#dc2626,#f87171)', 8),
    ('dessin', '/videos/dessin/dessin_09.mp4', 'K6bxqnMXrhg', 'Formes géométriques',           'Geometric Shapes',              'Les formes en Medumba',       'Shapes in Medumba',        '🔷', 'linear-gradient(135deg,#4f46e5,#818cf8)', 9),
    ('dessin', '/videos/dessin/dessin_10.mp4', 'SZLGo44APac', 'Animaux domestiques',           'Domestic Animals',              'Les animaux de la maison',    'Animals at home',          '🐾', 'linear-gradient(135deg,#7c3aed,#c084fc)', 10),
    ('dessin', '/videos/dessin/dessin_11.mp4', '2R8aIlUErfo', 'Salutation (Dessin)',           'Greetings (Drawing)',           'Saluer en Medumba',           'Greetings in Medumba',     '🤝', 'linear-gradient(135deg,#16a34a,#86efac)', 11),
    ('dessin', '/videos/dessin/dessin_12.mp4', 'y7fWROWtMkY', 'Chanson Mà we',                'Song Mà we',                    'Chanson traditionnelle',      'Traditional song',         '🎵', 'linear-gradient(135deg,#0891b2,#67e8f9)', 12),
    ('dessin', '/videos/dessin/dessin_13.mp4', 'zMaHWxA1MPc', 'Conte : la tortue et la panthère','Tale: The Tortoise & Panther','Conte traditionnel Medumba', 'Traditional Medumba tale', '🐢', 'linear-gradient(135deg,#b45309,#fbbf24)', 13);

-- ─── SEED : VIDÉOS — Zenù ────────────────────────────────────────────────────
insert into public.videos (category_id, src, youtube, title_fr, title_en, desc_fr, desc_en, thumb, bg, sort_order) values
    ('zenu', '', 'vQMADuRX7Hs', 'Zenù — Musique',                      'Zenù — Music',                     'Chanson Zenù',                'Zenù song',               '🎶', 'linear-gradient(135deg,#7c3aed,#a855f7)', 1),
    ('zenu', '', 'IdOO9KJk2Io', 'Histoire : Kebwog nzwimfèn',          'Story: Kebwog nzwimfèn',           'Conte traditionnel Medumba',  'Traditional Medumba tale','📜', 'linear-gradient(135deg,#1e3a5f,#3b82f6)', 2),
    ('zenu', '', '_W7BXXZJTgk', 'La femme guerrière de Bangoulap',     'The Warrior Woman of Bangoulap',   'Histoire héroïque Bangangté', 'Bangangté heroic history','⚔️', 'linear-gradient(135deg,#dc2626,#f87171)', 3),
    ('zenu', '', 'sEvxMvx6sXs', 'Les 8 jours de la semaine Medumba',  'The 8-Day Medumba Week',           'Calendrier traditionnel',     'Traditional calendar',    '🗓️','linear-gradient(135deg,#0f766e,#14b8a6)', 4);
