import "server-only";
import { and, asc, count, desc, eq, exists, gte, inArray, isNotNull, lt, min, or, sql, type SQL } from "drizzle-orm";
import { z } from "zod";
import { chatDb } from "../db";
import { chatLeads, chatMessages, chatSessions, leadNotifications } from "../schema";
import { requireOwner } from "./access";
import { dayStart, shiftDay, period, belgradeDay } from "./time";
import { idSchema, rangeSchema, listFilters, leadFilters, type ConversationFilters, type LeadFilters } from "./contracts";
import { ChatError } from "../security";

const cursorSchema = z.object({ createdAt: z.iso.datetime(), id: z.uuid() }).strict();
function cursor(value: string | undefined) {
  if (!value) return null;
  try { const result = cursorSchema.parse(JSON.parse(Buffer.from(value, "base64url").toString())); return { createdAt: new Date(result.createdAt), id: result.id }; }
  catch { throw new ChatError("INVALID_INPUT", 400); }
}
function nextCursor(row: { createdAt: Date; id: string }) { return Buffer.from(JSON.stringify({ createdAt: row.createdAt.toISOString(), id: row.id })).toString("base64url"); }
function dates(column: typeof chatSessions.createdAt | typeof chatLeads.createdAt, from?: string, to?: string): SQL[] {
  return [...(from ? [gte(column, dayStart(from))] : []), ...(to ? [lt(column, dayStart(shiftDay(to, 1)))] : [])];
}
export async function conversations(filters: ConversationFilters) {
  await requireOwner(); filters = listFilters.parse(filters);
  const db = chatDb(); const after = cursor(filters.cursor);
  const leadExists = exists(db.select({ id: chatLeads.id }).from(chatLeads).where(eq(chatLeads.sessionId, chatSessions.id)));
  const conditions = [...dates(chatSessions.createdAt, filters.from, filters.to),
    ...(filters.locale ? [eq(chatSessions.locale, filters.locale)] : []),
    ...(filters.hasLead ? [filters.hasLead === "yes" ? leadExists : sql`NOT ${leadExists}`] : []),
    ...(after ? [or(lt(chatSessions.createdAt, after.createdAt), and(eq(chatSessions.createdAt, after.createdAt), lt(chatSessions.id, after.id)))!] : [])];
  const rows = await db.select({ id: chatSessions.id, locale: chatSessions.locale, createdAt: chatSessions.createdAt, lastActivityAt: chatSessions.lastActivityAt,
    expiresAt: chatSessions.expiresAt, activeUntil: chatSessions.activeUntil,
    messageCount: sql<number>`(select count(*) from ${chatMessages} where ${chatMessages.sessionId} = ${chatSessions.id})`.mapWith(Number),
    hasLead: sql<boolean>`${leadExists}`.mapWith((value) => Number(value) > 0),
  }).from(chatSessions).where(and(...conditions)).orderBy(desc(chatSessions.createdAt), desc(chatSessions.id)).limit(21);
  return { items: rows.slice(0, 20), nextCursor: rows.length > 20 ? nextCursor(rows[19]) : null };
}
export async function leads(filters: LeadFilters) {
  await requireOwner(); filters = leadFilters.parse(filters); const db = chatDb(); const after = cursor(filters.cursor);
  const conditions = [...dates(chatLeads.createdAt, filters.from, filters.to), ...(filters.status ? [eq(chatLeads.status, filters.status)] : []),
    ...(filters.delivery ? [or(inArray(leadNotifications.status, ["failed", "uncertain"]), and(eq(leadNotifications.status, "pending"), isNotNull(leadNotifications.lastErrorCode)))!] : []),
    ...(after ? [or(lt(chatLeads.createdAt, after.createdAt), and(eq(chatLeads.createdAt, after.createdAt), lt(chatLeads.id, after.id)))!] : [])];
  const rows = await db.select({ id: chatLeads.id, sessionId: chatLeads.sessionId, createdAt: chatLeads.createdAt, name: chatLeads.name, email: chatLeads.email,
    service: chatLeads.service, budgetRange: chatLeads.budgetRange, timeframe: chatLeads.timeframe, status: chatLeads.status, notificationStatus: leadNotifications.status,
  }).from(chatLeads).leftJoin(leadNotifications, eq(leadNotifications.leadId, chatLeads.id)).where(and(...conditions)).orderBy(desc(chatLeads.createdAt), desc(chatLeads.id)).limit(21);
  return { items: rows.slice(0, 20), nextCursor: rows.length > 20 ? nextCursor(rows[19]) : null };
}
export async function conversation(id: string) {
  await requireOwner(); idSchema.parse(id); const db = chatDb();
  const [session] = await db.select({ id: chatSessions.id, locale: chatSessions.locale, consentAt: chatSessions.consentAt, consentVersion: chatSessions.consentVersion,
    createdAt: chatSessions.createdAt, lastActivityAt: chatSessions.lastActivityAt }).from(chatSessions).where(eq(chatSessions.id, id));
  if (!session) throw new ChatError("NOT_FOUND", 404);
  const [messages, relatedLeads] = await Promise.all([
    db.select().from(chatMessages).where(eq(chatMessages.sessionId, id)).orderBy(asc(chatMessages.createdAt), asc(chatMessages.id)).limit(501),
    db.select({ id: chatLeads.id, name: chatLeads.name, status: chatLeads.status }).from(chatLeads).where(eq(chatLeads.sessionId, id)),
  ]);
  return { session, messages: messages.slice(0, 500), truncated: messages.length > 500, leads: relatedLeads };
}
export async function lead(id: string) {
  await requireOwner(); idSchema.parse(id); const db = chatDb();
  const [item] = await db.select().from(chatLeads).where(eq(chatLeads.id, id));
  if (!item) throw new ChatError("NOT_FOUND", 404);
  const [notification] = await db.select().from(leadNotifications).where(eq(leadNotifications.leadId, id));
  return { lead: item, notification: notification ?? null };
}
export async function metrics(range: "7d" | "30d") {
  await requireOwner(); rangeSchema.parse(range); const db = chatDb(); const bounds = period(range);
  const starts = db.$with("starts").as(db.select({ sessionId: chatMessages.sessionId, startedAt: min(chatMessages.createdAt).as("started_at"), userCount: count().as("user_count") }).from(chatMessages).where(eq(chatMessages.role, "user")).groupBy(chatMessages.sessionId));
  const [sessions, submitted, errors, failures] = await Promise.all([
    db.with(starts).select({ startedAt: starts.startedAt, userCount: starts.userCount }).from(starts).where(and(gte(starts.startedAt, bounds.from), lt(starts.startedAt, bounds.to))),
    db.select({ createdAt: chatLeads.createdAt }).from(chatLeads).where(and(gte(chatLeads.createdAt, bounds.from), lt(chatLeads.createdAt, bounds.to))),
    db.select({ total: count() }).from(chatMessages).where(and(eq(chatMessages.role, "assistant"), eq(chatMessages.status, "error"), gte(chatMessages.createdAt, bounds.from), lt(chatMessages.createdAt, bounds.to))),
    db.select({ total: count() }).from(leadNotifications).where(and(or(inArray(leadNotifications.status, ["failed", "uncertain"]), and(eq(leadNotifications.status, "pending"), isNotNull(leadNotifications.lastErrorCode))), gte(leadNotifications.createdAt, bounds.from), lt(leadNotifications.createdAt, bounds.to))),
  ]);
  const daily = bounds.days.map((day) => ({ day, chats: 0, leads: 0 })); const lookup = new Map(daily.map((item) => [item.day, item]));
  for (const session of sessions) { const day = session.startedAt && lookup.get(belgradeDay(new Date(session.startedAt))); if (day) day.chats++; }
  for (const item of submitted) { const day = lookup.get(belgradeDay(item.createdAt)); if (day) day.leads++; }
  return { chatStarts: sessions.length, engagedSessions: sessions.filter((item) => Number(item.userCount) >= 2).length, leadsSubmitted: submitted.length,
    conversionRate: sessions.length ? submitted.length / sessions.length * 100 : 0, chatErrors: errors[0].total, notificationFailures: failures[0].total, daily };
}
