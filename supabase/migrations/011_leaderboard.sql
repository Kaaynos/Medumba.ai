-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Classement public basé sur les vraies données de progression
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- Fonctions "security definer" : ne renvoient jamais les lignes profiles/
-- user_progress brutes (protégées par les policies "profiles_own"/"progress_own"),
-- seulement un classement dérivé — donc exposables à "anon" sans casser la
-- confidentialité des autres champs de chaque utilisateur (email, âge, etc.).

-- Top N par XP, avec un nom d'affichage tronqué ("Prénom N.") pour ne pas
-- exposer le nom de famille complet des autres utilisateurs.
create or replace function public.get_leaderboard(limit_n integer default 10)
returns table(user_id uuid, display_name text, xp integer)
language sql
security definer
set search_path = public
as $$
    select
        p.id as user_id,
        case
            when split_part(trim(p.name), ' ', 2) <> ''
                then split_part(trim(p.name), ' ', 1) || ' ' || left(split_part(trim(p.name), ' ', 2), 1) || '.'
            when trim(p.name) <> ''
                then trim(p.name)
            else 'Apprenant'
        end as display_name,
        up.xp
    from public.user_progress up
    join public.profiles p on p.id = up.user_id
    order by up.xp desc, up.updated_at asc
    limit limit_n;
$$;

grant execute on function public.get_leaderboard(integer) to anon, authenticated;

-- Rang réel d'un utilisateur (1-indexé), pour l'afficher même s'il est en
-- dehors du top N renvoyé par get_leaderboard().
create or replace function public.get_my_rank(uid uuid)
returns integer
language sql
security definer
set search_path = public
as $$
    select count(*)::integer + 1
    from public.user_progress
    where xp > coalesce((select xp from public.user_progress where user_id = uid), 0);
$$;

grant execute on function public.get_my_rank(uuid) to anon, authenticated;
