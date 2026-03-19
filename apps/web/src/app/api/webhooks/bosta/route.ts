import { NextResponse } from "next/server";
import { verifyBostaWebhook } from "@/lib/webhooks/verify-bosta";
import { forwardOperationalEvent } from "@/lib/ops/forward-event";
import { rateLimitCheck, getClientIdentifier } from "@/lib/api/rate-limit";

const WEBHOOK_RATE_LIMIT = 120;
const WEBHOOK_WINDOW_MS = 60_000;

/**
 * Bosta webhook: delivery status (picked_up, in_transit, delivered, returned).
 * Update Medusa fulfillment and notify customer via WhatsApp/email.
 * Set BOSTA_WEBHOOK_SECRET and verify X-Bosta-Signature if Bosta provides it.
 */
export async function POST(request: Request) {
  const id = getClientIdentifier(request);
  const { ok, remaining, resetAt } = rateLimitCheck(id, "webhook-bosta", WEBHOOK_RATE_LIMIT, WEBHOOK_WINDOW_MS);
  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "X-RateLimit-Remaining": "0", "X-RateLimit-Reset": String(resetAt) } }
    );
  }
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-bosta-signature") ?? request.headers.get("x-signature");
    const secret = process.env.BOSTA_WEBHOOK_SECRET;
    if (secret && signature && !verifyBostaWebhook(rawBody, signature, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    const body = JSON.parse(rawBody) as Record<string, unknown>;
    const normalized = {
      type: "bosta.delivery",
      deliveryId: body.delivery_id ?? body.id ?? null,
      orderId: body.order_id ?? body.tracking_number ?? null,
      status: body.status ?? body.state ?? null,
      raw: body,
    };
    const forward = await forwardOperationalEvent("bosta", normalized);
    return NextResponse.json(
      { received: true, normalized, forward },
      { headers: { "X-RateLimit-Remaining": String(remaining), "X-RateLimit-Reset": String(resetAt) } }
    );
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
