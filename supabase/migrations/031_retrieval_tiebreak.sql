-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Tontah ticket 2 fix: tie-break RRF ties toward keyword matches
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: RRF (migration 029) fixed the scale-mismatch bug, but for short,
-- common single-word queries many candidates legitimately tie at the same
-- RRF floor score (rank-1-in-exactly-one-list = 1/61, always). Verified
-- live: querying "chien" returns the correct entry ("Mbʉ" / "Le chien")
-- at confidence 0.492 — genuinely present, just narrowly beaten in a
-- three-way tie at 0.500 by "Mbʉ̂yòŋ" (a real but partial keyword match,
-- "Chien de chasse") and "cən" (Bête — a vector-only neighbor, no
-- keyword relation at all). With p_limit=1, Postgres's tie-break on
-- exactly-equal sort keys is arbitrary, so which of the tied rows
-- surfaces as "the" answer isn't reliable.
--
-- Fix: when RRF scores tie, prefer rows that have a real keyword match at
-- all (kw_rank is not null) over vector-only neighbors, then prefer the
-- better-ranked keyword match. An exact/near-exact textual hit is a more
-- trustworthy signal than "somewhat close in embedding space" for this
-- kind of short, literal lookup query.

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
               k.kw_rank,
               coalesce(1.0 / (60 + k.kw_rank), 0) + coalesce(1.0 / (60 + v.vec_rank), 0) as rrf_score
        from keyword_ranked k
        full outer join vector_ranked v on k.id = v.id
    )
    select
        ce.id, ce.headword, ce.gloss_fr, ce.gloss_en, ce.variant_fondom, ce.level,
        (f.rrf_score / (2.0 / 61))::real as confidence
    from fused f
    join public.corpus_entry ce on ce.id = f.id
    where (p_village_fondom is null or ce.variant_fondom is null or ce.variant_fondom = p_village_fondom)
      and (p_max_level is null or ce.level <= p_max_level)
    order by
        f.rrf_score desc,
        (f.kw_rank is not null) desc,  -- among ties, a real keyword match beats a vector-only neighbor
        f.kw_rank asc nulls last       -- among keyword-matched ties, the better keyword rank wins
    limit p_limit;
$$;
