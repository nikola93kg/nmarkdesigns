import "server-only";
import { createHash } from "node:crypto";
import { asc, eq, sql } from "drizzle-orm";
import { chatDb } from "./db";
import { chatDailyMetrics, chatMetricReceipts, chatMessages, chatLeads, leadNotifications } from "./schema";
import { belgradeDay } from "./admin/time";
import type { Locale } from "../i18n";
export type ChatTransaction = Parameters<Parameters<ReturnType<typeof chatDb>["transaction"]>[0]>[0];
export type MetricEvent = "chat_start" | "engaged_session" | "message_sent" | "response_completed" | "response_error" | "lead_submit_success" | "notification_failure" | "chat_open" | "quick_action_click" | "knowledge_link_click" | "lead_form_open";
/** Caller locks the session (or notification) first. Receipt and aggregate commit together. */
export async function recordMetric(tx: ChatTransaction, sessionId: string, locale: Locale, event: MetricEvent, dedupe: string, at = new Date()) {
  const keyHash = createHash("sha256").update(`${sessionId}:${event}:${dedupe}`).digest("hex");
  const [previous] = await tx.select().from(chatMetricReceipts).where(eq(chatMetricReceipts.keyHash, keyHash));
  if (previous) return false;
  await tx.insert(chatMetricReceipts).values({ keyHash, sessionId, createdAt: at });
  await tx.insert(chatDailyMetrics).values({ day: belgradeDay(at), locale, event, total: 1 }).onDuplicateKeyUpdate({ set: { total: sql`${chatDailyMetrics.total} + 1` } });
  return true;
}
/** Idempotent reconstruction of retained historical records; run before deletion/backfill. */
export async function syncSessionMetrics(tx: ChatTransaction, sessionId: string, locale: Locale) {
  const messages = await tx.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)).orderBy(asc(chatMessages.createdAt), asc(chatMessages.id));
  const visitors = messages.filter((m) => m.role === "user");
  if (visitors[0]) await recordMetric(tx, sessionId, locale, "chat_start", "once", visitors[0].createdAt);
  if (visitors[1]) await recordMetric(tx, sessionId, locale, "engaged_session", "once", visitors[1].createdAt);
  for (const message of messages) {
    if (message.role === "user") await recordMetric(tx, sessionId, locale, "message_sent", message.id, message.createdAt);
    // Live generations have separate attempt IDs; historical records can only reconstruct their latest result.
    else if (message.status === "completed" || message.status === "error") {
      const event = message.status === "completed" ? "response_completed" : "response_error";
      await recordMetric(tx, sessionId, locale, event, message.id, message.completedAt ?? message.createdAt);
    }
  }
  const leads = await tx.select().from(chatLeads).where(eq(chatLeads.sessionId, sessionId));
  for (const lead of leads) {
    await recordMetric(tx, sessionId, lead.locale, "lead_submit_success", lead.id, lead.createdAt);
    const [notification] = await tx.select().from(leadNotifications).where(eq(leadNotifications.leadId, lead.id));
    if (notification && (["failed", "uncertain"].includes(notification.status) || notification.lastErrorCode))
      await recordMetric(tx, sessionId, lead.locale, "notification_failure", notification.id, notification.createdAt);
  }
}
