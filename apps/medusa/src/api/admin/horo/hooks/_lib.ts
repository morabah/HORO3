import { z } from "zod";

export const paymobHookSchema = z.object({
  type: z.literal("paymob.transaction"),
  success: z.boolean().optional(),
  orderId: z.union([z.string(), z.number()]).nullable().optional(),
  paymentId: z.union([z.string(), z.number()]).nullable().optional(),
  amountCents: z.union([z.string(), z.number()]).nullable().optional(),
  raw: z.record(z.unknown()),
});

export const bostaHookSchema = z.object({
  type: z.literal("bosta.delivery"),
  deliveryId: z.union([z.string(), z.number()]).nullable().optional(),
  orderId: z.union([z.string(), z.number()]).nullable().optional(),
  status: z.union([z.string(), z.number()]).nullable().optional(),
  raw: z.record(z.unknown()),
});

export const whatsappHookSchema = z.object({
  messageId: z.string().nullable().optional(),
  from: z.string().optional(),
  text: z.string().optional(),
  intent: z.enum(["size_recommendation", "order_confirmation", "support"]),
  sizeRecommendation: z
    .object({
      size: z.string(),
      heightCm: z.number(),
      weightKg: z.number(),
    })
    .nullable()
    .optional(),
});

export function parseHookPayload(type: string, payload: unknown) {
  if (type === "paymob") return paymobHookSchema.parse(payload);
  if (type === "bosta") return bostaHookSchema.parse(payload);
  if (type === "whatsapp") return whatsappHookSchema.parse(payload);
  throw new Error(`Unsupported hook type: ${type}`);
}
