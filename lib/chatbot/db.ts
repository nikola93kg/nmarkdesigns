import "server-only";
import { createPool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

function createDatabase() {
  const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  if (!DB_NAME || !DB_USER || !DB_PASSWORD) throw new Error("UNAVAILABLE");
  const host = process.env.DB_HOST || "127.0.0.1";
  // Local Hostinger runtime / development only. Remote DB requires a separate TLS decision.
  if (host !== "127.0.0.1") throw new Error("UNAVAILABLE");
  const pool = createPool({ host, port: Number(process.env.DB_PORT || 3306), database: DB_NAME,
    user: DB_USER, password: DB_PASSWORD, connectionLimit: 4, waitForConnections: true,
    queueLimit: 16, connectTimeout: 5000, timezone: "Z", charset: "utf8mb4" });
  return drizzle({ client: pool, schema, mode: "default" });
}
let database: ReturnType<typeof createDatabase> | undefined;
export function chatDb() { return database ??= createDatabase(); }
