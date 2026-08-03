-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Fix: age/role/reason/daily_goal never actually saved at signup
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: registerUser() (authService.js) writes name/native_lang into signUp's
-- metadata, which handle_new_user() picks up in its INSERT — that part
-- works. But age/reason/daily_goal (and, as of this migration, role) were
-- instead written by a SEPARATE client-side upsert() called immediately
-- after signUp(). With "Confirm email" enabled (this project's actual
-- config — verified live), signUp() returns with NO session until the
-- user clicks the emailed link, so that upsert runs unauthenticated and is
-- silently rejected by RLS (the code never even checked its error). Every
-- registration has therefore landed with age=null and role stuck at the
-- column default 'child' — regardless of the age the user actually typed
-- in AgePage — since the only write that could ever survive is the one
-- the SECURITY DEFINER trigger makes for name/native_lang.
--
-- Fix: put every one of these fields through the same metadata → trigger
-- path, which runs with elevated privileges and needs no session. Role is
-- derived from age INSIDE the trigger (not trusted verbatim from the
-- client) so a crafted metadata payload can't just claim role='admin'.

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
    new_household_id uuid;
    claim_id uuid;
    v_age int;
    v_role text;
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
        v_age  := nullif(new.raw_user_meta_data->>'age', '')::int;
        v_role := case when v_age is not null and v_age >= 18 then 'parent' else 'child' end;

        insert into public.households default values returning id into new_household_id;
        insert into public.profiles (id, auth_user_id, household_id, name, native_lang, email, age, role, reason, daily_goal)
        values (
            new.id, new.id, new_household_id,
            coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
            coalesce(new.raw_user_meta_data->>'native_lang', 'french'),
            new.email,
            new.raw_user_meta_data->>'age',
            v_role,
            new.raw_user_meta_data->>'reason',
            coalesce(new.raw_user_meta_data->>'daily_goal', 'normal')
        );
        insert into public.user_progress (user_id) values (new.id);
    end if;
    return new;
end; $$;
