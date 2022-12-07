import { test, expect } from '@playwright/test';
import { LoginPage } from "./pages/loginPage";

test('login with wrong email or password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginWithCredentials('nonexistant@student.com', 'passwordthatisnotcorrect');

  await expect(page.locator('text=Couldn\'t log you in with those credentials, please try again.')).toBeVisible();
});

test('Invalid data in submit forms, gives error text', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.email('student.com');

  await page.keyboard.press('Tab');
  await expect(page.locator('text=Username must be an E-mail')).toBeVisible();

  await loginPage.password('1234');

  await page.keyboard.press('Tab');
  await expect(page.locator('text=Password must have at least 8 characters')).toBeVisible();
  });

test('login with student successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginWithCredentials('student20@student.com', '12345678');

  await expect(page).toHaveURL('http://localhost:4200/#/task');
  await expect(page.locator('text=Hi👋 Chamilla')).toBeVisible();
});
test('login with teacher successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginWithCredentials('teacher1@teacher.com', '12345678');

  await expect(page).toHaveURL('http://localhost:4200/#/main-statistics');
  await expect(page.locator('text=Hi👋 Mogens')).toBeVisible();
});
test('login with administrator successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginWithCredentials('admin1@admin.com', '12345678');

  await expect(page).toHaveURL('http://localhost:4200/#/create-user');
  await expect(page.locator('text=Hi👋 Admin')).toBeVisible();
});
