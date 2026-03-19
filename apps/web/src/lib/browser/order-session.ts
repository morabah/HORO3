const GIFT_PACKAGING_KEY = "horo_gift_packaging";
const LAST_ORDER_KEY = "horo_last_order";

export interface OrderSnapshot {
  id: string;
  createdAt: string;
  total: number;
  paymentMethod: "cod" | "card" | "wallet";
  shippingMethod: "standard" | "express";
  giftPackaging: boolean;
  itemCount: number;
  items: {
    id: string;
    title: string;
    quantity: number;
    unitPrice: number;
  }[];
  shippingAddress: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postal_code?: string;
    phone: string;
  };
}

export function getGiftPackagingPreference() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(GIFT_PACKAGING_KEY) === "true";
}

export function setGiftPackagingPreference(value: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(GIFT_PACKAGING_KEY, String(value));
}

export function saveLastOrder(snapshot: OrderSnapshot) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(snapshot));
}

export function getLastOrder(): OrderSnapshot | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LAST_ORDER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OrderSnapshot;
  } catch {
    return null;
  }
}
