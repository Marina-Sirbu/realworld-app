import { Locator, Page } from "playwright/test";
import { User } from "../constants/types";

export class SignUpPage {
  readonly page: Page;

  readonly firstNameInputField: Locator;

  readonly lastNameInputField: Locator;

  readonly usernameInputField: Locator;

  readonly passwordInputField: Locator;

  readonly confirmPasswordInputField: Locator;

  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInputField = page.locator("#firstName");
    this.lastNameInputField = page.locator("#lastName");
    this.usernameInputField = page.locator("#username");
    this.passwordInputField = page.locator("#password");
    this.confirmPasswordInputField = page.locator("#confirmPassword");
    this.signUpButton = page.getByTestId("signup-submit");
  }

  async goto() {
    await this.page.goto("/signup");
  }

  async fillSignUpForm(newUser: User) {
    await this.firstNameInputField.fill(newUser.firstName);
    await this.lastNameInputField.fill(newUser.lastName);
    await this.passwordInputField.fill(newUser.password);
    await this.usernameInputField.fill(newUser.username);
    await this.confirmPasswordInputField.fill(newUser.password);
  }

  async signUp(newUser: User) {
    await this.fillSignUpForm(newUser);
    await this.signUpButton.click();
  }
}
