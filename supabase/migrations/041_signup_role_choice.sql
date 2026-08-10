-- 041_signup_role_choice.sql
-- Registration never asked what someone was signing up as — role was purely
-- derived from age (migration 025: >=18 -> parent, else child). This adds an
-- explicit choice (RoleChoicePage.jsx) for the three self-serve roles:
-- parent, child, content_creator. Teacher/coordinator/advisor/etc. stay
-- admin-provisioned only, by explicit decision — they're not in the
-- whitelist below, so metadata can never grant them at signup.
--
-- Security invariant carried over unchanged from migration 025: role is
-- never trusted verbatim from client metadata. requested_role is only
-- honored if it's in this exact whitelist; anything else (including an
-- attempt to claim 'admin' or 'teacher') falls through to the existing
-- age-based inference, exactly as before this migration.

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
    new_household_id uuid;
    claim_id uuid;
    v_age int;
    v_role text;
    v_requested_role text;
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
    else
        v_age  := nullif(new.raw_user_meta_data->>'age', '')::int;
        v_requested_role := new.raw_user_meta_data->>'requested_role';

        v_role := case
            when v_requested_role in ('parent', 'child', 'content_creator') then v_requested_role
            when v_age is not null and v_age >= 18 then 'parent'
            else 'child'
        end;

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
