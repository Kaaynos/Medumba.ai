-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Fix infinite recursion in cohorts/cohort_members RLS
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: migration 016 added "household_reads_own_cohort" on cohorts, which
-- queries cohort_members — while migration 015's "teacher_reads_own_roster"
-- on cohort_members queries cohorts. Postgres has to re-apply RLS on each
-- table for the other's subquery, which re-triggers the first table's
-- policy, forever: "infinite recursion detected in policy for relation
-- cohorts". Same root cause as migration 008 (self-referencing profiles
-- policy), just between two tables instead of one.
--
-- Fix: every cross-table reference goes through a SECURITY DEFINER
-- function, which bypasses RLS for its own internal query — so evaluating
-- it never re-triggers the other table's policy.

create or replace function public.is_teacher_of_cohort(p_cohort_id uuid)
returns boolean
language sql security definer
set search_path = public
as $$
    select exists (select 1 from public.cohorts where id = p_cohort_id and teacher_id = auth.uid());
$$;

create or replace function public.household_profile_ids()
returns setof uuid
language sql security definer
set search_path = public
as $$
    select id from public.profiles where household_id = public.my_household_id();
$$;

create or replace function public.household_cohort_ids()
returns setof uuid
language sql security definer
set search_path = public
as $$
    select cohort_id from public.cohort_members
    where profile_id in (select public.household_profile_ids());
$$;

drop policy if exists "teacher_reads_own_roster" on public.cohort_members;
create policy "teacher_reads_own_roster" on public.cohort_members
    for select using (public.is_teacher_of_cohort(cohort_id));

drop policy if exists "household_reads_own_memberships" on public.cohort_members;
create policy "household_reads_own_memberships" on public.cohort_members
    for select using (profile_id in (select public.household_profile_ids()));

drop policy if exists "household_reads_own_cohort" on public.cohorts;
create policy "household_reads_own_cohort" on public.cohorts
    for select using (id in (select public.household_cohort_ids()));

drop policy if exists "household_reads_own_sessions" on public.class_sessions;
create policy "household_reads_own_sessions" on public.class_sessions
    for select using (cohort_id in (select public.household_cohort_ids()));

drop policy if exists "household_reads_own_attendance" on public.attendance;
create policy "household_reads_own_attendance" on public.attendance
    for select using (profile_id in (select public.household_profile_ids()));
