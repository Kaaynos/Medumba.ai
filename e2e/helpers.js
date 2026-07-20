// Helpers shared across specs — real selectors against the actual app,
// not aspirational data-cy hooks. Kept minimal on purpose.

/** Completes the free-access flow: landing → language → 3-question setup → dashboard. */
export async function startCourseToDashboard(page) {
    await page.goto('/');
    await page.getByText(/start the course/i).first().click();
    await page.locator('select').first().selectOption({ index: 1 });
    await page.getByText(/Continuer/i).click();
    await page.getByText(/Débutant absolu/i).click();
    await page.getByText(/Famille/i).click();
    await page.getByText(/Régulier/i).click();
    await page.getByText(/Continuer →/).click();
    await page.waitForTimeout(1500);
}
