import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  use: {
    baseURL: 'https://www.saucedemo.com/',
    headless: true, // turn off browser
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['line'], ['allure-playwright']],
});
