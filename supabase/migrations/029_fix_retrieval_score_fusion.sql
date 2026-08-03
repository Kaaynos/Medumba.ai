-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Tontah ticket 2 fix: Reciprocal Rank Fusion, not raw blend
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: migration 028's confidence = kw_score*0.4 + vec_score*0.6 looked
-- reasonable but doesn't work — ts_rank and cosine similarity are on
-- wildly different numeric scales. ts_rank for a real keyword hit is
-- typically 0.01-0.1; cosine similarity between ANY two embeddings tends
-- to sit around 0.4-0.6 regardless of relevance, just from the geometry
-- of the embedding space. So the vector score numerically dominated the
-- blend no matter the weights — verified live: "merci" (which has exact
-- keyword matches like "Mə lὰbtə̀ tὰ." / "Merci beaucoup.") returned
-- "Jûntαnə" (Marchandise, unrelated) at confidence 0.421, and a batch of
-- 9 real words vs. 9 nonsense strings showed a NEGATIVE gap (-0.045)
-- between the worst real match and the best false one — no threshold
-- could have separated them.
--
-- Fix: Reciprocal Rank Fusion — combine each list's RANK POSITION, not
-- raw score magnitude. This is the standard fix for exactly this problem
-- (used by Elasticsearch, Weaviate, etc.) and is immune to scale
-- mismatch since it never touches the raw scores directly.

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
    with keyword_ranked as (
        select ce.id, row_number() over (
            order by ts_rank(ce.tsv, websearch_to_tsquery('simple', p_query)) desc
        ) as kw_rank
        from public.corpus_entry ce
        where ce.tsv @@ websearch_to_tsquery('simple', p_query)
        limit 50
    ),
    vector_ranked as (
        select ce.id, row_number() over (order by ce.embedding <=> p_query_embedding) as vec_rank
        from public.corpus_entry ce
        order by ce.embedding <=> p_query_embedding
        limit 50
    ),
    fused as (
        select coalesce(k.id, v.id) as id,
               coalesce(1.0 / (60 + k.kw_rank), 0) + coalesce(1.0 / (60 + v.vec_rank), 0) as rrf_score
        from keyword_ranked k
        full outer join vector_ranked v on k.id = v.id
    )
    select
        ce.id, ce.headword, ce.gloss_fr, ce.gloss_en, ce.variant_fondom, ce.level,
        -- normalized against the max possible RRF score (rank 1 in both
        -- lists = 2/61) so this reads as a 0-1 confidence, not a raw RRF sum
        (f.rrf_score / (2.0 / 61))::real as confidence
    from fused f
    join public.corpus_entry ce on ce.id = f.id
    where (p_village_fondom is null or ce.variant_fondom is null or ce.variant_fondom = p_village_fondom)
      and (p_max_level is null or ce.level <= p_max_level)
    order by f.rrf_score desc
    limit p_limit;
$$;
