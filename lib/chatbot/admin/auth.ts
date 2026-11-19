import "server-only";
import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { and, eq } from "drizzle-orm";
import { chatDb } from "../db";
import { adminUsers, adminAccounts, adminSessions, adminVerificationTokens } from "../schema";
import { createSmtpTransport, getSmtpConfig } from "../../contact-delivery";
import { adminConfig, isOwnerEmail, safeAdminRedirect } from "./config";

export const { auth, handlers } = NextAuth(() => {
  const config = adminConfig();
  const smtp = getSmtpConfig()!;
  const db = chatDb();
  const adapter = DrizzleAdapter(db, { usersTable: adminUsers, accountsTable: adminAccounts, sessionsTable: adminSessions, verificationTokensTable: adminVerificationTokens });
  // The upstream MySQL adapter selects then deletes without a transaction. Serialize consumption.
  adapter.useVerificationToken = async ({ identifier, token }) => db.transaction(async (tx) => {
    const condition = and(eq(adminVerificationTokens.identifier, identifier), eq(adminVerificationTokens.token, token));
    const [record] = await tx.select().from(adminVerificationTokens).where(condition).for("update");
    if (!record) return null;
    await tx.delete(adminVerificationTokens).where(condition);
    return record;
  });
  return {
    adapter, secret: config.secret, basePath: "/api/auth", trustHost: true, useSecureCookies: config.secure,
    session: { strategy: "database", maxAge: 8 * 3600, updateAge: 3600 },
    pages: { signIn: "/admin/sr/login/", verifyRequest: "/admin/sr/login/?sent=1", error: "/admin/sr/login/?error=1" },
    providers: [Nodemailer({ server: { host: smtp.host, port: smtp.port }, from: smtp.user, maxAge: 600,
      normalizeIdentifier(identifier) {
        const value = identifier.trim().toLowerCase();
        if (!isOwnerEmail(value)) throw new Error("ACCESS_DENIED");
        return value;
      },
      async sendVerificationRequest({ identifier, url }) {
        if (!isOwnerEmail(identifier) || new URL(url).origin !== config.origin) throw new Error("ACCESS_DENIED");
        const transport = createSmtpTransport(smtp);
        try {
          const result = await transport.sendMail({ from: { name: "NMark Designs Admin", address: smtp.user }, to: config.email,
            subject: "NMark Designs — admin prijava / sign in",
            text: `Link za prijavu / Sign-in link (10 min):\n${url}\n\nAko niste tražili prijavu, zanemarite ovu poruku. / If you did not request this, ignore it.`,
            disableFileAccess: true, disableUrlAccess: true });
          if (!result.accepted?.some((address) => address.toLowerCase() === config.email)) throw new Error("DELIVERY_FAILED");
        } finally { transport.close(); }
      },
    })],
    callbacks: {
      signIn({ user }) { return isOwnerEmail(user.email); },
      session({ session, user }) { if (!isOwnerEmail(user.email) || !user.emailVerified) session.user.email = ""; return session; },
      redirect({ url }) { return safeAdminRedirect(url, config.origin); },
    },
    logger: { error() { console.error("[admin-auth] AUTH_ERROR"); }, warn() {}, debug() {} },
    debug: false,
  };
});
