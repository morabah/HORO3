/**
 * PostHog feature flags for Visual Identity A/B tests (Plan Section 13).
 * Create these flags in PostHog dashboard and use via useFeatureFlag.
 */
export const FEATURE_FLAGS = {
  /** Latin-first wordmark vs bilingual (HORO + هورو) */
  logo_lockup: "logo_lockup",
  /** Warm Linen vs True White product background */
  product_bg: "product_bg",
  /** Studio (controlled) vs lifestyle (Cairo setting) photography */
  photo_style: "photo_style",
  /** Theme-first vs artist-first vs hybrid nav */
  nav_layout: "nav_layout",
  /** Single vs tiered pricing display */
  pricing_tier: "pricing_tier",
  /** Gift packaging upsell on/off */
  gift_upsell: "gift_upsell",
} as const;

export type FeatureFlagKey = keyof typeof FEATURE_FLAGS;

export const LAUNCH_FLAG_DEFAULTS = {
  [FEATURE_FLAGS.logo_lockup]: "latin_first",
  [FEATURE_FLAGS.product_bg]: "warm_linen",
  [FEATURE_FLAGS.photo_style]: "studio",
  [FEATURE_FLAGS.nav_layout]: "theme_first",
  [FEATURE_FLAGS.pricing_tier]: "tiered",
  [FEATURE_FLAGS.gift_upsell]: "enabled",
} as const;

/** Variant types per flag (for typing) */
export type LogoLockupVariant = "latin_first" | "bilingual";
export type ProductBgVariant = "warm_linen" | "true_white";
export type PhotoStyleVariant = "studio" | "lifestyle";
export type NavLayoutVariant = "theme_first" | "artist_first" | "hybrid";
export type PricingTierVariant = "single" | "tiered";
export type GiftUpsellVariant = "enabled" | "disabled";
