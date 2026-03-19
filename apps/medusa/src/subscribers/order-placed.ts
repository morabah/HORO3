import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";

type OrderPlacedData = { id: string };

interface OrderLike {
  id: string;
  total?: number;
  shipping_address?: { phone?: string; address_1?: string; address_2?: string; city?: string } | null;
  metadata?: Record<string, unknown>;
}

const COD_PROVIDER_ID = "cash-on-delivery";

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<OrderPlacedData>) {
  const orderId = data?.id;
  if (!orderId) return;

  try {
    const codService = container.resolve("codService") as {
      scheduleLifecycle: (orderId: string, phone: string, totalEgp: number) => Promise<void>;
    };
    const bostaService = container.resolve("bostaService") as {
      createShipment: (input: string | { orderId: string; phone?: string; address?: string; codAmount?: number }) => Promise<{ provider: string; orderId: string; businessId?: string; deliveryId?: string }>;
    };

    let phone = "";
    let totalEgp = 0;
    let isCod = false;
    let addressLine = "";

    try {
      const orderService = container.resolve("orderService") as {
        retrieve: (id: string, config?: { relations?: string[] }) => Promise<OrderLike | null>;
      };
      const order = await orderService.retrieve(orderId, {
        relations: ["shipping_address", "payment_collection"],
      });
      if (order) {
        phone = order.shipping_address?.phone ?? "";
        const addr = order.shipping_address;
        addressLine = [addr?.address_1, addr?.address_2, addr?.city].filter(Boolean).join(", ") || "";
        totalEgp = typeof order.total === "number" ? Math.round(order.total / 100) : 0;
        const paymentProvider = (order as OrderLike & { payment_collection?: { payment_sessions?: { provider_id?: string }[] } })
          .payment_collection?.payment_sessions?.[0]?.provider_id;
        isCod = paymentProvider === COD_PROVIDER_ID;
      }
    } catch {
      // Order module or retrieve not available; still create shipment
    }

    if (isCod && phone && codService.scheduleLifecycle) {
      await codService.scheduleLifecycle(orderId, phone, totalEgp || 0);
    }

    if (bostaService.createShipment) {
      await bostaService.createShipment(
        addressLine || phone
          ? { orderId, phone: phone || undefined, address: addressLine || undefined, codAmount: isCod ? totalEgp * 100 : undefined }
          : orderId
      );
    }
  } catch (err) {
    const logger = container.resolve("logger") as { error: (msg: string, e?: unknown) => void };
    logger?.error?.("order-placed subscriber error", err);
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
