-- GENERATED from checked-in Drizzle migrations. No visitor or test data included.
-- ONE-TIME IMPORT INTO AN EMPTY DATABASE ONLY. Stop on the first error.
-- MySQL DDL commits implicitly: a failed import must be inspected, not blindly retried.
USE `u540890623_nmark_chatbot`;
SET NAMES utf8mb4;
SET time_zone = '+00:00';
CREATE TABLE `__drizzle_migrations` (id SERIAL PRIMARY KEY, hash TEXT NOT NULL, created_at BIGINT) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 0000_icy_alice
CREATE TABLE `chat_rate_limit_counters` (
	`key_hash` varchar(64) NOT NULL,
	`count` int NOT NULL,
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `chat_rate_limit_counters_key_hash` PRIMARY KEY(`key_hash`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_session_id_chat_sessions_id_fk` FOREIGN KEY (`session_id`) REFERENCES `chat_sessions`(`id`) ON DELETE cascade ON UPDATE no action;
CREATE INDEX `counters_expiry_idx` ON `chat_rate_limit_counters` (`expires_at`);
CREATE INDEX `messages_session_idx` ON `chat_messages` (`session_id`,`created_at`);
CREATE INDEX `sessions_expiry_idx` ON `chat_sessions` (`expires_at`);
INSERT INTO `__drizzle_migrations` (hash, created_at) VALUES ('055eb80057512705f12aa48b2eb428fec270f3ed928c60ee68f56f170bdafd81', 1795078838541);

-- 0001_flaky_the_hand
ALTER TABLE `chat_rate_limit_counters` MODIFY COLUMN `expires_at` timestamp(3) NOT NULL;
ALTER TABLE `chat_messages` MODIFY COLUMN `created_at` timestamp(3) NOT NULL;
ALTER TABLE `chat_messages` MODIFY COLUMN `completed_at` timestamp(3);
ALTER TABLE `chat_sessions` MODIFY COLUMN `consent_at` timestamp(3) NOT NULL;
ALTER TABLE `chat_sessions` MODIFY COLUMN `created_at` timestamp(3) NOT NULL;
ALTER TABLE `chat_sessions` MODIFY COLUMN `last_activity_at` timestamp(3) NOT NULL;
ALTER TABLE `chat_sessions` MODIFY COLUMN `expires_at` timestamp(3) NOT NULL;
ALTER TABLE `chat_sessions` MODIFY COLUMN `active_until` timestamp(3);
INSERT INTO `__drizzle_migrations` (hash, created_at) VALUES ('1b882c014e2e8b567d6920405d8320546f39e57e106369d716cd660a413364d5', 1795078976524);

-- 0002_whole_shadowcat
ALTER TABLE `chat_sessions` ADD `active_generation_id` varchar(36);
INSERT INTO `__drizzle_migrations` (hash, created_at) VALUES ('44c6312dcc656b796b951344928e4f30dc3b4f97a46965c90eb8310d3732a5bf', 1795079228545);

-- 0003_tough_rachel_grey
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
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `chat_sessions` ADD `lead_declined_at` timestamp(3);
ALTER TABLE `chat_leads` ADD CONSTRAINT `chat_leads_session_id_chat_sessions_id_fk` FOREIGN KEY (`session_id`) REFERENCES `chat_sessions`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `chat_lead_notifications` ADD CONSTRAINT `chat_lead_notifications_lead_id_chat_leads_id_fk` FOREIGN KEY (`lead_id`) REFERENCES `chat_leads`(`id`) ON DELETE cascade ON UPDATE no action;
CREATE INDEX `leads_created_idx` ON `chat_leads` (`created_at`,`status`);
CREATE INDEX `notifications_due_idx` ON `chat_lead_notifications` (`status`,`next_retry_at`);
INSERT INTO `__drizzle_migrations` (hash, created_at) VALUES ('b1d2471e060e0683d6cd7b64c09db8070f4c861ccb87c1c2eaccafeaf795c101', 1795080926492);

-- 0004_overjoyed_leopardon
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
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `chat_admin_audit_logs` (
	`id` varchar(36) NOT NULL,
	`admin_identity` varchar(255) NOT NULL,
	`action` varchar(64) NOT NULL,
	`target_type` varchar(32) NOT NULL,
	`target_id` varchar(36) NOT NULL,
	`created_at` timestamp(3) NOT NULL,
	CONSTRAINT `chat_admin_audit_logs_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `chat_admin_sessions` (
	`session_token` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires` timestamp(3) NOT NULL,
	CONSTRAINT `chat_admin_sessions_session_token` PRIMARY KEY(`session_token`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `chat_admin_users` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`email_verified` timestamp(3),
	`image` varchar(255),
	CONSTRAINT `chat_admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `chat_admin_users_email_unique` UNIQUE(`email`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `chat_admin_verification_tokens` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp(3) NOT NULL,
	CONSTRAINT `chat_admin_verification_tokens_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `chat_admin_accounts` ADD CONSTRAINT `chat_admin_accounts_user_id_chat_admin_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `chat_admin_users`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `chat_admin_sessions` ADD CONSTRAINT `chat_admin_sessions_user_id_chat_admin_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `chat_admin_users`(`id`) ON DELETE cascade ON UPDATE no action;
CREATE INDEX `admin_audit_created_idx` ON `chat_admin_audit_logs` (`created_at`);
INSERT INTO `__drizzle_migrations` (hash, created_at) VALUES ('802bcb1bb9cefbb0b7308dd3e2200fdc4cfd22883b08db8f4f70827456dac9d0', 1795082354050);

-- 0005_sour_black_queen
CREATE INDEX `messages_role_date_idx` ON `chat_messages` (`role`,`created_at`,`session_id`);
CREATE INDEX `sessions_admin_created_idx` ON `chat_sessions` (`created_at`,`id`);
INSERT INTO `__drizzle_migrations` (hash, created_at) VALUES ('8da8293a42b82d6d27b30e19b2ff1d4bface4c6ffee349fd57b08bb428133c64', 1795083359810);

-- 0006_abnormal_thundra
CREATE TABLE `chat_budget_buckets` (
	`bucket_key` varchar(16) NOT NULL,
	`committed_micros` bigint NOT NULL DEFAULT 0,
	`reserved_micros` bigint NOT NULL DEFAULT 0,
	CONSTRAINT `chat_budget_buckets_bucket_key` PRIMARY KEY(`bucket_key`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `chat_daily_metrics` (
	`day` varchar(10) NOT NULL,
	`locale` varchar(2) NOT NULL,
	`event` varchar(40) NOT NULL,
	`total` int NOT NULL,
	CONSTRAINT `chat_daily_metrics_day_locale_event_pk` PRIMARY KEY(`day`,`locale`,`event`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `chat_metric_receipts` (
	`key_hash` varchar(64) NOT NULL,
	`session_id` varchar(36) NOT NULL,
	`created_at` timestamp(3) NOT NULL,
	CONSTRAINT `chat_metric_receipts_key_hash` PRIMARY KEY(`key_hash`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE `chat_sessions` ADD `metrics_synced` int DEFAULT 0 NOT NULL;
ALTER TABLE `chat_sessions` ADD `last_lead_at` timestamp(3);
ALTER TABLE `chat_metric_receipts` ADD CONSTRAINT `chat_metric_receipts_session_id_chat_sessions_id_fk` FOREIGN KEY (`session_id`) REFERENCES `chat_sessions`(`id`) ON DELETE cascade ON UPDATE no action;
CREATE INDEX `usage_status_date_idx` ON `chat_usage` (`status`,`created_at`);
UPDATE chat_sessions s SET last_lead_at = (SELECT MAX(l.created_at) FROM chat_leads l WHERE l.session_id=s.id);
INSERT INTO `__drizzle_migrations` (hash, created_at) VALUES ('8b3b34d0712c8ee75a9b1c15cbfec72b2651d3bd9b76119987a1d622b7097ce0', 1795085062688);

-- 0007_dizzy_wraith
CREATE INDEX `leads_session_date_idx` ON `chat_leads` (`session_id`,`created_at`);
CREATE INDEX `sessions_retention_idx` ON `chat_sessions` (`last_lead_at`,`last_activity_at`);
CREATE INDEX `sessions_metrics_idx` ON `chat_sessions` (`metrics_synced`,`last_activity_at`);
INSERT INTO `__drizzle_migrations` (hash, created_at) VALUES ('712be6d8b71e2482ed2ca0db5e67019921d5c58c83d7f22ff5221f34bae11345', 1795085361580);

-- 0008_cultured_ultron
ALTER TABLE `chat_messages` ADD `policy_version` varchar(32);
INSERT INTO `__drizzle_migrations` (hash, created_at) VALUES ('bc6aa56505712610e11f1230ba7633c4264ef713a3af843af380cf89203e867b', 1795096900576);

-- 0009_many_tarot
ALTER TABLE `chat_budget_buckets` ADD `calls` int DEFAULT 0 NOT NULL;
UPDATE chat_budget_buckets b SET calls = (SELECT COUNT(*) FROM chat_usage u WHERE u.day_key=b.bucket_key OR u.month_key=b.bucket_key);
INSERT INTO `__drizzle_migrations` (hash, created_at) VALUES ('b433232ea10209b01f5b757d72ec7e909dadb5a7bfb3bb2babb265cb4c77f409', 1795097024478);

-- Verification: expect 10 migration records for this release, plus the application tables.
SELECT COUNT(*) AS applied_migrations, MAX(created_at) AS latest_migration FROM `__drizzle_migrations`;
SHOW TABLES;
