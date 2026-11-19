import { readMigrationFiles } from "drizzle-orm/migrator";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Offline export only. Never connects to, drops or recreates a database.
const [database, output] = process.argv.slice(2);
if (!database || !/^[a-zA-Z0-9_]{1,64}$/.test(database) || !output || process.argv.length !== 4) {
  throw new Error("Usage: node lib/chatbot/export-initial-schema.mjs DATABASE OUTPUT.sql (empty database only)");
}
const folder = fileURLToPath(new URL("./migrations/", import.meta.url));
const migrations = readMigrationFiles({ migrationsFolder: folder });
const journal = JSON.parse(readFileSync(`${folder}/meta/_journal.json`, "utf8"));
const tableOptions = " ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
const statements = [
  "-- GENERATED from checked-in Drizzle migrations. No visitor or test data included.",
  "-- ONE-TIME IMPORT INTO AN EMPTY DATABASE ONLY. Stop on the first error.",
  "-- MySQL DDL commits implicitly: a failed import must be inspected, not blindly retried.",
  `USE \`${database}\`;`,
  "SET NAMES utf8mb4;",
  "SET time_zone = '+00:00';",
  // No IF NOT EXISTS: an initialized target must fail immediately, rather than replay ALTERs.
  `CREATE TABLE \`__drizzle_migrations\` (id SERIAL PRIMARY KEY, hash TEXT NOT NULL, created_at BIGINT)${tableOptions};`,
];
for (const [index, migration] of migrations.entries()) {
  statements.push(`\n-- ${journal.entries[index].tag}`);
  for (const source of migration.sql) {
    let statement = source.trim();
    if (!statement) continue;
    if (/^CREATE TABLE\b/i.test(statement)) statement = statement.replace(/;?$/, `${tableOptions};`);
    statements.push(statement.endsWith(";") ? statement : `${statement};`);
  }
  statements.push(`INSERT INTO \`__drizzle_migrations\` (hash, created_at) VALUES ('${migration.hash}', ${migration.folderMillis});`);
}
statements.push(`\n-- Verification: expect ${migrations.length} migration records for this release, plus the application tables.`,
  "SELECT COUNT(*) AS applied_migrations, MAX(created_at) AS latest_migration FROM `__drizzle_migrations`;",
  "SHOW TABLES;", "");
writeFileSync(output, statements.join("\n"), { flag: "wx" });
console.log(`Exported ${migrations.length} migrations for empty database ${database}.`);
