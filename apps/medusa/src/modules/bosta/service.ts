export interface BostaDeliveryPayload {
  deliveryId?: string | number | null;
  orderId?: string | number | null;
  status?: string | number | null;
  raw?: Record<string, unknown>;
}

export interface BostaCreateShipmentInput {
  orderId: string;
  /** Receiver phone (e.g. from order shipping_address) */
  phone?: string;
  /** Receiver address line */
  address?: string;
  /** COD amount in EGP minor units (piastres) */
  codAmount?: number;
}

export class BostaService {
  private get baseUrl(): string {
    return process.env.BOSTA_BASE_URL ?? "https://api.bosta.co";
  }

  private get apiKey(): string | undefined {
    return process.env.BOSTA_API_KEY;
  }

  /**
   * Creates a shipment (delivery) in Bosta. When BOSTA_API_KEY is set, calls Bosta API;
   * otherwise returns stub payload for testing.
   */
  async createShipment(input: string | BostaCreateShipmentInput): Promise<{
    provider: string;
    orderId: string;
    businessId?: string;
    deliveryId?: string;
  }> {
    const orderId = typeof input === "string" ? input : input.orderId;
    const payload = {
      provider: "bosta",
      orderId,
      businessId: process.env.BOSTA_BUSINESS_ID,
    };

    const apiKey = this.apiKey;
    if (!apiKey) {
      return payload;
    }

    try {
      const body =
        typeof input === "string"
          ? { reference: orderId }
          : {
              reference: orderId,
              receiverPhone: input.phone,
              receiverAddress: input.address,
              codAmount: input.codAmount != null ? input.codAmount / 100 : undefined,
            };

      const res = await fetch(`${this.baseUrl.replace(/\/$/, "")}/api/v2/deliveries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Bosta API error ${res.status}: ${text}`);
      }

      const data = (await res.json()) as { _id?: string; trackingNumber?: string };
      return {
        ...payload,
        deliveryId: data._id ?? data.trackingNumber,
      };
    } catch (err) {
      if (typeof err === "object" && err !== null && "message" in err) {
        throw err;
      }
      throw new Error(`Bosta createShipment failed: ${String(err)}`);
    }
  }

  /**
   * Called when Bosta webhook sends delivery status updates (e.g. delivered, rto).
   * Wire to order/fulfillment update (e.g. nextCodStatus) for full integration.
   */
  async handleDeliveryUpdate(payload: BostaDeliveryPayload): Promise<void> {
    const { orderId, status, deliveryId } = payload;
    if (orderId == null) return;
    const orderIdStr = String(orderId);
    // TODO: resolve order/fulfillment and update status; map Bosta status to COD status
    void orderIdStr;
    void status;
    void deliveryId;
  }
}
