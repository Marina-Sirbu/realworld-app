import { expect } from "@playwright/test";
import { test } from "../../config/customTestOptions";
import { TestContext } from "../../context/testContext";
import { getUserProfile } from "../../utils/apiUtils";
import { User } from "../../constants/types";
import faker from "@faker-js/faker";

const user: User = faker.random.arrayElement(JSON.parse(TestContext.USERS));

test.use({ storageState: TestContext.STORAGE_STATE_COOKIES });

test.describe("User API tests @api", () => {
  test("Should get a user profile by username", async ({ request, apiURL }) => {
    const userProfile = await getUserProfile(request, apiURL, user.username);
    expect(userProfile.firstName).toBe(user.firstName);
    expect(userProfile.lastName).toBe(user.lastName);
  });
});
