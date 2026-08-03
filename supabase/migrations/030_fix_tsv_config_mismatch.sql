-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Tontah ticket 2 fix: tsv config mismatch broke keyword search
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: corpus_entry.tsv (migration 027) mixed text-search configs per
-- field — 'simple' for headword, 'french' for gloss_fr, 'english' for
-- gloss_en — then retrieve_corpus queried the combined result with a
-- single websearch_to_tsquery('simple', ...). Verified live: even an
-- exact substring match ("chien" against gloss_fr "Le chien") never
-- matched via keyword search at all — confirmed data exists via a plain
-- ILIKE, confirmed the RRF fix (migration 029) was working correctly,
-- yet "chien"/"merci"/most real queries still landed at the vector-only
-- floor score (0.500), never picked up by the keyword side.
--
-- Fix: one config ('simple') for every field, document side and query
-- side alike, so there's no possibility of a tokenization mismatch. This
-- gives up French/English stemming (e.g. "remercier" won't keyword-match
-- a query for "remercie") — an acceptable tradeoff since the vector side
-- already covers morphological variation; exactness is what the keyword
-- side is actually for here.
--
-- A generated STORED column forces an immediate full-table rewrite, which
-- needs more maintenance_work_mem (40MB) than this Supabase tier allows
-- (32MB) — and neither plain SET nor SET LOCAL could raise it here (see
-- migration 029's index note for the same wall). Using a trigger instead
-- avoids that rewrite entirely: existing rows get backfilled via ordinary
-- batched UPDATEs (regular work_mem, not maintenance_work_mem), and new
-- rows are covered by the trigger going forward.

alter table public.corpus_entry drop column if exists tsv;
alter table public.corpus_entry add column tsv tsvector;

create or replace function public.corpus_entry_set_tsv()
returns trigger language plpgsql as $$
begin
    new.tsv :=
        setweight(to_tsvector('simple', coalesce(new.headword, '')), 'A') ||
        setweight(to_tsvector('simple', coalesce(new.gloss_fr, '')), 'B') ||
        setweight(to_tsvector('simple', coalesce(new.gloss_en, '')), 'B');
    return new;
end;
$$;

drop trigger if exists corpus_entry_tsv_trigger on public.corpus_entry;
create trigger corpus_entry_tsv_trigger
    before insert or update on public.corpus_entry
    for each row execute function public.corpus_entry_set_tsv();

-- GIN index deferred for the same maintenance_work_mem ceiling — not
-- required for correctness, @@ still works via a sequential scan, and
-- 5,473 rows scans fast enough without one.
