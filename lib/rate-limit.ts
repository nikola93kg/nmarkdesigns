import "server-only";

// In-memory sliding-window rate limiter for single-instance Node.js runtime.
// For multi-instance clustered or serverless deployments, see docs for Redis / Upstash adapter.
interface RateLimitRecord {
  timestamps: number[];
}

const ipRecords = new Map<string, RateLimitRecord>();
const submissionTimes = new Map<string, number>();

// Clean up stale memory entries every 10 minutes
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
let lastCleanup = Date.now();

function purgeStale(now: number, windowMs: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [ip, record] of ipRecords.entries()) {
    record.timestamps = record.timestamps.filter((t) => now - t < windowMs);
    if (record.timestamps.length === 0) ipRecords.delete(ip);
  }

  for (const [fingerprint, timestamp] of submissionTimes.entries()) {
    if (now - timestamp > 60_000) submissionTimes.delete(fingerprint);
  }
}

/**
 * Check whether a request from clientIp exceeds maxRequests within windowMs.
 * Returns true if allowed, false if rate limited.
 */
export function checkRateLimit(
  clientIp: string,
  maxRequests = 5,
  windowMs = 10 * 60 * 1000,
): boolean {
  if (process.env.NODE_ENV === "test" || process.env.RATE_LIMIT_DISABLED === "true") return true;
  if (!clientIp || clientIp === "unknown") return true;

  const now = Date.now();
  purgeStale(now, windowMs);

  const record = ipRecords.get(clientIp) ?? { timestamps: [] };
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= maxRequests) {
    return false;
  }

  record.timestamps.push(now);
  ipRecords.set(clientIp, record);
  return true;
}

/**
 * Checks for immediate duplicate submission of identical content from the same client.
 * Returns true if duplicate is detected, false otherwise.
 */
export function checkDuplicateSubmission(fingerprint: string, debounceMs = 15_000): boolean {
  if (process.env.NODE_ENV === "test" || process.env.RATE_LIMIT_DISABLED === "true") return false;
  const now = Date.now();
  const lastTime = submissionTimes.get(fingerprint);

  if (lastTime && now - lastTime < debounceMs) {
    return true;
  }

  submissionTimes.set(fingerprint, now);
  return false;
}

/**
 * Reset rate limit and duplicate store (used primarily for unit testing).
 */
export function resetRateLimits(): void {
  ipRecords.clear();
  submissionTimes.clear();
}
