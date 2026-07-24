// Helpers shared across specs — real selectors against the actual app,
// not aspirational data-cy hooks. Kept minimal on purpose.

/** Completes the free-access flow: landing → language → 4-question setup → dashboard.
 *  Finishing the setup quiz now auto-starts the first lesson (2026-07-24) instead of
 *  landing on the Hub directly, so this closes out of that lesson to reach the Hub —
 *  most specs use this helper to test Hub/Phrasebook/etc., not lesson entry itself. */
export async function startCourseToDashboard(page) {
    await page.goto('/');
    await page.getByText(/start the course/i).first().click();
    await page.getByText(/Continuer sans compte|Continue without an account/i).click();
    await page.locator('select').first().selectOption({ index: 1 });
    await page.getByText(/Continuer/i).click();
    await page.getByText(/Débutant absolu/i).click();
    await page.getByText(/Famille/i).click();
    await page.getByText(/Régulier/i).click();
    await page.getByText(/Parler couramment/i).click();
    await page.getByText(/Continuer →/).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: '✕' }).first().click();
    await page.waitForTimeout(500);
}
