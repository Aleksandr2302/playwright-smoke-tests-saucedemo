import { test, expect } from '@playwright/test';
import { successLogin } from './helpers/loginHelpers.js';
import { getRandomProduct, addProductToBasket, openBasket } from './helpers/productHelpers.js';
import { basketElements } from './helpers/basketHelpers.js';

test.describe('SauceDemo Smoke Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  const correctUserName = 'standard_user';
  const correctPassword = 'secret_sauce';

  test('Test#12 - Open website and add random product to basket ', async ({ page }) => {
    await successLogin(page, correctUserName, correctPassword);

    const product = await getRandomProduct(page);
    await addProductToBasket(product);
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('1');
  });

  test('Test#13 - Open website and check all elements on the basket page ', async ({ page }) => {
    await successLogin(page, correctUserName, correctPassword);

    const product = await getRandomProduct(page);
    await addProductToBasket(product);

    await openBasket(page);
    const productId = product.name.toLowerCase().replaceAll(' ', '-');
    const allBasketElements = await basketElements(page, productId);

    await expect(allBasketElements.cartBadge).toHaveText('1');
    await expect(allBasketElements.basketTitle).toHaveText('Your Cart');
    await expect(allBasketElements.basketDescLabel).toHaveText('Description');
    await expect(allBasketElements.itemBasketQnt).toHaveText('1');
    await expect(allBasketElements.productName).toHaveText(product.name);
    await expect(allBasketElements.productDesc).toHaveText(product.desc);
    await expect(allBasketElements.productPrice).toHaveText(product.price);
    await expect(allBasketElements.removeBtn).toHaveText('Remove');
    await expect(allBasketElements.continueShoppingBtn).toHaveText('Continue Shopping');
    await expect(allBasketElements.checkoutBtn).toHaveText('Checkout');
  });

  test('Test#14 - Open website and check the continue button on the basket page ', async ({
    page,
  }) => {
    await successLogin(page, correctUserName, correctPassword);

    const product = await getRandomProduct(page);
    await addProductToBasket(product);
    await openBasket(page);

    const continueBtn = page.locator('[data-test="continue-shopping"]');
    await continueBtn.click();
    const productTitle = page.locator('[data-test="title"]');
    await expect(productTitle).toHaveText('Products');
  });

  test('Test#15 - Open website and check the checkout button on the basket page ', async ({
    page,
  }) => {
    await successLogin(page, correctUserName, correctPassword);

    const product = await getRandomProduct(page);
    await addProductToBasket(product);
    await openBasket(page);

    const checkoutBtn = page.locator('[data-test="checkout"]');
    await checkoutBtn.click();
    const checkoutTitle = page.locator('[data-test="title"]');
    await expect(checkoutTitle).toHaveText('Checkout: Your Information');
  });
});
