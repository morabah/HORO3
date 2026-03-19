"use client";

import posthog from "posthog-js";
import { useEffect, useState } from "react";
import {
  LAUNCH_FLAG_DEFAULTS,
  type FeatureFlagKey,
} from "@/lib/analytics/feature-flags";

/**
 * Returns the feature flag value from PostHog for A/B tests (Section 13).
 * Returns undefined until PostHog is ready; then the variant string or false if off.
 */
export function useFeatureFlag(flag: FeatureFlagKey): string | boolean | undefined {
  const [value, setValue] = useState<string | boolean | undefined>(
    LAUNCH_FLAG_DEFAULTS[flag]
  );

  useEffect(() => {
    const read = () => {
      try {
        const v = posthog.getFeatureFlag(flag);
        setValue(v === undefined ? LAUNCH_FLAG_DEFAULTS[flag] : v);
      } catch {
        setValue(LAUNCH_FLAG_DEFAULTS[flag]);
      }
    };
    read();
    const t = setTimeout(read, 500);
    return () => clearTimeout(t);
  }, [flag]);

  return value;
}

/**
 * Get feature flag synchronously (e.g. in server component we can't use this;
 * use from client components only).
 */
export function useFeatureFlagVariant<T extends string>(
  flag: FeatureFlagKey,
  variants: readonly T[]
): T | undefined {
  const raw = useFeatureFlag(flag);
  const str = typeof raw === "string" ? raw : undefined;
  if (!str) return undefined;
  return variants.includes(str as T) ? (str as T) : (variants[0] as T);
}
