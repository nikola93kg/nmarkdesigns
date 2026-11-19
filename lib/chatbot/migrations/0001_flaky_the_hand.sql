ALTER TABLE `chat_rate_limit_counters` MODIFY COLUMN `expires_at` timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `chat_messages` MODIFY COLUMN `created_at` timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `chat_messages` MODIFY COLUMN `completed_at` timestamp(3);--> statement-breakpoint
ALTER TABLE `chat_sessions` MODIFY COLUMN `consent_at` timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `chat_sessions` MODIFY COLUMN `created_at` timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `chat_sessions` MODIFY COLUMN `last_activity_at` timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `chat_sessions` MODIFY COLUMN `expires_at` timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `chat_sessions` MODIFY COLUMN `active_until` timestamp(3);