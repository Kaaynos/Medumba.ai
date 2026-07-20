-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Commentaires publics affichés en temps réel sur la landing page
--  À exécuter dans : supabase.com → SQL Editor → Run
--
--  Table séparée de contact_messages : ne stocke jamais l'e-mail ni le
--  téléphone, pour qu'il n'y ait aucun risque de fuite de données privées
--  via l'affichage public / Realtime.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.landing_comments (
    id          uuid primary key default uuid_generate_v4(),
    name        text not null,
    message     text not null,
    created_at  timestamptz default now()
);

alter table public.landing_comments enable row level security;

-- N'importe qui (même non connecté) peut poster un commentaire public.
create policy "Anyone can submit a landing comment"
    on public.landing_comments for insert
    with check (true);

-- Lecture publique — c'est le but (affichage sur la landing page).
create policy "Anyone can read landing comments"
    on public.landing_comments for select
    using (true);

-- Active les mises à jour en temps réel (Supabase Realtime) pour cette table.
alter publication supabase_realtime add table public.landing_comments;
