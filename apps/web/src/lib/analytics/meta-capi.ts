/**
 * Meta Conversions API (CAPI) — server-side events for checkout and key conversions.
 * Plan Phase 3: Pixel ID + server-side events for checkout and key conversions.
 * Set NEXT_PUBLIC_META_PIXEL_ID and META_CAPI_ACCESS_TOKEN in env.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CAPI_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const CAPI_URL = "https://graph.facebook.com/v18.0/%s/events";

export interface MetaCapiEvent {
  event_name: string;
  event_time: number;
  user_data?: {
    em?: string[];
    ph?: string[];
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
  };
  custom_data?: {
    currency?: string;
    value?: number;
    content_ids?: string[];
    content_type?: string;
    order_id?: string;
  };
  event_source_url?: string;
  action_source: "website" | "app" | "email" | "phone_call" | "chat" | "physical_store" | "system";
}

export async function sendMetaEvent(events: MetaCapiEvent[]): Promise<boolean> {
  if (!PIXEL_ID || !CAPI_TOKEN) return false;
  try {
    const res = await fetch(CAPI_URL.replace("%s", PIXEL_ID), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: events.map((e) => ({
          ...e,
          event_time: e.event_time || Math.floor(Date.now() / 1000),
          action_source: e.action_source ?? "website",
        })),
        access_token: CAPI_TOKEN,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function createAddToCartEvent(params: { value: number; contentIds: string[]; currency?: string }): MetaCapiEvent {
  return {
    event_name: "AddToCart",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    custom_data: {
      currency: params.currency ?? "EGP",
      value: params.value,
      content_ids: params.contentIds,
      content_type: "product",
    },
  };
}

export function createPurchaseEvent(params: {
  orderId: string;
  value: number;
  contentIds?: string[];
  currency?: string;
}): MetaCapiEvent {
  return {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    custom_data: {
      order_id: params.orderId,
      currency: params.currency ?? "EGP",
      value: params.value,
      content_ids: params.contentIds,
      content_type: "product",
    },
  };
}

export function createInitiateCheckoutEvent(params: { value: number; contentIds?: string[]; currency?: string }): MetaCapiEvent {
  return {
    event_name: "InitiateCheckout",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    custom_data: {
      currency: params.currency ?? "EGP",
      value: params.value,
      content_ids: params.contentIds,
      content_type: "product",
    },
  };
}
