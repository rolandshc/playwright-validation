import { test, expect, devices } from '@playwright/test';

// Take a screenshot after each test case, whether it passes or fails
test.afterEach(async ({ page }, testInfo) => {
  const screenshotPath = `test-results/${testInfo.title.replace(/\s+/g, '_')}-${testInfo.status}.png`;
  await page.screenshot({ path: screenshotPath });
  await testInfo.attach('Screenshot', {
    path: screenshotPath,
    contentType: 'image/png',
  });
});

test.describe('Static Site Validation Tests', () => {
  test('Login form submission', async ({ page }) => {
    await page.goto('/');

    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');

    // Expect an alert to appear with the correct message
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Login successful (simulated)');
      await page.waitForTimeout(1000); // Simulate some delay
      await dialog.accept();
    });

    await page.click('#login-form button');
  });

  test('Confirm and prompt buttons', async ({ page }) => {
    await page.goto('/');

    // Test confirm button
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('Are you sure?');
      await page.waitForTimeout(1000); // Simulate some delay
      await dialog.accept();
    });
    await page.click('#confirmBtn');

    // Test prompt button
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('What is your name?');
      await page.waitForTimeout(1000); // Simulate some delay
      await dialog.accept('Playwright User');
    });
    await page.click('#promptBtn');
  });

  test('Keyboard and mouse interactions', async ({ page }) => {
    await page.goto('/');

    // Test keyboard input
    await page.fill('#keyboard-input', 'Hello Playwright');
    await expect(page.locator('#keyboard-input')).toHaveValue('Hello Playwright');

    // Test hover interaction
    const hoverElement = page.locator('#hover-me');
    await hoverElement.hover();
    await expect(hoverElement).toHaveCSS('background-color', 'rgb(238, 238, 238)');
  });

  test('Delayed content loading', async ({ page }) => {
    await page.goto('/');

    // Wait for delayed content to appear
    await page.waitForSelector('#delayed-content p');
    await expect(page.locator('#delayed-content p')).toHaveText('Loaded after delay');
  });

  test('Hidden elements', async ({ page }) => {
    await page.goto('/');

    // Check visibility of hidden message
    const hiddenMessage = page.locator('#hidden-msg');
    await expect(hiddenMessage).toBeHidden();
  });

  test('Checkbox, radio, and select inputs', async ({ page }) => {
    await page.goto('/');

    // Test checkbox
    const checkbox = page.locator('#agree');
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Test radio buttons
    const adminRadio = page.locator('input[name="role"][value="admin"]');
    await adminRadio.check();
    await expect(adminRadio).toBeChecked();

    // Test select dropdown
    const countrySelect = page.locator('#country');
    await countrySelect.selectOption('us');
    await expect(countrySelect).toHaveValue('us');
  });

  test('Navigation simulation', async ({ page }) => {
    await page.goto('/');

    // Test navigation to About Us section
    await page.click('#nav-about');
    await page.evaluate(() => {
      document.querySelector('#about')?.removeAttribute('style');
    });
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
  });

  test('Custom attributes', async ({ page }) => {
    await page.goto('/');

    // Test custom data-testid attribute
    const greeting = page.locator('[data-testid="greeting"]');
    await expect(greeting).toHaveText('Welcome, user!');
  });

  test('Screenshots and visual testing', async ({ page }) => {
    await page.goto('/');

    // Ensure the #about element is visible before capturing the screenshot
    await page.evaluate(() => {
      document.querySelector('#about')?.removeAttribute('style');
    });
    const element = page.locator('#about');
    await element.screenshot({ path: '__snapshots__/element-screenshot.png' });

    // Visual comparison (requires Playwright's snapshot testing capabilities)
    expect(await page.screenshot()).toMatchSnapshot('__snapshots__/full-page-visual.png');
  });

  test('Negative test case', async ({ page }, testInfo) => {
    await page.goto('/');
    test.fail(true, 'Expected to fail');
    expect(false).toBe(true);
  });
});