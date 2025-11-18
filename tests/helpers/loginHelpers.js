export const successLogin = async (page, correctUserName, correctPassword) => {
  await page.fill('#user-name', correctUserName);
  await page.fill('#password', correctPassword);
  await page.locator('#login-button').click();

  // need to wait
  await page.locator('[data-test="title"]').waitFor();
};
