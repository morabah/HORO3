"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { categoryTiles } from "@/config/nav-config";

interface CategoryTilesProps {
  locale: "ar" | "en";
}

/** Translations for category tile labels */
const tileLabels: Record<string, { ar: string; en: string }> = {
  identity: { ar: "هوية وبورتريه", en: "Identity & Portraits" },
  culture: { ar: "خط عربي", en: "Arabic Calligraphy" },
  giftSets: { ar: "مناسبات وتخرج", en: "Milestones & Grads" },
  limitedEditions: { ar: "إصدارات الفنانين", en: "Limited Artist Drops" },
  artists: { ar: "فنانون", en: "Artists" },
  newDrops: { ar: "جديد", en: "New Drops" },
};

/** Fallback thumbnails when no CMS image is available */
const tileThumbnails: Record<string, string> = {
  identity: "/images/brand/collection-identity.png",
  culture: "/images/brand/lifestyle-mood.png",
  giftSets: "/images/brand/gift-packaging.png",
  limitedEditions: "/images/brand/hero-flatlay.png",
  artists: "/images/brand/artist-portrait.png",
  newDrops: "/images/brand/hero-flatlay.png",
};

/**
 * Category Navigation Cards (Themes) — 2x2 grid
 */
export function CategoryTiles({ locale }: CategoryTilesProps) {
  // Take first 4 or specific 4 if you prefer; assuming categoryTiles has the ones we want
  const tilesToDisplay = categoryTiles.slice(0, 4);

  return (
    <section className="py-12 px-4" data-purpose="theme-grid">
      <div className="grid grid-cols-2 gap-4">
        {tilesToDisplay.map((tile, index) => {
          const label = tileLabels[tile.key] ?? { ar: tile.key, en: tile.key };
          const thumbnail = tileThumbnails[tile.key] ?? "/images/brand/hero-flatlay.png";
          const isHighlighted = index === 3; // "limitedEditions" representation

          return (
            <Link
              key={tile.key}
              href={tile.href}
              className={`relative aspect-square group overflow-hidden ${
                isHighlighted ? "border-2 border-burnt-sienna/30" : ""
              }`}
            >
              <Image
                src={thumbnail}
                alt={label[locale]}
                fill
                className="object-cover grayscale-[30%] transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              
              {isHighlighted && (
                <span className="absolute top-2 right-2 z-10 bg-burnt-sienna text-white text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider">
                  Selling Fast
                </span>
              )}

              <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-2 text-center transition-colors group-hover:bg-black/40">
                <h3 className={`text-white font-bold text-lg leading-tight ${locale === "ar" ? "font-sans-rtl" : "font-sans"}`}>
                  {label[locale]}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// Keep backward-compatible export name
export { CategoryTiles as ThemeBrowser };
