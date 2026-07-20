import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    // A single Vite dev server backs every test; running workers in parallel
    // against it caused real timeouts/flakiness (resource contention), not
    // app bugs — keep this serial unless the app is ever served pre-built.
    workers: 1,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: true,
        timeout: 30000,
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
});
