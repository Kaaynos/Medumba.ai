-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Tontah ticket 3: tables for the five Phase-1 tools
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: score_attempt/add_to_practice need somewhere to track spaced
-- repetition per learner per corpus entry (learner_fact); ask_an_elder
-- needs somewhere to land when Tontah doesn't know something
-- (open_question) — feeding the Cultural Steward's existing review
-- queue (migration 020) as a new intake path, not a separate console.

create table if not exists public.learner_fact (
    id              uuid primary key default uuid_generate_v4(),
    profile_id      uuid not null references public.profiles(id) on delete cascade,
    corpus_entry_id uuid not null references public.corpus_entry(id) on delete cascade,
    state           text default 'new' check (state in ('new','learning','known')),
    attempts        integer default 0,
    last_seen_at    timestamptz,
    next_due_at     timestamptz default now(),
    unique (profile_id, corpus_entry_id)
);
alter table public.learner_fact enable row level security;

create policy "household_reads_learner_fact" on public.learner_fact
    for select using (profile_id in (select public.household_profile_ids()));
create policy "household_writes_learner_fact" on public.learner_fact
    for insert with check (profile_id in (select public.household_profile_ids()));
create policy "household_updates_learner_fact" on public.learner_fact
    for update using (profile_id in (select public.household_profile_ids()));
create policy "admin_reads_learner_fact" on public.learner_fact
    for select using (public.is_admin_user());

create table if not exists public.open_question (
    id                      uuid primary key default uuid_generate_v4(),
    profile_id              uuid references public.profiles(id) on delete set null,
    term_asked              text not null,
    status                  text default 'pending' check (status in ('pending','answered','declined')),
    answered_corpus_entry_id uuid references public.corpus_entry(id) on delete set null,
    created_at              timestamptz default now(),
    answered_at             timestamptz
);
alter table public.open_question enable row level security;

create policy "household_reads_own_open_questions" on public.open_question
    for select using (profile_id in (select public.household_profile_ids()));
create policy "household_creates_open_questions" on public.open_question
    for insert with check (profile_id in (select public.household_profile_ids()));

-- Same reviewer reach as word_submissions (migration 020) — ask_an_elder
-- is a new intake path into the existing Cultural Steward console, not a
-- separate one.
create policy "steward_manages_open_questions" on public.open_question
    for all using (public.is_admin_user() or public.is_content_owner_user());
