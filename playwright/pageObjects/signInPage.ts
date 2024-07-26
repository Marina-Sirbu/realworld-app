import { Locator, Page } from "playwright/test";
import { User } from "../constants/types";

export class SignInPage {
  readonly page: Page;

  readonly usernameInputField: Locator;

  readonly passwordInputField: Locator;

  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInputField = page.locator("#username");
    this.passwordInputField = page.locator("#password");
    this.signInButton = page.getByTestId("signin-submit");
  }

  async goto() {
    await this.page.goto("/signin");
  }

  async fillSignInForm(user: User) {
    await this.usernameInputField.fill(user.username);
    await this.passwordInputField.fill(user.password);
  }

  async signIn(user: User) {
    await this.fillSignInForm(user);
    await this.signInButton.click();
  }
}
