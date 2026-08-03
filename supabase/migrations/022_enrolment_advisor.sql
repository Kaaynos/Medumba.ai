-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Enrolment Advisor console
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: Personas & Journeys v2 — "Advisor & Coordinator: neither role nor its
-- funnel, cohorts, scheduling or console exists." Mireille owns lead
-- sources, the trial booking, the enrolment call, the sale and the first
-- payment. She is measured on trials booked and trial-to-paid conversion —
-- explicitly never on calls made, since "commission on signing a guilty
-- parent is exactly the pressure this product must not apply." The schema
-- below has no call-count field anywhere, on purpose.

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
    check (role in ('child','parent','teacher','content_owner','admin','bizmgr','coordinator','content_creator','advisor'));

create or replace function public.is_advisor_user()
returns boolean
language sql security definer
set search_path = public
as $$
    select coalesce((select role = 'advisor' from public.profiles where id = auth.uid()), false);
$$;

-- ─── LEADS ──────────────────────────────────────────────────────────────────
-- One row per prospective family, from first contact through trial to
-- enrolment (or loss). `contact` and `source` are free text for the pilot —
-- WhatsApp numbers and campaign names don't need their own tables yet.
create table if not exists public.leads (
    id                   uuid primary key default uuid_generate_v4(),
    name                 text not null,
    contact              text,
    source               text,
    status               text not null default 'new'
                         check (status in ('new','trial_booked','trial_attended','enrolled','lost')),
    assigned_advisor_id  uuid references public.profiles(id) on delete set null,
    trial_cohort_id      uuid references public.cohorts(id) on delete set null,
    trial_scheduled_at   timestamptz,
    trial_attended       boolean,
    lost_reason          text,
    enrolled_at          timestamptz,
    notes                text,
    created_at           timestamptz default now(),
    updated_at           timestamptz default now()
);
alter table public.leads enable row level security;

-- Advisors work unassigned leads (pool) plus their own; admin sees all.
create policy "advisor_reads_leads" on public.leads
    for select using (
        public.is_admin_user() or public.is_advisor_user()
    );

create policy "advisor_manages_leads" on public.leads
    for insert with check (public.is_admin_user() or public.is_advisor_user());

create policy "advisor_updates_leads" on public.leads
    for update using (public.is_admin_user() or public.is_advisor_user());

create policy "admin_deletes_leads" on public.leads
    for delete using (public.is_admin_user());

-- Advisors need to see cohorts to pick a trial slot, but not to edit them —
-- that stays the Coordinator's job.
create policy "advisor_reads_cohorts" on public.cohorts
    for select using (public.is_advisor_user());
