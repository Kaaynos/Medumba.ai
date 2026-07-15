-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Certifications par unité (CEPOM)
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.user_progress
    add column if not exists completed_certifications text[] default '{}';
