"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import type { Product, PriceTier } from "@/lib/medusa/types";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { useFeatureFlag } from "@/hooks/use-feature-flag";
import { FEATURE_FLAGS } from "@/lib/analytics/feature-flags";
import { getStorefrontCopy } from "@/lib/storefront/copy";
import { getLocalizedArtistName, getLocalizedProductTitle } from "@/lib/storefront/product-localization";
import { formatEgp } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  artistName?: string | null;
  /** Controls the aspect ratio and text placement for masonry grid layouts */
  isLargeCard?: boolean;
}

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

export function ProductCard({ product, artistName, isLargeCard = false }: ProductCardProps) {
  const locale = useLocale() === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(locale);
  const imageUrl = product.thumbnail ?? product.images?.[0]?.url ?? "";
  const priceTier = product.metadata?.price_tier;
  const price = product.variants?.[0]?.prices?.[0];
  const amount = price?.amount ?? null;
  const pricingTier = useFeatureFlag(FEATURE_FLAGS.pricing_tier);
  const compliance = product.compliance;
  const productTitle = getLocalizedProductTitle(product, locale) ?? product.title;
  const resolvedArtistName =
    artistName ??
    getLocalizedArtistName(product, locale);

  return (
    <Link
      href={`/products/${product.handle}`}
      className={`bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full ${isLargeCard ? "relative" : ""}`}
    >
        <div className={`relative w-full bg-[#f3f4f6] overflow-hidden ${isLargeCard ? "pb-[125%] lg:pb-0 lg:flex-1" : "pb-[75%]"}`}>
          {imageUrl && (
            <Image
              src={imageUrl.startsWith("http") ? imageUrl : cloudinaryUrl(imageUrl, { width: 500, height: 600 })}
              alt={productTitle}
              fill
              className={`object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 ${isLargeCard ? "object-center" : "object-top"}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {priceTier && pricingTier !== "single" && (
            <span className="absolute top-3 start-3 z-10">
              <Badge variant="secondary">{priceTierLabels[locale][priceTier]}</Badge>
            </span>
          )}
          {!compliance?.canPurchase && (
            <div className="absolute inset-x-3 bottom-3 z-10 rounded-radius-md border border-terracotta/30 bg-warm-linen/95 px-3 py-2 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta">
                {copy.product.launchPendingTitle}
              </p>
              <p className="mt-1 text-xs leading-5 text-deep-umber">
                {copy.product.launchPendingBody}
              </p>
            </div>
          )}
        </div>
        <div className={`p-5 md:p-6 bg-white flex-grow flex flex-col justify-end ${isLargeCard ? "absolute inset-0 bg-transparent bg-gradient-to-t from-white/90 via-white/40 to-transparent z-10 !justify-end p-6 md:p-8" : "relative z-10"}`}>
          <h3 className={`font-semibold text-[#3D352E] transition-colors group-hover:text-[#9A7352] ${isLargeCard ? "text-lg mb-1" : "text-base mb-1"}`}>
            {productTitle}
          </h3>
          <p className={`text-[#8A7D71] ${isLargeCard ? "text-sm mb-4" : "text-xs mb-3"}`}>
            {resolvedArtistName
              ? locale === "ar"
                ? `بواسطة ${resolvedArtistName}`
                : `by ${resolvedArtistName}`
              : copy.product.cardArtistFallback}
          </p>
          <div className="flex items-baseline gap-2 pt-1">
            {amount != null ? (
              <p className={`font-semibold text-[#3D352E] ${isLargeCard ? "text-lg" : "text-base"}`}>
                {formatEgp(amount, locale)}
              </p>
            ) : <span />}
          </div>
        </div>
    </Link>
  );
}
