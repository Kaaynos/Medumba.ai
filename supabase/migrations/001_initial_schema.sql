-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Schéma initial Supabase PostgreSQL
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Extension UUID ───────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── PROFILES ─────────────────────────────────────────────────────────────────
-- Étend auth.users de Supabase avec les données du profil Medumba.AI
create table if not exists public.profiles (
    id              uuid primary key references auth.users(id) on delete cascade,
    name            text,
    age             text,
    native_lang     text    default 'french',
    learning_lang   text    default 'medumba',
    proficiency     integer default 1 check (proficiency between 1 and 4),
    reason          text,
    daily_goal      text    default 'normal',
    goals           text[]  default '{}',
    role            text    default 'child'
                    check (role in ('child','parent','teacher','content_owner','admin','bizmgr')),
    location_type   text    default 'diaspora_us'
                    check (location_type in ('cameroon','diaspora_us','diaspora_fr','other')),
    is_admin        boolean default false,
    avatar_url      text,
    created_at      timestamptz default now(),
    updated_at      timestamptz default now()
);

-- ─── USER PROGRESS ────────────────────────────────────────────────────────────
-- XP, gems, cœurs, streak, leçons complétées
create table if not exists public.user_progress (
    id                  uuid primary key default uuid_generate_v4(),
    user_id             uuid not null references public.profiles(id) on delete cascade,
    xp                  integer default 0,
    gems                integer default 50,
    hearts              integer default 5 check (hearts between 0 and 5),
    streak              integer default 0,
    streak_last_date    date,
    completed_lessons   text[]  default '{}',
    opened_chests       text[]  default '{}',
    updated_at          timestamptz default now(),
    unique (user_id)
);

-- ─── THEO EVENTS ──────────────────────────────────────────────────────────────
-- Bus d'événements THEO — EVERY interaction is logged here
-- Dimensions: D1=Education, D2=Health, D3=Culture, D4=Energy, D5=Social
create table if not exists public.theo_events (
    id              bigserial primary key,
    user_id         uuid references public.profiles(id) on delete set null,
    session_id      text,
    event_type      text not null,  -- e.g. 'lesson_complete', 'word_view', 'class_book'
    component       text,           -- 'app' | 'classes' | 'books' | 'museum' | 'dictionary'
    payload         jsonb default '{}',
    dimension       text,           -- D1–D5
    location_type   text,
    platform        text default 'web', -- 'web' | 'ios' | 'android'
    created_at      timestamptz default now()
);

-- Index pour les requêtes fréquentes
create index if not exists theo_events_user_id_idx    on public.theo_events(user_id);
create index if not exists theo_events_event_type_idx on public.theo_events(event_type);
create index if not exists theo_events_created_at_idx on public.theo_events(created_at desc);

-- ─── WORD SUBMISSIONS ─────────────────────────────────────────────────────────
-- Pipeline suggestion nouveaux mots : utilisateur → IA → Franklin → NCOBNKUN → archive
create table if not exists public.word_submissions (
    id              uuid primary key default uuid_generate_v4(),
    submitted_by    uuid references public.profiles(id) on delete set null,
    word_fr         text not null,
    word_medumba    text,
    word_en         text,
    definition_fr   text,
    definition_en   text,
    domain          text,   -- 'general' | 'stem_math' | 'stem_cs' | 'stem_bio' | 'modern_life'
    tone_marks      text,
    audio_url       text,
    status          text default 'pending'
                    check (status in ('pending','ai_review','franklin_review','ncobnkun_review','approved','rejected')),
    ai_notes        text,
    franklin_notes  text,
    credits_awarded integer default 0,
    created_at      timestamptz default now(),
    reviewed_at     timestamptz
);

-- ─── DICTIONARY ENTRIES ───────────────────────────────────────────────────────
-- Entrées validées du dictionnaire trilingue (4 257+ mots)
create table if not exists public.dictionary_entries (
    id              uuid primary key default uuid_generate_v4(),
    word_medumba    text not null,
    word_fr         text,
    word_en         text,
    definition_fr   text,
    definition_en   text,
    tone_marks      text,
    pronunciation   text,   -- IPA
    audio_url       text,   -- Cloudflare R2 URL
    domain          text    default 'general',
    part_of_speech  text,   -- 'noun' | 'verb' | 'adj' | etc.
    example_medumba text,
    example_fr      text,
    validated_by    text    default 'ncobnkun',
    created_at      timestamptz default now()
);

create index if not exists dict_word_medumba_idx on public.dictionary_entries(word_medumba);
create index if not exists dict_word_fr_idx      on public.dictionary_entries(word_fr);
create index if not exists dict_domain_idx       on public.dictionary_entries(domain);

-- ─── TUTORS ───────────────────────────────────────────────────────────────────
-- Tuteurs validés pour Live Classes
create table if not exists public.tutors (
    id              uuid primary key default uuid_generate_v4(),
    user_id         uuid references public.profiles(id) on delete cascade,
    display_name    text not null,
    bio_fr          text,
    bio_en          text,
    avatar_url      text,
    specialties     text[]  default '{}',
    age_groups      text[]  default '{}',    -- 'children' | 'teens' | 'adults'
    languages       text[]  default '{"medumba","french"}',
    timezone        text    default 'Africa/Douala',
    hourly_rate_usd numeric default 0,
    stripe_account  text,   -- Stripe Connect account ID
    wise_email      text,   -- Pour paiements Wise/MTN
    validated       boolean default false,
    validated_by    text,   -- Franklin/NCOBNKUN
    created_at      timestamptz default now()
);

-- ─── BOOKINGS ─────────────────────────────────────────────────────────────────
-- Réservations Live Classes
create table if not exists public.bookings (
    id              uuid primary key default uuid_generate_v4(),
    student_id      uuid not null references public.profiles(id),
    tutor_id        uuid not null references public.tutors(id),
    scheduled_at    timestamptz not null,
    duration_min    integer default 45,
    status          text default 'pending'
                    check (status in ('pending','confirmed','completed','cancelled')),
    daily_room_url  text,   -- Daily.co room URL
    stripe_payment  text,   -- Stripe Payment Intent ID
    recording_url   text,   -- Post-class recording
    ai_summary      text,   -- Claude post-class summary
    homework        text,
    created_at      timestamptz default now()
);

-- ─── MUSEUM ARTIFACTS ─────────────────────────────────────────────────────────
-- eMuseum — Artefacts culturels Bangangté (14 dimensions)
create table if not exists public.museum_artifacts (
    id              uuid primary key default uuid_generate_v4(),
    title_fr        text not null,
    title_en        text,
    title_medumba   text,
    description_fr  text,
    description_en  text,
    description_medumba text,
    category        text,   -- 'instrument' | 'clothing' | 'tool' | 'ritual' | etc.
    period          text,
    origin_zone     text,   -- Zone CEPOM A/B/C/D
    image_url       text,
    audio_url       text,
    qr_code         text,
    tags            text[]  default '{}',
    dimensions      jsonb   default '{}',  -- 14 dimensions de classification
    validated       boolean default false,
    validated_by    text,
    published_at    timestamptz,
    created_at      timestamptz default now()
);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
alter table public.profiles          enable row level security;
alter table public.user_progress     enable row level security;
alter table public.theo_events       enable row level security;
alter table public.word_submissions  enable row level security;
alter table public.dictionary_entries enable row level security;
alter table public.tutors            enable row level security;
alter table public.bookings          enable row level security;
alter table public.museum_artifacts  enable row level security;

-- Profiles : chacun voit et modifie son propre profil
create policy "profiles_own" on public.profiles
    for all using (auth.uid() = id);

-- Progress : chacun accède à sa propre progression
create policy "progress_own" on public.user_progress
    for all using (auth.uid() = user_id);

-- THEO events : un utilisateur peut insérer ses propres events
create policy "theo_insert" on public.theo_events
    for insert with check (auth.uid() = user_id or user_id is null);
create policy "theo_own_read" on public.theo_events
    for select using (auth.uid() = user_id);

-- Dictionary : tout le monde peut lire
create policy "dict_public_read" on public.dictionary_entries
    for select using (true);

-- Word submissions : utilisateur voit les siennes
create policy "word_sub_own" on public.word_submissions
    for all using (auth.uid() = submitted_by);

-- Tutors : lecture publique, écriture proprio
create policy "tutors_public_read" on public.tutors for select using (true);
create policy "tutors_own_write"   on public.tutors
    for all using (auth.uid() = user_id);

-- Bookings : student ou tutor concerné
create policy "bookings_own" on public.bookings
    for all using (
        auth.uid() = student_id
        or auth.uid() = (select user_id from public.tutors where id = tutor_id)
    );

-- Museum : lecture publique
create policy "museum_public_read" on public.museum_artifacts
    for select using (published_at is not null);

-- ─── TRIGGER : updated_at automatique ────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_updated_at
    before update on public.profiles
    for each row execute function public.set_updated_at();

create trigger progress_updated_at
    before update on public.user_progress
    for each row execute function public.set_updated_at();

-- ─── TRIGGER : créer profil + progress à l'inscription ───────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
    insert into public.profiles (id, name, native_lang)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        coalesce(new.raw_user_meta_data->>'native_lang', 'french')
    );
    insert into public.user_progress (user_id) values (new.id);
    return new;
end; $$;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();
