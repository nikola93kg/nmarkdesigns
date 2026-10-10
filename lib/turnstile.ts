import "server-only";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

/**
 * Verify Cloudflare Turnstile token server-side.
 * If TURNSTILE_SECRET_KEY is not configured in the environment,
 * verification gracefully passes (allowing dev, test, and initial rollout).
 */
export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string,
): Promise<{ success: boolean; bypassed: boolean }> {
  if (process.env.NODE_ENV === "test" || process.env.TURNSTILE_DISABLED === "true") {
    return { success: true, bypassed: true };
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim();

  // If Turnstile is not configured, bypass verification safely (dev / testing mode)
  if (!secretKey) {
    return { success: true, bypassed: true };
  }

  // If Turnstile IS configured, token must be provided
  if (!token || typeof token !== "string" || !token.trim()) {
    return { success: false, bypassed: false };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token.trim());
    if (remoteIp && remoteIp !== "unknown") {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) {
      return { success: false, bypassed: false };
    }

    const data = (await response.json()) as TurnstileVerifyResponse;
    return { success: Boolean(data.success), bypassed: false };
  } catch {
    // Network / timeout error contacting Cloudflare verification endpoint
    return { success: false, bypassed: false };
  }
}
