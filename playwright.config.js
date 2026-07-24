import { defineConfig, devices } from '@playwright/test';

// This suite must always run against a real deployed environment (dev or
// production), never a local `npm run dev` server — src/config/supabase.js
// hardcodes the production Supabase project with no local env override, so
// a local server silently writes real test data (accounts, XP, leaderboard
// rows) straight into production. Pass the target explicitly:
//   TEST_ENV=dev npx playwright test
//   TEST_ENV=production npx playwright test
const ENV_URLS = {
    dev: process.env.MEDUMBA_DEV_URL,
    production: 'https://www.medumba.ai',
};
const target = process.env.TEST_ENV || 'production';
const baseURL = ENV_URLS[target];
if (!baseURL) {
    throw new Error(
        `No URL configured for TEST_ENV="${target}". ` +
        `Set TEST_ENV to "dev" (with MEDUMBA_DEV_URL set) or "production".`
    );
}

export default defineConfig({
    testDir: './e2e',
    // Real deployments handle concurrent requests fine — this isn't working
    // around local dev-server contention anymore, but keeping requests
    // serial avoids hammering a shared environment during a run.
    workers: 1,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: 'html',
    use: {
        baseURL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
});
