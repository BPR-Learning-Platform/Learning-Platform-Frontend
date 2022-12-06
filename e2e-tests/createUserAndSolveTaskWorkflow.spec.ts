import { test, expect } from '@playwright/test';
import {CreateUserPage} from "./pages/createUserPage";
import {LoginPage} from "./pages/loginPage";
import {TaskPage} from "./pages/taskPage";
import {generateEmail} from "./helpers/generateEmail";


test('Create student and sign in with newly created user', async ({ page }) => {
  // Login with admin
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginWithCredentials('admin1@admin.com', '12345678');

  await expect(page).toHaveURL('http://localhost:4200/#/create-user');
  await expect(page.locator('text=Hi👋 Admin')).toBeVisible();

  // Create new user
  const email = generateEmail();
  const createUserPage = new CreateUserPage(page);
  await createUserPage.name("Test Student");
  await createUserPage.email(email);
  await createUserPage.password("12345678");
  await createUserPage.type("S");
  await createUserPage.assignedGrade("1C");
  await createUserPage.createUser();

  await expect(createUserPage.userCreatedSuccessText).toBeVisible();
  await page.waitForTimeout(1000);
  await createUserPage.logout();

  // Login with newly created user
  await loginPage.goto();
  await loginPage.loginWithCredentials(email, '12345678');

  await expect(page).toHaveURL('http://localhost:4200/#/task');
  await expect(page.locator('text=Hi👋 Test Student')).toBeVisible();

  // Solve task
  await page.waitForTimeout(1000);
  const taskPage = new TaskPage(page);

  // Answering correctly
  await taskPage.answerCorrectly()

  await expect(await taskPage.alertMessage()).toBe('You did it! Awesome! Keep going!');
  await page.waitForTimeout(4500);

  // Answering incorrectly
  await taskPage.answerIncorrectly()

  await expect(await taskPage.alertMessage()).toBe('That wasn\'t the correct answer, next time you will get it!');
  await page.waitForTimeout(4500);

  await taskPage.logout();
});
