import "server-only";
import { budgetSummary } from "../budget";
import { and, asc, desc, eq, exists, gte, inArray, isNotNull, lt, or, sql, type SQL } from "drizzle-orm";
import { z } from "zod";
import { chatDb } from "../db";
import { chatDailyMetrics, chatLeads, chatMessages, chatSessions, leadNotifications } from "../schema";
import { requireOwner } from "./access";
import { dayStart, shiftDay, period } from "./time";
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
    // Explicit identifiers preserve correlation when Drizzle strips column qualifiers in a single-table selection.
    messageCount: sql<number>`(select count(*) from ${chatMessages} where ${chatMessages}.${sql.identifier(chatMessages.sessionId.name)} = ${chatSessions}.${sql.identifier(chatSessions.id.name)})`.mapWith(Number),
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
  const rows = await db.select().from(chatDailyMetrics).where(and(gte(chatDailyMetrics.day,bounds.days[0]),lt(chatDailyMetrics.day,shiftDay(bounds.days.at(-1)!,1))));
  const total = (event: string) => rows.filter((r) => r.event === event).reduce((sum,r) => sum+r.total,0);
  const daily = bounds.days.map((day) => ({ day, chats: rows.filter((r) => r.day===day && r.event==="chat_start").reduce((n,r)=>n+r.total,0), leads: rows.filter((r)=>r.day===day && r.event==="lead_submit_success").reduce((n,r)=>n+r.total,0) }));
  const chatStarts=total("chat_start"), leadsSubmitted=total("lead_submit_success");
  return { chatStarts, engagedSessions: total("engaged_session"), leadsSubmitted, conversionRate: chatStarts ? leadsSubmitted/chatStarts*100 : 0,
    chatErrors: total("response_error"), notificationFailures: total("notification_failure"), daily, budget: await budgetSummary() };
}
