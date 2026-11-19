CREATE INDEX `messages_role_date_idx` ON `chat_messages` (`role`,`created_at`,`session_id`);--> statement-breakpoint
CREATE INDEX `sessions_admin_created_idx` ON `chat_sessions` (`created_at`,`id`);