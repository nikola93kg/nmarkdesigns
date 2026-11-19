import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { apiError, ChatError } from "../security";

export async function adminResponse(work: () => Promise<unknown>) {
  const requestId = randomUUID();
  try { return Response.json({ data: await work(), requestId }, { headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } }); }
  catch (error) { return apiError(error instanceof z.ZodError ? new ChatError("INVALID_INPUT", 400) : error, requestId); }
}
export function queryValues(params: URLSearchParams) { return Object.fromEntries([...params.entries()].filter(([, value]) => value !== "")); }
