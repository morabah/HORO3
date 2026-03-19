import { NextResponse } from "next/server";
import { verifyPaymobHmac } from "@/lib/webhooks/verify-paymob";
import { forwardOperationalEvent } from "@/lib/ops/forward-event";
import { rateLimitCheck, getClientIdentifier } from "@/lib/api/rate-limit";

const WEBHOOK_RATE_LIMIT = 120;
const WEBHOOK_WINDOW_MS = 60_000;

/**
 * Paymob webhook: validate HMAC and update Medusa payment/order.
 * Configure in Paymob dashboard to point to this URL.
 * Set PAYMOB_HMAC_SECRET in env.
 */
export async function POST(request: Request) {
  const id = getClientIdentifier(request);
  const { ok, remaining, resetAt } = rateLimitCheck(id, "webhook-paymob", WEBHOOK_RATE_LIMIT, WEBHOOK_WINDOW_MS);
  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "X-RateLimit-Remaining": "0", "X-RateLimit-Reset": String(resetAt) } }
    );
  }
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const secret = process.env.PAYMOB_HMAC_SECRET;
    if (secret && !verifyPaymobHmac(body, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    const transaction = typeof body.obj === "object" && body.obj ? body.obj as Record<string, unknown> : {};
    const normalized = {
      type: "paymob.transaction",
      success: Boolean(transaction.success),
      orderId: transaction.order?.toString?.() ?? body.order_id ?? null,
      paymentId: transaction.id ?? null,
      amountCents: transaction.amount_cents ?? null,
      raw: body,
    };
    const forward = await forwardOperationalEvent("paymob", normalized);
    return NextResponse.json(
      { received: true, normalized, forward },
      { headers: { "X-RateLimit-Remaining": String(remaining), "X-RateLimit-Reset": String(resetAt) } }
    );
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
