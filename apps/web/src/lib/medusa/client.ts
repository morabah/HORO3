import { demoFetch } from "./demo-data";

const MEDUSA_BACKEND = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000";

export const medusaConfig = {
  baseUrl: MEDUSA_BACKEND,
  apiKey: process.env.MEDUSA_API_KEY,
};

export async function medusaFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${medusaConfig.baseUrl}${path}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(medusaConfig.apiKey && { Authorization: `Bearer ${medusaConfig.apiKey}` }),
        ...options?.headers,
      },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`Medusa API error: ${res.status}`);
    return res.json() as Promise<T>;
  } catch {
    // Medusa offline — fall back to demo data
    const demo = demoFetch<T>(path, options);
    if (demo !== null) return demo;
    throw new Error(`Medusa offline and no demo data for: ${path}`);
  }
}
