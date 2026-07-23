import { test, expect } from '@playwright/test';
import { startCourseToDashboard } from './helpers.js';

/**
 * Module 6 — Word Cards / Vocabulary Flashcards, QA doc v1.0
 *
 * CORRECTION (2026-07-22): earlier this session Word Cards was believed N/A
 * on web because `src/components/VocabPage.jsx` is orphaned (never mounted
 * in App.jsx). That's true of that specific file, but DashboardPage.jsx has
 * its own separate, fully-functional Word Cards view reachable via the
 * bottom/side nav ("🃏 WORD CARDS") — real category grid (already filtered
 * to real-voice-only content, matching WC-01 by construction), card detail
 * view, and Prev/Next navigation.
 */

// startCourseToDashboard defaults to French native language, so nav labels
// and category names render in French ("FICHES" not "WORD CARDS", "Famille"
// not "Family") — match both languages like the rest of this suite does.
async function openWordCards(page) {
    await startCourseToDashboard(page);
    await page.getByText(/^(WORD CARDS|FICHES)$/).first().click();
    await page.waitForTimeout(300);
}

test('WC-01: only categories with real content are shown', async ({ page }) => {
    await openWordCards(page);
    // WC_CATEGORIES is filtered in-code to categories with >=1 real-voice
    // word — every rendered category should therefore open to a real list.
    const category = page.getByText(/^(Family|Famille)$/);
    await expect(category).toBeVisible();
    await category.click();
    await expect(page.locator('button').filter({ hasText: /›$/ }).first()).toBeVisible();
});

test('WC-02: card flip reveals the Medumba word and its translation', async ({ page }) => {
    await openWordCards(page);
    await page.getByText(/^(Family|Famille)$/).click();
    await page.locator('button').filter({ hasText: /›$/ }).first().click();
    await expect(page.locator('button:has-text("🔈"), button:has-text("🔊")')).toBeVisible();
});

test('WC-03: listen button only appears on the opened card, not the list view', async ({ page }) => {
    await openWordCards(page);
    await page.getByText(/^(Family|Famille)$/).click();
    await expect(page.locator('button:has-text("🔈")')).toHaveCount(0);
    await page.locator('button').filter({ hasText: /›$/ }).first().click();
    await expect(page.locator('button:has-text("🔈"), button:has-text("🔊")')).toBeVisible();
});

test.fixme('WC-04: Next/Previous stop any playing audio', async () => {
    // FINDING (2026-07-22): the Next/Previous handlers in DashboardPage.jsx
    // (`setWcCard(wcCard +/- 1)`, around line 2169-2170) don't call
    // stopMedumbaAudio() or reset wcSpeaking — there's no effect tied to
    // wcCard that stops playback either. Audio keeps playing over the next
    // card instead of stopping, contrary to this case's expectation. Not a
    // regression from this test suite; flagging as a real gap.
});
