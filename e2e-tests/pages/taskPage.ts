import {
  Locator,
  Page
} from "@playwright/test";

export class TaskPage {
  readonly page: Page;
  private questionField: Locator;
  private answerField: Locator;
  private alertBanner: Locator;
  private logoutButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.questionField = page.locator('h3:has-text("Please solve")');
    this.answerField = page.locator('[placeholder="Answer here ✅"]');
    this.alertBanner = page.locator('ngb-alert');
    this.logoutButton = page.locator('button:has-text("Sign in")');
  }

  async goto() {
    await this.page.goto('localhost:4200/#/task');
  }

  async getQuestion(): Promise<string> {
    let wholeQuestion = await this.questionField.innerText();
    return wholeQuestion.substring(14, wholeQuestion.length)
  }

  async answer(answer: string){
    await this.answerField.click();
    await this.answerField.fill(answer);
    await this.answerField.press('Enter');
  }

  async alertMessage(): Promise<string> {
    return await this.alertBanner.innerText();
  }
  async logout(){
    await this.logoutButton.click();
  }
}
