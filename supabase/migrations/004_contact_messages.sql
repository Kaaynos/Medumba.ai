-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Messages de contact (point de contact unique, pas WhatsApp)
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.contact_messages (
    id          uuid primary key default uuid_generate_v4(),
    name        text not null,
    email       text not null,
    phone       text,
    subject     text,
    message     text not null,
    status      text default 'new' check (status in ('new', 'read', 'replied')),
    created_at  timestamptz default now()
);

alter table public.contact_messages enable row level security;

-- N'importe qui (même non connecté) peut envoyer un message.
create policy "Anyone can submit a contact message"
    on public.contact_messages for insert
    with check (true);

-- Seuls les admins peuvent lire/mettre à jour les messages.
create policy "Admins can read contact messages"
    on public.contact_messages for select
    using (exists (
        select 1 from public.profiles
        where profiles.id = auth.uid() and profiles.is_admin = true
    ));

create policy "Admins can update contact messages"
    on public.contact_messages for update
    using (exists (
        select 1 from public.profiles
        where profiles.id = auth.uid() and profiles.is_admin = true
    ));
