const host = process.env.NEXT_PUBLIC_MEILISEARCH_HOST;
const searchKey = process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY;

export async function searchProducts(
  query: string,
  _locale?: string
): Promise<{ hits: { id?: string; title?: string; handle?: string }[]; estimatedTotalHits: number }> {
  if (!host || !searchKey) return { hits: [], estimatedTotalHits: 0 };
  const params = new URLSearchParams({ q: query });
  if (_locale) params.set("filter", `locale = ${_locale}`);
  try {
    const res = await fetch(
      `${host.replace(/\/$/, "")}/indexes/products/search?${params}`,
      { headers: { Authorization: `Bearer ${searchKey}` } }
    );
    if (!res.ok) return { hits: [], estimatedTotalHits: 0 };
    const data = await res.json();
    return { hits: data.hits ?? [], estimatedTotalHits: data.estimatedTotalHits ?? 0 };
  } catch {
    return { hits: [], estimatedTotalHits: 0 };
  }
}
