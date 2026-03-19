"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { getStorefrontCopy } from "@/lib/storefront/copy";

interface ViewedItem {
  handle: string;
  title: string;
  artist: string;
  price: number | null;
  viewedAt: number;
}

const STORAGE_KEY = "horo:recently-viewed";
const MAX_ITEMS = 6;
const DECAY_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

function getRecentlyViewed(): ViewedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const items: ViewedItem[] = JSON.parse(raw);
    const now = Date.now();
    return items
      .filter((item) => now - item.viewedAt < DECAY_MS)
      .slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

interface ContinueBrowsingProps {
  locale: "ar" | "en";
}

export function ContinueBrowsing({ locale }: ContinueBrowsingProps) {
  const copy = getStorefrontCopy(locale);
  const [items, setItems] = useState<ViewedItem[]>([]);

  useEffect(() => {
    setItems(getRecentlyViewed());
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="horo-home-section">
      <p className="horo-kicker">{copy.home.continueBrowsing.kicker}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-charcoal md:text-3xl">
        {copy.home.continueBrowsing.title}
      </h2>
      <div className="mt-6 flex gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-4 xl:grid-cols-6">
        {items.map((item) => (
          <Link
            key={item.handle}
            href={`/products/${item.handle}`}
            className="group flex w-44 shrink-0 flex-col rounded-[20px] border border-sandstone/35 bg-white/85 p-4 shadow-sm transition-all duration-normal hover:-translate-y-0.5 hover:shadow-md md:w-auto"
          >
            <p className="text-sm font-semibold text-charcoal group-hover:text-burnt-sienna">
              {item.title}
            </p>
            <p className="mt-1 text-xs text-deep-umber/65">{item.artist}</p>
            {item.price != null ? (
              <p className="mt-auto pt-3 font-mono text-sm text-charcoal">
                {locale === "ar"
                  ? `${(item.price / 100).toLocaleString("ar-EG")} ج.م`
                  : `EGP ${(item.price / 100).toLocaleString("en-EG")}`}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
