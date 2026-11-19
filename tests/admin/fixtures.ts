import mysql from "mysql2/promise";
import { randomUUID, randomBytes } from "node:crypto";
import { CHAT_CONSENT_VERSION } from "@/lib/chatbot/contracts";
export const ownerEmail = "owner@example.test";
export const authSecret = "local-admin-test-secret-with-at-least-32-characters";
export function database() {
  if (process.env.DB_HOST !== "127.0.0.1" || !/(?:^|_)nmark_chatbot_test$/.test(process.env.DB_NAME ?? "")) throw new Error("Disposable local test database required");
  return mysql.createPool({ host: "127.0.0.1", port: Number(process.env.DB_PORT), database: process.env.DB_NAME, user: process.env.DB_USER, password: process.env.DB_PASSWORD, timezone: "Z", connectionLimit: 2 });
}
export async function authSession(db: mysql.Pool, email = ownerEmail, expired = false) {
  const userId = randomUUID(); const token = randomBytes(32).toString("hex");
  await db.execute("INSERT INTO chat_admin_users (id,email,email_verified) VALUES (?,?,?) ON DUPLICATE KEY UPDATE email_verified=VALUES(email_verified)", [userId, email, new Date()]);
  const [users] = await db.execute<mysql.RowDataPacket[]>("SELECT id FROM chat_admin_users WHERE email=?", [email]);
  await db.execute("INSERT INTO chat_admin_sessions (session_token,user_id,expires) VALUES (?,?,?)", [token, users[0].id, new Date(Date.now() + (expired ? -3600000 : 3600000))]);
  return token;
}
export async function seedConversation(db: mysql.Pool, withLead = true) {
  const id = randomUUID(); const leadId = randomUUID(); const now = new Date();
  await db.execute("INSERT INTO chat_sessions (id,token_hash,locale,consent_version,consent_at,created_at,last_activity_at,expires_at) VALUES (?,?,?,?,?,?,?,?)", [id, randomBytes(32).toString("hex"), "sr", CHAT_CONSENT_VERSION, now, now, now, new Date(Date.now() + 3600000)]);
  for (const [index, role, content, status] of [[0,"user","Potreban mi je poslovni sajt","completed"],[1,"assistant","Početna cena je 550 €.","completed"],[2,"user","Želim ponudu","completed"],[3,"assistant","Fixture error","error"]] as const) {
    await db.execute("INSERT INTO chat_messages (id,session_id,role,content,status,client_message_id,created_at,completed_at) VALUES (?,?,?,?,?,?,?,?)", [randomUUID(), id, role, content, status, randomUUID(), new Date(now.getTime() + index), now]);
  }
  await db.execute("UPDATE chat_messages SET links=? WHERE session_id=? AND role='assistant' AND status='completed'", [JSON.stringify([{ id: "pricing", title: "Starting prices", description: "", category: "pricing", url: "https://nmarkdesigns.com/en/pricing/" }]), id]);
  if (withLead) {
    await db.execute("INSERT INTO chat_leads (id,session_id,client_submission_id,payload_hash,locale,name,email,phone,company,website,service,budget_range,timeframe,project_description,preferred_contact_method,privacy_consent_at,consent_version,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [leadId,id,randomUUID(),randomBytes(32).toString("hex"),"sr","Test Visitor","visitor@example.test","","","","new_website","","","Sintetički upit","email",now,"contact-test",now]);
    await db.execute("INSERT INTO chat_lead_notifications (id,lead_id,status,next_retry_at,created_at,last_error_code) VALUES (?,?,?,?,?,?)", [randomUUID(),leadId,"uncertain",now,now,"SMTP_ACCEPTANCE_UNKNOWN"]);
  }
  return { id, leadId };
}
