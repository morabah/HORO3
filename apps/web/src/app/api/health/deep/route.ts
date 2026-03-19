import { NextResponse } from "next/server";

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000";
const SANITY_PROJECT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * Deep health check: ping Medusa and optionally Sanity.
 * For uptime monitoring or pre-launch verification (Phase 4).
 */
export async function GET() {
  const checks: Record<string, { status: string; latencyMs?: number; error?: string }> = {};
  let overallOk = true;

  try {
    const t0 = Date.now();
    const res = await fetch(`${MEDUSA_URL.replace(/\/$/, "")}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    const latencyMs = Date.now() - t0;
    if (res.ok) {
      checks.medusa = { status: "ok", latencyMs };
    } else {
      checks.medusa = { status: "error", latencyMs, error: `HTTP ${res.status}` };
      overallOk = false;
    }
  } catch (err) {
    checks.medusa = { status: "error", error: err instanceof Error ? err.message : String(err) };
    overallOk = false;
  }

  if (SANITY_PROJECT) {
    try {
      const t0 = Date.now();
      const res = await fetch(
        `https://${SANITY_PROJECT}.api.sanity.io/v1/data/query/${SANITY_DATASET}?query=*%5B%5D%5B0%5D`,
        { signal: AbortSignal.timeout(5000) }
      );
      const latencyMs = Date.now() - t0;
      if (res.ok) {
        checks.sanity = { status: "ok", latencyMs };
      } else {
        checks.sanity = { status: "error", latencyMs, error: `HTTP ${res.status}` };
        overallOk = false;
      }
    } catch (err) {
      checks.sanity = { status: "error", error: err instanceof Error ? err.message : String(err) };
      overallOk = false;
    }
  }

  return NextResponse.json(
    {
      status: overallOk ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      checks,
    },
    { status: overallOk ? 200 : 503 }
  );
}
