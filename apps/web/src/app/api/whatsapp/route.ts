import { NextRequest, NextResponse } from "next/server";
import { forwardOperationalEvent } from "@/lib/ops/forward-event";
import {
  isConfirmationText,
  recommendSizeFromMessage,
} from "@/lib/whatsapp/size-recommendation";
import { sendWhatsAppTextMessage } from "@/lib/whatsapp/client";
import { verifyWhatsAppSignature } from "@/lib/webhooks/verify-whatsapp";
import { rateLimitCheck, getClientIdentifier } from "@/lib/api/rate-limit";

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("hub.mode");
  const token = request.nextUrl.searchParams.get("hub.verify_token");
  const challenge = request.nextUrl.searchParams.get("hub.challenge");
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === "subscribe" && token && verifyToken && token === verifyToken) {
    return new NextResponse(challenge ?? "ok", { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

const WEBHOOK_RATE_LIMIT = 120;
const WEBHOOK_WINDOW_MS = 60_000;

export async function POST(request: Request) {
  const id = getClientIdentifier(request);
  const { ok, remaining, resetAt } = rateLimitCheck(id, "webhook-whatsapp", WEBHOOK_RATE_LIMIT, WEBHOOK_WINDOW_MS);
  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "X-RateLimit-Remaining": "0", "X-RateLimit-Reset": String(resetAt) } }
    );
  }

  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-hub-signature-256");
    const appSecret = process.env.WHATSAPP_APP_SECRET;
    if (appSecret && !verifyWhatsAppSignature(rawBody, signature, appSecret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = JSON.parse(rawBody) as {
      entry?: {
        changes?: {
          value?: {
            messages?: {
              from?: string;
              text?: { body?: string };
              id?: string;
            }[];
          };
        }[];
      }[];
    };

    const messages = body.entry?.flatMap((entry) => entry.changes ?? [])
      .flatMap((change) => change.value?.messages ?? []) ?? [];

    const handled = await Promise.all(messages.map(async (message) => {
      const text = message.text?.body?.trim() ?? "";
      const from = message.from ?? "";
      const sizeRecommendation = text ? await recommendSizeFromMessage(text) : null;
      const isConfirmation = text ? isConfirmationText(text) : false;

      if (sizeRecommendation && from) {
        await sendWhatsAppTextMessage(
          from,
          `Based on ${sizeRecommendation.heightCm}cm / ${sizeRecommendation.weightKg}kg, we recommend size ${sizeRecommendation.size}. If you like a looser fit, go one size up.`
        );
      } else if (isConfirmation && from) {
        await sendWhatsAppTextMessage(
          from,
          "تم استلام التأكيد. طلبك دخل مرحلة التحضير وسنرسل التتبع أول ما يخرج للشحن."
        );
      }

      const forward = await forwardOperationalEvent("whatsapp", {
        messageId: message.id,
        from,
        text,
        intent: sizeRecommendation ? "size_recommendation" : isConfirmation ? "order_confirmation" : "support",
        sizeRecommendation,
      });

      return {
        from,
        text,
        sizeRecommendation,
        isConfirmation,
        forward,
      };
    }));

    return NextResponse.json(
      { received: true, handled },
      { headers: { "X-RateLimit-Remaining": String(remaining), "X-RateLimit-Reset": String(resetAt) } }
    );
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
