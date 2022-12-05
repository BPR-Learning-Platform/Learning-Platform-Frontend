import {
  Locator,
  Page
} from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  private emailField: Locator;
  private passwordField: Locator;
  private signInButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator('input[type="email"]');
    this.passwordField = page.locator('input[type="password"]');
    this.signInButton = page.locator('button:has-text("Sign in")');
  }

  async goto() {
    await this.page.goto('localhost:4200/#/login');
  }

  async email(email: string){
    await this.emailField.click();
    await this.emailField.fill(email);
  }

  async password(password: string){
    await this.passwordField.click();
    await this.passwordField.fill(password);
  }

  async login(){
    await this.signInButton.click();
  }
}
