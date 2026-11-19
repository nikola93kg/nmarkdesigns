import { settleBudget } from "@/lib/chatbot/budget";
import { randomUUID } from "node:crypto";
import { messageInput, type ChatEvent, type FinishStatus } from "@/lib/chatbot/contracts";
import { apiError, assertOrigin, ChatError, limiterIdentity, ownedSession, parseBody } from "@/lib/chatbot/security";
import { finishTurn, modelHistory, reserveTurn } from "@/lib/chatbot/store";
import { responseStream } from "@/lib/chatbot/provider";
import { chatConfig } from "@/lib/chatbot/config";
import { shouldOfferLead } from "@/lib/chatbot/qualification";
import { recommendedLinks } from "@/content/chatbot/knowledge";

export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request: Request) {
  const requestId = randomUUID();
  try {
    assertOrigin(request);
    const input = await parseBody(request, messageInput);
    const session = await ownedSession();
    const turn = await reserveTurn(session.id, input.clientMessageId, input.message, limiterIdentity(request));
    const links = turn.replay?.links ?? recommendedLinks(input.message, input.locale);
    const abort = new AbortController();
    const onAbort = () => abort.abort();
    request.signal.addEventListener("abort", onAbort, { once: true });
    if (request.signal.aborted) abort.abort();
    let disconnected = false;
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const send = (event: ChatEvent) => {
          if (!disconnected) {
            try { controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`)); }
            catch { disconnected = true; abort.abort(); }
          }
        };
        send({ type: "start", requestId });
        if (turn.replay) {
          send({ type: "delta", text: turn.replay.content });
          send({ type: "links", links });
          send({ type: "done", messageId: turn.assistantId, status: "completed" });
          request.signal.removeEventListener("abort", onAbort);
          controller.close(); return;
        }
        const startedAt = Date.now();
        let usage: { input_tokens: number; output_tokens: number } | undefined;
        let content = "";
        let status: FinishStatus = "error";
        let timedOut = false;
        let errorCode = "STREAM_ERROR";
        const timeout = setTimeout(() => { timedOut = true; abort.abort(); }, chatConfig().timeoutMs);
        try {
          const history = await modelHistory(session.id, turn.assistantId);
          const provider = await responseStream(input.message, input.locale, history, abort.signal, turn.generationId);
          for await (const event of provider) {
            if (event.type === "response.completed" || event.type === "response.failed" || event.type === "response.incomplete") usage = event.response.usage ?? undefined;
            if (event.type === "response.output_text.delta") {
              content += event.delta;
              send({ type: "delta", text: event.delta });
            } else if (event.type === "response.completed") status = "completed";
            else if (event.type === "response.failed" || event.type === "response.incomplete" || event.type === "error") throw new Error("STREAM_ERROR");
          }
          if (!content.trim()) status = "error";
        } catch (error) { if (error instanceof ChatError && error.code === "RATE_LIMITED") errorCode = "RATE_LIMITED"; status = abort.signal.aborted && !timedOut ? "cancelled" : "error"; }
        finally { clearTimeout(timeout); request.signal.removeEventListener("abort", onAbort); }
        try {
          await settleBudget(turn.generationId, usage, Date.now() - startedAt);
          // Do not report completed until the transcript has been durably persisted.
          await finishTurn(session.id, turn.assistantId, turn.generationId, content, status, links);
          if (status === "completed") {
            send({ type: "links", links });
            if (shouldOfferLead(input.message, Boolean(session.leadDeclinedAt))) send({ type: "lead_offer" });
          }
          if (status === "error") send({ type: "error", code: errorCode, requestId });
          send({ type: "done", messageId: turn.assistantId, status });
        } catch { send({ type: "error", code: "UNAVAILABLE", requestId }); }
        if (!disconnected) controller.close();
      },
      cancel() { disconnected = true; abort.abort(); },
    });
    return new Response(stream, { headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "private, no-store, no-transform", "X-Accel-Buffering": "no", "X-Robots-Tag": "noindex, nofollow" } });
  } catch (error) { return apiError(error, requestId); }
}
