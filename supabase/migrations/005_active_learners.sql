-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Compteur public "apprenants actifs" pour la landing page
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- Horodatage de dernière connexion, mis à jour à chaque login/signup.
alter table public.profiles
    add column if not exists last_seen timestamptz default now();

-- Fonction "security definer" : renvoie uniquement un nombre (jamais les
-- profils individuels), donc peut être exposée à "anon" sans casser la
-- policy "profiles_own" qui protège les données de chaque utilisateur.
create or replace function public.get_active_learner_count()
returns integer
language sql
security definer
set search_path = public
as $$
    select count(*)::integer from public.profiles
    where last_seen >= now() - interval '30 days';
$$;

grant execute on function public.get_active_learner_count() to anon, authenticated;
