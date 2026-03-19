import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { parseHookPayload, paymobHookSchema, bostaHookSchema, whatsappHookSchema } from "../_lib";
import type { z } from "zod";
import type { BostaDeliveryPayload } from "../../../../../modules/bosta/service";
import type { PaymobTransactionPayload } from "../../../../../modules/paymob/service";

type PaymobPayload = z.infer<typeof paymobHookSchema>;
type BostaPayload = z.infer<typeof bostaHookSchema>;
type WhatsappPayload = z.infer<typeof whatsappHookSchema>;

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const type = req.params?.type ?? "unknown";

  try {
    const parsed = parseHookPayload(type, req.body);

    if (type === "paymob") {
      const paymob = req.scope.resolve("paymobService") as {
        handleTransactionSuccess: (p: PaymobTransactionPayload) => Promise<void>;
      };
      const body = parsed as PaymobPayload;
      await paymob.handleTransactionSuccess({
        orderId: body.orderId ?? null,
        paymentId: body.paymentId ?? null,
        success: body.success,
        amountCents: body.amountCents ?? null,
        raw: body.raw ?? {},
      });
    }

    if (type === "bosta") {
      const bosta = req.scope.resolve("bostaService") as {
        createShipment: (input: string) => Promise<{ provider: string; orderId: string; businessId?: string; deliveryId?: string }>;
        handleDeliveryUpdate: (p: BostaDeliveryPayload) => Promise<void>;
      };
      const body = parsed as BostaPayload;
      const orderId = body.orderId != null ? String(body.orderId) : null;
      if (orderId) {
        await bosta.createShipment(orderId);
        await bosta.handleDeliveryUpdate({
          deliveryId: body.deliveryId ?? null,
          orderId: body.orderId ?? null,
          status: body.status ?? null,
          raw: body.raw ?? {},
        });
      }
    }

    if (type === "whatsapp") {
      const whatsapp = req.scope.resolve("whatsappService") as {
        createConfirmationPayload: (orderId: string, phone: string) => unknown;
      };
      const body = parsed as WhatsappPayload;
      if (body.from && body.intent === "order_confirmation") {
        whatsapp.createConfirmationPayload("", body.from);
      }
    }

    res.status(200).json({
      received: true,
      type,
      payload: parsed,
    });
  } catch (error) {
    res.status(400).json({
      received: false,
      type,
      error: error instanceof Error ? error.message : "Invalid hook payload",
    });
  }
}
