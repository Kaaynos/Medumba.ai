-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Teacher portal: cohorts, rosters, admin write access
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: Personas & Journeys v2, Teacher gap — "no login, no dashboard, no
-- roster, no assignment tracking anywhere in the codebase." This adds the
-- data model for a recurring weekly class (a cohort: one teacher, a fixed
-- small group, a fixed term) distinct from the existing `bookings` table,
-- which models one-off 1:1 sessions, not a term-long group class.

-- Admins could only ever READ profiles (migrations 007/008), never write —
-- so there was no way to actually grant the 'teacher' role from the Admin
-- Panel. Needed now to assign teachers.
create policy "admins_update_profiles" on public.profiles
    for update using (public.is_admin_user());

-- ─── COHORTS ────────────────────────────────────────────────────────────────
create table if not exists public.cohorts (
    id                  uuid primary key default uuid_generate_v4(),
    teacher_id          uuid references public.profiles(id) on delete set null,
    name                text not null,
    level               text,
    schedule_note       text,    -- free text for the pilot: "Saturdays 10am WAT"
    term_start          date,
    term_end            date,
    homework_note       text,
    homework_updated_at timestamptz,
    created_at          timestamptz default now()
);
alter table public.cohorts enable row level security;

create table if not exists public.cohort_members (
    id          uuid primary key default uuid_generate_v4(),
    cohort_id   uuid not null references public.cohorts(id) on delete cascade,
    profile_id  uuid not null references public.profiles(id) on delete cascade,
    joined_at   timestamptz default now(),
    unique (cohort_id, profile_id)
);
alter table public.cohort_members enable row level security;

-- ─── RLS: teacher sees only their own cohorts and rosters ──────────────────
create policy "teacher_reads_own_cohorts" on public.cohorts
    for select using (teacher_id = auth.uid());

create policy "teacher_updates_own_cohort_homework" on public.cohorts
    for update using (teacher_id = auth.uid());

create policy "teacher_reads_own_roster" on public.cohort_members
    for select using (
        cohort_id in (select id from public.cohorts where teacher_id = auth.uid())
    );

-- SECURITY DEFINER to avoid the recursion trap (migration 008): a policy on
-- `profiles` cannot safely query `profiles` from inside itself, but it can
-- call a function that does.
create or replace function public.is_teacher_of(p_profile_id uuid)
returns boolean
language sql security definer
set search_path = public
as $$
    select exists (
        select 1 from public.cohort_members cm
        join public.cohorts c on c.id = cm.cohort_id
        where cm.profile_id = p_profile_id and c.teacher_id = auth.uid()
    );
$$;

-- A teacher can see the name/progress of a child on their own roster, even
-- across a different household — this is the whole point of a roster.
create policy "teacher_reads_roster_profiles" on public.profiles
    for select using (public.is_teacher_of(id));

create policy "teacher_reads_roster_progress" on public.user_progress
    for select using (public.is_teacher_of(user_id));

-- ─── RLS: admin manages cohorts by hand until the Coordinator console exists ──
create policy "admins_manage_cohorts" on public.cohorts
    for all using (public.is_admin_user());

create policy "admins_manage_cohort_members" on public.cohort_members
    for all using (public.is_admin_user());
