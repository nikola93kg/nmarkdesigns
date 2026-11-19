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
