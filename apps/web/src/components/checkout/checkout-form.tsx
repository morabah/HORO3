"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCart } from "@/hooks/use-cart";
import {
  completeCart,
  getPaymentRedirectUrl,
  setPaymentSession,
  updateCartShipping,
} from "@/lib/medusa/checkout";
import { getCart } from "@/lib/medusa/cart";
import {
  getGiftPackagingPreference,
  saveLastOrder,
} from "@/lib/browser/order-session";
import { captureEvent } from "@/lib/analytics/posthog";
import { getStorefrontCopy } from "@/lib/storefront/copy";
import { formatEgp } from "@/lib/utils";

const GOVERNORATES = [
  { value: "Cairo", en: "Cairo", ar: "القاهرة" },
  { value: "Giza", en: "Giza", ar: "الجيزة" },
  { value: "Alexandria", en: "Alexandria", ar: "الإسكندرية" },
  { value: "Qalyubia", en: "Qalyubia", ar: "القليوبية" },
  { value: "Dakahlia", en: "Dakahlia", ar: "الدقهلية" },
  { value: "Sharqia", en: "Sharqia", ar: "الشرقية" },
  { value: "Monufia", en: "Monufia", ar: "المنوفية" },
  { value: "Beheira", en: "Beheira", ar: "البحيرة" },
  { value: "Kafr El Sheikh", en: "Kafr El Sheikh", ar: "كفر الشيخ" },
  { value: "Gharbia", en: "Gharbia", ar: "الغربية" },
  { value: "Minya", en: "Minya", ar: "المنيا" },
  { value: "Asyut", en: "Asyut", ar: "أسيوط" },
  { value: "Sohag", en: "Sohag", ar: "سوهاج" },
  { value: "Qena", en: "Qena", ar: "قنا" },
  { value: "Luxor", en: "Luxor", ar: "الأقصر" },
  { value: "Aswan", en: "Aswan", ar: "أسوان" },
  { value: "Red Sea", en: "Red Sea", ar: "البحر الأحمر" },
  { value: "New Valley", en: "New Valley", ar: "الوادي الجديد" },
  { value: "Matrouh", en: "Matrouh", ar: "مطروح" },
  { value: "North Sinai", en: "North Sinai", ar: "شمال سيناء" },
  { value: "South Sinai", en: "South Sinai", ar: "جنوب سيناء" },
  { value: "Port Said", en: "Port Said", ar: "بورسعيد" },
  { value: "Suez", en: "Suez", ar: "السويس" },
  { value: "Ismailia", en: "Ismailia", ar: "الإسماعيلية" },
  { value: "Damietta", en: "Damietta", ar: "دمياط" },
  { value: "Beni Suef", en: "Beni Suef", ar: "بني سويف" },
  { value: "Fayoum", en: "Fayoum", ar: "الفيوم" },
] as const;

type CheckoutStep = "shipping" | "payment" | "confirm";

interface CheckoutFormProps {
  className?: string;
}

interface ShippingState {
  email: string;
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  postal_code: string;
  phone: string;
}

const EMPTY_SHIPPING: ShippingState = {
  email: "",
  first_name: "",
  last_name: "",
  address_1: "",
  city: "",
  postal_code: "",
  phone: "",
};

export function CheckoutForm({ className = "" }: CheckoutFormProps) {
  const locale = useLocale() === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(locale);
  const router = useRouter();
  const { cart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | "wallet">("cod");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ShippingState, string>>>({});
  const [shipping, setShipping] = useState<ShippingState>(EMPTY_SHIPPING);

  const isEmpty = !cart?.items?.length;
  const [giftPackaging, setGiftPackaging] = useState(() => getGiftPackagingPreference());
  const subtotal = cart?.items?.reduce(
    (sum, item) => sum + (item.unit_price ?? 0) * item.quantity,
    0
  ) ?? 0;
  const shippingFee =
    paymentMethod === "cod"
      ? shippingMethod === "express"
        ? 10000
        : 6000
      : 0;
  const giftFee = giftPackaging ? 30000 : 0; // 300.00 EGP
  const total = subtotal + shippingFee + giftFee;

  const paymentMethodLabel = useMemo(() => {
    if (paymentMethod === "cod") return copy.checkout.paymentMethods.cod.title;
    if (paymentMethod === "card") return copy.checkout.paymentMethods.card.title;
    return copy.checkout.paymentMethods.wallet.title;
  }, [copy.checkout.paymentMethods.card.title, copy.checkout.paymentMethods.cod.title, copy.checkout.paymentMethods.wallet.title, paymentMethod]);

  const shippingMethodLabel = useMemo(() => {
    return shippingMethod === "express"
      ? copy.checkout.shippingMethods.express.title
      : copy.checkout.shippingMethods.standard.title;
  }, [copy.checkout.shippingMethods.express.title, copy.checkout.shippingMethods.standard.title, shippingMethod]);

  function updateField<K extends keyof ShippingState>(key: K, value: ShippingState[K]) {
    setShipping((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validateShipping() {
    const nextErrors: Partial<Record<keyof ShippingState, string>> = {};
    if (!shipping.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email.trim())) {
      nextErrors.email = copy.checkout.errors.email;
    }
    if (!shipping.first_name.trim()) nextErrors.first_name = copy.checkout.errors.firstName;
    if (!shipping.last_name.trim()) nextErrors.last_name = copy.checkout.errors.lastName;
    if (!shipping.address_1.trim()) nextErrors.address_1 = copy.checkout.errors.addressLine;
    if (!shipping.city.trim()) nextErrors.city = copy.checkout.errors.governorate;
    if (!shipping.phone.trim() || shipping.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = copy.checkout.errors.phone;
    }
    return nextErrors;
  }

  async function handleContinueToPayment() {
    if (!cart?.id) return;
    const nextErrors = validateShipping();
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setError(null);
    captureEvent("checkout_started", {
      itemCount: cart.items.length,
      cartTotal: subtotal / 100,
    });
    try {
      await updateCartShipping(cart.id, {
        ...shipping,
        country_code: "eg",
      });
      setStep("payment");
    } catch {
      setError(copy.checkout.errors.shippingSave);
      setStep("payment");
    }
  }

  async function handleReview() {
    if (!cart?.id) return;
    setError(null);
    captureEvent("payment_method_selected", {
      paymentMethod,
      shippingMethod,
      cartTotal: total / 100,
    });
    try {
      const providerId =
        paymentMethod === "card"
          ? "paymob-card"
          : paymentMethod === "wallet"
            ? "paymob-wallet"
            : "cash-on-delivery";
      await setPaymentSession(cart.id, providerId);
      // For card/wallet, redirect to Paymob if provider returned a URL; otherwise go to confirm
      if (providerId !== "cash-on-delivery") {
        const updated = await getCart(cart.id);
        const redirectUrl = getPaymentRedirectUrl(updated);
        if (redirectUrl) {
          window.location.href = redirectUrl;
          return;
        }
      }
      setStep("confirm");
    } catch {
      setError(copy.checkout.errors.paymentSession);
      // Do not advance to confirm when payment session failed; user stays on payment step
    }
  }

  async function handlePlaceOrder() {
    if (!cart?.id) return;
    setSubmitting(true);
    setError(null);
    if (paymentMethod === "cod") {
      captureEvent("cod_selected", { cartTotal: total / 100 });
    }
    try {
      const completed = await completeCart(cart.id);
      const orderId = completed?.id ?? cart.id;
      saveLastOrder({
        id: orderId,
        createdAt: new Date().toISOString(),
        total,
        paymentMethod,
        shippingMethod,
        giftPackaging,
        itemCount: cart.items.length,
        items: cart.items.map((item) => ({
          id: item.id,
          title: item.title ?? "HORO piece",
          quantity: item.quantity,
          unitPrice: item.unit_price ?? 0,
        })),
        shippingAddress: shipping,
      });
      captureEvent("checkout_completed", {
        orderId,
        total: total / 100,
        paymentMethod,
        shippingMethod,
        giftPackaging,
      });
      router.push(`/order/${orderId}`);
    } catch {
      setError(copy.checkout.errors.placementFailed);
    } finally {
      setSubmitting(false);
    }
  }

  if (isEmpty) {
    return (
      <div className={`horo-frame-card p-6 ${className}`}>
        <p className="text-deep-umber">{copy.checkout.errors.emptyCart}</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 lg:grid-cols-[1.15fr_0.85fr] ${className}`}>
      <section className="space-y-6">
        <div className="horo-paper-panel p-4 md:p-5">
          <ol className="grid gap-3 md:grid-cols-3" role="list">
            {(["shipping", "payment", "confirm"] as const).map((item, index) => {
              const isActive = item === step;
              const isComplete =
                (item === "shipping" && step !== "shipping") ||
                (item === "payment" && step === "confirm");
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => {
                      if (item === "shipping" || isComplete) setStep(item);
                    }}
                    className={`flex w-full items-center gap-3 rounded-radius-md border px-4 py-3 text-start transition-colors ${
                      isActive
                        ? "border-burnt-sienna bg-warm-linen"
                        : "border-sandstone/60 bg-true-white hover:bg-warm-linen"
                    }`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isActive || isComplete
                        ? "bg-burnt-sienna text-warm-linen"
                        : "bg-parchment text-charcoal"
                    }`}>
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-[0.16em] text-deep-umber/70">
                        {copy.checkout.steps[item]}
                      </span>
                      <span className="mt-1 block text-sm text-charcoal">
                        {item === "shipping"
                          ? locale === "ar"
                            ? "العنوان وطريقة الشحن"
                            : "Address and delivery"
                          : item === "payment"
                            ? locale === "ar"
                              ? "وسيلة الدفع"
                              : "Payment method"
                            : locale === "ar"
                              ? "مراجعة نهائية"
                              : "Final review"}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {step === "shipping" && (
          <section className="horo-frame-card p-6 md:p-7">
            <div className="mb-5">
              <h2 className="font-display text-xl font-semibold text-charcoal">{copy.checkout.steps.shipping}</h2>
              <p className="mt-2 text-sm leading-7 text-deep-umber">
                {locale === "ar"
                  ? "أدخل البيانات التي نحتاجها للتوصيل وتأكيد الـ COD بدون تأخير."
                  : "Add the information we need for delivery and fast COD confirmation."}
              </p>
            </div>
            <div className="mb-4">
              <Input
                placeholder={copy.checkout.fields.email}
                type="email"
                autoComplete="email"
                inputMode="email"
                value={shipping.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
              <p className="mt-1 text-xs text-deep-umber/70">{copy.checkout.fields.emailHint}</p>
              {fieldErrors.email ? (
                <p className="mt-2 text-sm text-terracotta">{fieldErrors.email}</p>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Input
                  placeholder={copy.checkout.fields.firstName}
                  autoComplete="given-name"
                  value={shipping.first_name}
                  onChange={(event) => updateField("first_name", event.target.value)}
                />
                {fieldErrors.first_name ? (
                  <p className="mt-2 text-sm text-terracotta">{fieldErrors.first_name}</p>
                ) : null}
              </div>
              <div>
                <Input
                  placeholder={copy.checkout.fields.lastName}
                  autoComplete="family-name"
                  value={shipping.last_name}
                  onChange={(event) => updateField("last_name", event.target.value)}
                />
                {fieldErrors.last_name ? (
                  <p className="mt-2 text-sm text-terracotta">{fieldErrors.last_name}</p>
                ) : null}
              </div>
            </div>
            <div className="mt-4">
              <Input
                placeholder={copy.checkout.fields.addressLine}
                autoComplete="address-line1"
                value={shipping.address_1}
                onChange={(event) => updateField("address_1", event.target.value)}
              />
              {fieldErrors.address_1 ? (
                <p className="mt-2 text-sm text-terracotta">{fieldErrors.address_1}</p>
              ) : null}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Select
                  value={shipping.city}
                  onChange={(event) => updateField("city", event.target.value)}
                >
                  <option value="">{copy.checkout.fields.governorate}</option>
                  {GOVERNORATES.map((governorate) => (
                    <option key={governorate.value} value={governorate.value}>
                      {governorate[locale]}
                    </option>
                  ))}
                </Select>
                {fieldErrors.city ? (
                  <p className="mt-2 text-sm text-terracotta">{fieldErrors.city}</p>
                ) : null}
              </div>
              <Input
                placeholder={copy.checkout.fields.postalCode}
                value={shipping.postal_code}
                onChange={(event) => updateField("postal_code", event.target.value)}
              />
            </div>
            <div className="mt-4">
              <Input
                placeholder={copy.checkout.fields.phone}
                type="tel"
                autoComplete="tel"
                inputMode="numeric"
                value={shipping.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
              {fieldErrors.phone ? (
                <p className="mt-2 text-sm text-terracotta">{fieldErrors.phone}</p>
              ) : null}
            </div>
            <div className="mt-6 space-y-3">
              {(["standard", "express"] as const).map((method) => {
                const details =
                  method === "express"
                    ? copy.checkout.shippingMethods.express
                    : copy.checkout.shippingMethods.standard;
                const active = shippingMethod === method;
                return (
                  <label
                    key={method}
                    className={`flex cursor-pointer items-start justify-between gap-4 rounded-radius-md border px-4 py-4 transition-colors ${
                      active ? "border-burnt-sienna bg-parchment" : "border-sandstone/60 bg-true-white"
                    }`}
                  >
                    <span className="space-y-1">
                      <span className="block text-sm font-semibold text-charcoal">{details.title}</span>
                      <span className="block text-sm text-deep-umber">{details.eta}</span>
                      <span className="block text-sm leading-6 text-deep-umber/90">{details.detail}</span>
                    </span>
                    <input
                      type="radio"
                      name="shipping-method"
                      checked={active}
                      onChange={() => setShippingMethod(method)}
                      className="mt-1 h-4 w-4 accent-burnt-sienna"
                    />
                  </label>
                );
              })}
            </div>
            <Button className="mt-6 w-full" onClick={handleContinueToPayment}>
              {copy.checkout.buttons.toPayment}
            </Button>
          </section>
        )}

        {step === "payment" && (
          <section className="horo-frame-card p-6 md:p-7">
            <div className="mb-5">
              <h2 className="font-display text-xl font-semibold text-charcoal">{copy.checkout.steps.payment}</h2>
              <p className="mt-2 text-sm leading-7 text-deep-umber">
                {locale === "ar"
                  ? "اختر طريقة الدفع حسب سرعتك المفضلة وطريقة الاستلام."
                  : "Choose the payment route that best fits timing and delivery comfort."}
              </p>
            </div>
            <div className="space-y-3">
              {(["cod", "card", "wallet"] as const).map((method) => {
                const details = copy.checkout.paymentMethods[method];
                const active = paymentMethod === method;
                return (
                  <label
                    key={method}
                    className={`flex cursor-pointer items-start gap-3 rounded-radius-md border px-4 py-4 transition-colors ${
                      active ? "border-burnt-sienna bg-parchment" : "border-sandstone/60 bg-true-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={active}
                      onChange={() => setPaymentMethod(method)}
                      className="mt-1 h-4 w-4 accent-burnt-sienna"
                    />
                    <span className="space-y-1">
                      <span className="block text-sm font-semibold text-charcoal">{details.title}</span>
                      <span className="block text-sm leading-6 text-deep-umber">{details.detail}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="mt-5 rounded-radius-md border border-sandstone/60 bg-warm-linen p-4 text-sm leading-7 text-deep-umber">
              {paymentMethod === "cod" ? copy.checkout.notes.cod : copy.checkout.notes.prepaid}
            </div>
            {/* Trust signal bar */}
            <div className="mt-5 rounded-radius-md border border-sandstone/60 bg-parchment p-4">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-deep-umber">
                <span className="flex items-center gap-1.5 font-medium">
                  <span>🔒</span> {copy.checkout.trustBadges.encrypted}
                </span>
                <span className="flex items-center gap-1.5">
                  <span>✓</span> {copy.checkout.trustBadges.secureCheckout}
                </span>
                <span className="text-xs text-deep-umber/70">
                  {copy.checkout.trustBadges.paymob}
                </span>
              </div>
              <p className="mt-2 text-center text-xs text-deep-umber/70">
                {copy.checkout.trustBadges.dataProtected}
              </p>
              <div className="mt-2 flex items-center justify-center gap-3 text-xs font-medium text-deep-umber/60">
                <span>Visa</span>
                <span>Mastercard</span>
                <span>Meeza</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="sm:w-auto" onClick={() => setStep("shipping")}>
                {copy.checkout.steps.shipping}
              </Button>
              <Button className="w-full" onClick={handleReview}>
                {copy.checkout.buttons.toReview}
              </Button>
            </div>
          </section>
        )}

        {step === "confirm" && (
          <section className="horo-frame-card p-6 md:p-7">
            <div className="mb-5">
              <h2 className="font-display text-xl font-semibold text-charcoal">{copy.checkout.review.title}</h2>
              <p className="mt-2 text-sm leading-7 text-deep-umber">
                {copy.common.finalPriceInclusive}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-radius-md border border-sandstone/60 bg-warm-linen p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-burnt-sienna">
                  {copy.checkout.review.shippingTo}
                </p>
                <p className="mt-2 text-sm font-semibold text-charcoal">
                  {shipping.first_name} {shipping.last_name}
                </p>
                <p className="mt-2 text-sm leading-6 text-deep-umber">
                  {shipping.address_1}
                  <br />
                  {shipping.city}
                </p>
                <p className="mt-2 text-sm text-deep-umber">{shipping.phone}</p>
              </div>
              <div className="rounded-radius-md border border-sandstone/60 bg-warm-linen p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-burnt-sienna">
                  {copy.checkout.review.payment}
                </p>
                <p className="mt-2 text-sm font-semibold text-charcoal">{paymentMethodLabel}</p>
                <p className="mt-2 text-sm text-deep-umber">{shippingMethodLabel}</p>
                <p className="mt-2 text-sm text-deep-umber">
                  {giftPackaging
                    ? copy.common.giftPackagingIncluded
                    : copy.common.giftPackagingNotSelected}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="sm:w-auto" onClick={() => setStep("payment")}>
                {copy.checkout.steps.payment}
              </Button>
              <Button className="w-full" onClick={handlePlaceOrder} disabled={submitting}>
                {submitting ? copy.checkout.buttons.placingOrder : copy.checkout.buttons.placeOrder}
              </Button>
            </div>
          </section>
        )}

        {error ? <p className="text-sm text-terracotta">{error}</p> : null}
      </section>

      <aside className="h-fit lg:sticky lg:top-24">
        <div className="horo-paper-panel p-6">
          <p className="horo-kicker">{copy.cart.orderSummary}</p>
          <div className="mt-4 space-y-3">
            {cart?.items?.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 rounded-radius-md border border-sandstone/60 bg-warm-linen px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-charcoal">{item.title ?? "HORO piece"}</p>
                  <p className="mt-1 text-sm text-deep-umber">
                    {copy.cart.quantity}: {item.quantity}
                  </p>
                </div>
                <p className="font-mono text-sm text-charcoal">
                  {formatEgp((item.unit_price ?? 0) * item.quantity, locale)}
                </p>
              </div>
            ))}
          </div>
          <dl className="mt-6 space-y-3 text-sm text-deep-umber">
            <div className="flex items-center justify-between">
              <dt>{copy.checkout.review.subtotal}</dt>
              <dd>{formatEgp(subtotal, locale)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>{copy.cart.giftPackaging}</dt>
              <dd>
                {giftPackaging
                  ? formatEgp(giftFee, locale)
                  : copy.common.giftPackagingNotSelected}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>{copy.checkout.review.shipping}</dt>
              <dd>{shippingFee ? formatEgp(shippingFee, locale) : locale === "ar" ? "مجاني" : "Free"}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-sandstone/50 pt-3 text-base font-semibold text-charcoal">
              <dt>{copy.checkout.review.total}</dt>
              <dd>{formatEgp(total, locale)}</dd>
            </div>
          </dl>
          
          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-radius-md border border-burnt-sienna/60 bg-true-white p-4 transition-colors hover:bg-parchment/60">
            <input
              type="checkbox"
              checked={giftPackaging}
              onChange={(e) => setGiftPackaging(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-sandstone/60 accent-burnt-sienna"
            />
            <span className="space-y-1">
              <span className="block text-sm font-semibold text-charcoal">
                {locale === "ar" ? "تغليف هدايا HORO" : "HORO Gift Packaging"}
              </span>
              <span className="block text-xs leading-5 text-deep-umber">
                {locale === "ar" 
                  ? "أضف صندوق هدية HORO وبطاقة فنان بـ 300 ج.م" 
                  : "Add the HORO gift box and artist card for 300 EGP"}
              </span>
            </span>
          </label>
          <p className="mt-3 text-center text-xs text-deep-umber/70">
            {copy.checkout.noExtraFees}
          </p>
          <div className="mt-4 rounded-radius-md border border-sandstone/60 bg-warm-linen p-4 text-sm leading-7 text-deep-umber">
            <p>{paymentMethod === "cod" ? copy.product.buyBox.shipping : copy.product.buyBox.prepaid}</p>
            <p className="mt-3">{copy.product.buyBox.exchange}</p>
            <p className="mt-3">{copy.product.buyBox.gift}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
