-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Age-banded rituals for 0-4 and 5-8
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: Personas & Journeys v2 — "The Baby 0-4: nothing exists at all, and it
-- is the smallest build in the roadmap" and "Young Learner 5-8: hits the
-- same email-and-password account creation an adult gets... age is
-- collected one screen earlier and read by nothing afterward." Both bands
-- are measured differently from the main Hub: nights/week a ritual is
-- played (0-4), words spoken aloud per week (5-8) — never time in app, and
-- there is deliberately no XP/gems/streak column here.

create table if not exists public.ritual_plays (
    id          uuid primary key default uuid_generate_v4(),
    profile_id  uuid not null references public.profiles(id) on delete cascade,
    kind        text not null check (kind in ('lullaby','word_of_day','tap_speak')),
    word_medumba text,
    played_at   timestamptz default now()
);
alter table public.ritual_plays enable row level security;

-- Same household-scoping pattern as class_sessions/attendance (migration 017):
-- a 0-4 or 5-8 profile has no auth session of its own, so every read/write
-- happens under the guardian's session, scoped to their own household.
create policy "household_reads_ritual_plays" on public.ritual_plays
    for select using (profile_id in (select public.household_profile_ids()));

create policy "household_logs_ritual_plays" on public.ritual_plays
    for insert with check (profile_id in (select public.household_profile_ids()));

create policy "admin_reads_ritual_plays" on public.ritual_plays
    for select using (public.is_admin_user());
