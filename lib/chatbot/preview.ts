import type { ChatEvent, ChatLink } from "./contracts";

/** Browser-only sample playback. No network, persistence, model or personal-data processing. */
export async function* previewEvents(text: string, links: ChatLink[], signal: AbortSignal): AsyncGenerator<ChatEvent> {
  yield { type: "start", requestId: "local-demo" };
  for (const word of text.match(/\S+\s*/g) ?? []) {
    if (signal.aborted) throw new DOMException("Stopped", "AbortError");
    await new Promise<void>((resolve) => setTimeout(resolve, 25));
    if (signal.aborted) throw new DOMException("Stopped", "AbortError");
    yield { type: "delta", text: word };
  }
  yield { type: "links", links };
  yield { type: "done", messageId: "local-demo", status: "completed" };
}
