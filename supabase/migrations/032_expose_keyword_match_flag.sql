-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Tontah ticket 2 fix: expose whether a keyword match existed
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: RRF's floor score for "rank 1 in exactly one list" is always
-- exactly the same number (0.5 normalized) whether that one list is a
-- genuinely strong keyword hit or a mediocre vector-only neighbor.
-- Verified live: after the tie-break fix (migration 031), nearly every
-- real word now returns the correct entry — but nonsense queries land at
-- the *identical* 0.500 confidence, because the scalar confidence alone
-- can't tell "one strong signal" from "one weak signal" apart, only that
-- there was exactly one. The signal that actually separates real from
-- nonsense is binary: did websearch_to_tsquery find ANY keyword match at
-- all? Nonsense strings get zero (confirmed); real words almost always
-- get at least one somewhere in a corpus this size. ask_an_elder (ticket
-- 3) should gate on this flag combined with confidence, not confidence
-- alone.

-- CREATE OR REPLACE can't change a function's OUT columns (adding
-- has_keyword_match) — needs an explicit drop first.
drop function if exists public.retrieve_corpus(text, vector, text, integer, integer);

create function public.retrieve_corpus(
    p_query           text,
    p_query_embedding vector(1024),
    p_village_fondom  text default null,
    p_max_level       integer default null,
    p_limit           integer default 5
)
returns table (
    id                uuid,
    headword          text,
    gloss_fr          text,
    gloss_en          text,
    variant_fondom    text,
    level             integer,
    confidence        real,
    has_keyword_match boolean
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
        (f.rrf_score / (2.0 / 61))::real as confidence,
        (f.kw_rank is not null) as has_keyword_match
    from fused f
    join public.corpus_entry ce on ce.id = f.id
    where (p_village_fondom is null or ce.variant_fondom is null or ce.variant_fondom = p_village_fondom)
      and (p_max_level is null or ce.level <= p_max_level)
    order by
        f.rrf_score desc,
        (f.kw_rank is not null) desc,
        f.kw_rank asc nulls last
    limit p_limit;
$$;
