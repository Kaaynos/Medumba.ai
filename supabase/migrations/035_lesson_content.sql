-- ═══════════════════════════════════════════════════════════════════════════
--  Medumba.AI — Move lesson content from static JS/JSON into Supabase
--  À exécuter dans : supabase.com → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Why: lesson content lived scattered across three independent static
-- sources kept in sync by hand per lesson id, with no structural
-- guarantee they matched — exactly what caused the Alphabet lesson bug
-- (taught vocabulary, not letters) and a second bug found while planning
-- this: l0 has no entry in expressionsByLesson.js's keyword heuristic,
-- so its flashcard preview silently fell back to random unrelated
-- expressions. Explicit per-lesson rows instead of implicit keyword
-- matching makes this class of drift structurally harder to reintroduce.
--
-- lessons.id keeps the existing string ids (l0, e2, ...) — these are
-- already referenced in user_progress.completed_lessons; changing them
-- would break every user's existing progress.

create table if not exists public.lesson_units (
    id            text primary key,
    course        text not null check (course in ('medumba','english')),
    order_index   integer not null,
    title_fr      text,
    title_en      text,
    subtitle_fr   text,
    subtitle_en   text,
    color         text,
    accent        text,
    emoji         text
);
alter table public.lesson_units enable row level security;
create policy "lesson_units_public_read" on public.lesson_units for select using (true);
create policy "lesson_units_admin_write" on public.lesson_units
    for all using (public.is_admin_user() or public.is_content_owner_user());

create table if not exists public.lessons (
    id            text primary key,
    unit_id       text references public.lesson_units(id) on delete cascade,
    course        text not null check (course in ('medumba','english')),
    order_index   integer not null,
    title_fr      text,
    title_en      text,
    type          text not null default 'lesson' check (type in ('lesson','chest','boss'))
);
alter table public.lessons enable row level security;
create policy "lessons_public_read" on public.lessons for select using (true);
create policy "lessons_admin_write" on public.lessons
    for all using (public.is_admin_user() or public.is_content_owner_user());

create table if not exists public.lesson_questions (
    id            uuid primary key default uuid_generate_v4(),
    lesson_id     text not null references public.lessons(id) on delete cascade,
    question_type text not null check (question_type in ('meaning','match','tile','audio','image_vocab')),
    order_index   integer not null default 0,
    payload       jsonb not null
);
create index if not exists lesson_questions_lesson_idx on public.lesson_questions(lesson_id);
alter table public.lesson_questions enable row level security;
create policy "lesson_questions_public_read" on public.lesson_questions for select using (true);
create policy "lesson_questions_admin_write" on public.lesson_questions
    for all using (public.is_admin_user() or public.is_content_owner_user());

create table if not exists public.lesson_flashcards (
    id                 uuid primary key default uuid_generate_v4(),
    lesson_id          text not null references public.lessons(id) on delete cascade,
    expression_fr      text,
    expression_medumba text,
    expression_en      text,
    order_index        integer not null default 0
);
create index if not exists lesson_flashcards_lesson_idx on public.lesson_flashcards(lesson_id);
alter table public.lesson_flashcards enable row level security;
create policy "lesson_flashcards_public_read" on public.lesson_flashcards for select using (true);
create policy "lesson_flashcards_admin_write" on public.lesson_flashcards
    for all using (public.is_admin_user() or public.is_content_owner_user());

-- Shared cross-lesson pool (image-vocab warmups, proficiency-4 variety
-- mix) — not lesson-specific, so its own table rather than a nullable
-- lesson_id on lesson_questions.
create table if not exists public.variety_questions (
    id            uuid primary key default uuid_generate_v4(),
    question_type text not null,
    payload       jsonb not null
);
alter table public.variety_questions enable row level security;
create policy "variety_questions_public_read" on public.variety_questions for select using (true);
create policy "variety_questions_admin_write" on public.variety_questions
    for all using (public.is_admin_user() or public.is_content_owner_user());
