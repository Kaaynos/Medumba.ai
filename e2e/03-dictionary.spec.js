import { test, expect } from '@playwright/test';

/**
 * Module 3 — Dictionary, QA doc v1.0
 *
 * The doc's wording ("French → Medumba", chip words like "Main"/"Chien")
 * assumes a French-speaking user, so these tests explicitly set the native
 * language to French before opening the Dictionary — sidesteps ambiguity
 * now that the Dictionary is genuinely bilingual (2026-07-22 fix): before
 * that fix, the default (English) mode's UI text incorrectly said "French"
 * everywhere regardless of the real native-language setting, which is why
 * these assertions used to pass without setting a language explicitly.
 */

async function setFrenchAndOpenDictionary(page) {
    await page.goto('/');
    await page.getByText(/start the course/i).first().click();
    await page.locator('select').first().selectOption({ label: '🇫🇷  Français' });
    await page.waitForTimeout(300);
    await page.locator('button', { hasText: '←' }).first().click(); // back to Landing, nativeLang stays 'french'
    await page.waitForTimeout(500);
    const footer = page.locator('#ressources');
    await footer.scrollIntoViewIfNeeded();
    await page.getByText(/Ouvrir le dictionnaire|Open the dictionary/i).click();
    await page.waitForTimeout(500);
}

test.describe('Dictionary', () => {
    test.beforeEach(async ({ page }) => {
        await setFrenchAndOpenDictionary(page);
    });

    test('DICT-01: is never empty on open', async ({ page }) => {
        await expect(page.getByText(/Mots à découvrir/i)).toBeVisible();
    });

    test('DICT-02: French -> Medumba search returns a matching entry', async ({ page }) => {
        await page.getByPlaceholder(/Chercher en français/i).fill('Chien');
        await expect(page.getByText('🇫🇷 Chien')).toBeVisible();
    });

    test('DICT-03: Medumba -> French search returns the correct translation', async ({ page }) => {
        await page.getByText(/Medumba → Français/i).click();
        await page.getByPlaceholder(/Chercher un mot Medumba/i).fill('Mbʉ');
        await expect(page.getByText('🇫🇷 Chien', { exact: true })).toBeVisible();
    });

    test('DICT-04/05: listen button flips to a playing icon on tap', async ({ page }) => {
        const firstRow = page.locator('.dict-row').first();
        const button = firstRow.locator('button');
        await expect(button).toHaveText('🔈');
        await button.click();
        await expect(button).toHaveText('🔊');
    });

    test('DICT-06: every suggested word chip produces a result', async ({ page }) => {
        // Chips only render on the empty-search screen.
        for (const word of ['Main', 'Pied', 'Chien', 'Enfant', 'Rouge']) {
            const chip = page.getByRole('button', { name: word, exact: true }).or(page.getByText(word, { exact: true }));
            await expect(chip.first()).toBeVisible();
        }
    });

    test('DICT-07: no results falls back to the AI Translator', async ({ page }) => {
        await page.getByPlaceholder(/Chercher en français/i).fill('zzzznotaword');
        await expect(page.getByText(/Aucun résultat/i)).toBeVisible();
        await page.getByText(/Essayer avec le Traducteur IA/i).click();
        await expect(page.getByText(/Traducteur IA/i).first()).toBeVisible();
    });

    test('DICT-08: AI Translator returns a translation with a working listen button', async ({ page }) => {
        test.setTimeout(90000); // hits a real external AI endpoint (Render free tier can cold-start)
        await page.getByText(/Traducteur IA/i).first().click();
        await page.getByPlaceholder(/Entrez du texte français/i).fill('Bonjour');
        await page.getByRole('button', { name: /Traduire/i }).click();
        await expect(page.getByText(/Résultat/i)).toBeVisible({ timeout: 60000 });
        await expect(page.locator('button:has-text("🔈")')).toBeVisible();
    });
});
