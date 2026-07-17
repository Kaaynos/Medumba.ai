-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Permet aux admins de lire tous les profils (Panel Admin)
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- profiles_own (auth.uid() = id) ne laissait chacun voir que sa propre ligne :
-- le Panel Admin (getAllUsers) ne recevait donc que la ligne de l'admin
-- lui-même, jamais la liste complète des utilisateurs.
create policy "Admins can read all profiles"
    on public.profiles for select
    using (exists (
        select 1 from public.profiles p2
        where p2.id = auth.uid() and p2.is_admin = true
    ));
