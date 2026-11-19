import { z } from "zod";

export const CHAT_CONSENT_VERSION = "2026-11-19-v1-draft";
export const MESSAGE_LIMIT = 2000;
export const localeSchema = z.enum(["sr", "en"]);
export const sessionInput = z.object({
  locale: localeSchema,
  consent: z.literal(true),
  consentVersion: z.literal(CHAT_CONSENT_VERSION),
}).strict();
export const messageInput = z.object({
  locale: localeSchema,
  message: z.string().trim().min(1).max(MESSAGE_LIMIT),
  clientMessageId: z.uuid(),
}).strict();
export type ChatLink = { id: string; title: string; description: string; url: string; category: string };
export type FinishStatus = "completed" | "cancelled" | "error";
export type ChatEvent =
  | { type: "start"; requestId: string }
  | { type: "delta"; text: string }
  | { type: "links"; links: ChatLink[] }
  | { type: "lead_offer" }
  | { type: "done"; messageId: string; status: FinishStatus }
  | { type: "error"; code: string; requestId: string };
export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  status: "pending" | FinishStatus;
  clientMessageId: string;
  links?: ChatLink[];
};

/** SSE is newline framed; decode after full frames, never per network chunk. */
export async function* readEvents(stream: ReadableStream<Uint8Array>): AsyncGenerator<unknown> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      buffer = buffer.replace(/\r\n/g, "\n");
      let boundary: number;
      while ((boundary = buffer.indexOf("\n\n")) !== -1) {
        const frame = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const data = frame.split("\n").filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart()).join("\n");
        if (data && data !== "[DONE]") yield JSON.parse(data) as unknown;
      }
      if (buffer.length > 64_000) throw new Error("STREAM_FRAME_TOO_LARGE");
      if (done) break;
    }
    if (buffer.trim()) throw new Error("STREAM_TRUNCATED");
  } finally {
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
