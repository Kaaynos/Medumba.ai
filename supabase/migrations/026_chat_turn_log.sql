-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Tontah ticket 1: chat request log
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: Tontah Complete Experience & Implementation doc, Part III/IV —
-- "Move inference to our own account — and prove it with a request log."
-- api/chat.js has called DeepSeek's public API with zero logging since it
-- shipped; this table is that proof, and doubles as the raw material for
-- the eval harness later ("collect 200-300 real turns... run in CI").
-- profile_id is nullable on purpose — the Visitor persona (landing-page
-- chat, logged out) is real and has "no account context" per the doc.

create table if not exists public.chat_turn (
    id              uuid primary key default uuid_generate_v4(),
    profile_id      uuid references public.profiles(id) on delete set null,
    content_json    jsonb not null,
    tokens          integer,
    cost_cents      numeric,
    latency_ms      integer,
    guardrail_flags text[] default '{}',
    created_at      timestamptz default now()
);
alter table public.chat_turn enable row level security;

create policy "household_reads_own_chat_turns" on public.chat_turn
    for select using (profile_id in (select public.household_profile_ids()));

create policy "admin_reads_chat_turns" on public.chat_turn
    for select using (public.is_admin_user());

-- Inserts happen server-side only (api/chat.js, via the service role key),
-- never from the browser — no insert policy needed for authenticated/anon.
