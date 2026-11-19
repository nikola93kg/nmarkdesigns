import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/chatbot", fullyParallel: true, workers: 2, reporter: "list",
  use: { baseURL: "http://127.0.0.1:3110", trace: "retain-on-failure", ...devices["Desktop Chrome"], channel: "chrome" },
  webServer: process.env.CHAT_DB_TEST === "true" ? undefined : {
    // Test-only policy URLs. These pages are not claimed to be published legal policies.
    command: process.env.CHAT_DEMO_TEST === "true"
      ? "CHAT_ENABLED= CHAT_PREVIEW= npm run dev -- --webpack --hostname 127.0.0.1 --port 3110"
      : "CHAT_ENABLED=true CHAT_PREVIEW=false CHAT_ORIGIN=http://127.0.0.1:3110 CHAT_PRIVACY_URL_SR=https://nmarkdesigns.com/sr/ CHAT_PRIVACY_URL_EN=https://nmarkdesigns.com/en/ npm run dev -- --webpack --hostname 127.0.0.1 --port 3110",
    url: "http://127.0.0.1:3110/sr/", reuseExistingServer: false, timeout: 120000,
  },
});
