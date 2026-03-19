"use client";

import { useState } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { Product, ProductImage, ProductImageTag } from "@/lib/medusa/types";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { useFeatureFlag } from "@/hooks/use-feature-flag";
import { FEATURE_FLAGS } from "@/lib/analytics/feature-flags";
import { getLocalizedProductTitle } from "@/lib/storefront/product-localization";

const SHOT_ORDER: ProductImageTag[] = [
  "front_on_body",
  "back_on_body",
  "macro_print_closeup",
  "fabric_tag_detail",
  "flat_lay_context",
  "lifestyle_mood",
];

const LIFESTYLE_FIRST_ORDER: ProductImageTag[] = [
  "lifestyle_mood",
  "front_on_body",
  "back_on_body",
  "flat_lay_context",
  "macro_print_closeup",
  "fabric_tag_detail",
];

const SHOT_LABELS: Record<ProductImageTag, { ar: string; en: string }> = {
  front_on_body: { ar: "أمام", en: "Front" },
  back_on_body: { ar: "خلف", en: "Back" },
  macro_print_closeup: { ar: "ماكرو", en: "Print" },
  fabric_tag_detail: { ar: "القماش", en: "Fabric" },
  flat_lay_context: { ar: "فلات لاي", en: "Flat-lay" },
  lifestyle_mood: { ar: "لقطة", en: "Lifestyle" },
};



interface ProductGalleryProps {
  product: Product;
  locale: "ar" | "en";
}

export function ProductGallery({ product, locale }: ProductGalleryProps) {
  const productBg = useFeatureFlag(FEATURE_FLAGS.product_bg);
  const photoStyle = useFeatureFlag(FEATURE_FLAGS.photo_style);
  const galleryOrder = photoStyle === "lifestyle" ? LIFESTYLE_FIRST_ORDER : SHOT_ORDER;
  
  // Map our images to the 6 exact slots
  const slots = galleryOrder.map((tag) => {
    const existingImage = product.images?.find((img) => (img.metadata?.tag ?? "lifestyle_mood") === tag);
    return { tag, image: existingImage };
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedSlot = slots[selectedIndex] ?? slots[0];
  const mainImage = selectedSlot?.image;
  const mainUrl = mainImage?.url ?? product.thumbnail ?? "";
  const displayUrl = mainUrl.startsWith("http") ? mainUrl : cloudinaryUrl(mainUrl, { width: 800, height: 1000 });
  const backgroundClass = productBg === "true_white" ? "bg-true-white" : "bg-warm-linen";
  const productTitle = getLocalizedProductTitle(product, locale) ?? product.title;

  return (
    <div className="space-y-3">
      {/* Main image — clean, no chrome */}
      <div className={`aspect-[4/5] relative rounded-[24px] overflow-hidden border border-sandstone/30 ${backgroundClass} flex items-center justify-center`}>
        {mainUrl ? (
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={4}
            centerOnInit
            doubleClick={{ mode: "reset" }}
          >
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full flex items-center justify-center"
            >
              <Image
                src={displayUrl}
                alt={productTitle}
                width={800}
                height={1000}
                className="object-contain w-full h-full"
                priority
              />
            </TransformComponent>
          </TransformWrapper>
        ) : (
          <div className="text-deep-umber/50 text-sm">
            {locale === "ar" ? "الصورة غير متوفرة" : "Image not available"}
          </div>
        )}
      </div>

      {/* Thumbnails — 6 slots enforced */}
      <div className="grid grid-cols-6 gap-2">
        {slots.map((slot, i) => {
          const { tag, image } = slot;
          const url = image ? (image.url.startsWith("http") ? image.url : cloudinaryUrl(image.url, { width: 120, height: 150 })) : null;
          const label = SHOT_LABELS[tag] ?? SHOT_LABELS.lifestyle_mood;
          
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`rounded-[12px] overflow-hidden border transition-colors ${
                selectedIndex === i ? "border-burnt-sienna ring-1 ring-burnt-sienna/30" : "border-sandstone/40 hover:border-sandstone"
              }`}
            >
              <div className={`relative aspect-square overflow-hidden flex items-center justify-center ${!url ? "bg-sandstone/10" : ""}`}>
                {url ? (
                  <Image src={url} alt={label[locale]} width={64} height={64} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-deep-umber/40 uppercase">TBD</span>
                )}
              </div>
              <p className="py-1.5 text-center text-[10px] text-deep-umber/70">
                {label[locale]}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
