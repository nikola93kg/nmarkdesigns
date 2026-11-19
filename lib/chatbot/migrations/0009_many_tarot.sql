ALTER TABLE `chat_budget_buckets` ADD `calls` int DEFAULT 0 NOT NULL;
--> statement-breakpoint
UPDATE chat_budget_buckets b SET calls = (SELECT COUNT(*) FROM chat_usage u WHERE u.day_key=b.bucket_key OR u.month_key=b.bucket_key);
