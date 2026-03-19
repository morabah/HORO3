"use client";

import { useEffect } from "react";
import { captureEvent } from "@/lib/analytics/posthog";

interface ProductViewTrackerProps {
  handle: string;
  title: string;
  artist?: string;
  price?: number | null;
}

export function ProductViewTracker({
  handle,
  title,
  artist,
  price,
}: ProductViewTrackerProps) {
  useEffect(() => {
    captureEvent("product_viewed", {
      handle,
      title,
      artist,
      price,
    });
  }, [artist, handle, price, title]);

  return null;
}
