-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Practice clips: raw material for the parent's proof artefact
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: Personas & Journeys v2 — "No proof artefact" (the Parent's gap) and
-- the master journey's "Every Sunday, forty seconds of her children's
-- voices" ritual, which the pilot-lessons slide flags as under a third
-- send rate: "redesign the artefact, not the prompt." A sendable artefact
-- needs real recorded material to exist first — this table is that
-- material: short clips of a learner's OWN practice voice (not curated
-- corpus audio), tied to their profile, so the week's clips can be
-- gathered into something worth sending.

create table if not exists public.practice_clips (
    id          uuid primary key default uuid_generate_v4(),
    profile_id  uuid not null references public.profiles(id) on delete cascade,
    audio_url   text not null,
    prompt_word text,
    created_at  timestamptz default now()
);
alter table public.practice_clips enable row level security;

-- Same household-scoping pattern as ritual_plays (migration 023): a child
-- profile has no auth session of its own, so reads/writes happen under
-- whichever household member's session is active.
create policy "household_reads_practice_clips" on public.practice_clips
    for select using (profile_id in (select public.household_profile_ids()));

create policy "household_logs_practice_clips" on public.practice_clips
    for insert with check (profile_id in (select public.household_profile_ids()));

create policy "household_deletes_practice_clips" on public.practice_clips
    for delete using (profile_id in (select public.household_profile_ids()));

create policy "admin_reads_practice_clips" on public.practice_clips
    for select using (public.is_admin_user());

-- Any authenticated household member can upload a clip under practice/ —
-- parallel to migration 021's submissions/ policy for Content Creator.
create policy "household_uploads_practice_clips" on storage.objects
    for insert with check (
        bucket_id = 'medumba-audio'
        and (storage.foldername(name))[1] = 'practice'
        and auth.role() = 'authenticated'
    );
