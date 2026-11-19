import { defineConfig, devices } from "@playwright/test";
process.env.ADMIN_TEST = "true";
export default defineConfig({
  testDir: "./tests/admin", outputDir: "test-results/admin", workers: 1, reporter: "list",
  use: { baseURL: "http://127.0.0.1:3115", trace: "retain-on-failure", ...devices["Desktop Chrome"], channel: "chrome" },
  webServer: {
    command: "ADMIN_ALLOWED_EMAIL=owner@example.test AUTH_SECRET=local-admin-test-secret-with-at-least-32-characters AUTH_URL=http://127.0.0.1:3115 SMTP_HOST=127.0.0.1 SMTP_PORT=3116 SMTP_USER=fixture@example.test SMTP_PASSWORD=fixture CHAT_EMAIL_ENABLED=false CHAT_ENABLED=false npm run start -- --hostname 127.0.0.1 --port 3115",
    url: "http://127.0.0.1:3115/admin/sr/login/", reuseExistingServer: false, timeout: 60000,
  },
});
