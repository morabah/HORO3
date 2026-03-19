"use client";

import { useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { Product, PriceTier } from "@/lib/medusa/types";
import { useFeatureFlag } from "@/hooks/use-feature-flag";
import { FEATURE_FLAGS } from "@/lib/analytics/feature-flags";
import { formatEgp } from "@/lib/utils";

const priceTierLabels: Record<"en" | "ar", Record<PriceTier, string>> = {
  en: {
    core: "Core",
    limited_drop: "Limited",
    gift_bundle: "Gift",
  },
  ar: {
    core: "أساسي",
    limited_drop: "محدود",
    gift_bundle: "هدية",
  },
};

interface PriceDisplayProps {
  product: Product;
}

export function PriceDisplay({ product }: PriceDisplayProps) {
  const locale = useLocale() === "ar" ? "ar" : "en";
  const price = product.variants?.[0]?.prices?.[0];
  const amount = price?.amount ?? null;
  const priceTier = product.metadata?.price_tier;
  const pricingTier = useFeatureFlag(FEATURE_FLAGS.pricing_tier);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {amount != null && (
        <span className="font-mono text-2xl text-charcoal">
          {formatEgp(amount, locale)}
        </span>
      )}
      {priceTier && pricingTier !== "single" && (
        <Badge variant="secondary">{priceTierLabels[locale][priceTier]}</Badge>
      )}
    </div>
  );
}
