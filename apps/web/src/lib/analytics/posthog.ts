"use client";

import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

export function initPostHog() {
  if (typeof window !== "undefined" && key) {
    posthog.init(key, { api_host: host ?? "https://app.posthog.com" });
  }
}

export function captureEvent(name: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined" && posthog.__loaded) {
    posthog.capture(name, props);
  }
}
