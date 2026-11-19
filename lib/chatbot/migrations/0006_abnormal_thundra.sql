CREATE TABLE `chat_budget_buckets` (
	`bucket_key` varchar(16) NOT NULL,
	`committed_micros` bigint NOT NULL DEFAULT 0,
	`reserved_micros` bigint NOT NULL DEFAULT 0,
	CONSTRAINT `chat_budget_buckets_bucket_key` PRIMARY KEY(`bucket_key`)
);
--> statement-breakpoint
CREATE TABLE `chat_daily_metrics` (
	`day` varchar(10) NOT NULL,
	`locale` varchar(2) NOT NULL,
	`event` varchar(40) NOT NULL,
	`total` int NOT NULL,
	CONSTRAINT `chat_daily_metrics_day_locale_event_pk` PRIMARY KEY(`day`,`locale`,`event`)
);
--> statement-breakpoint
CREATE TABLE `chat_metric_receipts` (
	`key_hash` varchar(64) NOT NULL,
	`session_id` varchar(36) NOT NULL,
	`created_at` timestamp(3) NOT NULL,
	CONSTRAINT `chat_metric_receipts_key_hash` PRIMARY KEY(`key_hash`)
);
--> statement-breakpoint
CREATE TABLE `chat_usage` (
	`id` varchar(36) NOT NULL,
	`day_key` varchar(16) NOT NULL,
	`month_key` varchar(16) NOT NULL,
	`model` varchar(120) NOT NULL,
	`input_rate` bigint NOT NULL,
	`output_rate` bigint NOT NULL,
	`input_tokens` int,
	`output_tokens` int,
	`reserved_micros` bigint NOT NULL,
	`charged_micros` bigint,
	`status` varchar(16) NOT NULL,
	`latency_ms` int,
	`created_at` timestamp(3) NOT NULL,
	CONSTRAINT `chat_usage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `chat_sessions` ADD `metrics_synced` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `chat_sessions` ADD `last_lead_at` timestamp(3);--> statement-breakpoint
ALTER TABLE `chat_metric_receipts` ADD CONSTRAINT `chat_metric_receipts_session_id_chat_sessions_id_fk` FOREIGN KEY (`session_id`) REFERENCES `chat_sessions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `usage_status_date_idx` ON `chat_usage` (`status`,`created_at`);
--> statement-breakpoint
UPDATE chat_sessions s SET last_lead_at = (SELECT MAX(l.created_at) FROM chat_leads l WHERE l.session_id=s.id);
