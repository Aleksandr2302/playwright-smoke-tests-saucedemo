import { test, expect } from '@playwright/test';
import { successLogin } from './helpers/loginHelpers.js';
import { getRandomProduct, addProductToBasket, openBasket } from './helpers/productHelpers.js';
import {
  checkoutElements,
  checkoutWithEmptyFirstName,
  clearFieldFunc,
  checkoutWithEmptyLastName,
  goToCheckoutPage,
  checkoutWithEmptyZipCode,
  checkoutWithCorrectValue,
  checkoutOverviewElements,
  checkoutCompleteElements,
} from './helpers/checkoutHelpers.js';

test.describe('SauceDemo Smoke Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  const correctUserName = 'standard_user';
  const correctPassword = 'secret_sauce';

  const firstName = 'Alex';
  const lastName = 'Ivanov';
  const zipCode = '15333';

  test('Test#16 - Check all elements on the "Checkout: Your Information" page', async ({
    page,
  }) => {
    const checkout = await goToCheckoutPage(page, correctUserName, correctPassword);

    await expect((await checkout).checkoutTitle).toHaveText('Checkout: Your Information');
    await expect((await checkout).firstName).toHaveAttribute('placeholder', 'First Name');
    await expect((await checkout).lastName).toHaveAttribute('placeholder', 'Last Name');
    await expect((await checkout).postalCode).toHaveAttribute('placeholder', 'Zip/Postal Code');
    await expect((await checkout).continueBtn).toBeVisible();
    await expect((await checkout).cancelBtn).toBeVisible();
  });

  test('Test#17 - Check cancel button on on the "Checkout: Your Information" page', async ({
    page,
  }) => {
    const checkout = await goToCheckoutPage(page, correctUserName, correctPassword);

    const cancelBtn = (await checkout).cancelBtn;
    await cancelBtn.click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  });

  test('Test#18 - Fill form with empty First Name field on the on the "Checkout: Your Information" page', async ({
    page,
  }) => {
    const checkout = await goToCheckoutPage(page, correctUserName, correctPassword);

    await checkoutWithEmptyLastName(
      checkout.firstName,
      firstName,
      checkout.postalCode,
      zipCode,
      checkout.continueBtn,
    );

    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');
    await clearFieldFunc(checkout.firstName, checkout.lastName, checkout.postalCode);
  });

  test('Test#19 - Fill form with empty Last Name field on the on the "Checkout: Your Information" page', async ({
    page,
  }) => {
    const checkout = await goToCheckoutPage(page, correctUserName, correctPassword);
    await checkoutWithEmptyFirstName(
      checkout.lastName,
      lastName,
      checkout.postalCode,
      zipCode,
      checkout.continueBtn,
    );
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
    await clearFieldFunc(checkout.firstName, checkout.lastName, checkout.postalCode);
  });

  test('Test#20 - Fill form with empty Zip Code field on the on the "Checkout: Your Information" page', async ({
    page,
  }) => {
    const checkout = await goToCheckoutPage(page, correctUserName, correctPassword);
    await checkoutWithEmptyZipCode(
      checkout.firstName,
      firstName,
      checkout.lastName,
      lastName,
      checkout.continueBtn,
    );
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
    await clearFieldFunc(checkout.firstName, checkout.lastName, checkout.postalCode);
  });

  test('Test#21 - Fill form with correct fields and check "Continue" button on the on the "Checkout: Your Information" page', async ({
    page,
  }) => {
    const checkout = await goToCheckoutPage(page, correctUserName, correctPassword);
    await checkoutWithCorrectValue(
      checkout.firstName,
      firstName,
      checkout.lastName,
      lastName,
      checkout.postalCode,
      zipCode,
      checkout.continueBtn,
    );
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
  });

  test('Test#22 - Check "Checkout: Overview" page', async ({ page }) => {
    const checkout = await goToCheckoutPage(page, correctUserName, correctPassword);
    await checkoutWithCorrectValue(
      checkout.firstName,
      firstName,
      checkout.lastName,
      lastName,
      checkout.postalCode,
      zipCode,
      checkout.continueBtn,
    );

    const checkoutElements = checkoutOverviewElements(page, checkout);

    await expect(checkoutElements.overviewTitle.locator).toHaveText(
      checkoutElements.overviewTitle.expected,
    );
    await expect(checkoutElements.itemQTY.locator).toHaveText(checkoutElements.itemQTY.expected);
    await expect(checkoutElements.itemDesc.locator).toHaveText(checkoutElements.itemDesc.expected);
    await expect(checkoutElements.itemQTY.locator).toHaveText(checkoutElements.itemQTY.expected);
    await expect(checkoutElements.itemName.locator).toHaveText(checkout.productName);
    await expect(checkoutElements.itemDesc.locator).toHaveText(checkout.productDesc);
    await expect(checkoutElements.itemPrice.locator).toHaveText(checkout.productPrice);
    await expect(checkoutElements.paymentInfoLabel.locator).toHaveText(
      checkoutElements.paymentInfoLabel.expected,
    );
    await expect(checkoutElements.paymentInfoValue.locator).toHaveText(
      checkoutElements.paymentInfoValue.expected,
    );
    await expect(checkoutElements.shippingInfoLabel.locator).toHaveText(
      checkoutElements.shippingInfoLabel.expected,
    );
    await expect(checkoutElements.shippingInfoValue.locator).toHaveText(
      checkoutElements.shippingInfoValue.expected,
    );

    await expect(checkoutElements.totalInfoLabel.locator).toHaveText(
      checkoutElements.totalInfoLabel.expected,
    );
    await expect(checkoutElements.subtotalLabel.locator).toHaveText(
      checkoutElements.subtotalLabel.expected,
    );
    await expect(checkoutElements.taxLabel.locator).toHaveText(checkoutElements.taxLabel.expected);
    await expect(checkoutElements.totalLabel.locator).toHaveText(
      checkoutElements.totalLabel.expected,
    );
    await expect(checkoutElements.cancelBtn).toBeVisible();
    await expect(checkoutElements.finishBtn).toBeVisible();
  });

  test('Test#23 - Check cancel button on the "Checkout: Your Information" page', async ({
    page,
  }) => {
    const checkout = await goToCheckoutPage(page, correctUserName, correctPassword);
    await checkoutWithCorrectValue(
      checkout.firstName,
      firstName,
      checkout.lastName,
      lastName,
      checkout.postalCode,
      zipCode,
      checkout.continueBtn,
    );
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

    const checkoutElements = checkoutOverviewElements(page, checkout);
    checkoutElements.cancelBtn.click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('Test#24 - Check finish button on the "Checkout: Your Information" page and check elements on the "Checkout: Complete!" page', async ({
    page,
  }) => {
    const checkout = await goToCheckoutPage(page, correctUserName, correctPassword);
    await checkoutWithCorrectValue(
      checkout.firstName,
      firstName,
      checkout.lastName,
      lastName,
      checkout.postalCode,
      zipCode,
      checkout.continueBtn,
    );
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

    const checkoutElements = checkoutOverviewElements(page, checkout);
    checkoutElements.finishBtn.click();

    const checkoutCompleteAllElements = checkoutCompleteElements(page);
    await expect(checkoutCompleteAllElements.overviewTitle.locator).toHaveText(
      checkoutCompleteAllElements.overviewTitle.expected,
    );
    await expect(checkoutCompleteAllElements.completeHeader.locator).toHaveText(
      checkoutCompleteAllElements.completeHeader.expected,
    );
    await expect(checkoutCompleteAllElements.completeText.locator).toHaveText(
      checkoutCompleteAllElements.completeText.expected,
    );
  });

  test('Test#25 - Check back home button on the "Checkout: Complete!" page', async ({ page }) => {
    const checkout = await goToCheckoutPage(page, correctUserName, correctPassword);
    await checkoutWithCorrectValue(
      checkout.firstName,
      firstName,
      checkout.lastName,
      lastName,
      checkout.postalCode,
      zipCode,
      checkout.continueBtn,
    );
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

    const checkoutElements = checkoutOverviewElements(page, checkout);
    checkoutElements.finishBtn.click();

    const checkoutCompleteAllElements = checkoutCompleteElements(page);
    checkoutCompleteAllElements.backHomeBtn.click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });
});
