import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly welcomeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    // These selectors are set up for a standard testing site like SauceLabs
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error-msg"]');
    this.welcomeHeader = page.locator('#welcome-message');
  }

  async navigate() {
    await this.page.goto('https://www.sleekflow.io'); 
  }

  async login(username: string, password: string) {
    if (username) await this.usernameInput.fill(username);
    if (password) await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessageText(): Promise<string> {
    return await this.errorMessage.innerText();
  }

  async getWelcomeMessageText(): Promise<string> {
    return await this.welcomeHeader.innerText();
  }
}