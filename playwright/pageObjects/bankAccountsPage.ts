import { Locator, Page } from "@playwright/test";

export class BankAccountsPage {
  readonly page: Page;

  readonly createButton: Locator;

  readonly deleteButton: Locator;

  readonly bankAccountsList: Locator;

  readonly bankAccount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createButton = page.getByTestId("bankaccount-new");
    this.deleteButton = page.getByTestId("bankaccount-delete");
    this.bankAccountsList = page.getByTestId("bankaccount-list");
    this.bankAccount = this.bankAccountsList.locator("li");
  }
}
