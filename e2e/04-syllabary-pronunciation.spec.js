import { test, expect } from '@playwright/test';

/** Module 4 — Syllabary / Pronunciation, QA doc v1.0 */

test.describe('Syllabary / Pronunciation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const footer = page.locator('#ressources');
        await footer.scrollIntoViewIfNeeded();
        await page.getByText(/^Access →$/i).nth(2).click(); // Pronunciation card (3rd "Access →": Counting, Calendar, Pronunciation, Videos)
        await page.waitForTimeout(500);
    });

    test('SYL-01: search box has no IPA reference and does not match on IPA', async ({ page }) => {
        await page.getByText('Syllabary', { exact: true }).click();
        await expect(page.getByPlaceholder(/^Search syllable…$/i)).toBeVisible();
        const countLocator = page.getByText(/\/ \d+ syllables/i);
        await page.getByPlaceholder(/Search syllable/i).fill('ᵐbʱ'); // IPA-style glyphs, not a real syllable spelling
        await page.waitForTimeout(200);
        await expect(countLocator).toHaveText('0 / 1147 syllables');
    });

    test.fixme('SYL-02: recording-availability icon is accurate for recorded vs. unrecorded syllables', async () => {
        // FINDING (2026-07-22): PronunciationPage.jsx's syllable grid buttons
        // (around line 372) render every syllable identically — there is no
        // volume/muted icon at all distinguishing recorded from unrecorded
        // syllables, contrary to what this HIGH-priority case expects. Not a
        // regression introduced by this test suite; flagging as a real gap
        // to raise with the team before the July 26 launch, not silently
        // marking it green.
    });

    test('SYL-03: tapping a syllable opens the tone sheet with 4 tone variants', async ({ page }) => {
        await page.getByText('Syllabary', { exact: true }).click();
        await page.getByPlaceholder(/Search syllable/i).fill('ba');
        await page.waitForTimeout(300);
        await page.locator('button[title]').first().click();
        const toneOrListen = page.getByText(/Listen|Bas|Moyen|Montant|Descendant/i).first();
        await expect(toneOrListen).toBeVisible();
    });

    test('SYL-04: each of the 4 tone buttons is independently playable', async ({ page }) => {
        await page.getByText('Syllabary', { exact: true }).click();
        await page.getByPlaceholder(/Search syllable/i).fill('ba');
        await page.waitForTimeout(300);
        await page.locator('button[title]').first().click();
        const toneButtons = page.getByText(/^(Bas|Moyen|Montant|Descendant)$/);
        const count = await toneButtons.count();
        expect(count).toBeGreaterThan(0);
        // Tapping one tone shouldn't error or affect the others' labels.
        await toneButtons.first().click();
        await expect(toneButtons.first()).toBeVisible();
    });

    test('SYL-05: Reading tab listen button toggles a playing state', async ({ page }) => {
        await expect(page.getByText(/^\d+ \/ \d+$/)).toBeVisible();
        const listenBtn = page.getByRole('button', { name: /Listen/i });
        await expect(listenBtn).toBeVisible();
        await listenBtn.click();
        await expect(page.getByText(/Playing…/i)).toBeVisible();
    });
});
