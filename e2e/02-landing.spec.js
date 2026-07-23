import { test, expect } from '@playwright/test';

/** Module 2 — Landing Page (Web only), QA doc v1.0 */

test('LAND-01: default language is English', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: /The Medumba language,/i })).toBeVisible();
    await expect(page.getByText(/^Register$/i)).toBeVisible();
});

test('LAND-02: FR/EN toggle switches the nav, hero and footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: /The Medumba language,/i })).toBeVisible();
    await page.getByText('🇫🇷 FR', { exact: true }).click();
    await expect(page.getByRole('heading', { level: 1, name: /La langue Medumba,/i })).toBeVisible();
    await expect(page.getByText(/^S'inscrire$/i)).toBeVisible();
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.getByText(/Une question \? Écrivez-nous/i)).toBeVisible();
});

test('LAND-03: stats banner shows "Free", not a fake currency figure', async ({ page }) => {
    await page.goto('/');
    const stats = page.locator('.stats-grid');
    await stats.scrollIntoViewIfNeeded();
    await expect(stats.getByText(/^Free$/i)).toBeVisible();
    await expect(page.getByText(/XAF/i)).toHaveCount(0);
});

test('LAND-04: no fictitious pricing tiers in the Download section', async ({ page }) => {
    await page.goto('/');
    const download = page.locator('#download');
    await download.scrollIntoViewIfNeeded();
    await expect(download.getByText(/^Free$/i)).toBeVisible();
    await expect(page.getByText(/Premium/i)).toHaveCount(0);
    await expect(page.getByText(/Annual/i)).toHaveCount(0);
    await expect(page.getByText(/XAF/i)).toHaveCount(0);
});

test('LAND-05: a resource card navigates to its page and back returns to the landing page', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('#ressources');
    await footer.scrollIntoViewIfNeeded();
    await page.getByText(/Open the dictionary/i).click();
    await expect(page.getByPlaceholder(/Search in English/i)).toBeVisible();
    await page.locator('button:has-text("←")').first().click();
    await expect(page.getByRole('heading', { level: 1, name: /The Medumba language,/i })).toBeVisible();
});

test('LAND-06: CEPOM Certification page has title, content and a working back button', async ({ page }) => {
    await page.goto('/');
    await page.getByText(/Certified by CEPOM/i).click();
    await expect(page.getByText('Medumba.AI × CEPOM', { exact: true })).toBeVisible();
    await page.locator('button:has-text("←")').first().click();
    await expect(page.getByRole('heading', { level: 1, name: /The Medumba language,/i })).toBeVisible();
});

test('LAND-07: teacher WhatsApp contact button asks for a name, then opens the right target with a pre-filled message', async ({ page, context }) => {
    // Contact buttons open a name-capture modal first (added 2026-07-23) —
    // no user identity exists yet on the pre-onboarding Landing page, so the
    // pre-filled message can't include a name without asking for one.
    await page.goto('/');
    const classes = page.locator('#classes');
    await classes.scrollIntoViewIfNeeded();
    const button = page.getByRole('button', { name: /Contact Kammbem/i });
    await expect(button).toBeVisible();
    await button.click();
    await page.getByPlaceholder(/Your name/i).fill('Test User');
    const [popup] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('button', { name: /Continue to WhatsApp/i }).click(),
    ]);
    await popup.waitForLoadState('domcontentloaded').catch(() => {});
    const url = decodeURIComponent(popup.url()).replace(/\+/g, ' ');
    expect(url).toMatch(/wa\.me|api\.whatsapp\.com/);
    expect(url).toMatch(/Medumba/i);
    expect(url).toMatch(/Test User/i);
});

test('LAND-08: mobile viewport shows a hamburger menu and reflows without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.locator('button:has-text("☰")')).toBeVisible();
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(hasOverflow).toBe(false);
});

test('LAND-09: "Start the course" CTA leads into onboarding, not a payment page', async ({ page }) => {
    await page.goto('/');
    await page.getByText(/Start the course — it's free/i).click();
    await expect(page.getByText(/native language|langue maternelle/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/XAF|credit card|carte bancaire/i)).toHaveCount(0);
});
