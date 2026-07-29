import { test, expect } from '@playwright/test';
import { startCourseToDashboard } from './helpers.js';

/** Module 8 — Calendar, Counting, Videos, Alphabet, QA doc v1.0 */

test.describe('RES-01: Calendar', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const footer = page.locator('#ressources');
        await footer.scrollIntoViewIfNeeded();
        await page.getByText(/^Access →$/i).nth(1).click(); // Calendar card (Counting, Calendar, Pronunciation, Videos)
        await page.waitForTimeout(500);
    });

    test('month/day navigation updates the displayed month label', async ({ page }) => {
        const label = page.locator('text=/\\w+ · \\d{4}/').first();
        const before = await label.textContent();
        await page.locator('button:has-text("›")').click();
        await expect(label).not.toHaveText(before);
    });
});

test.describe('RES-02: Counting', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const footer = page.locator('#ressources');
        await footer.scrollIntoViewIfNeeded();
        await page.getByText(/^Access →$/i).nth(0).click(); // Counting card
        await page.waitForTimeout(500);
    });

    test('Quiz tab accepts an answer and gives feedback', async ({ page }) => {
        await page.getByText('Quiz', { exact: true }).click();
        await page.waitForTimeout(300);
        await page.locator('button').filter({ hasText: /^\d/ }).first().click();
        await expect(page.getByText(/Correct|It was:|C'était/i)).toBeVisible();
        await expect(page.getByText(/Next →|Suivant →|See results →|Voir les résultats →/i)).toBeVisible();
    });

    test('Converter tab turns a typed number into its Medumba form', async ({ page }) => {
        await page.getByText('Converter', { exact: true }).click();
        await page.waitForTimeout(300);
        await page.getByPlaceholder(/e\.g\. 347|ex: 347/i).fill('12');
        await expect(page.getByText(/^In Medumba$/i)).toBeVisible();
        await expect(page.getByText('= 12', { exact: true })).toBeVisible();
    });
});

test.describe('RES-03: Videos (doc superseded)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const footer = page.locator('#ressources');
        await footer.scrollIntoViewIfNeeded();
        await page.getByText(/^Access →$/i).nth(3).click(); // Videos card
        await page.waitForTimeout(500);
    });

    test('videos open in an embedded in-app player, not an external link (doc expected external — superseded by an intentional UX change)', async ({ page }) => {
        // All videos are now Supabase-Storage-hosted mp4s (the YouTube-embedded
        // ones were removed — unreliable load times/availability), so this
        // checks the <video> element instead of a youtube-nocookie iframe.
        await page.getByText('Drawing 01', { exact: true }).click();
        const video = page.locator('video');
        await expect(video).toBeVisible({ timeout: 5000 });
        await page.locator('button:has-text("✕")').click();
        await expect(video).not.toBeVisible();
    });
});

test.describe('RES-04: Alphabet reference page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByText(/Alphabet/i).first().click();
    });

    test('shows all 33 letters and opens a detail panel on selection', async ({ page }) => {
        await expect(page.getByText(/33 LETTERS/i)).toBeVisible();
        await page.getByText('a', { exact: true }).first().click();
        await expect(page.getByText(/like "a" in "father"/i)).toBeVisible();
    });

    test('has no audio/listen button — no real Medumba recordings yet (known, by design)', async ({ page }) => {
        await page.getByText('a', { exact: true }).first().click();
        await expect(page.getByText(/Listen to/i)).toHaveCount(0);
        await expect(page.getByText('🔊')).toHaveCount(0);
    });
});

test('RES-05 (doc gap now resolved): Alphabet IS reachable as a graded lesson in the course path', async ({ page }) => {
    // The v1.0 doc logged this as an expected-fail known gap ("Alphabet is
    // only reachable as a standalone reference page, not a graded lesson").
    // DashboardPage.jsx's "Foundations"/"Les Bases" unit now lists Alphabet
    // (id 'l0') as its first lesson with status 'active' — the gap has since
    // been closed. Testing the resolved state, not the old gap.
    await startCourseToDashboard(page);
    await expect(page.getByText('Les Bases', { exact: true })).toBeVisible();
    const label = page.getByText('Alphabet', { exact: true }).first();
    await label.scrollIntoViewIfNeeded();
    await expect(label).toBeVisible();
    const box = await label.boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y - 55);
    await expect(page.getByText(/Expressions to learn|Expressions à retenir/i)).toBeVisible({ timeout: 10000 });
});
