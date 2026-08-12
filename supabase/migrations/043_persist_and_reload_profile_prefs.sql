-- 043_persist_and_reload_profile_prefs.sql
-- Found while verifying the lesson-path personalization (migration/commit
-- adding lessonTags.js). Two separate, real gaps in the same signup path:
--
-- 1. "goals" (the objectives picked in QuickSetupPage — speak/vocab/habit)
--    was captured into React state at signup time but never actually
--    written to the database — handle_new_user()'s insert never included
--    it.
-- 2. "proficiency" (level 1-4) has NEVER been written to the database by
--    anything, ever, for any user. The column exists with `default 1`,
--    which is exactly why this went unnoticed — every row silently reads
--    back as Beginner regardless of what was actually selected. The
--    proficiency-based question-type mix in lessonGenerator.js has
--    therefore never actually varied by learner in production.
--
-- reason/daily_goal ARE written correctly today; separately (fixed in
-- App.jsx, not here) reason/goals/proficiency/daily_goal/age were also
-- never read back into app state on a normal login — only during the
-- same-session signup flow. Net effect: personalization (and the account
-- badge, and proficiency-based question mix) silently stopped working the
-- moment a user closed the app and logged back in normally, which is most
-- real usage.
--
-- This migration is the DB-side half: make handle_new_user() actually
-- store goals and proficiency. Metadata values are plain strings, so the
-- client sends a comma-joined list for goals and this splits it back into
-- profiles.goals (text[], already the column type since migration 001).

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
    new_household_id uuid;
    claim_id uuid;
    v_age int;
    v_role text;
    v_requested_role text;
    v_goals_raw text;
    v_goals text[];
    v_proficiency int;
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

        v_goals_raw := new.raw_user_meta_data->>'goals';
        v_goals := case
            when v_goals_raw is not null and v_goals_raw != '' then string_to_array(v_goals_raw, ',')
            else '{}'::text[]
        end;
        v_proficiency := nullif(new.raw_user_meta_data->>'proficiency', '')::int;

        insert into public.households default values returning id into new_household_id;
        insert into public.profiles (id, auth_user_id, household_id, name, native_lang, email, age, role, reason, daily_goal, goals, proficiency)
        values (
            new.id, new.id, new_household_id,
            coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
            coalesce(new.raw_user_meta_data->>'native_lang', 'french'),
            new.email,
            new.raw_user_meta_data->>'age',
            v_role,
            new.raw_user_meta_data->>'reason',
            coalesce(new.raw_user_meta_data->>'daily_goal', 'normal'),
            v_goals,
            coalesce(v_proficiency, 1)
        );
        insert into public.user_progress (user_id) values (new.id);
    end if;
    return new;
end; $$;
