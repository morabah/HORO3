"use client";

import { useEffect } from "react";
import { captureEvent } from "@/lib/analytics/posthog";

interface EventTrackerProps {
  event: string;
  payload?: Record<string, unknown>;
}

export function EventTracker({ event, payload }: EventTrackerProps) {
  useEffect(() => {
    captureEvent(event, payload);
  }, [event, payload]);

  return null;
}
