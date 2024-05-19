import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { percyHealthCheck } from "@percy/cypress/task";
import codeCoverageTask from "@cypress/code-coverage/task";
import { defineConfig } from "cypress";
const { devServer } = require("@cypress/react/plugins/react-scripts");

dotenv.config({ path: ".env.local" });
dotenv.config();

module.exports = defineConfig({
  env: {
    apiUrl: "http://localhost:3002",
    coverage: false,
    codeCoverage: {
      url: "http://localhost:3002/__coverage__",
      exclude: "cypress/**/*.*",
    },
  },
  component: {
    devServer,
    specPattern: "cypress/tests/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    signedUpUser: {},
    cookies: [],
    bankAccount: {},
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    viewportHeight: 1000,
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
      on("task", {
        percyHealthCheck,
        log(message) {
          console.log(message);
          return null;
        },
        writeFile({ filename, content }) {
          const filePath = path.join(__dirname, "cypress", "fixtures", filename);
          fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
          return null;
        },
      });
      codeCoverageTask(on, config);
      return config;
    },
  },
});
