/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";

/* ─── STUB CONSTANTS AND TYPES (Shared) ─── */
const C = {
  obsidian: "#1A1A1A",
  papyrus: "#F5F0E8",
  white: "#FFFFFF",
  warmCharcoal: "#2C2A26",
  desertSand: "#C4956A",
  clayEarth: "#8B7355",
  stone: "#D4CFC5",
  nileDark: "#3A4A3F",
  ember: "#E8593C",
  deepTeal: "#2D7A9C",
  kohlGold: "#D4A24E",
  duskViolet: "#6B4C8A",
} as const;

/* ─── HERO ─── */
type HeroProps = {
  onShopClick: () => void;
};

export function Hero({ onShopClick }: HeroProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), 100);
    return () => window.clearTimeout(t);
  }, []);

  const vis = show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";

  return (
    <section
      className="relative w-full min-h-[85vh] flex items-end pb-16 md:pb-24 overflow-hidden"
      style={{ background: C.obsidian }}
    >
      <img
        src="/images/theme/hero_bg.png"
        alt="HORO illustrated streetwear"
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to top, ${C.obsidian}, ${C.obsidian}66 50%, transparent)` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, ${C.obsidian}cc, transparent 40%)` }}
      />

      <div className={`relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-1000 ease-out ${vis}`}>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
          style={{
            background: "rgba(26,26,26,0.6)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.desertSand }} />
          <span className="text-[11px] font-bm uppercase tracking-widest" style={{ color: C.papyrus }}>
            Original illustrated tees from Egypt
          </span>
        </div>

        <h1
          className="font-h uppercase tracking-tight leading-tight mb-4"
          style={{ color: C.papyrus, fontSize: "clamp(24px, 4vw, 28px)" }}
        >
          Wear What You Mean.
        </h1>
        <p
          className="font-b max-w-md mb-6 leading-relaxed"
          style={{ color: C.stone, fontSize: "clamp(15px, 2vw, 16px)" }}
        >
          Original illustrated T-shirts with a made-to-last weight, clearer fit guidance, and a gift-ready finish.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={onShopClick}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bm uppercase tracking-widest transition-all hover:scale-[1.02]"
            style={{
              background: "rgba(248,246,242, 0.25)",
              backdropFilter: "blur(16px)",
              color: C.white,
              border: "1px solid rgba(255,255,255, 0.18)",
              boxShadow: "0 8px 32px rgba(26,26,26, 0.08)",
            }}
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className="px-5 py-3 rounded-full text-xs font-bm uppercase tracking-widest transition-colors"
            style={{
              color: C.stone,
              border: `1px solid rgba(255,255,255,0.15)`,
            }}
          >
            Size Guide
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── LOOKBOOK ─── */
type LookbookProps = {
  onThemeClick: (theme: any) => void;
  VIBES_CARDS: any[];
};

export function Lookbook({ onThemeClick, VIBES_CARDS }: LookbookProps) {
  return (
    <section
      className="py-16 px-4 max-w-6xl mx-auto font-b"
      style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-xs font-bm uppercase tracking-widest mb-2" style={{ color: C.desertSand }}>
            Browse by theme
          </p>
          <h2 className="font-h uppercase tracking-tight" style={{ color: C.papyrus, fontSize: "clamp(18px, 3vw, 20px)" }}>
            Find Your Edit.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[800px] md:h-[600px]">
        {VIBES_CARDS.map((cat, i) => {
          return (
            <div
              key={cat.title}
              className={`${cat.span} relative rounded-2xl overflow-hidden group cursor-pointer`}
              style={{
                border: `1px solid rgba(255,255,255,0.08)`,
                background: C.obsidian,
              }}
              onClick={() => onThemeClick(cat.title)}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition duration-700 group-hover:scale-105 mix-blend-luminosity group-hover:mix-blend-normal"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${C.obsidian}, ${C.obsidian}40 50%, transparent)` }}
              />
              <div className="absolute inset-4 flex flex-col justify-end">
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(248,246,242, 0.25)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255, 0.18)",
                    boxShadow: "0 8px 32px rgba(26,26,26, 0.08)",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-h text-lg uppercase tracking-tight" style={{ color: C.papyrus }}>
                        {cat.title}
                      </h3>
                      <p className="text-xs font-bm uppercase tracking-widest mt-0.5" style={{ color: C.stone }}>
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── PRODUCT GRID ─── */
type ProductGridProps = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  onProductClick: (product: any) => void;
  PRODUCTS: any[];
};

export function ProductGrid({ filter, setFilter, onProductClick, PRODUCTS }: ProductGridProps) {
  const themes = ["Shop by Vibe", "Bold & Loud", "Soft & Thoughtful", "Proud & Rooted", "Weird & Wonderful", "Cosmic", "Gift Something Real"] as const;
  const filtered = useMemo(
    () => (filter === "Shop by Vibe" ? PRODUCTS : PRODUCTS.filter((p) => p.theme === filter)),
    [filter, PRODUCTS]
  );

  const getBadgeStyle = (badge: any): React.CSSProperties => {
    if (!badge) return {};
    if (badge === "Low stock") {
      return {
        background: `${C.ember}18`,
        color: C.ember,
        border: `1px solid ${C.ember}30`,
      };
    }
    if (badge === "Bestseller") {
      return {
        background: `${C.kohlGold}18`,
        color: C.kohlGold,
        border: `1px solid ${C.kohlGold}30`,
      };
    }
    return {
      background: `${C.deepTeal}18`,
      color: C.deepTeal,
      border: `1px solid ${C.deepTeal}30`,
    };
  };

  return (
    <section
      id="shop"
      className="py-16 px-4 sm:px-6 max-w-6xl mx-auto font-b"
      style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <p className="text-xs font-bm uppercase tracking-widest mb-2" style={{ color: C.desertSand }}>
            Latest drop
          </p>
          <h2 className="font-h uppercase tracking-tight" style={{ color: C.papyrus, fontSize: "clamp(18px, 3vw, 20px)" }}>
            Pick The One That Fits You.
          </h2>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="px-4 py-2 rounded-full text-[11px] font-bm uppercase tracking-widest transition-all"
              style={
                filter === t
                  ? { background: C.papyrus, color: C.obsidian }
                  : {
                      color: C.stone,
                      border: "1px solid rgba(255,255,255,0.1)",
                    }
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => onProductClick(p)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01]"
            style={{
              background: C.obsidian,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105"
              />
              {p.badge ? (
                <span
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bm uppercase tracking-widest"
                  style={getBadgeStyle(p.badge)}
                >
                  {p.badge}
                </span>
              ) : null}
              <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="w-full py-2.5 rounded-xl text-xs font-bm uppercase tracking-widest transition-all"
                  style={{
                    background: "rgba(248,246,242, 0.35)",
                    backdropFilter: "blur(16px)",
                    color: C.white,
                    border: "1px solid rgba(255,255,255, 0.18)",
                  }}
                >
                  Quick view
                </button>
              </div>
            </div>
            <div className="p-3 md:p-4">
              <h3 className="font-bm text-sm tracking-tight mb-0.5" style={{ color: C.papyrus }}>
                {p.name}
              </h3>
              <p className="text-[11px] uppercase tracking-widest mb-2" style={{ color: C.clayEarth }}>
                {p.theme} / {p.fit}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-bm text-base" style={{ color: C.papyrus }}>
                  {p.price} <span className="text-[10px] opacity-50">EGP</span>
                </span>
                {p.originalPrice ? (
                  <span className="text-[11px] line-through" style={{ color: C.clayEarth }}>
                    {p.originalPrice}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
