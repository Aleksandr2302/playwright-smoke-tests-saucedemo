import { test, expect } from '@playwright/test';
import { successLogin } from './helpers/loginHelpers.js';

test.describe('SauceDemo Smoke Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  const correctUserName = 'standard_user';
  const incorrectUserName = 'Alex';
  const correctPassword = 'secret_sauce';
  const incorrectPassword = '123';

  test('Test#1 - Open website and check all elements ', async ({ page }) => {
    await expect(page.locator('.login_logo')).toHaveCount(1);
    await expect(page.locator('#password')).toHaveCount(1);
    await expect(page.locator('#password')).toHaveAttribute('placeholder', 'Password');
    await expect(page.locator('#user-name')).toHaveCount(1);
    await expect(page.locator('#user-name')).toHaveAttribute('placeholder', 'Username');
    await expect(page.locator('#login-button')).toHaveCount(1);
  });

  test('Test#2 - Login with empty username and password', async ({ page }) => {
    await page.locator('#login-button').click();
    const error = await page.locator("h3[data-test='error']");
    await expect(error).toHaveText('Epic sadface: Username is required');
  });

  test('Test#3 - Login with empty username', async ({ page }) => {
    await page.type('#password', correctPassword);
    await page.locator('#login-button').click();

    const error = await page.locator("h3[data-test='error']");
    await expect(error).toHaveText('Epic sadface: Username is required');
  });

  test('Test#4 - Login with incorrect username', async ({ page }) => {
    await page.type('#user-name', incorrectUserName);
    await page.type('#password', correctPassword);
    await page.locator('#login-button').click();

    const error = await page.locator("h3[data-test='error']");
    await expect(error).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });

  test('Test#5 - Login with empty password', async ({ page }) => {
    await page.type('#user-name', correctUserName);

    await page.locator('#login-button').click();

    const error = await page.locator("h3[data-test='error']");
    await expect(error).toHaveText('Epic sadface: Password is required');
  });

  test('Test#6 - Login with incorrect password', async ({ page }) => {
    await page.type('#user-name', correctUserName);
    await page.type('#password', incorrectPassword);
    await page.locator('#login-button').click();

    const error = await page.locator("h3[data-test='error']");
    await expect(error).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });

  test('Test#7 - Login with correct username and password', async ({ page }) => {
    await successLogin(page, correctUserName, correctPassword);

    const titleText = await page.textContent('[data-test="title"]');
    expect(titleText).toBe('Products');
  });
});
