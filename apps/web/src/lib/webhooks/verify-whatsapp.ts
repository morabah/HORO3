import { createHmac, timingSafeEqual } from "crypto";

/**
 * Verify WhatsApp Cloud API webhook signature (X-Hub-Signature-256).
 * Uses app secret from Meta app settings. When WHATSAPP_APP_SECRET is set, verify before processing POST.
 */
export function verifyWhatsAppSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string
): boolean {
  if (!secret || !signatureHeader?.startsWith("sha256=")) return false;
  const received = signatureHeader.slice(7).toLowerCase();
  const computed = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  if (received.length !== computed.length) return false;
  try {
    return timingSafeEqual(Buffer.from(received, "hex"), Buffer.from(computed, "hex"));
  } catch {
    return false;
  }
}
