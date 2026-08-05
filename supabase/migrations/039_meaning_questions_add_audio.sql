-- 039_meaning_questions_add_audio.sql
-- The Alphabet lesson is aimed at absolute beginners, but
-- lessonGenerator.js only ever shows 'meaning' questions at
-- proficiency 1 — 'tile' questions (which carry the letter audio from
-- migration 037) don't appear until proficiency 2+. That meant
-- beginners never heard any letter sound in this lesson at all.
-- LessonPage.jsx now also renders an audio button for 'meaning'
-- questions; this migration attaches the same audioKind/audio fields
-- so that button has something to play. 'ə' is intentionally left
-- untouched — no recording exists for it anywhere.

update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"a"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'a';
update public.lesson_questions set payload = payload || '{"audioKind":"word","audio":"Mα̂"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'α';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"ε"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'ε';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"b"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'b';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"c"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'c';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"d"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'd';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"e"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'e';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"f"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'f';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"g"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'g';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"gh"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'gh';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"h"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'h';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"i"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'i';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"j"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'j';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"k"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'k';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"l"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'l';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"m"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'm';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"n"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'n';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"ŋ"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'ŋ';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"ny"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'ny';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"o"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'o';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"ɔ"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'ɔ';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"s"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 's';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"sh"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'sh';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"t"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 't';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"ts"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'ts';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"u"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'u';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"ɨ"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'ɨ';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"v"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'v';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"w"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'w';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"y"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'y';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"z"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'z';
update public.lesson_questions set payload = payload || '{"audioKind":"letter","audio":"ꞌ"}'::jsonb where lesson_id = 'l0' and question_type = 'meaning' and payload->>'answer' = 'ꞌ';
