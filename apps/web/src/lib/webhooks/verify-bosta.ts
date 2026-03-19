import { createHmac } from "crypto";

/**
 * Verify Bosta webhook signature (Phase 4 security).
 * If Bosta sends a signature header (e.g. X-Bosta-Signature), verify HMAC of body.
 */
export function verifyBostaWebhook(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  if (!secret || !signature) return false;
  const computed = createHmac("sha256", secret).update(body).digest("hex");
  return computed === signature;
}
