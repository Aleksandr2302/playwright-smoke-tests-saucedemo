export const basketElements = async (page, productId) => {
  return {
    cartBadge: page.locator('[data-test="shopping-cart-badge"]'),
    basketTitle: page.locator('[data-test="title"]'),
    basketDescLabel: page.locator('[data-test="cart-desc-label"]'),
    itemBasketQnt: page.locator('[data-test="item-quantity"]'),

    productName: page.locator('[data-test="inventory-item-name"]'),
    productDesc: page.locator('[data-test="inventory-item-desc"]'),
    productPrice: page.locator('[data-test="inventory-item-price"]'),

    removeBtn: page.locator(`[data-test="remove-${productId}"]`),
    continueShoppingBtn: page.locator('[data-test="continue-shopping"]'),
    checkoutBtn: page.locator('[data-test="checkout"]'),
  };
};
