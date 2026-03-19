import { medusaFetch } from "./client";
import {
  getDemoCart,
  addToDemoCart,
  updateDemoCartItem,
  removeDemoCartItem,
} from "./cart-store";

const STORE_PREFIX = "/store";

export interface PaymentSession {
  id: string;
  provider_id: string;
  data?: Record<string, unknown>;
}

export interface Cart {
  id: string;
  items: CartItem[];
  region_id?: string;
  total?: number;
  payment_sessions?: PaymentSession[];
}

export interface CartItem {
  id: string;
  variant_id: string;
  quantity: number;
  title?: string;
  thumbnail?: string;
  unit_price?: number;
}

export async function createCart(regionId?: string): Promise<Cart | null> {
  try {
    const res = await medusaFetch<{ cart: Cart }>(`${STORE_PREFIX}/carts`, {
      method: "POST",
      body: JSON.stringify(regionId ? { region_id: regionId } : {}),
    });
    return res.cart ?? null;
  } catch {
    return getDemoCart();
  }
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const res = await medusaFetch<{ cart: Cart }>(`${STORE_PREFIX}/carts/${cartId}`);
    return res.cart ?? null;
  } catch {
    return getDemoCart();
  }
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<Cart | null> {
  try {
    const res = await medusaFetch<{ cart: Cart }>(`${STORE_PREFIX}/carts/${cartId}/line-items`, {
      method: "POST",
      body: JSON.stringify({ variant_id: variantId, quantity }),
    });
    return res.cart ?? null;
  } catch {
    return addToDemoCart(variantId, quantity);
  }
}

export async function updateCartItem(
  cartId: string,
  itemId: string,
  quantity: number
): Promise<Cart | null> {
  try {
    const res = await medusaFetch<{ cart: Cart }>(
      `${STORE_PREFIX}/carts/${cartId}/line-items/${itemId}`,
      {
        method: "POST",
        body: JSON.stringify({ quantity }),
      }
    );
    return res.cart ?? null;
  } catch {
    return updateDemoCartItem(itemId, quantity);
  }
}

export async function removeCartItem(cartId: string, itemId: string): Promise<Cart | null> {
  try {
    const res = await medusaFetch<{ cart: Cart }>(
      `${STORE_PREFIX}/carts/${cartId}/line-items/${itemId}`,
      { method: "DELETE" }
    );
    return res.cart ?? null;
  } catch {
    return removeDemoCartItem(itemId);
  }
}
