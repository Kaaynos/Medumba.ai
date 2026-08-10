-- 040_session_scheduling.sql
-- class_sessions only ever had a bare date (session_date), no time of day —
-- fine for a free-text "Saturdays 10am WAT" schedule_note, but it blocks two
-- things the boss asked for: automating Zoom meeting creation (the Zoom API
-- needs a real datetime) and tracking teacher punctuality (can't know "was
-- she late" without knowing when she was supposed to start). Both features
-- share this one prerequisite, added here first.
--
-- All new columns are nullable — existing date-only sessions keep working
-- exactly as before; only newly-scheduled sessions populate them.

alter table public.class_sessions
    add column if not exists scheduled_start   timestamptz,
    add column if not exists duration_minutes  integer default 60,
    add column if not exists teacher_started_at timestamptz,
    add column if not exists zoom_meeting_id   text,
    add column if not exists zoom_join_url     text,
    add column if not exists zoom_start_url    text;

-- Which Zoom-licensed user a teacher's meetings get created under (each
-- teacher gets their own Zoom seat so 3 teachers can run classes at the
-- same time — see the concurrency discussion). Set by an admin once a
-- teacher's Zoom license exists; null means "not provisioned yet", in which
-- case Zoom automation degrades to manual link entry, same as today.
alter table public.profiles
    add column if not exists zoom_email text;
