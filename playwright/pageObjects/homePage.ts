import { Locator, Page } from "@playwright/test";
import { Menu } from "./components/menu";

export class HomePage {
  readonly page: Page;

  readonly fullName: Locator;

  readonly username: Locator;

  readonly amountBalance: Locator;

  readonly userFullName: Locator;

  readonly menu: Menu;

  readonly transactionList: Locator;

  readonly newTransactionButton: Locator;

  readonly myTransactionsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullName = page.getByTestId("sidenav-user-full-name");
    this.username = page.getByTestId("sidenav-username");
    this.amountBalance = page.getByTestId("sidenav-user-balance");
    this.menu = new Menu(page);
    this.transactionList = page.getByTestId("transaction-list");
    this.newTransactionButton = page.getByTestId("nav-top-new-transaction");
    this.myTransactionsButton = page.getByTestId("nav-personal-tab");
  }

  async goto() {
    await this.page.goto("/");
  }
}
