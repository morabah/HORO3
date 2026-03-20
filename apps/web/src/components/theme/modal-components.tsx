/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import { X, Shirt, Ruler, Truck, Package, RotateCcw, Minus, Plus, Lock, ArrowLeft, Check, CreditCard, Search } from "lucide-react";

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

const THEME_COLORS = {
  Mood: C.duskViolet,
  Career: C.deepTeal,
  Personality: C.kohlGold,
  Culture: C.nileDark,
  Emotion: C.ember,
} as const;

const SIZE_CHART: Record<string, { chest: string; length: string; shoulder: string }> = {
  S: { chest: "96cm", length: "68cm", shoulder: "44cm" },
  M: { chest: "102cm", length: "71cm", shoulder: "46cm" },
  L: { chest: "108cm", length: "74cm", shoulder: "48cm" },
  XL: { chest: "114cm", length: "77cm", shoulder: "50cm" },
  XXL: { chest: "120cm", length: "80cm", shoulder: "52cm" },
};

/* ─── PRODUCT DETAIL MODAL ─── */
type ProductDetailProps = {
  product: any | null;
  onClose: () => void;
  onAddToCart: (product: any, size: string) => void;
};

export function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSelectedSize(null);
    setShowSizeChart(false);
    setAdded(false);
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize);
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center anim-in font-b"
      style={{ background: "rgba(26,26,26,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-4xl max-h-[90vh] sm:h-auto overflow-hidden sm:rounded-2xl flex flex-col sm:flex-row anim-slide-up"
        style={{
          background: "rgba(248,246,242, 0.1)", // Glass White background
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255, 0.18)",
          boxShadow: "0 8px 32px rgba(26,26,26, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] md:aspect-[16/9] sm:aspect-[3/4] sm:w-1/2 overflow-hidden rounded-t-3xl sm:rounded-l-2xl sm:rounded-tr-none">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(26,26,26,0.6)",
              backdropFilter: "blur(8px)",
              color: C.papyrus,
            }}
          >
            <X className="w-4 h-4" />
          </button>
          {product.badge ? (
            <span
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bm uppercase tracking-widest"
              style={{
                background: "rgba(26,26,26,0.7)",
                backdropFilter: "blur(8px)",
                color: C.papyrus,
              }}
            >
              {product.badge}
              {product.badgeReason ? <span style={{ color: C.clayEarth }}> - {product.badgeReason}</span> : null}
            </span>
          ) : null}
        </div>

        <div className="p-5 md:p-8">
          <div className="flex justify-between items-start gap-4 mb-1">
            <div>
              <p className="text-[11px] uppercase tracking-widest mb-1" style={{ color: THEME_COLORS[product.theme as keyof typeof THEME_COLORS] || C.clayEarth }}>
                {product.theme} / {product.fit} fit
              </p>
              <h2 className="font-h uppercase tracking-tight" style={{ color: C.papyrus, fontSize: "20px" }}>
                {product.name}
              </h2>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-bm text-xl" style={{ color: C.papyrus }}>
                {product.price} <span className="text-xs opacity-50">EGP</span>
              </span>
              {discount ? (
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs line-through" style={{ color: C.clayEarth }}>
                    {product.originalPrice}
                  </span>
                  <span
                    className="text-[10px] font-bm px-1.5 py-0.5 rounded"
                    style={{ background: `${C.ember}18`, color: C.ember }}
                  >
                    {discount}% off
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-2" style={{ color: C.stone }}>
            {product.tagline}
          </p>
          <div className="mb-5 space-y-3">
            <p className="text-sm leading-relaxed" style={{ color: C.papyrus }}>
              {product.description}
            </p>
            <p className="text-sm leading-relaxed text-right font-b" dir="rtl" style={{ color: C.stone }}>
              {product.descriptionAr}
            </p>
          </div>

          <div
            className="flex flex-col gap-3 mb-6 p-4 rounded-xl"
            style={{
              background: "rgba(227, 239, 245, 0.15)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="flex items-center gap-3">
              <Shirt className="w-4 h-4 flex-shrink-0" style={{ color: C.desertSand }} />
              <span className="text-xs" style={{ color: C.papyrus }}>{product.fabric}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center text-xs">👨‍🎨</span>
              <span className="text-xs" style={{ color: C.papyrus }}>Original artwork by {product.artistName}</span>
            </div>
             <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 flex-shrink-0" style={{ color: C.desertSand }} />
              <span className="text-xs" style={{ color: C.papyrus }}>Free exchange within 14 days</span>
            </div>
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 flex-shrink-0" style={{ color: C.desertSand }} />
              <span className="text-xs" style={{ color: C.papyrus }}>COD available nationwide</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bm uppercase tracking-widest" style={{ color: C.papyrus }}>
                Select size
              </span>
              <button
                onClick={() => setShowSizeChart((prev) => !prev)}
                className="text-xs font-bm flex items-center gap-1 transition-colors"
                style={{ color: C.deepTeal }}
              >
                <Ruler className="w-3 h-3" />
                {showSizeChart ? "Hide" : "Size chart"}
              </button>
            </div>

            {showSizeChart ? (
              <div
                className="mb-3 p-3 rounded-xl text-xs anim-in"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="grid grid-cols-4 gap-2 mb-2">
                  <span style={{ color: C.clayEarth }}>Size</span>
                  <span style={{ color: C.clayEarth }}>Chest</span>
                  <span style={{ color: C.clayEarth }}>Length</span>
                  <span style={{ color: C.clayEarth }}>Shoulder</span>
                </div>
                {product.sizes.map((s: string) => (
                  <div
                    key={s}
                    className="grid grid-cols-4 gap-2 py-1"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <span className="font-bm" style={{ color: C.papyrus }}>
                      {s}
                    </span>
                    <span style={{ color: C.stone }}>{SIZE_CHART[s]?.chest}</span>
                    <span style={{ color: C.stone }}>{SIZE_CHART[s]?.length}</span>
                    <span style={{ color: C.stone }}>{SIZE_CHART[s]?.shoulder}</span>
                  </div>
                ))}
                <p className="mt-2 text-[11px]" style={{ color: C.clayEarth }}>
                  {product.fitNote}
                </p>
              </div>
            ) : null}

            <div className="flex gap-2">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className="flex-1 h-11 rounded-xl text-xs font-bm transition-all"
                  style={
                    selectedSize === s
                      ? {
                          background: `${C.papyrus}18`,
                          color: C.papyrus,
                          border: `1px solid ${C.papyrus}`,
                        }
                      : {
                          color: C.stone,
                          border: "1px solid rgba(255,255,255,0.1)",
                        }
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {product.stock <= 10 ? (
            <p className="text-xs mb-4 flex items-center gap-1.5" style={{ color: C.ember }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.ember }} />
              {product.stock} left from this illustration run
            </p>
          ) : null}

          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className="w-full py-3.5 rounded-xl text-sm font-bm uppercase tracking-widest transition-all disabled:opacity-40"
            style={
              added
                ? { background: C.deepTeal, color: C.white }
                : {
                    background: C.ember,
                    color: C.white,
                    boxShadow: selectedSize ? `0 6px 20px ${C.ember}30` : "none",
                  }
            }
          >
            {added ? "Added to bag ✓" : selectedSize ? `Add to bag - ${product.price} EGP` : "Select a size"}
          </button>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {[
              { icon: Truck, text: "Free shipping on prepaid" },
              { icon: Package, text: "COD available" },
              { icon: RotateCcw, text: "14-day exchange" },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <span key={t.text} className="flex items-center gap-1 text-[11px]" style={{ color: C.clayEarth }}>
                  <Icon className="w-3 h-3" />
                  {t.text}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CART DRAWER ─── */
type CartDrawerProps = {
  cart: any[];
  onClose: () => void;
  onUpdateQty: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
  onCheckout: () => void;
};

export function CartDrawer({ cart, onClose, onUpdateQty, onRemove, onCheckout }: CartDrawerProps) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <div
      className="fixed inset-0 z-[200] flex justify-end anim-in font-b"
      style={{ background: "rgba(26,26,26,0.75)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full overflow-y-auto flex flex-col"
        style={{
          background: C.obsidian,
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          animation: "slideRight .35s cubic-bezier(.16,1,.3,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="font-h text-lg uppercase tracking-tight" style={{ color: C.papyrus }}>
            Your Bag ({cart.length})
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ color: C.stone, border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag mb-3" style={{ color: C.clayEarth }}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <p className="font-bm text-sm mb-1" style={{ color: C.papyrus }}>
              Nothing here yet.
            </p>
            <p className="text-xs" style={{ color: C.clayEarth }}>
              Find the design that fits your mood.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 p-5 space-y-4">
              {cart.map((item, i) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bm text-sm truncate" style={{ color: C.papyrus }}>
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] uppercase tracking-widest" style={{ color: C.clayEarth }}>
                      Size {item.size} / {item.product.fit}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQty(i, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center"
                          style={{
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: C.stone,
                          }}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bm w-4 text-center" style={{ color: C.papyrus }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(i, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center"
                          style={{
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: C.stone,
                          }}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bm text-sm" style={{ color: C.papyrus }}>
                        {item.product.price * item.qty} EGP
                      </span>
                    </div>
                  </div>
                  <button onClick={() => onRemove(i)} className="self-start" style={{ color: C.clayEarth }}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex justify-between mb-1">
                <span className="text-xs" style={{ color: C.clayEarth }}>
                  Subtotal
                </span>
                <span className="font-bm text-sm" style={{ color: C.papyrus }}>
                  {total} EGP
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-xs" style={{ color: C.clayEarth }}>
                  Shipping
                </span>
                <span className="text-xs" style={{ color: C.deepTeal }}>
                  Free on prepaid
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3.5 rounded-xl text-sm font-bm uppercase tracking-widest"
                style={{
                  background: C.ember,
                  color: C.white,
                  boxShadow: `0 6px 20px ${C.ember}30`,
                }}
              >
                Checkout — {total} EGP
              </button>
              <div className="flex justify-center gap-4 mt-3">
                {[
                  { icon: Lock, t: "SSL secured" },
                  { icon: Package, t: "COD available" },
                ].map((x) => {
                  const Icon = x.icon;
                  return (
                    <span key={x.t} className="flex items-center gap-1 text-[10px]" style={{ color: C.clayEarth }}>
                      <Icon className="w-3 h-3" />
                      {x.t}
                    </span>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── CHECKOUT ─── */
type CheckoutProps = {
  cart: any[];
  onClose: () => void;
  onComplete: () => void;
};

type CheckoutForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
};

export function Checkout({ cart, onClose, onComplete }: CheckoutProps) {
  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState<"cod" | "prepaid">("cod");
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Cairo",
    notes: "",
  });
  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const shipping = payMethod === "cod" ? 45 : 0;
  const steps = ["Information", "Payment", "Confirm"];

  const handleChange = (k: keyof CheckoutForm, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const canProceed = step === 0 ? Boolean(form.name && form.phone && form.address) : true;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center anim-in font-b"
      style={{ background: "rgba(26,26,26,0.9)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl"
        style={{
          background: C.obsidian,
          border: "1px solid rgba(255,255,255,0.08)",
          animation: "slideUp .4s cubic-bezier(.16,1,.3,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 pb-0">
          <div className="flex justify-between items-center mb-4">
            <button onClick={step > 0 ? () => setStep(step - 1) : onClose} style={{ color: C.stone }}>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-h text-sm uppercase tracking-widest" style={{ color: C.papyrus }}>
              Checkout
            </span>
            <button onClick={onClose} style={{ color: C.stone }}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2 mb-5">
            {steps.map((s, i) => (
              <div key={s} className="flex-1">
                <div
                  className="h-1 rounded-full mb-1"
                  style={{ background: i <= step ? C.ember : "rgba(255,255,255,0.08)" }}
                />
                <span
                  className="text-[10px] uppercase tracking-widest"
                  style={{ color: i <= step ? C.papyrus : C.clayEarth }}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pb-5">
          {step === 0 ? (
            <div className="space-y-3 anim-in">
              <p className="text-xs mb-3" style={{ color: C.clayEarth }}>
                Guest checkout - no account needed.
              </p>
              {[
                { k: "name", label: "Full name", type: "text", ph: "Ahmed Mohamed" },
                { k: "phone", label: "Phone (WhatsApp)", type: "tel", ph: "01x xxxx xxxx" },
                { k: "email", label: "Email (optional)", type: "email", ph: "for order updates" },
                { k: "address", label: "Delivery address", type: "text", ph: "Street, building, floor, apt" },
              ].map((f) => (
                <div key={f.k}>
                  <label className="text-[11px] font-bm uppercase tracking-widest block mb-1" style={{ color: C.stone }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.ph}
                    value={form[f.k as keyof CheckoutForm]}
                    onChange={(e) => handleChange(f.k as keyof CheckoutForm, e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-sm"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: C.papyrus,
                    }}
                  />
                </div>
              ))}
              <div>
                <label className="text-[11px] font-bm uppercase tracking-widest block mb-1" style={{ color: C.stone }}>
                  City
                </label>
                <select
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm appearance-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: C.papyrus,
                  }}
                >
                  {["Cairo", "Giza", "Alexandria", "Mansoura", "Tanta", "Other"].map((c) => (
                    <option key={c} value={c} style={{ background: C.obsidian }}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-3 anim-in">
              <p className="text-xs mb-2" style={{ color: C.clayEarth }}>
                Choose how you&apos;d like to pay.
              </p>
              {[
                {
                  id: "cod" as const,
                  label: "Cash on Delivery",
                  sub: "+45 EGP handling fee",
                  icon: Package,
                },
                {
                  id: "prepaid" as const,
                  label: "Prepaid (card / wallet)",
                  sub: "Free shipping included",
                  icon: CreditCard,
                },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPayMethod(m.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                    style={
                      payMethod === m.id
                        ? { background: `${C.ember}10`, border: `1px solid ${C.ember}40` }
                        : {
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }
                    }
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background: payMethod === m.id ? `${C.ember}18` : "rgba(255,255,255,0.04)",
                        color: payMethod === m.id ? C.ember : C.clayEarth,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bm block" style={{ color: C.papyrus }}>
                        {m.label}
                      </span>
                      <span className="text-[11px]" style={{ color: C.clayEarth }}>
                        {m.sub}
                      </span>
                    </div>
                    {payMethod === m.id ? <Check className="w-4 h-4 ml-auto" style={{ color: C.ember }} /> : null}
                  </button>
                );
              })}
            </div>
          ) : null}

          {step === 2 ? (
            <div className="anim-in">
              <p className="text-xs mb-3" style={{ color: C.clayEarth }}>
                Review your order before confirming.
              </p>
              <div className="space-y-2 mb-4">
                {cart.map((item, i) => (
                  <div
                    key={`${item.product.id}-${item.size}-${i}`}
                    className="flex justify-between items-center py-2"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <div>
                      <span className="text-sm font-bm" style={{ color: C.papyrus }}>
                        {item.product.name}
                      </span>
                      <span className="text-xs ml-2" style={{ color: C.clayEarth }}>
                        Size {item.size} x{item.qty}
                      </span>
                    </div>
                    <span className="text-sm font-bm" style={{ color: C.papyrus }}>
                      {item.product.price * item.qty} EGP
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="space-y-1 mb-4 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="flex justify-between text-xs">
                  <span style={{ color: C.clayEarth }}>Subtotal</span>
                  <span style={{ color: C.papyrus }}>{total} EGP</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: C.clayEarth }}>Shipping</span>
                  <span style={{ color: shipping > 0 ? C.stone : C.deepTeal }}>
                    {shipping > 0 ? `${shipping} EGP` : "Free"}
                  </span>
                </div>
                <div className="flex justify-between font-bm text-sm pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: C.papyrus }}>Total</span>
                  <span style={{ color: C.papyrus }}>{total + shipping} EGP</span>
                </div>
              </div>
              <div
                className="p-3 rounded-xl mb-4 text-xs"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p style={{ color: C.stone }}>
                  <span className="font-bm">{form.name}</span> · {form.phone}
                </p>
                <p style={{ color: C.clayEarth }}>
                  {form.address}, {form.city}
                </p>
                <p style={{ color: C.clayEarth }}>
                  Payment: {payMethod === "cod" ? "Cash on Delivery" : "Prepaid"}
                </p>
              </div>
            </div>
          ) : null}

          <button
            onClick={() => (step < 2 ? setStep((prev) => prev + 1) : onComplete())}
            disabled={!canProceed}
            className="w-full py-3.5 rounded-xl text-sm font-bm uppercase tracking-widest transition-all mt-4 disabled:opacity-40"
            style={{ background: C.ember, color: C.white }}
          >
            {step === 0
              ? "Continue to payment"
              : step === 1
              ? "Review order"
              : `Place order - ${total + shipping} EGP`}
          </button>

          <div className="flex justify-center gap-4 mt-3">
            <span className="flex items-center gap-1 text-[10px]" style={{ color: C.clayEarth }}>
              <Lock className="w-3 h-3" />SSL encrypted
            </span>
            <span className="flex items-center gap-1 text-[10px]" style={{ color: C.clayEarth }}>
              <RotateCcw className="w-3 h-3" />14-day exchange
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ORDER CONFIRMATION ─── */
type OrderConfirmationProps = {
  onClose: () => void;
};

export function OrderConfirmation({ onClose }: OrderConfirmationProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center anim-in font-b" style={{ background: "rgba(26,26,26,0.9)" }}>
      <div
        className="w-full max-w-sm p-8 rounded-3xl text-center anim-up"
        style={{
          background: C.obsidian,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: `${C.deepTeal}18`, color: C.deepTeal }}
        >
          <Check className="w-6 h-6" />
        </div>
        <h2 className="font-h text-lg uppercase tracking-tight mb-1" style={{ color: C.papyrus }}>
          Order placed.
        </h2>
        <p className="text-sm mb-1" style={{ color: C.stone }}>
          You&apos;ll get a WhatsApp confirmation shortly.
        </p>
        <p className="text-xs mb-5" style={{ color: C.clayEarth }}>
          You completed this design by choosing it.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-full text-xs font-bm uppercase tracking-widest"
          style={{ background: C.ember, color: C.white }}
        >
          Back to browsing
        </button>
      </div>
    </div>
  );
}

/* ─── SEARCH MODAL ─── */
type SearchModalProps = {
  onClose: () => void;
  onProductClick: (product: any) => void;
  PRODUCTS: any[];
};

export function SearchModal({ onClose, onProductClick, PRODUCTS }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    if (!query.trim()) return [] as any[];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.theme.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.fit.toLowerCase().includes(q)
    );
  }, [query, PRODUCTS]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-24 anim-in font-b"
      style={{ background: "rgba(26,26,26,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div className="w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-3"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: C.clayEarth }} />
          <input
            autoFocus
            type="text"
            placeholder="Search designs, themes, fits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm"
            style={{ color: C.papyrus, outline: "none" }}
          />
          <button onClick={onClose} className="text-xs font-bm" style={{ color: C.clayEarth }}>
            ESC
          </button>
        </div>

        {query && results.length === 0 ? (
          <p className="text-sm text-center py-8" style={{ color: C.clayEarth }}>
            No designs found for &quot;{query}&quot;
          </p>
        ) : null}

        {results.length > 0 ? (
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(26,26,26,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onProductClick(p);
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-white/5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <img src={p.image} alt={p.name} className="w-12 h-14 object-cover rounded-lg flex-shrink-0" />
                <div>
                  <span className="font-bm text-sm block" style={{ color: C.papyrus }}>
                    {p.name}
                  </span>
                  <span className="text-[11px]" style={{ color: C.clayEarth }}>
                    {p.theme} / {p.fit} · {p.price} EGP
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
