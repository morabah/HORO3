import React from "react";
import { Instagram, Star, Shirt, ShieldCheck, Ruler, Gift, Truck, Package, RotateCcw, Lock, Home, Compass, ShoppingBag, User } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";

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

export function BrandAssurance({ ASSURANCE }: { ASSURANCE: any[] }) {
  return (
    <section
      className="py-12 px-4 max-w-6xl mx-auto font-b"
      style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {ASSURANCE.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="mb-3 w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${C.desertSand}15`, color: C.desertSand }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="font-bm text-sm mb-1" style={{ color: C.papyrus }}>
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: C.clayEarth }}>
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function SocialProof({ UGC }: { UGC: any[] }) {
  return (
    <section
      className="py-16 px-4 max-w-6xl mx-auto font-b"
      style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <div>
          <p className="text-xs font-bm uppercase tracking-widest mb-2 text-center md:text-left" style={{ color: C.desertSand }}>
            Community
          </p>
          <h2 className="font-h uppercase tracking-tight text-center md:text-left" style={{ color: C.papyrus, fontSize: "clamp(18px, 3vw, 20px)" }}>
            The Collective.
          </h2>
        </div>
        <a
          href="#"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bm uppercase tracking-widest"
          style={{
            color: C.papyrus,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          @horoegypt <Instagram className="w-3.5 h-3.5" style={{ color: C.desertSand }} />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {UGC.map((u) => (
          <div
            key={u.name}
            className="relative rounded-2xl overflow-hidden group h-[360px]"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <img
              src={u.img}
              alt={u.name}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${C.obsidian}, transparent 60%)` }}
            />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-current" style={{ color: C.kohlGold }} />
                ))}
              </div>
              <p className="font-bm text-sm mb-1.5" style={{ color: C.papyrus }}>
                "{u.quote}"
              </p>
              <p className="text-[11px] uppercase tracking-widest" style={{ color: C.clayEarth }}>
                {u.name} / {u.product}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Footer({ TRUST }: { TRUST: any[] }) {
  return (
    <footer
      className="pt-16 pb-28 md:pb-10 px-4 sm:px-6 font-b"
      style={{
        background: C.obsidian,
        borderTop: `1px solid rgba(255,255,255,0.05)`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div>
            <div
              className="mb-3 inline-flex items-center rounded-full px-4 py-2"
              style={{
                background: "rgba(245,240,232,0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <BrandLogo variant="latin" className="w-[120px]" />
            </div>
            <p className="text-xs font-bm uppercase tracking-widest" style={{ color: C.clayEarth }}>
              Wear what you mean.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-xs">
            {["Shop All", "Size Guide", "Shipping & Returns", "FAQ", "Contact Us", "Instagram"].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors py-1"
                style={{ color: C.stone }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = C.desertSand;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = C.stone;
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div
          className="p-4 rounded-2xl mb-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <h3 className="text-xs font-bm uppercase tracking-widest mb-2" style={{ color: C.desertSand }}>
            Returns & Exchanges
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: C.clayEarth }}>
            Exchange requests stay open for 14 days after delivery for unworn items in original packaging. Contact us on WhatsApp to start the next step and we will guide the process clearly.
          </p>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[10px] font-bm uppercase tracking-widest" style={{ color: C.clayEarth }}>
            © 2026 HORO Egypt
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            {TRUST.map((t) => {
              const Icon = t.icon;
              return (
                <span
                  key={t.label}
                  className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full"
                  style={{
                    color: C.stone,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Icon className="w-2.5 h-2.5" />
                  {t.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileNav({ cartCount, onCartOpen }: { cartCount: number, onCartOpen: () => void }) {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[120] px-6 py-3 flex justify-between items-center font-b"
      style={{
        background: "rgba(26,26,26,0.94)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {[
        { icon: Home, label: "Home", active: true },
        { icon: Compass, label: "Themes" },
        { icon: ShoppingBag, label: "Bag", count: cartCount, action: onCartOpen },
        { icon: User, label: "Account" },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <button key={item.label} onClick={item.action} className="flex flex-col items-center gap-1 relative">
            <Icon className="w-5 h-5" style={{ color: item.active ? C.desertSand : C.clayEarth }} />
            <span className="text-[9px] font-bm uppercase tracking-widest" style={{ color: item.active ? C.desertSand : C.clayEarth }}>
              {item.label}
            </span>
            {item.count && item.count > 0 ? (
              <span
                className="absolute -top-1 right-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bm"
                style={{ background: C.ember, color: C.white }}
              >
                {item.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
