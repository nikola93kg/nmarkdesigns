# First Hostinger database import

The owner created and assigned `u540890623_nmark_chatbot` (confirmed in the supplied hPanel screenshot). External connections are off. This replaces the earlier suggested name ending in `_prod`, which exceeded the panel's name limit. Do not create another database or import local conversation data.

`hostinger-initial.sql` is a one-time schema-only export of migrations 0000–0009. It contains no credentials, admin users, conversations or leads. It creates the same Drizzle migration hashes/timestamps as the native migrator so a later migration runner can recognize the installed release. Tables use InnoDB and utf8mb4; the script sets UTC for its session.

## Import through phpMyAdmin

1. Open phpMyAdmin for the assigned database.
2. Select **u540890623_nmark_chatbot** and confirm it has **zero tables**. If it contains any tables, inspect them before importing.
3. Use **Import**, choose `hostinger-initial.sql`, select SQL/UTF-8 and execute. Keep foreign-key checks enabled.
4. Expect **15 tables**, including `__drizzle_migrations`. The migration ledger must contain **10 rows** and the latest `created_at` must be **1795097024478**. These SQL checks are also at the end of the import file:

```sql
SELECT COUNT(*) AS applied_migrations, MAX(created_at) AS latest_migration
FROM __drizzle_migrations;
SHOW TABLES;
```

MySQL schema statements commit implicitly. If import reports an error, stop and inspect it; do not rerun a partially applied import or delete tables to retry. The export deliberately has no `DROP TABLE`, `CREATE DATABASE`, `IF NOT EXISTS` or foreign-key-disable commands. It selects the exact target database with `USE`.

This only initializes the database. Production env, policy URLs, chatbot enablement and scheduled maintenance are separate steps. Keep the database password private. The development migrator still rejects production targets.

## Regenerate offline

The exporter never connects to a database and refuses to overwrite an existing output file:

```sh
node lib/chatbot/export-initial-schema.mjs u540890623_nmark_chatbot /tmp/hostinger-initial.sql
```

The static release file is for a fresh database at this revision, not an upgrade script for populated installations.
