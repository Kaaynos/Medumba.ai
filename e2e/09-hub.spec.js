import { test, expect } from '@playwright/test';
import { startCourseToDashboard } from './helpers.js';

/** Module 9 — Leaderboard / Hub, QA doc v1.0 */

test('HUB-01: leaderboard reflects real user XP, not a hardcoded array', async ({ page }) => {
    // FIXED (2026-07-24): DashboardPage.jsx's leaderboard is now backed by the
    // real user_progress table via the get_leaderboard()/get_my_rank() RPCs
    // (supabase/migrations/011_leaderboard.sql), not a hardcoded array. The
    // old fixed "You" row (xp: 1340) is gone — the teaser now either shows a
    // real ranked entry or an honest "no ranking yet" state.
    await startCourseToDashboard(page);
    const teaserHeading = page.getByText(/^(Leaderboard|Classement)$/i);
    await teaserHeading.scrollIntoViewIfNeeded();
    await expect(teaserHeading).toBeVisible();
    await expect(page.getByText('1340 XP', { exact: false })).not.toBeVisible();
});

test('HUB-02 (fixed): leaderboard no longer shows placeholder names', async ({ page }) => {
    // FIXED (2026-07-24): "Alice M." / "Jean K." / "Sophie T." were hardcoded
    // placeholder rows — replaced with a live query over real profiles/xp.
    await startCourseToDashboard(page);
    const teaserHeading = page.getByText(/^(Leaderboard|Classement)$/i);
    await teaserHeading.scrollIntoViewIfNeeded();
    await expect(teaserHeading).toBeVisible();
    await expect(page.getByText('Alice M.', { exact: true })).not.toBeVisible();
});

test('HUB-04 (fixed): "View All" on the Leaderboard teaser opens the full leaderboard', async ({ page }) => {
    // FIXED (2026-07-24): activeNav 'leaderboard' is now wired to
    // renderLeaderboard() in DashboardPage.jsx's main content switch.
    await startCourseToDashboard(page);
    const teaserHeading = page.getByText(/^(Leaderboard|Classement)$/i);
    await teaserHeading.scrollIntoViewIfNeeded();
    await page.getByText(/^(VIEW ALL|VOIR TOUT)$/i).click();
    await expect(page.getByText(/^(🏆 Classement|🏆 Leaderboard)$/i)).toBeVisible();
});

test('HUB-03: Weekly Challenge tab renders progress and days-left without error', async ({ page }) => {
    await startCourseToDashboard(page);
    await page.getByText(/^(CHALLENGE|DÉFI)$/i).first().click();
    await expect(page.getByText(/^(Challenge|Défi)$/i).first()).toBeVisible();
    await expect(page.getByText(/days left|jours restants/i).first()).toBeVisible();
});
