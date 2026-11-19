CREATE INDEX `leads_session_date_idx` ON `chat_leads` (`session_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `sessions_retention_idx` ON `chat_sessions` (`last_lead_at`,`last_activity_at`);--> statement-breakpoint
CREATE INDEX `sessions_metrics_idx` ON `chat_sessions` (`metrics_synced`,`last_activity_at`);