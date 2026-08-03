-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Teen self-claim (autonomy at 15)
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: Personas & Journeys v2, Youth 13-18 — "he can claim his own
-- credential... private from the guardian only after claiming at 15."
-- A child profile has no login (migration 014). Claiming attaches a real
-- one WITHOUT losing history: the profile keeps its existing id (so
-- user_progress, cohort_members, everything already linked to it stays
-- linked) — only auth_user_id changes from null to the new account, and
-- the profile moves to its own new household so the old guardian's
-- household-wide read access no longer applies (the actual privacy step).

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
    new_household_id uuid;
    claim_id uuid;
begin
    claim_id := nullif(new.raw_user_meta_data->>'claiming_profile_id', '')::uuid;

    if claim_id is not null then
        insert into public.households default values returning id into new_household_id;
        update public.profiles
            set auth_user_id = new.id,
                claimed_at   = now(),
                household_id = new_household_id,
                email        = new.email
            where id = claim_id and auth_user_id is null;
        -- Deliberately no user_progress insert here — the claimed profile's
        -- row (same id as before) already has one.
    else
        insert into public.households default values returning id into new_household_id;
        insert into public.profiles (id, auth_user_id, household_id, name, native_lang, email)
        values (
            new.id, new.id, new_household_id,
            coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
            coalesce(new.raw_user_meta_data->>'native_lang', 'french'),
            new.email
        );
        insert into public.user_progress (user_id) values (new.id);
    end if;
    return new;
end; $$;

-- ─── RLS: a claimed profile's own session, keyed by auth_user_id ──────────────
-- (profiles_own / progress_own already cover the normal case where
-- id == auth_user_id == auth.uid(); these cover the claimed case where
-- id stays the pre-claim uuid and only auth_user_id matches auth.uid().)
create policy "claimed_profile_self_access" on public.profiles
    for all using (auth.uid() = auth_user_id);

create or replace function public.my_claimed_profile_ids()
returns setof uuid
language sql security definer
set search_path = public
as $$
    select id from public.profiles where auth_user_id = auth.uid();
$$;

create policy "claimed_profile_progress_access" on public.user_progress
    for all using (user_id in (select public.my_claimed_profile_ids()));
