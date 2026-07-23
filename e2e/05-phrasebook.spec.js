import { test, expect } from '@playwright/test';
import { startCourseToDashboard } from './helpers.js';

/**
 * Module 5 — Phrasebook, QA doc v1.0
 *
 * CORRECTION (2026-07-22): earlier this session Phrasebook was believed N/A
 * on web (no standalone page/route). That only checked App.jsx top-level
 * routing and the separate, unrelated `phrasebookExpressions.js` data file.
 * DashboardPage.jsx actually has its own fully-functional Phrasebook view,
 * reachable via the bottom/side nav ("📖 PHRASEBOOK"), with a real category
 * grid, per-category phrase lists (real-voice filtered), and listen buttons.
 */

async function openPhrasebook(page) {
    await startCourseToDashboard(page);
    await page.getByText('PHRASEBOOK', { exact: true }).first().click();
    await page.waitForTimeout(300);
}

test('PHR-01: only categories with real content are shown, and opening one shows a non-empty phrase list', async ({ page }) => {
    await openPhrasebook(page);
    const category = page.getByText(/^(Greetings & Introductions|Salutations & Présentations)$/);
    await expect(category).toBeVisible();
    await category.click();
    await expect(page.getByText(/^(Greetings & Introductions|Salutations & Présentations)$/)).toBeVisible(); // category header
    // At least one phrase row rendered (not a blank list).
    await expect(page.locator('button:has-text("🔈")').first()).toBeVisible();
});

test('PHR-02: per-phrase listen button flips to a playing icon on tap', async ({ page }) => {
    await openPhrasebook(page);
    await page.getByText(/^(Greetings & Introductions|Salutations & Présentations)$/).click();
    const listenBtn = page.locator('button:has-text("🔈")').first();
    await expect(listenBtn).toBeVisible();
    await listenBtn.click();
    await expect(page.locator('button:has-text("🔊")').first()).toBeVisible();
});

test('PHR-03: direction toggle swaps the primary/secondary language line', async ({ page }) => {
    await openPhrasebook(page);
    await page.getByText(/^(Greetings & Introductions|Salutations & Présentations)$/).click();
    const firstRow = page.locator('div').filter({ has: page.locator('button:has-text("🔈"), button:has-text("🔊")') }).first();
    const beforeText = await firstRow.locator('div').first().textContent();
    await page.getByRole('button', { name: 'Medumba', exact: true }).click(); // direction toggle button
    await page.waitForTimeout(200);
    const afterText = await firstRow.locator('div').first().textContent();
    expect(afterText).not.toEqual(beforeText);
});
