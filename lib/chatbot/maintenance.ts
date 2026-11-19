import "server-only";
import { randomUUID } from "node:crypto";
import { and, asc, eq, inArray, lt, or, sql } from "drizzle-orm";
import { chatDb } from "./db";
import { adminAuditLogs, adminSessions, adminVerificationTokens, chatCounters, chatLeads, chatSessions, chatUsage, leadNotifications } from "./schema";
import { syncSessionMetrics } from "./analytics";
import { settleBudget } from "./budget";

const before = (now: Date, days: number) => new Date(now.getTime() - days * 86400000);
export const retentionPolicy = { conversationDays: 90, leadDays: 365, technicalGraceDays: 7 } as const;
/** Session lock serializes this job with public writes and manual owner deletion. */
export async function maintainSession(id: string, now: Date, cleanup: boolean) {
  return chatDb().transaction(async (tx) => {
    const [session] = await tx.select().from(chatSessions).where(eq(chatSessions.id, id)).for("update");
    if (!session || (session.activeUntil && session.activeUntil > now)) return { sessions: 0, leads: 0, synced: 0 };
    const leads = await tx.select().from(chatLeads).where(eq(chatLeads.sessionId, id));
    const notifications = leads.length ? await tx.select().from(leadNotifications).where(inArray(leadNotifications.leadId, leads.map((l) => l.id))).for("update") : [];
    if (notifications.some((n) => n.status === "processing" && (!n.leaseUntil || n.leaseUntil > now))) return { sessions: 0, leads: 0, synced: 0 };
    await syncSessionMetrics(tx, id, session.locale);
    const lastLeadAt = [session.lastLeadAt, ...leads.map((l) => l.createdAt)].filter((d): d is Date => Boolean(d)).sort((a,b) => b.getTime()-a.getTime())[0];
    await tx.update(chatSessions).set({ metricsSynced: 1, lastLeadAt: lastLeadAt ?? null }).where(eq(chatSessions.id, id));
    if (!cleanup) return { sessions: 0, leads: 0, synced: 1 };
    const expired = lastLeadAt ? lastLeadAt < before(now, retentionPolicy.leadDays) : session.lastActivityAt < before(now, retentionPolicy.conversationDays);
    if (expired) {
      await tx.insert(adminAuditLogs).values({ id: randomUUID(), adminIdentity: "system:retention", action: "conversation.retention_deleted", targetType: "conversation", targetId: id, createdAt: now });
      await tx.delete(chatSessions).where(eq(chatSessions.id, id));
      return { sessions: 1, leads: leads.length, synced: 1 };
    }
    const expiredLeads = leads.filter((lead) => lead.createdAt < before(now, retentionPolicy.leadDays));
    for (const lead of expiredLeads) {
      await tx.insert(adminAuditLogs).values({ id: randomUUID(), adminIdentity: "system:retention", action: "lead.retention_deleted", targetType: "lead", targetId: lead.id, createdAt: now });
      await tx.delete(chatLeads).where(eq(chatLeads.id, lead.id));
    }
    return { sessions: 0, leads: expiredLeads.length, synced: 1 };
  });
}
/** Dedicated connection holds a MySQL advisory lock until the bounded job finishes. */
export async function runDataMaintenance(now = new Date()) {
  const db = chatDb(); const connection = await db.$client.getConnection();
  const lockName = `nmark-cleanup:${process.env.DB_NAME}`.slice(0,64);
  let locked = false;
  try {
    const [rows] = await connection.query<import("mysql2").RowDataPacket[]>("SELECT GET_LOCK(?,0) AS acquired", [lockName]);
    if (Number(rows[0].acquired) !== 1) return { skipped: true };
    locked = true;
    const cleanup = process.env.CHAT_RETENTION_ENABLED === "true";
    const candidates = await db.select({ id: chatSessions.id }).from(chatSessions).where(or(eq(chatSessions.metricsSynced,0),
      ...(cleanup ? [sql`(${chatSessions.lastLeadAt} IS NULL AND ${chatSessions.lastActivityAt} < ${before(now,90)}) OR ${chatSessions.lastLeadAt} < ${before(now,365)} OR EXISTS (SELECT 1 FROM ${chatLeads} WHERE ${chatLeads.sessionId} = ${chatSessions.id} AND ${chatLeads.createdAt} < ${before(now,365)})`] : [])))
      .orderBy(asc(chatSessions.metricsSynced), asc(chatSessions.lastActivityAt), asc(chatSessions.id)).limit(50);
    const counts = { sessions: 0, leads: 0, synced: 0 };
    const started = Date.now(); let processed = 0;
    for (const row of candidates) { if (Date.now()-started>45000) break; processed++; const result = await maintainSession(row.id,now,cleanup); counts.sessions+=result.sessions; counts.leads+=result.leads; counts.synced+=result.synced; }
    // Expired counters/tokens keep no operational purpose after this grace period.
    const cutoff = before(now,7);
    const [counterResult] = await db.delete(chatCounters).where(lt(chatCounters.expiresAt,cutoff)).limit(500);
    const [tokenResult] = await db.delete(adminVerificationTokens).where(lt(adminVerificationTokens.expires,cutoff)).limit(500);
    const [sessionResult] = await db.delete(adminSessions).where(lt(adminSessions.expires,cutoff)).limit(500);
    const stale = await db.select({ id: chatUsage.id }).from(chatUsage).where(and(eq(chatUsage.status,"reserved"),lt(chatUsage.createdAt,new Date(now.getTime()-300000)))).limit(100);
    for (const usage of stale) await settleBudget(usage.id); // Converts stale reservation to conservative committed spend.
    return { skipped: false, retentionEnabled: cleanup, ...counts, moreWork: candidates.length===50 || processed<candidates.length, counters: counterResult.affectedRows, authTokens: tokenResult.affectedRows, authSessions: sessionResult.affectedRows, uncertainUsage: stale.length };
  } finally {
    if (locked) {
      try { await connection.query("SELECT RELEASE_LOCK(?)",[lockName]); }
      catch { connection.destroy(); }
    }
    connection.release();
  }
}
