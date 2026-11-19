import { mysqlTable, varchar, timestamp, text, int, uniqueIndex, index, json } from "drizzle-orm/mysql-core";
import type { ChatLink } from "./contracts";

export const chatSessions = mysqlTable("chat_sessions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  tokenHash: varchar("token_hash", { length: 64 }).notNull().unique(),
  locale: varchar("locale", { length: 2 }).$type<"sr" | "en">().notNull(),
  consentVersion: varchar("consent_version", { length: 64 }).notNull(),
  consentAt: timestamp("consent_at", { mode: "date", fsp: 3 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 }).notNull(),
  lastActivityAt: timestamp("last_activity_at", { mode: "date", fsp: 3 }).notNull(),
  expiresAt: timestamp("expires_at", { mode: "date", fsp: 3 }).notNull(),
  leadDeclinedAt: timestamp("lead_declined_at", { mode: "date", fsp: 3 }),
  activeGenerationId: varchar("active_generation_id", { length: 36 }),
  activeUntil: timestamp("active_until", { mode: "date", fsp: 3 }),
}, (t) => [index("sessions_expiry_idx").on(t.expiresAt)]);
export const chatMessages = mysqlTable("chat_messages", {
  id: varchar("id", { length: 36 }).primaryKey(),
  sessionId: varchar("session_id", { length: 36 }).notNull().references(() => chatSessions.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 16 }).$type<"user" | "assistant">().notNull(),
  content: text("content").notNull(),
  status: varchar("status", { length: 16 }).$type<"pending" | "completed" | "cancelled" | "error">().notNull(),
  clientMessageId: varchar("client_message_id", { length: 36 }).notNull(),
  links: json("links").$type<ChatLink[]>(),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 }).notNull(),
  completedAt: timestamp("completed_at", { mode: "date", fsp: 3 }),
}, (t) => [uniqueIndex("messages_idempotency_idx").on(t.sessionId, t.clientMessageId, t.role), index("messages_session_idx").on(t.sessionId, t.createdAt)]);
export const chatCounters = mysqlTable("chat_rate_limit_counters", {
  keyHash: varchar("key_hash", { length: 64 }).primaryKey(),
  count: int("count").notNull(),
  expiresAt: timestamp("expires_at", { mode: "date", fsp: 3 }).notNull(),
}, (t) => [index("counters_expiry_idx").on(t.expiresAt)]);

export const chatLeads = mysqlTable("chat_leads", {
  id: varchar("id", { length: 36 }).primaryKey(),
  sessionId: varchar("session_id", { length: 36 }).notNull().references(() => chatSessions.id, { onDelete: "cascade" }),
  clientSubmissionId: varchar("client_submission_id", { length: 36 }).notNull(),
  payloadHash: varchar("payload_hash", { length: 64 }).notNull(),
  locale: varchar("locale", { length: 2 }).$type<"sr" | "en">().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  company: varchar("company", { length: 160 }).notNull(),
  website: varchar("website", { length: 500 }).notNull(),
  service: varchar("service", { length: 32 }).$type<import("./lead-contracts").LeadService>().notNull(),
  budgetRange: varchar("budget_range", { length: 120 }).notNull(),
  timeframe: varchar("timeframe", { length: 120 }).notNull(),
  projectDescription: text("project_description").notNull(),
  preferredContactMethod: varchar("preferred_contact_method", { length: 8 }).$type<"email" | "phone">().notNull(),
  privacyConsentAt: timestamp("privacy_consent_at", { mode: "date", fsp: 3 }).notNull(),
  consentVersion: varchar("consent_version", { length: 64 }).notNull(),
  status: varchar("status", { length: 16 }).$type<"new" | "contacted" | "qualified" | "closed_won" | "closed_lost">().notNull().default("new"),
  internalNote: text("internal_note"),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 }).notNull(),
}, (t) => [uniqueIndex("leads_idempotency_idx").on(t.sessionId, t.clientSubmissionId), index("leads_created_idx").on(t.createdAt, t.status)]);

export const leadNotifications = mysqlTable("chat_lead_notifications", {
  id: varchar("id", { length: 36 }).primaryKey(),
  leadId: varchar("lead_id", { length: 36 }).notNull().unique().references(() => chatLeads.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 16 }).$type<"pending" | "processing" | "sent" | "failed" | "uncertain">().notNull(),
  attempts: int("attempts").notNull().default(0),
  lastErrorCode: varchar("last_error_code", { length: 64 }),
  providerMessageId: varchar("provider_message_id", { length: 254 }),
  nextRetryAt: timestamp("next_retry_at", { mode: "date", fsp: 3 }).notNull(),
  leaseUntil: timestamp("lease_until", { mode: "date", fsp: 3 }),
  claimId: varchar("claim_id", { length: 36 }),
  sentAt: timestamp("sent_at", { mode: "date", fsp: 3 }),
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 }).notNull(),
}, (t) => [index("notifications_due_idx").on(t.status, t.nextRetryAt)]);
