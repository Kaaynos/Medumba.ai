-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Tontah ticket 2: hybrid retrieval function
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: "Pure vector search over a low-resource language with variant
-- orthography misses exact headwords a keyword index finds instantly. Pure
-- keyword search misses 'how do I say the thing you say before eating.'
-- Run both, merge, then filter by the household's fondom — falling back to
-- the unmarked entry, never to another village's variant." The query
-- embedding itself must be computed by the caller (Mistral's embeddings
-- endpoint) — Postgres can't reach an external API, so this function takes
-- a precomputed vector, not raw text.

create or replace function public.retrieve_corpus(
    p_query           text,
    p_query_embedding vector(1024),
    p_village_fondom  text default null,
    p_max_level       integer default null,
    p_limit           integer default 5
)
returns table (
    id             uuid,
    headword       text,
    gloss_fr       text,
    gloss_en       text,
    variant_fondom text,
    level          integer,
    confidence     real
)
language sql stable
as $$
    with keyword_matches as (
        select ce.id, ts_rank(ce.tsv, websearch_to_tsquery('simple', p_query)) as kw_score
        from public.corpus_entry ce
        where ce.tsv @@ websearch_to_tsquery('simple', p_query)
    ),
    vector_matches as (
        select ce.id, 1 - (ce.embedding <=> p_query_embedding) as vec_score
        from public.corpus_entry ce
        order by ce.embedding <=> p_query_embedding
        limit 50
    ),
    merged as (
        select coalesce(k.id, v.id) as id,
               coalesce(k.kw_score, 0) as kw_score,
               coalesce(v.vec_score, 0) as vec_score
        from keyword_matches k
        full outer join vector_matches v on k.id = v.id
    )
    select
        ce.id, ce.headword, ce.gloss_fr, ce.gloss_en, ce.variant_fondom, ce.level,
        -- weighted blend, not an average — an exact keyword hit should
        -- outrank a merely-similar vector neighbor
        (m.kw_score * 0.4 + m.vec_score * 0.6)::real as confidence
    from merged m
    join public.corpus_entry ce on ce.id = m.id
    where (p_village_fondom is null or ce.variant_fondom is null or ce.variant_fondom = p_village_fondom)
      and (p_max_level is null or ce.level <= p_max_level)
    order by confidence desc
    limit p_limit;
$$;

-- Deferred from migration 027 ("created after the one-time import
-- populates the table, not here") — corpus_entry now has its 5,473 rows
-- and embeddings, so the ivfflat index can be built meaningfully.
-- The build's memory cost is a near-fixed cost of pgvector's clustering
-- pass, not primarily driven by `lists` — lowering lists from 20 to 10
-- didn't reduce the ~40MB requirement Supabase's default 32MB
-- maintenance_work_mem couldn't cover. Session-scoped bump instead of a
-- permanent server config change.
set maintenance_work_mem = '64MB';
create index if not exists corpus_entry_embedding_idx on public.corpus_entry
    using ivfflat (embedding vector_cosine_ops) with (lists = 10);

