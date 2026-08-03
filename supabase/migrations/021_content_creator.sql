-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Content Creator: consent + audio word submissions
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: Personas & Journeys v2, Content Creator gap — "no capture tool, no
-- consent flow, no validation queue, no contributor view." The validation
-- queue already exists (word_submissions, migration 020's steward console)
-- — this adds the upstream half: a real consent record before any capture
-- ("a checkbox is not consent from a 76-year-old" — so consent here is
-- itself a spoken recording, not a checkbox), and storage write access so
-- a creator can actually upload what they record.

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
    check (role in ('child','parent','teacher','content_owner','admin','bizmgr','coordinator','content_creator'));

create table if not exists public.consent_records (
    id                  uuid primary key default uuid_generate_v4(),
    subject_profile_id  uuid references public.profiles(id) on delete set null,
    type                text default 'audio_recording',
    granted_by          uuid references public.profiles(id) on delete set null,
    audio_url           text,
    script_version      text default 'v1',
    created_at          timestamptz default now()
);
alter table public.consent_records enable row level security;

create policy "creator_manages_own_consent" on public.consent_records
    for all using (auth.uid() = granted_by);

create policy "admins_read_consent" on public.consent_records
    for select using (public.is_admin_user() or public.is_content_owner_user());

-- Storage: medumba-audio is already public for reads (existing app audio
-- playback depends on it); write access is separate and currently has no
-- policy allowing anyone to upload. Scope inserts to a submissions/ prefix
-- so creators can't touch the curated corpus audio paths.
create policy "creator_uploads_submission_audio" on storage.objects
    for insert with check (
        bucket_id = 'medumba-audio'
        and (storage.foldername(name))[1] = 'submissions'
        and auth.role() = 'authenticated'
    );
