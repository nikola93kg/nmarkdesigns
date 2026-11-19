/** Opt-in synthetic provider check. No public sessions, email or real visitor data. Uses configured DB budget accounting. */
import { randomBytes, randomUUID } from "node:crypto";
import { settleBudget } from "./budget";
import { chatDb } from "./db";
import { responseStream } from "./provider";

async function main() {
  if (process.env.CHAT_SMOKE_TEST !== "true") throw new Error("Set CHAT_SMOKE_TEST=true explicitly.");
  process.loadEnvFile(".env.local");
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
  Object.assign(process.env, {
    CHAT_ENABLED: "true", CHAT_PREVIEW: "false", CHAT_ORIGIN: "http://127.0.0.1:3110",
    CHAT_IDENTITY_SECRET: randomBytes(32).toString("hex"),
    CHAT_MAX_CALLS_DAY: "2", CHAT_MAX_CALLS_MONTH: "2", CHAT_MAX_OUTPUT_TOKENS: "500",
    // Test fixture URLs, never presented to public visitors as legal policies.
    CHAT_PRIVACY_URL_SR: "https://nmarkdesigns.com/sr/", CHAT_PRIVACY_URL_EN: "https://nmarkdesigns.com/en/",
  });
  if (!process.env.OPENAI_MODEL) throw new Error("Configure a priced OPENAI_MODEL first");
  const cases = [
    { locale: "sr" as const, message: "Koliko košta poslovni sajt? Odgovori kratko, početnom cenom iz cenovnika.", price: /550/, starting: /od |početn|pocetn|zavis/i },
    { locale: "en" as const, message: "What is the starting price of an online store? Answer briefly using the approved price list.", price: /1[,.\s]?200/, starting: /start|from|scope|depend/i },
  ];
  for (const item of cases) {
    const started = Date.now(); let text = ""; let deltaEvents = 0; let completed = false;
    const signal = AbortSignal.timeout(45000);
    const id = randomUUID();
    let usage: { input_tokens: number; output_tokens: number } | undefined;
    try {
    const stream = await responseStream(item.message, item.locale, [{ role: "user", content: item.message }], signal,id);
    for await (const event of stream) {
      if (event.type === "response.completed" || event.type === "response.incomplete" || event.type === "response.failed") usage=event.response.usage ?? undefined;
      if (event.type === "response.output_text.delta") { text += event.delta; deltaEvents++; }
      if (event.type === "response.completed") completed = true;
    }
    } finally { await settleBudget(id,usage,Date.now()-started); }
    const correctPrice = item.price.test(text); const startingPrice = item.starting.test(text);
    console.log(JSON.stringify({ locale: item.locale, model: process.env.OPENAI_MODEL, completed, deltaEvents, correctPrice, startingPrice, elapsedMs: Date.now() - started }));
    if (!completed || !correctPrice || !startingPrice) throw new Error("SMOKE_ASSERTION_FAILED");
  }
}
main().finally(() => chatDb().$client.end()).catch((error: unknown) => {
  const safe = typeof error === "object" && error !== null ? error as Record<string, unknown> : {};
  // No provider error messages, environment values, prompts or credentials in logs.
  console.error(JSON.stringify({ smoke: "failed", status: typeof safe.status === "number" ? safe.status : null, code: typeof safe.code === "string" ? safe.code : "SMOKE_FAILED" }));
  process.exitCode = 1;
});
