/**
 * Client-side cart store using localStorage
 * Works as fallback when Medusa backend is offline
 */

import type { Cart, CartItem } from "./cart";
import { DEMO_PRODUCTS } from "./demo-data";
import { getLocalizedProductTitle } from "../storefront/product-localization";

const STORAGE_KEY = "horo:demo-cart";

function generateId(): string {
  return `demo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function readCart(): Cart {
  if (typeof window === "undefined") {
    return { id: "demo-cart", items: [], total: 0 };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { id: "demo-cart", items: [], total: 0 };
}

function writeCart(cart: Cart): Cart {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }
  return cart;
}

function getDocumentLocale(): "ar" | "en" {
  if (typeof document === "undefined") return "ar";
  return document.documentElement.lang === "en" ? "en" : "ar";
}

function recalcTotal(cart: Cart): Cart {
  cart.total = cart.items.reduce((sum, item) => sum + (item.unit_price ?? 0) * item.quantity, 0);
  return cart;
}

export function getDemoCart(): Cart {
  return readCart();
}

export function addToDemoCart(variantId: string, quantity: number): Cart {
  const cart = readCart();
  
  // Find existing item
  const existing = cart.items.find((item) => item.variant_id === variantId);
  if (existing) {
    existing.quantity += quantity;
    return writeCart(recalcTotal(cart));
  }

  // Find product info from demo data
  let productTitle = "HORO piece";
  let unitPrice = 0;
  let thumbnail: string | undefined;

  for (const product of DEMO_PRODUCTS) {
    const variant = product.variants?.find((v) => v.id === variantId);
    if (variant) {
      const sizeName = variant.options?.[0]?.value ?? "";
      const locale = getDocumentLocale();
      const localizedTitle = getLocalizedProductTitle(product, locale) ?? product.title;
      productTitle = `${localizedTitle} — ${sizeName}`;
      unitPrice = variant.prices?.[0]?.amount ?? 0;
      thumbnail = product.thumbnail ?? undefined;
      break;
    }
  }

  const newItem: CartItem = {
    id: generateId(),
    variant_id: variantId,
    quantity,
    title: productTitle,
    thumbnail,
    unit_price: unitPrice,
  };

  cart.items.push(newItem);
  return writeCart(recalcTotal(cart));
}

export function updateDemoCartItem(itemId: string, quantity: number): Cart {
  const cart = readCart();
  const item = cart.items.find((i) => i.id === itemId);
  if (item) {
    item.quantity = quantity;
  }
  return writeCart(recalcTotal(cart));
}

export function removeDemoCartItem(itemId: string): Cart {
  const cart = readCart();
  cart.items = cart.items.filter((i) => i.id !== itemId);
  return writeCart(recalcTotal(cart));
}

export function clearDemoCart(): Cart {
  const cart: Cart = { id: "demo-cart", items: [], total: 0 };
  return writeCart(cart);
}
