import "server-only";
import { redirect } from "next/navigation";
import type { Locale } from "../../i18n";
import { auth } from "./auth";
import { adminConfig, adminReady, isOwnerEmail } from "./config";
import { ChatError } from "../security";

export async function requireOwner(): Promise<string> {
  if (!adminReady()) throw new ChatError("ADMIN_UNAVAILABLE", 503);
  const session = await auth();
  if (!session?.user?.email || !isOwnerEmail(session.user.email)) throw new ChatError("UNAUTHORIZED", 401);
  return session.user.email.toLowerCase();
}
export function assertAdminOrigin(request: Request) {
  if (request.headers.get("origin") !== adminConfig().origin || request.headers.get("sec-fetch-site") === "cross-site") throw new ChatError("FORBIDDEN", 403);
}

export async function requireOwnerPage(locale: Locale) {
  try { await requireOwner(); } catch { redirect(`/admin/${locale}/login/`); }
}
