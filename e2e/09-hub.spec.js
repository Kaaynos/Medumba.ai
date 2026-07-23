import { test, expect } from '@playwright/test';
import { startCourseToDashboard } from './helpers.js';

/** Module 9 — Leaderboard / Hub, QA doc v1.0 */

test.fixme('HUB-01: leaderboard reflects the current user\'s real XP', async () => {
    // FINDING (2026-07-22): DashboardPage.jsx's LEADERBOARD_DATA is a fully
    // hardcoded array (around line 195) — even the "You" row has a fixed
    // xp: 1340, not read from the actual dashboard XP state at all. So this
    // doesn't just have placeholder names for OTHER users (HUB-02, already a
    // known gap in the doc) — the user's own row is disconnected from real
    // XP too, which the v1.0 doc assumed passed. Not a regression from this
    // suite; flagging as a real, currently-failing HIGH priority case.
});

test('HUB-02 (known gap, still applies): leaderboard shows placeholder names, not real users', async ({ page }) => {
    // startCourseToDashboard defaults to French, so nav/teaser text renders
    // in French ("Classement" not "Leaderboard", "VOIR TOUT" not "VIEW ALL").
    // Checked directly on the Home teaser rather than via "View All" — see
    // HUB-04 below, that button is currently a dead end.
    await startCourseToDashboard(page);
    const teaserHeading = page.getByText(/^(Leaderboard|Classement)$/i);
    await teaserHeading.scrollIntoViewIfNeeded();
    await expect(teaserHeading).toBeVisible();
    // These are the hardcoded placeholder names — this assertion is
    // expected to keep passing until the real-data leaderboard is built;
    // if it ever fails, that's the signal the gap has been closed.
    await expect(page.getByText('Alice M.', { exact: true })).toBeVisible();
});

test.fixme('HUB-04 (new finding): "View All" on the Leaderboard teaser opens the full leaderboard', async () => {
    // FINDING (2026-07-22): the Home teaser's "View All"/"VOIR TOUT" button
    // calls setActiveNav('leaderboard'), but DashboardPage.jsx's main content
    // switch (around line 4092) only handles activeNav values 'home',
    // 'phrasebook', 'wordcards', 'challenge', 'account', 'music' — there is
    // no 'leaderboard' case. `renderLeaderboard()` is fully written but
    // never called from anywhere; clicking "View All" leaves the main
    // content area completely blank. Not in the original doc's known gaps
    // (HUB-02 is about placeholder names, this is a separate dead-end bug).
});

test('HUB-03: Weekly Challenge tab renders progress and days-left without error', async ({ page }) => {
    await startCourseToDashboard(page);
    await page.getByText(/^(CHALLENGE|DÉFI)$/i).first().click();
    await expect(page.getByText(/^(Challenge|Défi)$/i).first()).toBeVisible();
    await expect(page.getByText(/days left|jours restants/i).first()).toBeVisible();
});
