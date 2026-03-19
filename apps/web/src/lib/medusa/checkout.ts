import { medusaFetch } from "./client";
import type { Cart } from "./cart";

const STORE_PREFIX = "/store";

/**
 * Returns the Paymob redirect URL from the cart's current payment session, if any.
 * Used for card/wallet: after setPaymentSession, redirect user to Paymob to pay.
 */
export function getPaymentRedirectUrl(cart: Cart | null): string | null {
  const sessions = cart?.payment_sessions;
  if (!sessions?.length) return null;
  const paymob = sessions.find(
    (s) => s.provider_id === "paymob-card" || s.provider_id === "paymob-wallet"
  );
  const data = paymob?.data as { redirect_url?: string; url?: string } | undefined;
  return data?.redirect_url ?? data?.url ?? null;
}

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  postal_code?: string;
  country_code: string;
  phone: string;
}

export async function updateCartShipping(
  cartId: string,
  address: ShippingAddress
): Promise<unknown> {
  return medusaFetch(`${STORE_PREFIX}/carts/${cartId}`, {
    method: "POST",
    body: JSON.stringify({
      shipping_address: address,
    }),
  });
}

export async function setPaymentSession(cartId: string, providerId: string): Promise<unknown> {
  return medusaFetch(`${STORE_PREFIX}/carts/${cartId}/payment-sessions`, {
    method: "POST",
    body: JSON.stringify({ provider_id: providerId }),
  });
}

export interface CompleteCartResult {
  id: string;
}

export async function completeCart(cartId: string): Promise<CompleteCartResult | null> {
  try {
    const res = await medusaFetch<{ type: string; data: { id: string } }>(
      `${STORE_PREFIX}/carts/${cartId}/complete`,
      { method: "POST" }
    );
    return res.data ?? null;
  } catch {
    return null;
  }
}
