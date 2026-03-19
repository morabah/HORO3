/**
 * Simple in-memory rate limit for API routes (Phase 4 security).
 * For production at scale, use Redis or Vercel KV.
 */

const store = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 60; // per window per key

function getKey(identifier: string, prefix: string): string {
  return `${prefix}:${identifier}`;
}

export function rateLimitCheck(
  identifier: string,
  prefix: string = "api",
  max: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS
): { ok: boolean; remaining: number; resetAt: number } {
  const key = getKey(identifier, prefix);
  const now = Date.now();
  let entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { ok: true, remaining: max - 1, resetAt: entry.resetAt };
  }

  entry.count += 1;
  const remaining = Math.max(0, max - entry.count);
  const ok = entry.count <= max;
  return { ok, remaining, resetAt: entry.resetAt };
}

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0]?.trim() : null;
  return ip ?? "anonymous";
}
