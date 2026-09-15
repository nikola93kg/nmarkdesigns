import config from "./playwright.config";
import { defineConfig } from "@playwright/test";

export default defineConfig({
  ...config,
  use: { ...config.use, baseURL: "http://127.0.0.1:3102" },
  webServer: { command: "npm run start -- --hostname 127.0.0.1 --port 3102", url: "http://127.0.0.1:3102", reuseExistingServer: false, timeout: 60_000 },
});