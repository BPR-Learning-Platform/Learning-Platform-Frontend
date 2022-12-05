import { test, expect } from '@playwright/test';
import { LoginPage } from "./pages/loginPage";

test('login with wrong email or password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.email('nonexistant@student.com');
  await loginPage.password('passwordthatisnotcorrect');
  await loginPage.login();

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
  await loginPage.email('student20@student.com');
  await loginPage.password('12345678');
  await loginPage.login();

  await expect(page).toHaveURL('http://localhost:4200/#/task');
  await expect(page.locator('text=Hi👋 Chamilla')).toBeVisible();
});
test('login with teacher successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.email('teacher1@teacher.com');
  await loginPage.password('12345678');
  await loginPage.login();

  await expect(page).toHaveURL('http://localhost:4200/#/main-statistics');
  await expect(page.locator('text=Hi👋 Mogens')).toBeVisible();
});
test('login with administrator successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.email('admin1@admin.com');
  await loginPage.password('12345678');
  await loginPage.login();

  await expect(page).toHaveURL('http://localhost:4200/#/create-user');
  await expect(page.locator('text=Hi👋 Admin')).toBeVisible();
});
