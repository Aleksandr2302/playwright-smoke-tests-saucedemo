import { test, expect } from '@playwright/test';
import { successLogin } from './helpers/loginHelpers.js';
import {
  getRandomProduct,
  getProductsList,
  applyProductFilter,
  addProductToBasket,
} from './helpers/productHelpers.js';

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

  test('Test#8 - Open website and check elements of random product ', async ({ page }) => {
    await successLogin(page, correctUserName, correctPassword);

    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
    await expect(page.locator('#shopping_cart_container')).toBeVisible();
    await expect(page.locator('.product_sort_container')).toBeVisible();
    const product = await getRandomProduct(page);
    expect(product.name.length).toBeGreaterThan(0);
    expect(product.desc.length).toBeGreaterThan(0);
    expect(product.addButton).toBeVisible();
    expect(product.price).toMatch(/^\$\d+(\.\d{2})?$/);
  });

  test('Test#9 - Open website and check product filter (Name A → Z)', async ({ page }) => {
    // 1️⃣ Autorization
    await successLogin(page, correctUserName, correctPassword);
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');

    // 2️⃣ Apply filter "Name (A to Z)"
    await applyProductFilter(page, 'az');

    // 3️⃣ Get product list
    const allProducts = await getProductsList(page);

    // 4️⃣ Check the product list is not empty
    expect(allProducts.length).toBeGreaterThan(0);

    // 5️⃣ Check producct filter
    const sortedNames = [...allProducts.map((p) => p.name)].sort((a, b) => a.localeCompare(b));
    expect(allProducts.map((p) => p.name)).toEqual(sortedNames);
  });

  test('Test#10 - Open website and check product filter (Name Z → A)', async ({ page }) => {
    // 1️⃣ Autorization
    await successLogin(page, correctUserName, correctPassword);
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');

    // 2️⃣ Apply filter "Name (Z to A)"
    await applyProductFilter(page, 'za');

    // 3️⃣ Get product list
    const allProducts = await getProductsList(page);

    // 4️⃣ Check the product list is not empty
    expect(allProducts.length).toBeGreaterThan(0);

    // 5️⃣ Check producct filter
    const sortedNames = [...allProducts.map((p) => p.name)].sort((a, b) => b.localeCompare(a));
    expect(allProducts.map((p) => p.name)).toEqual(sortedNames);
  });

  test('Test#11 - Open website and check product filter (Price low to high)', async ({ page }) => {
    // 1️⃣ Autorization
    await successLogin(page, correctUserName, correctPassword);
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');

    // 2️⃣ Apply filter "Price (low to high)"
    await applyProductFilter(page, 'lohi');

    // 3️⃣ Get product list
    const allProducts = await getProductsList(page);

    // 4️⃣ Check the product list is not empty
    expect(allProducts.length).toBeGreaterThan(0);

    // 5️⃣ Check producct filter
    const sortedPrices = [...allProducts.map((p) => p.price)].sort((a, b) => a - b);
    expect(allProducts.map((p) => p.price)).toEqual(sortedPrices);
  });

  test('Test#11 - Open website and check product filter (Price high to low)', async ({ page }) => {
    // 1️⃣ Autorization
    await successLogin(page, correctUserName, correctPassword);
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');

    // 2️⃣ Apply filter "Price (low to high)"
    await applyProductFilter(page, 'hilo');

    // 3️⃣ Get product list
    const allProducts = await getProductsList(page);

    // 4️⃣ Check the product list is not empty
    expect(allProducts.length).toBeGreaterThan(0);

    // 5️⃣ Check producct filter
    const sortedPrices = [...allProducts.map((p) => p.price)].sort((a, b) => b - a);
    expect(allProducts.map((p) => p.price)).toEqual(sortedPrices);
  });
});
