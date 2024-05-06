import { expect } from "@playwright/test";
import { test } from "../../config/customTestOptions";
import { TestContext } from "../../context/testContext";
import { BankAccountsPage } from "../../pageObjects/bankAccountsPage";
import { NewBankAccountPage } from "../../pageObjects/newBankAccountPage";
import { SignInPage } from "../../pageObjects/signInPage";
import { generateRandomBankAccount } from "../../utils/userUtils";
import { HomePage } from "../../pageObjects/homePage";
import { BankAccount, User } from "../../constants/types";
import { getBankAccounts } from "../../utils/apiUtils";

const user: User = JSON.parse(TestContext.REGISTERED_USER);
const newBankAccount: BankAccount = generateRandomBankAccount();

let signInPage: SignInPage;
let homePage: HomePage;
let bankAccountsPage: BankAccountsPage;
let newBankAccountPage: NewBankAccountPage;
let createdBankAccount: BankAccount;

test.use({ storageState: TestContext.STORAGE_STATE_COOKIES });

test.describe("Bank Account Tests @ui", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(
    "Sign in with existing account and go to Bank Accounts page",
    async ({ page }) => {
      signInPage = new SignInPage(page);
      homePage = new HomePage(page);
      bankAccountsPage = new BankAccountsPage(page);
      newBankAccountPage = new NewBankAccountPage(page);

      await signInPage.goto();
      await signInPage.signIn(user);

      await homePage.menu.bankAccountsButton.click();
    }
  );

  test("Should add new bank account", async ({ request, apiURL }) => {
    await test.step("Create a new bank account", async () => {
      await bankAccountsPage.createButton.click();
      await newBankAccountPage.createBankAccount(newBankAccount);
    });

    await test.step("Verify new bank account is created in Database", async () => {
      const userBankAccounts = await getBankAccounts(request, apiURL);
      createdBankAccount = userBankAccounts[userBankAccounts.length - 1];
      expect.soft(createdBankAccount.bankName).toBe(newBankAccount.bankName);
      expect.soft(createdBankAccount.accountNumber).toBe(newBankAccount.accountNumber);
      expect.soft(createdBankAccount.routingNumber).toBe(newBankAccount.routingNumber);
    });

    await test.step("Verify Bank Accounts page contains the created bank account", async () => {
      await expect.soft(bankAccountsPage.bankAccount.last()).toContainText(newBankAccount.bankName);
    });
  });

  test("Should delete bank account", async ({ request, apiURL }) => {
    await test.step("Delete a bank account", async () => {
      await bankAccountsPage.deleteButton.last().click();
    });

    await test.step("Verify bank account is deleted in Database", async () => {
      const userBankAccounts = await getBankAccounts(request, apiURL);
      const deletedBankAccount = userBankAccounts[userBankAccounts.length - 1];
      expect.soft(deletedBankAccount.isDeleted).toBe(true);
    });

    await test.step("Verify bank account is deleted on Bank Accounts page", async () => {
      await expect(bankAccountsPage.bankAccount.last()).toContainText("(Deleted)");
    });
  });
});
