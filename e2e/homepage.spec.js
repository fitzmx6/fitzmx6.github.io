import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load without errors', async ({ page }) => {
    // This test would have caught the "Cannot access 'P' before initialization" error
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));

    await page.goto('/');

    // Check that no JavaScript errors occurred
    expect(errors).toHaveLength(0);
  });

  test('should display featured categories (AI and Dev)', async ({ page }) => {
    await page.goto('/');

    // Wait for content to load
    await expect(page.locator('h2:has-text("AI")')).toBeVisible();
    await expect(page.locator('h2:has-text("Dev")')).toBeVisible();
  });

  test('should display category images', async ({ page }) => {
    await page.goto('/');

    // Check that images are present and loaded
    const categoryImages = page.locator('.grid-panel img');
    await expect(categoryImages).toHaveCount(2);

    // Verify images have loaded (not broken)
    const firstImage = categoryImages.first();
    await expect(firstImage).toBeVisible();
    await expect(firstImage).toHaveAttribute('alt');
  });

  test('should display chatbot section', async ({ page }) => {
    await page.goto('/');

    // Check chatbot is present
    await expect(page.locator('#chat-bot')).toBeVisible();
    await expect(page.locator('text=Ask me about Cory\'s skills and experience')).toBeVisible();
  });

  test('should display example questions', async ({ page }) => {
    await page.goto('/');

    // Check example questions are visible
    await expect(page.locator('text=Try asking:')).toBeVisible();
    await expect(page.locator('button.example-question')).toHaveCount(3);
  });

  test('should have functional navigation links', async ({ page }) => {
    await page.goto('/');

    // Click on AI category
    await page.locator('.grid-panel:has-text("AI") a').first().click();

    // Should navigate to AI page
    await expect(page).toHaveURL('/ai');
  });

  test('should display welcome message in chatbot', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('text=Welcome! Ask me anything about Cory\'s technical skills')).toBeVisible();
  });
});
