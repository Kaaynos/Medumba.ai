-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Close the ask-an-elder loop: steward writes to the corpus
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: Phase-1 Definition of Done — "The ask-an-elder loop end to end,
-- including a steward who answers it." ask_an_elder (ticket 3) already
-- writes to open_question; nothing could resolve one yet. corpus_entry/
-- corpus_audio (migration 027) only ever had public-read policies — no
-- write path existed for a steward to answer a question with a new entry
-- (or an elder's real recording), and no Storage policy allowed
-- uploading under a corpus/ prefix.

create policy "steward_writes_corpus_entry" on public.corpus_entry
    for insert with check (public.is_admin_user() or public.is_content_owner_user());
create policy "steward_updates_corpus_entry" on public.corpus_entry
    for update using (public.is_admin_user() or public.is_content_owner_user());

create policy "steward_writes_corpus_audio" on public.corpus_audio
    for insert with check (public.is_admin_user() or public.is_content_owner_user());

create policy "steward_uploads_corpus_audio" on storage.objects
    for insert with check (
        bucket_id = 'medumba-audio'
        and (storage.foldername(name))[1] = 'corpus'
        and auth.role() = 'authenticated'
    );
