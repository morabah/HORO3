import { NextResponse } from "next/server";

/**
 * Health check for uptime monitoring (Phase 4).
 * GET /api/health returns 200 when the app is running.
 * Optionally check Medusa/Sanity connectivity in a separate /api/health/deep route.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? "0.1.0",
    },
    { status: 200 }
  );
}
