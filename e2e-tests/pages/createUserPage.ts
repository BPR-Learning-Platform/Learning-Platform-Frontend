import {
  Locator,
  Page
} from "@playwright/test";

export class CreateUserPage {
  readonly page: Page;
  private nameField: Locator;
  private emailField: Locator;
  private passwordField: Locator;
  private typeField: Locator;
  private assignedGradeField: Locator;
  private createUserButton: Locator;
  private logoutButton: Locator;
  public userCreatedSuccessText: Locator;
  constructor(page: Page) {
    this.page = page;
    this.nameField = page.locator('input[type="string"]');
    this.emailField = page.locator('input[type="email"]');
    this.passwordField = page.locator('input[type="password"]');
    this.typeField = page.locator('select');
    this.assignedGradeField = page.locator('mat-select[role="combobox"]');
    this.createUserButton = page.locator('button:has-text("Create User")');
    this.logoutButton = page.locator('text=Logout');
    this.userCreatedSuccessText = page.locator('div:has-text("User created successfully")').nth(2);
  }

  async goto() {
    await this.page.goto('localhost:4200/#/create-user');
  }

  async name(name: string) {
    await this.nameField.click();
    await this.nameField.fill(name);
  }


  async email(email: string){
    await this.emailField.click();
    await this.emailField.fill(email);
  }

  async password(password: string){
    await this.passwordField.click();
    await this.passwordField.fill(password);
  }

  async type(type: string){
    await this.typeField.selectOption(type);
  }
  async assignedGrade(grade: string){
    await this.assignedGradeField.click();
    await this.page.locator('text=' + grade).click();
  }

  async createUser(){
    await this.createUserButton.click();
  }

  async logout(){
    await this.logoutButton.click();
  }
}
