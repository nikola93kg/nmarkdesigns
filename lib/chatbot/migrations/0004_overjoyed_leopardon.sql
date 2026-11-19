CREATE TABLE `chat_admin_accounts` (
	`user_id` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`provider_account_id` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `chat_admin_accounts_provider_provider_account_id_pk` PRIMARY KEY(`provider`,`provider_account_id`)
);
--> statement-breakpoint
CREATE TABLE `chat_admin_audit_logs` (
	`id` varchar(36) NOT NULL,
	`admin_identity` varchar(255) NOT NULL,
	`action` varchar(64) NOT NULL,
	`target_type` varchar(32) NOT NULL,
	`target_id` varchar(36) NOT NULL,
	`created_at` timestamp(3) NOT NULL,
	CONSTRAINT `chat_admin_audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_admin_sessions` (
	`session_token` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires` timestamp(3) NOT NULL,
	CONSTRAINT `chat_admin_sessions_session_token` PRIMARY KEY(`session_token`)
);
--> statement-breakpoint
CREATE TABLE `chat_admin_users` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`email_verified` timestamp(3),
	`image` varchar(255),
	CONSTRAINT `chat_admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `chat_admin_users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `chat_admin_verification_tokens` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp(3) NOT NULL,
	CONSTRAINT `chat_admin_verification_tokens_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `chat_admin_accounts` ADD CONSTRAINT `chat_admin_accounts_user_id_chat_admin_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `chat_admin_users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat_admin_sessions` ADD CONSTRAINT `chat_admin_sessions_user_id_chat_admin_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `chat_admin_users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `admin_audit_created_idx` ON `chat_admin_audit_logs` (`created_at`);