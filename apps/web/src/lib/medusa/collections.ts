import { medusaFetch } from "./client";
import type { ProductCategory } from "./types";

const STORE_PREFIX = "/store";

export async function getCollections(options?: {
  limit?: number;
  offset?: number;
}): Promise<{ product_categories: ProductCategory[]; count: number }> {
  const params = new URLSearchParams();
  if (options?.limit) params.set("limit", String(options.limit));
  if (options?.offset) params.set("offset", String(options.offset));
  const q = params.toString();
  const res = await medusaFetch<{ product_categories: ProductCategory[]; count: number }>(
    `${STORE_PREFIX}/product-categories${q ? `?${q}` : ""}`
  );
  return res;
}

export async function getCollectionByHandle(handle: string): Promise<ProductCategory | null> {
  try {
    const res = await medusaFetch<{ product_categories: ProductCategory[] }>(
      `${STORE_PREFIX}/product-categories?handle=${encodeURIComponent(handle)}`
    );
    return res.product_categories?.[0] ?? null;
  } catch {
    return null;
  }
}
