import { defineConfig } from "@playwright/test";
import { TestOptions } from "./config/customTestOptions";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// export const config: PlaywrightTestConfig<TestOptions> = {
export default defineConfig<TestOptions>({
  testDir: "./tests",
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    apiURL: "http://localhost:3002",
    testIdAttribute: "data-test",
    trace: "on-first-retry",
    ignoreHTTPSErrors: true,
    launchOptions: {
      args: ["--disable-web-security", "--disable-features=IsolateOrigins,site-per-process"],
    },
  },

  projects: [
    {
      name: "Test setup",
      testMatch: /setup.spec\.ts/,
      teardown: "Test teardown",
    },
    {
      name: "Test",
      dependencies: ["Test setup"],
    },
    {
      name: "Test teardown",
      testMatch: /teardown.spec\.ts/,
    },
  ],
});
