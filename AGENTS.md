# AGENTS.md

## Project

Medumba.ai — a learning platform for the Medumba language of Bangangté,
Ndé division, Cameroon. Gamified lessons, dictionary, phrasebook,
real-voice pronunciation, and classes with CEPOM-certified teachers.

Low-resource language: correctness of linguistic data matters more than
speed. Medumba audio is always a real recorded speaker — never
synthesized.

## Stack

Single Vite + React app (JavaScript, not TypeScript). No separate
backend in this repository: Supabase (Postgres + Auth + Storage) is the
data layer, called directly from the client via `src/config/supabase.js`.
A separate AI translation service is hosted externally at
`medumba-ai.onrender.com` and is out of scope for this repo.

Note: this repo always talks to the **production** Supabase project —
there is no local/staging environment. Anything that writes data
(account creation, lesson completion, admin actions) writes to
production. See `playwright.config.js` and `e2e/` for how the test
suite handles this (`TEST_ENV=dev|production`, never a bare local
server for e2e).

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint` (pre-existing lint debt — CI runs this
  non-blocking; don't let it stop a PR, but don't add new debt either)
- Unit/component tests: `npm run test` (Vitest)
- E2E tests: `npm run pw:test` (Playwright, targets a real deployed
  environment — see `playwright.config.js`)
- Build: `npm run build`

## Conventions

- React functional components, hooks, no class components.
- Commits: conventional commits (`feat:`, `fix:`, `chore:`).
- Branches: `devin/<short-description>` for agent work.
- All Medumba text is UTF-8 NFC normalised. Never strip diacritics or
  tone marks — a dropped tone mark is a different word, not a
  formatting detail.
- Bilingual UI: every user-facing string must respect the app's
  selected language (`isFr` / `nativeLang`), not assume French. This
  codebase has shipped this bug more than once — see the language
  toggle behavior in `LessonPage.jsx`, `DashboardPage.jsx` (Phrasebook,
  Word Cards) as the reference implementation.

## Do NOT touch without human approval

- Anything under `src/data/` — the Medumba lexicon, expressions,
  syllables, tone tables (`medumbaDictionary.js`, `medumbaExpressions.js`,
  `medumbaSyllables.js`, `syllableTons.json`, `phrasebookExpressions.js`,
  `vocabExpressions.js`, `chapterPhrases.json`). Defining what is
  correct in Medumba stays with Felix, Zenu and native speakers — no
  agent can verify itself on a low-resource language.
- `supabase/migrations/` — schema changes affecting user, household, or
  corpus data need human sign-off before merging.
- Any consent-related data or speaker personal information.
- Do not add npm dependencies without asking first.

## Review expectations

Open a pull request. Never push to `main` — branch protection blocks it
anyway. Explain what you verified and what you could not verify.
