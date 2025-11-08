import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all category pages', async ({ page }) => {
    await page.goto('/');

    // Test navigation to AI
    await page.locator('nav a:has-text("AI")').click();
    await expect(page).toHaveURL('/ai');
    await expect(page.locator('#content')).toBeVisible();

    // Test navigation to Dev
    await page.locator('nav a:has-text("Dev")').click();
    await expect(page).toHaveURL('/dev');
    await expect(page.locator('#content')).toBeVisible();

    // Test navigation to Design
    await page.locator('nav a:has-text("Design")').click();
    await expect(page).toHaveURL('/design');
    await expect(page.locator('#content')).toBeVisible();

    // Test navigation to Photo
    await page.locator('nav a:has-text("Photo")').click();
    await expect(page).toHaveURL('/photo');
    await expect(page.locator('#content')).toBeVisible();

    // Test navigation to About
    await page.locator('nav a:has-text("About")').click();
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h2:has-text("About")')).toBeVisible();
  });

  test('should navigate back to home from logo', async ({ page }) => {
    await page.goto('/about');

    // Click logo to go home
    await page.locator('#logo a').click();
    await expect(page).toHaveURL('/');
  });

  test('should show active nav state', async ({ page }) => {
    await page.goto('/ai');

    // AI nav link should have active class
    const aiLink = page.locator('nav a:has-text("AI")');
    await expect(aiLink).toHaveClass(/active/);
  });

  test('should navigate to detail pages from category', async ({ page }) => {
    await page.goto('/ai');

    // Click on first portfolio item
    await page.locator('.grid-panel a').first().click();

    // Should navigate to detail page
    await expect(page).toHaveURL(/\/ai\/.+/);
    await expect(page.locator('#sub-content')).toBeVisible();
    await expect(page.locator('#sub-content h2')).toBeVisible();
  });

  test('should handle hash navigation to chatbot', async ({ page }) => {
    // Navigate directly to chatbot via hash
    await page.goto('/#chat-bot');

    // Chatbot should be visible and scrolled into view
    await expect(page.locator('#chat-bot')).toBeVisible();

    // Check if chatbot is in viewport (scrolled to)
    const chatbot = page.locator('#chat-bot');
    const boundingBox = await chatbot.boundingBox();
    expect(boundingBox).not.toBeNull();
  });
});
