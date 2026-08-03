-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Cultural Steward console
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: Personas & Journeys v2, Cultural Steward — "Holds the corpus veto...
-- Needs a console. Without one that work happens in WhatsApp threads and
-- stops being auditable." word_submissions already models the exact review
-- pipeline (pending → ai_review → franklin_review → ncobnkun_review →
-- approved/rejected) from migration 001, but only the submitter could ever
-- read their own row (word_sub_own) — nobody could review anyone else's,
-- and nothing could write to dictionary_entries at all. Reusing the
-- existing 'content_owner' role for this (steward = who owns/vets content).

create or replace function public.is_content_owner_user()
returns boolean
language sql security definer
set search_path = public
as $$
    select coalesce((select role = 'content_owner' from public.profiles where id = auth.uid()), false);
$$;

drop policy if exists "steward_reviews_submissions" on public.word_submissions;
create policy "steward_reviews_submissions" on public.word_submissions
    for all using (public.is_admin_user() or public.is_content_owner_user());

-- dictionary_entries had public read only — nothing could ever write to it.
create policy "steward_writes_dictionary" on public.dictionary_entries
    for insert with check (public.is_admin_user() or public.is_content_owner_user());
create policy "steward_updates_dictionary" on public.dictionary_entries
    for update using (public.is_admin_user() or public.is_content_owner_user());
