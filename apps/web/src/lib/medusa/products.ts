import { medusaFetch } from "./client";
import type { Product, PaginatedResponse } from "./types";
import { withProductCompliance } from "@/lib/storefront/compliance";

const STORE_PREFIX = "/store";

export async function getProducts(options?: {
  collection_id?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedResponse<Product>> {
  const params = new URLSearchParams();
  if (options?.collection_id) params.set("collection_id[]", options.collection_id);
  if (options?.limit) params.set("limit", String(options.limit));
  if (options?.offset) params.set("offset", String(options.offset));
  const q = params.toString();
  const response = await medusaFetch<PaginatedResponse<Product>>(
    `${STORE_PREFIX}/products${q ? `?${q}` : ""}`
  );
  return {
    ...response,
    products: response.products?.map(withProductCompliance),
  };
}

export async function getProductByHandle(handle: string): Promise<{ product: Product } | null> {
  try {
    const res = await medusaFetch<{ products: Product[] }>(
      `${STORE_PREFIX}/products?handle=${encodeURIComponent(handle)}`
    );
    const product = res.products?.[0];
    return product ? { product: withProductCompliance(product) } : null;
  } catch {
    return null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await medusaFetch<{ product: Product }>(`${STORE_PREFIX}/products/${id}`);
    return res.product ? withProductCompliance(res.product) : null;
  } catch {
    return null;
  }
}
