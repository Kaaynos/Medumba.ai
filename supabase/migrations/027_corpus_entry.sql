-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Tontah ticket 2: corpus indexed into Postgres, hybrid search
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: Tontah Complete Experience & Implementation doc, Part III — the real
-- corpus (src/data/medumbaDictionary.js, medumbaExpressions.js — ~4,257
-- words + ~2,763 expressions) has only ever lived as static JS. Nothing in
-- this app can query it. This is the destination table for a one-time
-- import script (kept out of migrations — 7,000+ rows of linguistic data
-- doesn't belong in a SQL file) that copies it verbatim. Schema mirrors
-- the doc's data model exactly: headword/gloss_fr/gloss_en/variant_fondom/
-- level/register/tags/tsv/embedding, plus corpus_audio linking to the
-- existing real-recording manifest (medumbaAudio.js's STORAGE_FILES).
--
-- "Do not fine-tune on the corpus: far too small for reliable generation,
-- entirely large enough for confident nonsense" — retrieval only, ever.

create extension if not exists vector;

create table if not exists public.corpus_entry (
    id              uuid primary key default uuid_generate_v4(),
    headword        text not null,          -- the Medumba word/phrase
    gloss_fr        text,
    gloss_en        text,
    variant_fondom  text,                   -- village variant, if one exists; null = generic
    level           integer default 1,
    register        text,                   -- 'neutral' | 'formal' | 'familiar' etc, nullable for now
    tags            text[] default '{}',    -- e.g. '{word}' or '{expression}'
    tsv             tsvector generated always as (
                        setweight(to_tsvector('simple', coalesce(headword, '')), 'A') ||
                        setweight(to_tsvector('french', coalesce(gloss_fr, '')), 'B') ||
                        setweight(to_tsvector('english', coalesce(gloss_en, '')), 'B')
                    ) stored,
    embedding       vector(1024),           -- mistral-embed output size
    created_at      timestamptz default now()
);
create index if not exists corpus_entry_tsv_idx on public.corpus_entry using gin(tsv);
-- ivfflat needs rows present to build well; created after the one-time
-- import populates the table, not here.

alter table public.corpus_entry enable row level security;
create policy "corpus_entry_public_read" on public.corpus_entry
    for select using (true);

create table if not exists public.corpus_audio (
    id              uuid primary key default uuid_generate_v4(),
    corpus_entry_id uuid not null references public.corpus_entry(id) on delete cascade,
    storage_path    text not null,          -- path within the medumba-audio bucket
    speaker_name    text,
    village         text,
    duration_ms     integer,
    consent_ref     uuid references public.consent_records(id) on delete set null,
    created_at      timestamptz default now()
);
create index if not exists corpus_audio_entry_idx on public.corpus_audio(corpus_entry_id);

alter table public.corpus_audio enable row level security;
create policy "corpus_audio_public_read" on public.corpus_audio
    for select using (true);

-- Doc's data model calls for profiles.level (retrieval biases to
-- level <= learner.level + 1, so a child isn't handed advanced register).
alter table public.profiles add column if not exists level integer default 1;
