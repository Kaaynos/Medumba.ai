-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Class Coordinator role
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: Personas & Journeys v2 — "neither role, nor its funnel, cohorts,
-- scheduling or console exists." Admin has been managing cohorts by hand
-- as a stand-in since migration 015; this gives a real coordinator role
-- the same cohort-management reach, without needing the broader admin
-- capabilities (granting roles, reading contact messages, etc).

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
    check (role in ('child','parent','teacher','content_owner','admin','bizmgr','coordinator'));

create or replace function public.is_coordinator_user()
returns boolean
language sql security definer
set search_path = public
as $$
    select coalesce((select role = 'coordinator' from public.profiles where id = auth.uid()), false);
$$;

-- Coordinators get the same cohort-management reach as admin (create/edit
-- cohorts, assign teachers, manage rosters/sessions/attendance across every
-- cohort — not just their own, unlike a teacher).
drop policy if exists "admins_manage_cohorts" on public.cohorts;
create policy "admins_manage_cohorts" on public.cohorts
    for all using (public.is_admin_user() or public.is_coordinator_user());

drop policy if exists "admins_manage_cohort_members" on public.cohort_members;
create policy "admins_manage_cohort_members" on public.cohort_members
    for all using (public.is_admin_user() or public.is_coordinator_user());

drop policy if exists "admins_manage_sessions" on public.class_sessions;
create policy "admins_manage_sessions" on public.class_sessions
    for all using (public.is_admin_user() or public.is_coordinator_user());

drop policy if exists "admins_manage_attendance" on public.attendance;
create policy "admins_manage_attendance" on public.attendance
    for all using (public.is_admin_user() or public.is_coordinator_user());

-- Needed to search students by name/email when building a roster, and to
-- see teachers when assigning one — same visibility admin already has.
drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles" on public.profiles
    for select using (public.is_admin_user() or public.is_coordinator_user());

drop policy if exists "Admins can read all progress" on public.user_progress;
create policy "Admins can read all progress" on public.user_progress
    for select using (public.is_admin_user() or public.is_coordinator_user());
