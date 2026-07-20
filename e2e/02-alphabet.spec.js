import { test, expect } from '@playwright/test';

test.describe('Alphabet reference page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByText(/Alphabet/i).first().click();
    });

    test('shows all 32 letters and opens a detail panel on selection', async ({ page }) => {
        await expect(page.getByText(/32 LETTERS/i)).toBeVisible();
        await page.getByText('a', { exact: true }).first().click();
        await expect(page.getByText(/like "a" in "father"/i)).toBeVisible();
    });

    test('has no audio/listen button — no real Medumba recordings yet', async ({ page }) => {
        await page.getByText('a', { exact: true }).first().click();
        await expect(page.getByText(/Listen to/i)).toHaveCount(0);
        await expect(page.getByText('🔊')).toHaveCount(0);
    });
});
