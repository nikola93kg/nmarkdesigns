import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";

// Intentionally cannot target production. Future staging/production migration is a reviewed operation.
if (process.env.CHAT_MIGRATION_TARGET !== "development" || process.env.DB_HOST !== "127.0.0.1" || !/(?:^|_)nmark_chatbot_(dev|test)$/.test(process.env.DB_NAME ?? "")) {
  throw new Error("Migration requires explicit development target, loopback host and nmark_chatbot_dev/test database.");
}
const connection = await mysql.createConnection({
  host: "127.0.0.1", port: Number(process.env.DB_PORT || 3306), database: process.env.DB_NAME,
  user: process.env.DB_USER, password: process.env.DB_PASSWORD, timezone: "Z", multipleStatements: false,
});
try {
  await connection.execute("SET time_zone = '+00:00'");
  await migrate(drizzle(connection), { migrationsFolder: new URL("./migrations/", import.meta.url).pathname });
  console.log("Chatbot development migrations applied.");
} finally { await connection.end(); }
