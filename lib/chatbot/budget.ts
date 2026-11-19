import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { chatDb } from "./db";
import { chatBudgetBuckets, chatUsage } from "./schema";
import { ChatError } from "./security";

/** Exact decimal parsing: integer micro-USD; never binary float money arithmetic. */
export function usdMicros(value: string | undefined): number {
  if (!value || !/^\d{1,6}(?:\.\d{1,6})?$/.test(value)) throw new Error("BUDGET_UNAVAILABLE");
  const [whole, fraction = ""] = value.split("."); const result = Number(whole) * 1_000_000 + Number(fraction.padEnd(6, "0"));
  if (!Number.isSafeInteger(result) || result <= 0) throw new Error("BUDGET_UNAVAILABLE");
  return result;
}
export function budgetConfig() {
  const model = process.env.OPENAI_MODEL;
  if (!model || model.length > 120 || process.env.CHAT_PRICE_MODEL !== model) throw new Error("BUDGET_UNAVAILABLE");
  const dailyCalls=Number(process.env.CHAT_MAX_CALLS_DAY),monthlyCalls=Number(process.env.CHAT_MAX_CALLS_MONTH);
  if(!Number.isSafeInteger(dailyCalls)||dailyCalls<=0||!Number.isSafeInteger(monthlyCalls)||monthlyCalls<=0)throw new Error("BUDGET_UNAVAILABLE");
  return { model, dailyCalls:Math.min(dailyCalls,10000),monthlyCalls:Math.min(monthlyCalls,100000), daily: usdMicros(process.env.CHAT_BUDGET_DAY_USD), monthly: usdMicros(process.env.CHAT_BUDGET_MONTH_USD),
    inputRate: usdMicros(process.env.CHAT_PRICE_INPUT_USD_PER_MILLION), outputRate: usdMicros(process.env.CHAT_PRICE_OUTPUT_USD_PER_MILLION) };
}
export function tokenCost(input: number, output: number, inputRate: number, outputRate: number) {
  if (![input, output].every((n) => Number.isSafeInteger(n) && n >= 0 && n <= 1_000_000)) throw new Error("INVALID_USAGE");
  if (![inputRate, outputRate].every((n) => Number.isSafeInteger(n) && n > 0)) throw new Error("INVALID_USAGE");
  // Integer products remain exact even at the highest permitted configured rates.
  const million = BigInt(1_000_000), roundUp = million - BigInt(1);
  const result = Number((BigInt(input) * BigInt(inputRate) + roundUp) / million + (BigInt(output) * BigInt(outputRate) + roundUp) / million);
  if (!Number.isSafeInteger(result)) throw new Error("INVALID_USAGE");
  return result;
}
export function budgetKeys(now = new Date()) { return [`d:${now.toISOString().slice(0, 10)}`, `m:${now.toISOString().slice(0, 7)}`] as const; }
/** Shared daily/monthly rows are locked in deterministic order. No generation before commit. */
export async function reserveBudget(id: string, inputTokens: number, maxOutput: number, now = new Date()) {
  const config = budgetConfig(); const [dayKey, monthKey] = budgetKeys(now);
  const amount = tokenCost(inputTokens, maxOutput, config.inputRate, config.outputRate);
  return chatDb().transaction(async (tx) => {
    const [old] = await tx.select().from(chatUsage).where(eq(chatUsage.id, id));
    if (old) throw new ChatError("BUSY", 409);
    for (const [key, limit, calls] of [[dayKey, config.daily,config.dailyCalls], [monthKey, config.monthly,config.monthlyCalls]] as const) {
      await tx.insert(chatBudgetBuckets).values({ key }).onDuplicateKeyUpdate({ set: { key } });
      const [bucket] = await tx.select().from(chatBudgetBuckets).where(eq(chatBudgetBuckets.key, key)).for("update");
      if (bucket.calls >= calls || bucket.committedMicros + bucket.reservedMicros + amount > limit) throw new ChatError("RATE_LIMITED", 429, 3600);
      await tx.update(chatBudgetBuckets).set({ calls: sql`${chatBudgetBuckets.calls} + 1`, reservedMicros: sql`${chatBudgetBuckets.reservedMicros} + ${amount}` }).where(eq(chatBudgetBuckets.key, key));
    }
    await tx.insert(chatUsage).values({ id, dayKey, monthKey, model: config.model, inputRate: config.inputRate, outputRate: config.outputRate, reservedMicros: amount, status: "reserved", createdAt: now });
    return amount;
  });
}
/** Unknown usage retains the entire reservation. A crash cannot silently refund a paid request. */
export async function settleBudget(id: string, usage?: { input_tokens: number; output_tokens: number }, latencyMs?: number, notSent = false) {
  await chatDb().transaction(async (tx) => {
    const [record] = await tx.select().from(chatUsage).where(eq(chatUsage.id, id)).for("update");
    if (!record || record.status !== "reserved") return;
    const charged = notSent ? 0 : usage ? tokenCost(usage.input_tokens, usage.output_tokens, record.inputRate, record.outputRate) : record.reservedMicros;
    for (const key of [record.dayKey, record.monthKey]) {
      await tx.update(chatBudgetBuckets).set({ reservedMicros: sql`${chatBudgetBuckets.reservedMicros} - ${record.reservedMicros}`,
        committedMicros: sql`${chatBudgetBuckets.committedMicros} + ${charged}` }).where(eq(chatBudgetBuckets.key, key));
    }
    await tx.update(chatUsage).set({ status: notSent ? "released" : usage ? "settled" : "uncertain", chargedMicros: charged,
      inputTokens: usage?.input_tokens ?? null, outputTokens: usage?.output_tokens ?? null,
      latencyMs: latencyMs === undefined ? null : Math.min(2_147_483_647, Math.max(0, Math.round(latencyMs))) }).where(and(eq(chatUsage.id, id), eq(chatUsage.status, "reserved")));
  });
}
export async function budgetSummary() {
  const keys = budgetKeys();
  const rows = await Promise.all(keys.map(async (key) => (await chatDb().select().from(chatBudgetBuckets).where(eq(chatBudgetBuckets.key, key)))[0]));
  let config; try { config = budgetConfig(); } catch { /* fail-closed state visible to owner */ }
  return { configured: Boolean(config), day: { limit: config?.daily ?? 0, committed: rows[0]?.committedMicros ?? 0, reserved: rows[0]?.reservedMicros ?? 0 },
    month: { limit: config?.monthly ?? 0, committed: rows[1]?.committedMicros ?? 0, reserved: rows[1]?.reservedMicros ?? 0 } };
}
