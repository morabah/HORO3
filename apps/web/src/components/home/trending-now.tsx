"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";

interface ViewedItem {
  handle: string;
  title: string;
  artist: string;
  price: number | null;
  viewedAt: number;
  viewCount?: number;
}

const STORAGE_KEY = "horo:recently-viewed";

type Tab = "trending" | "new" | "forYou";

function getItems(tab: Tab): ViewedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const items: ViewedItem[] = JSON.parse(raw);

    switch (tab) {
      case "trending":
        // Sort by view count descending
        return items
          .sort((a, b) => (b.viewCount ?? 1) - (a.viewCount ?? 1))
          .slice(0, 8);
      case "new":
        // Sort by most recently viewed
        return items
          .sort((a, b) => b.viewedAt - a.viewedAt)
          .slice(0, 8);
      case "forYou":
        // Mix of both — interleave most viewed and most recent
        const byCount = [...items].sort((a, b) => (b.viewCount ?? 1) - (a.viewCount ?? 1));
        const byRecency = [...items].sort((a, b) => b.viewedAt - a.viewedAt);
        const merged: ViewedItem[] = [];
        const seen = new Set<string>();
        for (let i = 0; i < Math.max(byCount.length, byRecency.length) && merged.length < 8; i++) {
          if (byCount[i] && !seen.has(byCount[i].handle)) {
            seen.add(byCount[i].handle);
            merged.push(byCount[i]);
          }
          if (byRecency[i] && !seen.has(byRecency[i].handle)) {
            seen.add(byRecency[i].handle);
            merged.push(byRecency[i]);
          }
        }
        return merged.slice(0, 8);
    }
  } catch {
    return [];
  }
}

const tabLabels: Record<Tab, { ar: string; en: string }> = {
  trending: { ar: "رائج", en: "Trending" },
  new: { ar: "جديد", en: "New In" },
  forYou: { ar: "لك", en: "For You" },
};

const tabs: Tab[] = ["trending", "new", "forYou"];

interface TrendingNowProps {
  locale: "ar" | "en";
}

export function TrendingNow({ locale }: TrendingNowProps) {
  const [activeTab, setActiveTab] = useState<Tab>("trending");
  const [items, setItems] = useState<ViewedItem[]>([]);

  useEffect(() => {
    setItems(getItems(activeTab));
  }, [activeTab]);

  if (items.length < 2) return null;

  return (
    <section className="horo-home-section">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="horo-kicker">
            {locale === "ar" ? "اكتشف" : "Discover"}
          </p>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-charcoal md:text-2xl">
            {locale === "ar"
              ? "الأكثر إعجاباً هذا الأسبوع"
              : "Most loved this week"}
          </h2>
        </div>

        {/* Tabbed toggle — switches product set without page reload */}
        <div className="flex gap-1.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                activeTab === tab
                  ? "bg-charcoal text-warm-linen shadow-sm"
                  : "border border-sandstone/40 bg-warm-linen text-deep-umber/70 hover:border-burnt-sienna/40 hover:text-charcoal"
              }`}
            >
              {tabLabels[tab][locale]}
            </button>
          ))}
        </div>
      </div>

      {/* Product carousel — horizontal scroll mobile, 4-col grid desktop */}
      <div className="mt-8 flex gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible">
        {items.map((item) => (
          <Link
            key={item.handle}
            href={`/products/${item.handle}`}
            className="group flex w-48 shrink-0 flex-col rounded-[20px] border border-sandstone/35 bg-warm-linen p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:w-auto"
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
            <div className="mt-2 flex items-center justify-between border-t border-sandstone/25 pt-2">
              <span className="text-[10px] uppercase tracking-widest text-deep-umber/50">
                {tabLabels[activeTab][locale]}
              </span>
              <button
                type="button"
                className="text-deep-umber/40 transition-colors hover:text-burnt-sienna"
                aria-label={locale === "ar" ? "أضف للمفضلة" : "Add to wishlist"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/collections"
          className="inline-flex text-sm font-semibold text-burnt-sienna hover:underline"
        >
          {locale === "ar" ? "شوف الكل →" : "See all →"}
        </Link>
      </div>
    </section>
  );
}
