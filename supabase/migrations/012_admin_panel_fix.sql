-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Fix the Admin Panel: store email on profiles, let admins read
--  everyone's progress, grant is_admin to Aristide (the boss)
--  À exécuter dans : supabase.com → SQL Editor → Run (or via direct DB connection)
-- ═══════════════════════════════════════════════════════════════════════════

-- profiles never stored email — handle_new_user() only used it to derive a
-- default `name`, so the Admin Panel (AdminPage.jsx) had no column to read
-- it from. Add it and backfill from auth.users (readable here since this
-- runs with elevated privileges, not through the anon-key RLS path).
alter table public.profiles add column if not exists email text;

update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id and p.email is null;

-- Keep it populated for every future signup too (same trigger as
-- 001_initial_schema.sql, just with `email` added to the insert).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
    insert into public.profiles (id, name, native_lang, email)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        coalesce(new.raw_user_meta_data->>'native_lang', 'french'),
        new.email
    );
    insert into public.user_progress (user_id) values (new.id);
    return new;
end; $$;

-- Migration 007/008 let admins read every row of `profiles`, but never
-- granted the same for `user_progress` — so the Admin Panel's embedded
-- `user_progress(*)` join was silently RLS-filtered back down to just the
-- admin's own row for every other user (XP/streak/gems showing blank).
drop policy if exists "Admins can read all progress" on public.user_progress;
create policy "Admins can read all progress"
    on public.user_progress for select
    using (public.is_admin_user());

-- Grant admin access. contact@kaaynos.com had no account yet at the time
-- this ran (2026-07-26) — Aristide's real registered address turned out to
-- be atoundzi@hotmail.com, granted instead. Both are listed here so this
-- migration stays correct if replayed against a fresh database; each is a
-- no-op (0 rows) if that account hasn't signed up yet.
update public.profiles set is_admin = true where email = 'contact@kaaynos.com';
update public.profiles set is_admin = true where email = 'atoundzi@hotmail.com';
