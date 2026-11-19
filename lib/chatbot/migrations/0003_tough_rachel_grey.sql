CREATE TABLE `chat_leads` (
	`id` varchar(36) NOT NULL,
	`session_id` varchar(36) NOT NULL,
	`client_submission_id` varchar(36) NOT NULL,
	`payload_hash` varchar(64) NOT NULL,
	`locale` varchar(2) NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(254) NOT NULL,
	`phone` varchar(40) NOT NULL,
	`company` varchar(160) NOT NULL,
	`website` varchar(500) NOT NULL,
	`service` varchar(32) NOT NULL,
	`budget_range` varchar(120) NOT NULL,
	`timeframe` varchar(120) NOT NULL,
	`project_description` text NOT NULL,
	`preferred_contact_method` varchar(8) NOT NULL,
	`privacy_consent_at` timestamp(3) NOT NULL,
	`consent_version` varchar(64) NOT NULL,
	`status` varchar(16) NOT NULL DEFAULT 'new',
	`internal_note` text,
	`created_at` timestamp(3) NOT NULL,
	CONSTRAINT `chat_leads_id` PRIMARY KEY(`id`),
	CONSTRAINT `leads_idempotency_idx` UNIQUE(`session_id`,`client_submission_id`)
);
--> statement-breakpoint
CREATE TABLE `chat_lead_notifications` (
	`id` varchar(36) NOT NULL,
	`lead_id` varchar(36) NOT NULL,
	`status` varchar(16) NOT NULL,
	`attempts` int NOT NULL DEFAULT 0,
	`last_error_code` varchar(64),
	`provider_message_id` varchar(254),
	`next_retry_at` timestamp(3) NOT NULL,
	`lease_until` timestamp(3),
	`claim_id` varchar(36),
	`sent_at` timestamp(3),
	`created_at` timestamp(3) NOT NULL,
	CONSTRAINT `chat_lead_notifications_id` PRIMARY KEY(`id`),
	CONSTRAINT `chat_lead_notifications_lead_id_unique` UNIQUE(`lead_id`)
);
--> statement-breakpoint
ALTER TABLE `chat_sessions` ADD `lead_declined_at` timestamp(3);--> statement-breakpoint
ALTER TABLE `chat_leads` ADD CONSTRAINT `chat_leads_session_id_chat_sessions_id_fk` FOREIGN KEY (`session_id`) REFERENCES `chat_sessions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `chat_lead_notifications` ADD CONSTRAINT `chat_lead_notifications_lead_id_chat_leads_id_fk` FOREIGN KEY (`lead_id`) REFERENCES `chat_leads`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `leads_created_idx` ON `chat_leads` (`created_at`,`status`);--> statement-breakpoint
CREATE INDEX `notifications_due_idx` ON `chat_lead_notifications` (`status`,`next_retry_at`);