-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Content migration: Phrasebook, Vocab/Word Cards, Base
--  Expressions, and Math terms move from static JS files into Supabase, so
--  they can be browsed/corrected directly via the Table Editor instead of
--  hand-editing src/data/*.js. dictionary_entries already exists (001).
--
--  IMPORTANT: this migration only creates tables and populates them. No app
--  code reads from these tables yet — DictionaryPage/DashboardPage/
--  CountingPage/PronunciationPage all still import the JS files as before.
--  Switching the app over to read from Supabase is a deliberate follow-up,
--  done after the NKONI festival traffic settles.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.phrasebook_expressions (
    id          uuid primary key default uuid_generate_v4(),
    medumba     text not null,
    fr          text,
    en          text,
    lessons     text[] default '{}',
    created_at  timestamptz default now()
);
create index if not exists phrasebook_medumba_idx on public.phrasebook_expressions(medumba);

create table if not exists public.vocab_expressions (
    id          uuid primary key default uuid_generate_v4(),
    medumba     text not null,
    fr          text,
    en          text,
    created_at  timestamptz default now()
);
create index if not exists vocab_medumba_idx on public.vocab_expressions(medumba);

create table if not exists public.base_expressions (
    id          uuid primary key default uuid_generate_v4(),
    medumba     text not null,
    fr          text,
    en          text,
    created_at  timestamptz default now()
);
create index if not exists base_expr_medumba_idx on public.base_expressions(medumba);

create table if not exists public.math_terms (
    id          uuid primary key default uuid_generate_v4(),
    medumba     text not null,
    fr          text,
    en          text,
    created_at  timestamptz default now()
);
create index if not exists math_terms_medumba_idx on public.math_terms(medumba);

alter table public.phrasebook_expressions enable row level security;
alter table public.vocab_expressions      enable row level security;
alter table public.base_expressions       enable row level security;
alter table public.math_terms             enable row level security;

-- Public read, same pattern as dictionary_entries (dict_public_read).
drop policy if exists "phrasebook_public_read" on public.phrasebook_expressions;
create policy "phrasebook_public_read" on public.phrasebook_expressions for select using (true);
drop policy if exists "vocab_public_read" on public.vocab_expressions;
create policy "vocab_public_read"      on public.vocab_expressions      for select using (true);
drop policy if exists "base_expr_public_read" on public.base_expressions;
create policy "base_expr_public_read"  on public.base_expressions       for select using (true);
drop policy if exists "math_terms_public_read" on public.math_terms;
create policy "math_terms_public_read" on public.math_terms             for select using (true);
