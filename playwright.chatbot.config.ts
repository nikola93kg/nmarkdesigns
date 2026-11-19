import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  tsconfig: "./tsconfig.json",
  outputDir: process.env.CHAT_DB_TEST === "true" ? "test-results/chatbot-db" : process.env.CHAT_HTTP_TEST === "true" ? "test-results/chatbot-http" : process.env.CHAT_DEMO_TEST === "true" ? "test-results/chatbot-demo" : "test-results/chatbot-ui",
  testDir: "./tests/chatbot", fullyParallel: true, workers: 2, reporter: "list",
  use: { baseURL: "http://127.0.0.1:3110", trace: "retain-on-failure", ...devices["Desktop Chrome"], channel: "chrome" },
  webServer: process.env.CHAT_DB_TEST === "true" ? undefined : {
    // Test-only policy URLs. These pages are not claimed to be published legal policies.
    command: process.env.CHAT_HTTP_TEST === "true"
      ? "CHAT_ENABLED=true CHAT_PREVIEW=false CHAT_EMAIL_ENABLED=false CHAT_CRON_SECRET=local-http-cron-secret-at-least-32-characters CHAT_IDENTITY_SECRET=local-http-identity-secret-at-least-32-characters OPENAI_API_KEY=fixture-no-real-api-call OPENAI_MODEL=fixture CHAT_PRICE_MODEL=fixture CHAT_PRICE_INPUT_USD_PER_MILLION=1 CHAT_PRICE_OUTPUT_USD_PER_MILLION=2 CHAT_BUDGET_DAY_USD=0.50 CHAT_BUDGET_MONTH_USD=4 CHAT_MAX_CALLS_DAY=10 CHAT_MAX_CALLS_MONTH=10 CHAT_ORIGIN=http://127.0.0.1:3110 CHAT_PRIVACY_URL_SR=https://nmarkdesigns.com/sr/ CHAT_PRIVACY_URL_EN=https://nmarkdesigns.com/en/ npm run start -- --hostname 127.0.0.1 --port 3110"
      : process.env.CHAT_DEMO_TEST === "true"
      ? "CHAT_ENABLED= CHAT_PREVIEW= npm run dev -- --webpack --hostname 127.0.0.1 --port 3110"
      : process.env.CHAT_UI_PRODUCTION_TEST === "true"
      ? "CHAT_ENABLED=true CHAT_PREVIEW=false CHAT_ORIGIN=http://127.0.0.1:3110 CHAT_PRIVACY_URL_SR=https://nmarkdesigns.com/sr/ CHAT_PRIVACY_URL_EN=https://nmarkdesigns.com/en/ npm run start -- --hostname 127.0.0.1 --port 3110"
      : "CHAT_ENABLED=true CHAT_PREVIEW=false CHAT_ORIGIN=http://127.0.0.1:3110 CHAT_PRIVACY_URL_SR=https://nmarkdesigns.com/sr/ CHAT_PRIVACY_URL_EN=https://nmarkdesigns.com/en/ npm run dev -- --webpack --hostname 127.0.0.1 --port 3110",
    url: "http://127.0.0.1:3110/sr/", reuseExistingServer: false, timeout: 120000,
  },
});
