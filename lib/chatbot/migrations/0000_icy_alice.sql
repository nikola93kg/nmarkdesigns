CREATE TABLE `chat_rate_limit_counters` (
	`key_hash` varchar(64) NOT NULL,
	`count` int NOT NULL,
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `chat_rate_limit_counters_key_hash` PRIMARY KEY(`key_hash`)
);
--> statement-breakpoint
CREATE TABLE `chat_messages` (
	`id` varchar(36) NOT NULL,
	`session_id` varchar(36) NOT NULL,
	`role` varchar(16) NOT NULL,
	`content` text NOT NULL,
	`status` varchar(16) NOT NULL,
	`client_message_id` varchar(36) NOT NULL,
	`links` json,
	`created_at` timestamp NOT NULL,
	`completed_at` timestamp,
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`),
	CONSTRAINT `messages_idempotency_idx` UNIQUE(`session_id`,`client_message_id`,`role`)
);
--> statement-breakpoint
CREATE TABLE `chat_sessions` (
	`id` varchar(36) NOT NULL,
	`token_hash` varchar(64) NOT NULL,
	`locale` varchar(2) NOT NULL,
	`consent_version` varchar(64) NOT NULL,
	`consent_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL,
	`last_activity_at` timestamp NOT NULL,
	`expires_at` timestamp NOT NULL,
	`active_until` timestamp,
	CONSTRAINT `chat_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `chat_sessions_token_hash_unique` UNIQUE(`token_hash`)
);
--> statement-breakpoint
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_session_id_chat_sessions_id_fk` FOREIGN KEY (`session_id`) REFERENCES `chat_sessions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `counters_expiry_idx` ON `chat_rate_limit_counters` (`expires_at`);--> statement-breakpoint
CREATE INDEX `messages_session_idx` ON `chat_messages` (`session_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `sessions_expiry_idx` ON `chat_sessions` (`expires_at`);