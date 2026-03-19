import { NextRequest } from "next/server";
import { searchProducts } from "@/lib/search/meilisearch";
import { rateLimitCheck, getClientIdentifier } from "@/lib/api/rate-limit";

export async function GET(request: NextRequest) {
  const id = getClientIdentifier(request);
  const { ok, remaining, resetAt } = rateLimitCheck(id, "search", 60, 60_000);
  if (!ok) {
    return Response.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(resetAt),
        },
      }
    );
  }
  const q = request.nextUrl.searchParams.get("q") ?? "";
  if (!q.trim()) return Response.json({ hits: [], estimatedTotalHits: 0 });
  const result = await searchProducts(q);
  return Response.json(result, {
    headers: {
      "X-RateLimit-Remaining": String(remaining),
      "X-RateLimit-Reset": String(resetAt),
    },
  });
}
