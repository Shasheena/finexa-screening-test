import { test, expect } from '@playwright/test';

test.describe('Playwright Documentation Site Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('1. Open home page and assert title contains "Playwright"', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('2. Click "Get started" and assert URL contains /docs/intro', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL(/\/docs\/intro/);
  });

  test('3. Assert the "Installation" heading is visible', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation', exact: true })).toBeVisible();
  });

  test('4. Use site search to find "locators" and assert a result appears', async ({ page }) => {
    const searchButton = page.getByRole('button', { name: 'Search (Control+k)' });
    const searchInput = page.getByRole('searchbox', { name: 'Search' });

    await expect(async () => {
      await searchButton.click();
      await expect(searchInput).toBeVisible({ timeout: 5000 });
    }).toPass({ timeout: 20000 });

    await searchInput.fill('locators');

    await expect(page.getByRole('option', { name: /locators/i }).first()).toBeVisible();
  });
});