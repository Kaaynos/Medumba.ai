-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Corrige la récursion infinie de la policy admin sur profiles
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- La policy 007 interrogeait directement "profiles" depuis une policy définie
-- sur "profiles" elle-même : Postgres doit réappliquer les policies RLS à
-- cette sous-requête, ce qui déclenche une récursion infinie et fait échouer
-- TOUTES les requêtes sur profiles (y compris le simple "suis-je admin ?"
-- que chaque utilisateur fait sur sa propre ligne) — d'où le bouton Panel
-- Admin qui a disparu pour tout le monde après la migration 007.
drop policy if exists "Admins can read all profiles" on public.profiles;

-- Une fonction SECURITY DEFINER contourne le RLS pour sa propre requête
-- interne, donc pas de récursion.
create or replace function public.is_admin_user()
returns boolean
language sql
security definer
set search_path = public
as $$
    select coalesce(
        (select is_admin from public.profiles where id = auth.uid()),
        false
    );
$$;

create policy "Admins can read all profiles"
    on public.profiles for select
    using (public.is_admin_user());
