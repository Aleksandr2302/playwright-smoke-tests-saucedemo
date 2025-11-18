export const getRandomProduct = async (page) => {
  // 1. Get all products
  const products = await page.locator('[data-test="inventory-item"]');

  // 2. Generate random index
  const count = await products.count();
  const randomIndex = Math.floor(Math.random() * count);

  // 3. Take random product using random index
  const randomProduct = products.nth(randomIndex);

  // 4. Get random product
  const name = await randomProduct.locator('[data-test="inventory-item-name"]').textContent();
  const price = await randomProduct.locator('[data-test="inventory-item-price"]').textContent();
  const desc = await randomProduct.locator('[data-test="inventory-item-desc"]').textContent();
  const addButton = randomProduct.locator('button[data-test^="add-to-cart"]');

  // 5. Return product object
  return { name, price, desc, addButton };
};

export async function getProductsList(page) {
  // Find all elements 
  const products = await page.locator('.inventory_item').all();
  const productList = [];

  for (const product of products) {
    const name = await product.locator('.inventory_item_name').innerText();
    const priceText = await product.locator('.inventory_item_price').innerText();
    const price = parseFloat(priceText.replace('$', ''));

    productList.push({ name, price });
  }

  return productList;
}

export async function applyProductFilter(page, filterValue) {
  await page.locator('.product_sort_container').selectOption(filterValue);
}

export async function addProductToBasket(randomProduct) {
  await randomProduct.addButton.click();
}

export async function openBasket(page) {
  const basketLink = page.locator('.shopping_cart_link');
  await basketLink.click();
}
