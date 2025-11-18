import { successLogin } from './loginHelpers.js';
import { getRandomProduct, addProductToBasket, openBasket } from './productHelpers.js';

export const checkoutElements = (page) => {
  return {
    checkoutTitle: page.locator('[data-test="title"]'),
    firstName: page.locator('[data-test="firstName"]'),
    lastName: page.locator('[data-test="lastName"]'),
    postalCode: page.locator('[data-test="postalCode"]'),

    cancelBtn: page.locator('[data-test="cancel"]'),
    continueBtn: page.locator('[data-test="continue"]'),
  };
};

export const checkoutWithEmptyFirstName = async (
  lastNameLocator,
  lastNameValue,
  zipCodeLocator,
  zipcodeValue,
  continueBtn,
) => {
  await lastNameLocator.fill(lastNameValue);
  await zipCodeLocator.fill(zipcodeValue);
  await continueBtn.click();
};

export const checkoutWithEmptyLastName = async (
  firstNameLocator,
  firstNameValue,
  zipCodeLocator,
  zipcodeValue,
  continueBtn,
) => {
  await firstNameLocator.fill(firstNameValue);
  await zipCodeLocator.fill(zipcodeValue);
  await continueBtn.click();
};

export const checkoutWithEmptyZipCode = async (
  firstNameLocator,
  firstNameValue,
  lastNameLocator,
  lastNameValue,
  continueBtn,
) => {
  await firstNameLocator.fill(firstNameValue);
  await lastNameLocator.fill(lastNameValue);
  await continueBtn.click();
};

export const checkoutWithCorrectValue = async (
  firstNameLocator,
  firstNameValue,
  lastNameLocator,
  lastNameValue,
  zipCodeLocator,
  zipcodeValue,
  continueBtn,
) => {
  await firstNameLocator.fill(firstNameValue);
  await lastNameLocator.fill(lastNameValue);
  await zipCodeLocator.fill(zipcodeValue);
  await continueBtn.click();
};

export const clearFieldFunc = async (firstNameLocator, lastNameLocator, zipCodeLocator) => {
  await firstNameLocator.clear();
  await lastNameLocator.clear();
  await zipCodeLocator.clear();
};

export const goToCheckoutPage = async (page, username, password) => {
  // Login
  await successLogin(page, username, password);

  // Add random product
  const product = await getRandomProduct(page);
  await addProductToBasket(product);
  await openBasket(page);

  // Click Checkout
  await page.locator('[data-test="checkout"]').click();

  // Return all checkout locators
  return {
    ...checkoutElements(page),
    productName: product.name,
    productPrice: product.price,
    productDesc: product.desc,
  };
};

export const checkoutOverviewElements = (page, productInfo) => {
  return {
    overviewTitle: { locator: page.locator('[data-test="title"]'), expected: 'Checkout: Overview' },
    qtyLabel: { locator: page.locator('[data-test="cart-quantity-label"]'), expected: 'QTY' },
    cartDescLabel: {
      locator: page.locator('[data-test="cart-desc-label"]'),
      expected: 'Description',
    },
    itemQTY: { locator: page.locator('[data-test="item-quantity"]'), expected: '1' },
    itemName: {
      locator: page.locator('[data-test="inventory-item-name"]'),
      expected: productInfo.productName,
    },
    itemDesc: {
      locator: page.locator('[data-test="inventory-item-desc"]'),
      expected: productInfo.productDesc,
    },
    itemPrice: {
      locator: page.locator('[data-test="inventory-item-price"]'),
      expected: productInfo.productPrice,
    },
    paymentInfoLabel: {
      locator: page.locator('[data-test="payment-info-label"]'),
      expected: 'Payment Information:',
    },
    paymentInfoValue: {
      locator: page.locator('[data-test="payment-info-value"]'),
      expected: /SauceCard #\d+/,
    },
    shippingInfoLabel: {
      locator: page.locator('[data-test="shipping-info-label"]'),
      expected: 'Shipping Information:',
    },
    shippingInfoValue: {
      locator: page.locator('[data-test="shipping-info-value"]'),
      expected: 'Free Pony Express Delivery!',
    },
    totalInfoLabel: {
      locator: page.locator('[data-test="total-info-label"]'),
      expected: 'Price Total',
    },
    subtotalLabel: {
      locator: page.locator('[data-test="subtotal-label"]'),
      expected: /Item total: \$\d+(\.\d{2})?/,
    },
    taxLabel: {
      locator: page.locator('[data-test="tax-label"]'),
      expected: /Tax: \$\d+(\.\d{2})?/,
    },
    totalLabel: {
      locator: page.locator('[data-test="total-label"]'),
      expected: /Total: \$\d+(\.\d{2})?/,
    },

    cancelBtn: page.locator('[data-test="cancel"]'),
    finishBtn: page.locator('[data-test="finish"]'),
  };
};

export const checkoutCompleteElements = (page) => {
  return {
    overviewTitle: {
      locator: page.locator('[data-test="title"]'),
      expected: 'Checkout: Complete!',
    },
    completeHeader: {
      locator: page.locator('[data-test="complete-header"]'),
      expected: 'Thank you for your order!',
    },
    completeText: {
      locator: page.locator('[data-test="complete-text"]'),
      expected:
        'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    },

    backHomeBtn: page.locator('[data-test="back-to-products"]'),
  };
};
