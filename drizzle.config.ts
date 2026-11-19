import { defineConfig } from "drizzle-kit";

// Generate SQL only. Never auto-migrate during next build/start.
export default defineConfig({
  schema: "./lib/chatbot/schema.ts",
  out: "./lib/chatbot/migrations",
  dialect: "mysql",
});
