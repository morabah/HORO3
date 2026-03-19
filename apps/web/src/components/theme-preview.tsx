"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Search, ShoppingBag, Truck } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { Hero, Lookbook, ProductGrid } from "./theme/hero-components";
import { BrandAssurance, SocialProof, Footer, MobileNav } from "./theme/social-components";
import { ProductDetail, CartDrawer, Checkout, OrderConfirmation, SearchModal } from "./theme/modal-components";
import { PRODUCTS, LOOKBOOK, UGC, ASSURANCE, TRUST } from "./theme/theme-data";

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

/* ─── STYLES ─── */
function BrandFonts() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&display=swap');
      .font-h { font-family: 'Space Grotesk', sans-serif; font-weight: 500; }
      .font-b { font-family: 'Inter', sans-serif; font-weight: 400; }
      .font-bm { font-family: 'Inter', sans-serif; font-weight: 500; }
      @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
      @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
      @keyframes slideUp { from { transform:translateY(100%) } to { transform:translateY(0) } }
      @keyframes slideRight { from { transform:translateX(100%) } to { transform:translateX(0) } }
      .anim-up { animation: fadeUp .6s cubic-bezier(.16,1,.3,1) both }
      .anim-in { animation: fadeIn .3s ease both }
      .delay-1 { animation-delay:.1s } .delay-2 { animation-delay:.2s } .delay-3 { animation-delay:.3s }
      input[type="email"]:focus, input[type="text"]:focus, input[type="tel"]:focus { outline: none; border-color: ${C.ember}; }
      ::selection { background: ${C.desertSand}; color: ${C.obsidian}; }
      * { scrollbar-width: thin; scrollbar-color: ${C.clayEarth} transparent; }
    `,
      }}
    />
  );
}

/* ─── ANNOUNCEMENT BAR ─── */
function AnnouncementBar() {
  return (
    <div
      style={{
        background: C.obsidian,
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
      }}
      className="py-2.5 text-center font-b relative z-[110]"
    >
      <div
        className="flex justify-center items-center gap-6 px-4 text-xs"
        style={{ color: C.stone }}
      >
        {TRUST.map((t) => {
          const Icon = t.icon;
          return (
            <span key={t.label} className="hidden sm:flex items-center gap-1.5">
              <Icon className="w-3 h-3" style={{ color: C.desertSand }} />
              {t.label}
            </span>
          );
        })}
        <span className="sm:hidden flex items-center gap-1.5">
          <Truck className="w-3 h-3" style={{ color: C.desertSand }} />
          Free shipping on prepaid · COD available
        </span>
      </div>
    </div>
  );
}

/* ─── NAV ─── */
type NavProps = {
  scrolled: boolean;
  cartCount: number;
  onCartOpen: () => void;
  onSearchOpen: () => void;
};

function Nav({ scrolled, cartCount, onCartOpen, onSearchOpen }: NavProps) {
  return (
    <header
      className={`fixed w-full z-[100] transition-all duration-500 ${
        scrolled ? "py-2.5 top-0" : "py-4 top-[38px]"
      }`}
      style={{
        background: scrolled ? "rgba(26,26,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-4 font-b">
        <a
          href="#"
          aria-label="HORO"
          className="inline-flex items-center rounded-full px-4 py-2"
          style={{
            background: "rgba(245,240,232,0.92)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <BrandLogo variant="latin" className="w-[104px] md:w-[120px]" />
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {["Shop", "Themes", "Size Guide"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs uppercase tracking-widest transition-colors font-bm"
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
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={onSearchOpen}
            aria-label="Search"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{
              color: C.papyrus,
              border: `1px solid rgba(255,255,255,0.1)`,
            }}
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={onCartOpen}
            aria-label="Cart"
            className="h-9 px-4 rounded-full flex items-center gap-2 text-xs font-bm transition-colors relative"
            style={{
              color: C.papyrus,
              border: `1px solid rgba(255,255,255,0.1)`,
            }}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 ? (
              <span
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bm"
                style={{ background: C.ember, color: C.white }}
              >
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}

type ThemeProduct = {
  id: number;
  name: string;
  theme: string;
  price: number;
  originalPrice?: number;
  tagline: string;
  description: string;
  fit: string;
  fitNote: string;
  badge: string | null;
  badgeReason: string | null;
  stock: number;
  sizes: string[];
  fabric: string;
  image: string;
};
type CartItem = { product: ThemeProduct; size: string; qty: number };

export default function ThemeApp() {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<ThemeProduct | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const addToCart = useCallback((product: ThemeProduct, size: string) => {
    setCart((prev) => {
      const existing = prev.findIndex((i) => i.product.id === product.id && i.size === size);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { ...next[existing], qty: next[existing].qty + 1 };
        return next;
      }
      return [...prev, { product, size, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], qty: Math.max(1, next[index].qty + delta) };
      return next;
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderComplete = () => {
    setShowCheckout(false);
    setCart([]);
    setOrderPlaced(true);
  };

  return (
    <main className="min-h-screen font-b w-full" style={{ background: C.obsidian, color: C.papyrus }}>
      <BrandFonts />
      <AnnouncementBar />
      <Nav
        scrolled={scrolled}
        cartCount={cartCount}
        onCartOpen={() => setShowCart(true)}
        onSearchOpen={() => setShowSearch(true)}
      />
      
      <Hero onShopClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })} />
      <Lookbook
        LOOKBOOK={LOOKBOOK}
        onThemeClick={(theme) => {
          setFilter(theme);
          document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <ProductGrid filter={filter} setFilter={setFilter} onProductClick={setSelectedProduct} PRODUCTS={PRODUCTS} />
      <BrandAssurance ASSURANCE={ASSURANCE} />
      <SocialProof UGC={UGC} />
      <Footer TRUST={TRUST} />
      <MobileNav cartCount={cartCount} onCartOpen={() => setShowCart(true)} />

      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
      ) : null}
      {showCart ? (
        <CartDrawer cart={cart} onClose={() => setShowCart(false)} onUpdateQty={updateQty} onRemove={removeItem} onCheckout={handleCheckout} />
      ) : null}
      {showCheckout ? <Checkout cart={cart} onClose={() => setShowCheckout(false)} onComplete={handleOrderComplete} /> : null}
      {showSearch ? <SearchModal PRODUCTS={PRODUCTS} onClose={() => setShowSearch(false)} onProductClick={setSelectedProduct} /> : null}
      {orderPlaced ? <OrderConfirmation onClose={() => setOrderPlaced(false)} /> : null}
    </main>
  );
}
