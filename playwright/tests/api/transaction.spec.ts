import { expect } from "@playwright/test";
import { test } from "../../config/customTestOptions";
import faker from "@faker-js/faker";
import { TestContext } from "../../context/testContext";
import { Transaction, User } from "../../constants/types";
import { createTransaction, createTransactionComment, getTransaction } from "../../utils/apiUtils";
import { generateRandomTransaction } from "../../utils/userUtils";

const receiver: User = faker.random.arrayElement(JSON.parse(TestContext.USERS));

let transaction: Transaction;

test.use({ storageState: TestContext.STORAGE_STATE_COOKIES });

test.describe("Transaction API tests @api", () => {
  test.beforeEach("Create transaction", async ({ request, apiURL }) => {
    let newTransaction: Transaction = generateRandomTransaction(receiver.id!);
    transaction = await createTransaction(request, apiURL, newTransaction);
  });

  test("Should create a new comment for a transaction", async ({ request, apiURL }) => {
    const comment = faker.lorem.sentence();
    const response = await createTransactionComment(request, apiURL, transaction.id!, comment);
    expect(response.status()).toBe(200);

    const updatedTransaction = await getTransaction(request, apiURL, transaction.id!);
    expect(updatedTransaction.comments!.length).toBe(1);
    expect(updatedTransaction.comments![0].content).toBe(comment);
  });
});
