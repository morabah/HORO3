"use client";

import { usePathname } from "next/navigation";
import { useEffect, Suspense } from "react";
import { initPostHog, captureEvent } from "@/lib/analytics/posthog";

function PostHogPageView() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname && typeof window !== "undefined") {
      captureEvent("$pageview", { path: pathname });
    }
  }, [pathname]);
  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
    </>
  );
}
