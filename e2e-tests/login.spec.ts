import { test, expect } from '@playwright/test';

test('login with wrong email or password', async ({ page }) => {
  await page.goto('http://localhost:4200/#/login');

  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('nonexistant@student.com');

  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('passwordthatisnotcorrect');

  await page.locator('button:has-text("Sign in")').click();

  await expect(page.locator('text=Couldn\'t log you in with those credentials, please try again.')).toBeVisible();
});

test('Invalid data in submit forms, gives error text', async ({ page }) => {
  await page.goto('http://localhost:4200/#/login');

  await page.locator('input[type="email"]').click();

  await page.locator('input[type="email"]').fill('student.com');
  await page.locator('html').click();

  await expect(page.locator('text=Username must be an E-mail')).toBeVisible();

  await page.locator('input[type="password"]').click();

  await page.locator('input[type="password"]').fill('1234');
  await page.locator('html').click();

  await expect(page.locator('text=Password must have at least 8 characters')).toBeVisible();
});

test('login sucessfully', async ({ page }) => {
  await page.goto('http://localhost:4200/#/login');

  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('student20@student.com');

  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');

  await page.locator('button:has-text("Sign in")').click();
  await expect(page).toHaveURL('http://localhost:4200/#/task');
  await expect(page.locator('text=Hi👋 Student20')).toBeVisible();
});
