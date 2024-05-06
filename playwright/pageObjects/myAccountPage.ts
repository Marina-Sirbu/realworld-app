import { Locator, Page } from "playwright/test";
import { User } from "../constants/types";

export class MyAccountPage {
  readonly page: Page;

  readonly firstNameInputField: Locator;

  readonly lastNameInputField: Locator;

  readonly emailInputField: Locator;

  readonly phoneNumberInputField: Locator;

  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInputField = page.locator("#user-settings-firstName-input");
    this.lastNameInputField = page.locator("#user-settings-lastName-input");
    this.emailInputField = page.locator("#user-settings-email-input");
    this.phoneNumberInputField = page.locator("#user-settings-phoneNumber-input");
    this.saveButton = page.getByTestId("user-settings-submit");
  }

  async fillUserDetailsForm(user: User) {
    await this.firstNameInputField.fill(user.firstName);
    await this.lastNameInputField.fill(user.lastName);
    await this.emailInputField.fill(user.email);
    await this.phoneNumberInputField.fill(user.phoneNumber);
  }

  async updateUserDetails(user: User) {
    await this.fillUserDetailsForm(user);
    await this.saveButton.click();
  }
}
