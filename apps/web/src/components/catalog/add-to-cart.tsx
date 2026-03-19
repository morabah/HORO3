"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product, ProductVariant } from "@/lib/medusa/types";
import { useFeatureFlag } from "@/hooks/use-feature-flag";
import { FEATURE_FLAGS } from "@/lib/analytics/feature-flags";
import {
  getGiftPackagingPreference,
  setGiftPackagingPreference,
} from "@/lib/browser/order-session";
import { captureEvent } from "@/lib/analytics/posthog";
import { getStorefrontCopy } from "@/lib/storefront/copy";
import { formatEgp } from "@/lib/utils";

interface AddToCartProps {
  product: Product;
  onAdd?: (variantId: string, quantity: number) => void;
}

export function AddToCart({ product, onAdd }: AddToCartProps) {
  const locale = useLocale() === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(locale);
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const variants = product.variants ?? [];
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(variants[0]?.id ?? null);
  const giftUpsellEnabled = useFeatureFlag(FEATURE_FLAGS.gift_upsell) !== "disabled";
  const [giftPackaging, setGiftPackaging] = useState(getGiftPackagingPreference());
  const giftPackagingFee = 3000;
  const canPurchase = product.compliance?.canPurchase ?? true;

  const handleAdd = async () => {
    if (!selectedVariantId || !canPurchase) return;
    setGiftPackagingPreference(giftPackaging);
    captureEvent("add_to_cart", {
      handle: product.handle,
      variantId: selectedVariantId,
      quantity,
      priceTier: product.metadata?.price_tier,
      giftPackaging,
    });
    if (onAdd) {
      onAdd(selectedVariantId, quantity);
      return;
    }
    const updated = await addToCart(selectedVariantId, quantity);
    if (updated) router.push("/cart");
  };

  if (variants.length === 0) {
    return (
      <Button disabled className="w-full">
        {copy.product.addToCart.outOfStock}
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      {variants.length > 1 && (
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">
            {copy.product.addToCart.sizeLabel}
          </label>
          <div className="flex flex-wrap gap-2">
            {variants.map((v: ProductVariant) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariantId(v.id)}
                className={`min-w-[44px] min-h-[44px] px-3 rounded-md border text-sm font-medium transition-colors ${
                  selectedVariantId === v.id
                    ? "border-burnt-sienna bg-burnt-sienna text-warm-linen"
                    : "border-sandstone text-charcoal hover:bg-parchment"
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 text-sm text-deep-umber md:flex-row md:items-center md:justify-between">
        <Link href="/size-guide" className="text-burnt-sienna hover:underline">
          {copy.product.addToCart.sizeGuide}
        </Link>
        <span>{copy.product.addToCart.fitHelp}</span>
      </div>
      {giftUpsellEnabled && product.metadata?.is_giftable && (
        <label className="flex items-start gap-3 rounded-md border border-sandstone/60 bg-parchment px-4 py-3 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={giftPackaging}
            onChange={(event) => setGiftPackaging(event.target.checked)}
            className="h-4 w-4 accent-burnt-sienna"
          />
          <span className="space-y-1">
            <span className="block font-medium">
              {copy.product.addToCart.giftPackaging} + {formatEgp(giftPackagingFee, locale)}
            </span>
            <span className="block text-deep-umber">
              {copy.product.addToCart.giftPackagingNote}
            </span>
          </span>
        </label>
      )}
      <div className="flex gap-3 items-center">
        <div className="flex items-center border border-sandstone rounded-md">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-11 h-11 flex items-center justify-center text-charcoal hover:bg-parchment"
            disabled={!canPurchase}
          >
            −
          </button>
          <span className="w-10 text-center text-charcoal">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-11 h-11 flex items-center justify-center text-charcoal hover:bg-parchment"
            disabled={!canPurchase}
          >
            +
          </button>
        </div>
        <Button className="flex-1" onClick={handleAdd} disabled={!canPurchase}>
          {canPurchase ? copy.product.addToCart.addToBag : copy.product.addToCart.unavailable}
        </Button>
      </div>
    </div>
  );
}
