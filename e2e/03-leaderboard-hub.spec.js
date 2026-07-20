import { test, expect } from '@playwright/test';
import { startCourseToDashboard } from './helpers.js';

test.describe('Leaderboard / Hub', () => {
    test('dashboard shows a leaderboard widget', async ({ page }) => {
        await startCourseToDashboard(page);
        await expect(page.getByText(/Classement|Leaderboard/i).first()).toBeVisible();
    });

    // KNOWN ISSUE (not a regression to fix blindly — carried over from the
    // original QA notes): leaderboard entries besides "you" are hardcoded
    // placeholder names (DashboardPage.jsx ~line 196), not real users.
    // This test documents the current state; flip the assertion once the
    // leaderboard is wired to real data.
    test('leaderboard currently shows placeholder names, not real users (known issue)', async ({ page }) => {
        await startCourseToDashboard(page);
        await expect(page.getByText('Alice M.')).toBeVisible();
    });
});
