import { test, expect } from '@playwright/test';
import { startCourseToDashboard } from './helpers.js';

test.describe('Landing page', () => {
    test('loads with the correct title and no console errors', async ({ page }) => {
        const errors = [];
        page.on('pageerror', (e) => errors.push(String(e)));
        await page.goto('/');
        await expect(page).toHaveTitle(/Medumba\.AI/);
        expect(errors).toEqual([]);
    });

    test('nav shows Register, not Log in', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByText(/^Register$/i)).toBeVisible();
        await expect(page.getByText(/^Log in$/i)).toHaveCount(0);
    });

    test('Register opens the account-creation flow (Google + email), not a sign-in form', async ({ page }) => {
        await page.goto('/');
        await page.getByText(/^Register$/i).click();
        await expect(page.getByText(/Continue with Google/i)).toBeVisible();
        await expect(page.getByText(/^Password$/i)).toHaveCount(0); // no password field on this first screen
    });
});

test.describe('Free-access onboarding', () => {
    test('Start the course reaches the dashboard with no account required', async ({ page }) => {
        await startCourseToDashboard(page);
        await expect(page.getByText(/COMMENCER/i)).toBeVisible();
        await expect(page.getByText('Les Bases', { exact: true })).toBeVisible();
    });
});
