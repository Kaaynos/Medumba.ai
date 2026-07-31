-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Household & guardian model
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: today public.profiles.id IS auth.users.id (1:1, enforced by the FK on
-- the primary key itself) — every learner needs their own email+password.
-- That's wrong for a 7-year-old, and it's the reason there is no "guardian
-- manages several children" model at all (Personas & Journeys v2, gap
-- documented against every family persona under 13).
--
-- This migration is purely additive: every existing row keeps working
-- exactly as before (same id, same auth link, same RLS outcome). It just
-- stops REQUIRING that link, so a household can hold child profiles that
-- have no login of their own until they self-claim one later.

-- ─── HOUSEHOLDS ───────────────────────────────────────────────────────────────
-- One paying/managing account can hold several learner profiles.
create table if not exists public.households (
    id              uuid primary key default uuid_generate_v4(),
    village_fondom  text,   -- unused today; store from day one anyway — see
                            -- Tontah build doc, "retrofitting this later is
                            -- expensive"
    plan            text    default 'free',
    created_at      timestamptz default now()
);
alter table public.households enable row level security;

-- ─── PROFILES: decouple from auth.users ───────────────────────────────────────
-- Drop the FK Postgres auto-named for `id uuid primary key references
-- auth.users(id)` in 001_initial_schema.sql. `id` stays the primary key —
-- for account holders it is still literally the auth uid (see trigger
-- below) — but it is no longer required to reference one.
alter table public.profiles drop constraint if exists profiles_id_fkey;

alter table public.profiles
    add column if not exists household_id uuid references public.households(id) on delete cascade,
    add column if not exists auth_user_id  uuid references auth.users(id) on delete cascade,
    add column if not exists birth_year    integer,
    add column if not exists claimed_at    timestamptz;

-- One auth account can only ever be linked to one profile.
create unique index if not exists profiles_auth_user_id_key
    on public.profiles(auth_user_id) where auth_user_id is not null;

-- ─── BACKFILL ──────────────────────────────────────────────────────────────────
-- Every profile that exists today came from an auth signup: give each one
-- its own household (preserves current 1:1 behaviour exactly) and make the
-- previously-implicit auth link explicit.
do $$
declare
    r record;
    new_household_id uuid;
begin
    for r in select id from public.profiles where household_id is null loop
        insert into public.households default values returning id into new_household_id;
        update public.profiles
            set household_id = new_household_id, auth_user_id = id
            where id = r.id;
    end loop;
end $$;

-- ─── SIGNUP TRIGGER: create a household alongside the profile ─────────────────
-- New signups are still one profile = one household = one auth account,
-- exactly like before. Adding children to that household is an explicit
-- app action (see authService.js), never automatic.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
    new_household_id uuid;
begin
    insert into public.households default values returning id into new_household_id;
    insert into public.profiles (id, auth_user_id, household_id, name, native_lang, email)
    values (
        new.id,
        new.id,
        new_household_id,
        coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        coalesce(new.raw_user_meta_data->>'native_lang', 'french'),
        new.email
    );
    insert into public.user_progress (user_id) values (new.id);
    return new;
end; $$;

-- ─── RLS: household-scoped access ──────────────────────────────────────────────
-- SECURITY DEFINER to avoid the infinite-recursion trap from migration 008
-- (a policy on `profiles` cannot query `profiles` directly from inside itself).
create or replace function public.my_household_id()
returns uuid
language sql security definer
set search_path = public
as $$
    select household_id from public.profiles where auth_user_id = auth.uid();
$$;

-- Existing "profiles_own" / "progress_own" policies (auth.uid() = id) still
-- apply unchanged for every account holder. These are additive on top:

-- A guardian can see every profile in their household (including their own).
create policy "household_reads_profiles" on public.profiles
    for select using (household_id = public.my_household_id());

-- A guardian can create/update/remove a CHILD profile (no login of its own)
-- in their own household. Claimed/adult profiles (auth_user_id is not null)
-- are never editable by anyone but themselves.
create policy "household_manages_unclaimed_children" on public.profiles
    for all using (
        household_id = public.my_household_id()
        and auth_user_id is null
    );

-- A guardian can read every household member's progress (the guardian view
-- the personas doc says doesn't exist today).
create policy "household_reads_progress" on public.user_progress
    for select using (
        user_id in (
            select id from public.profiles where household_id = public.my_household_id()
        )
    );

-- A guardian can write progress on behalf of an unclaimed child profile
-- (there is no session to do it as the child).
create policy "household_manages_child_progress" on public.user_progress
    for all using (
        user_id in (
            select id from public.profiles
            where household_id = public.my_household_id() and auth_user_id is null
        )
    );
