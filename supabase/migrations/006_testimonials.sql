-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Témoignages soumis par les utilisateurs (modérés avant publication)
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.testimonials (
    id          uuid primary key default uuid_generate_v4(),
    name        text not null,
    role        text,
    message     text not null,
    status      text default 'pending' check (status in ('pending', 'approved', 'rejected')),
    created_at  timestamptz default now()
);

alter table public.testimonials enable row level security;

-- N'importe qui (même non connecté) peut soumettre un témoignage.
create policy "Anyone can submit a testimonial"
    on public.testimonials for insert
    with check (true);

-- Tout le monde peut lire les témoignages déjà approuvés (affichage landing page).
create policy "Anyone can read approved testimonials"
    on public.testimonials for select
    using (status = 'approved');

-- Les admins peuvent tout lire (y compris en attente) et modérer.
create policy "Admins can read all testimonials"
    on public.testimonials for select
    using (exists (
        select 1 from public.profiles
        where profiles.id = auth.uid() and profiles.is_admin = true
    ));

create policy "Admins can update testimonials"
    on public.testimonials for update
    using (exists (
        select 1 from public.profiles
        where profiles.id = auth.uid() and profiles.is_admin = true
    ));
