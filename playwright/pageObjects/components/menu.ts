import { Locator, Page } from "@playwright/test";

export class Menu {
  readonly page: Page;

  readonly homeButton: Locator;

  readonly myAccountButton: Locator;

  readonly bankAccountsButton: Locator;

  readonly notificationsButton: Locator;

  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeButton = page.getByTestId("sidenav-home");
    this.myAccountButton = page.getByTestId("sidenav-user-settings");
    this.bankAccountsButton = page.getByTestId("sidenav-bankaccounts");
    this.notificationsButton = page.getByTestId("sidenav-notifications");
    this.logoutButton = page.getByTestId("sidenav-signout");
  }
}
