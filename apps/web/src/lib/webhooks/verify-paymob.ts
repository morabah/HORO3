import { createHmac } from "crypto";

/**
 * Verify Paymob webhook HMAC (Phase 4 security).
 * Paymob sends obj and hmac in the payload; we recompute HMAC from obj and compare.
 */
export function verifyPaymobHmac(payload: Record<string, unknown>, secret: string): boolean {
  if (!secret) return false;
  const obj = payload.obj;
  const receivedHmac = payload.hmac;
  if (typeof receivedHmac !== "string" || obj === undefined) return false;

  const str = typeof obj === "string" ? obj : JSON.stringify(obj);
  const computed = createHmac("sha512", secret).update(str).digest("hex");
  return computed === receivedHmac;
}
