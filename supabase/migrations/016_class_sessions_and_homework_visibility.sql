-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Class sessions/attendance + let students see their own
--  cohort's homework note
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: migration 015 gave the teacher a homework note, but nothing let the
-- student (or their guardian, for a child profile) read it — only the
-- teacher's own RLS policies existed. This also adds an actual class
-- session record (date + join link) since "schedule_note" was just a free
-- text label, not something a family could act on. No Daily.co integration
-- exists in this codebase (checked): the join link is entered by hand
-- (Zoom/Meet/WhatsApp video, whatever the teacher actually uses), same
-- honesty principle as the payout field — no fabricated infrastructure.

-- ─── Let a household read cohorts/memberships any of its profiles belong to ──
create policy "household_reads_own_memberships" on public.cohort_members
    for select using (
        profile_id in (select id from public.profiles where household_id = public.my_household_id())
    );

create policy "household_reads_own_cohort" on public.cohorts
    for select using (
        id in (
            select cohort_id from public.cohort_members
            where profile_id in (select id from public.profiles where household_id = public.my_household_id())
        )
    );

-- ─── CLASS SESSIONS ─────────────────────────────────────────────────────────
create table if not exists public.class_sessions (
    id            uuid primary key default uuid_generate_v4(),
    cohort_id     uuid not null references public.cohorts(id) on delete cascade,
    session_date  date not null,
    meeting_link  text,
    notes         text,
    status        text default 'scheduled' check (status in ('scheduled','completed','cancelled')),
    created_at    timestamptz default now()
);
alter table public.class_sessions enable row level security;

create table if not exists public.attendance (
    id           uuid primary key default uuid_generate_v4(),
    session_id   uuid not null references public.class_sessions(id) on delete cascade,
    profile_id   uuid not null references public.profiles(id) on delete cascade,
    present      boolean,
    marked_at    timestamptz default now(),
    unique (session_id, profile_id)
);
alter table public.attendance enable row level security;

-- Teacher manages sessions/attendance for their own cohorts.
create policy "teacher_manages_own_sessions" on public.class_sessions
    for all using (
        cohort_id in (select id from public.cohorts where teacher_id = auth.uid())
    );

create policy "teacher_manages_own_attendance" on public.attendance
    for all using (
        session_id in (
            select cs.id from public.class_sessions cs
            join public.cohorts c on c.id = cs.cohort_id
            where c.teacher_id = auth.uid()
        )
    );

-- A household can see (read-only) the sessions/attendance for cohorts any
-- of its profiles belong to — "when's the next class, did we attend".
create policy "household_reads_own_sessions" on public.class_sessions
    for select using (
        cohort_id in (
            select cohort_id from public.cohort_members
            where profile_id in (select id from public.profiles where household_id = public.my_household_id())
        )
    );

create policy "household_reads_own_attendance" on public.attendance
    for select using (
        profile_id in (select id from public.profiles where household_id = public.my_household_id())
    );

-- Admin keeps full visibility, same as cohorts/cohort_members.
create policy "admins_manage_sessions" on public.class_sessions
    for all using (public.is_admin_user());
create policy "admins_manage_attendance" on public.attendance
    for all using (public.is_admin_user());
