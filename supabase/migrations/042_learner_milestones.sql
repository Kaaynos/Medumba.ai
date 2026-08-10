-- 042_learner_milestones.sql
-- Celebrate crossing a total-learner-count milestone (500 first, but built
-- reusable so 1,000/2,500/etc. need zero new code later). Fully server-side
-- and race-safe: a trigger on profiles checks the total after every new
-- registration and records any newly-crossed threshold — no client "check"
-- call needed, and (threshold) is unique so a burst of concurrent signups
-- can never double-record the same milestone.

create table if not exists public.milestones (
    id          uuid primary key default uuid_generate_v4(),
    threshold   integer not null unique,
    reached_at  timestamptz not null default now()
);
alter table public.milestones enable row level security;

-- Public read — the landing page popup is shown to anonymous visitors too.
create policy "public_reads_milestones" on public.milestones
    for select using (true);
-- No client write policy at all: only the security-definer trigger below
-- ever inserts a row.

-- Same "count only, never expose individual profiles" shape as
-- get_active_learner_count() (migration 005), but the all-time total
-- rather than a 30-day rolling window — a milestone has to mean something
-- fixed, not something that can un-happen the next day.
create or replace function public.get_total_learner_count()
returns integer
language sql
security definer
set search_path = public
as $$
    select count(*)::integer from public.profiles
    where role in ('child', 'parent');
$$;

grant execute on function public.get_total_learner_count() to anon, authenticated;

create or replace function public.check_learner_milestones()
returns trigger language plpgsql security definer as $$
declare
    v_count integer;
begin
    if new.role in ('child', 'parent') then
        select public.get_total_learner_count() into v_count;
        insert into public.milestones (threshold)
        select t from unnest(array[100, 250, 500, 1000, 2500, 5000]) as t
        where t <= v_count
        on conflict (threshold) do nothing;
    end if;
    return new;
end; $$;

drop trigger if exists trg_check_learner_milestones on public.profiles;
create trigger trg_check_learner_milestones
    after insert on public.profiles
    for each row execute function public.check_learner_milestones();
