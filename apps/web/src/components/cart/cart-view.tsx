"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/layout/page-shell";
import { getGiftPackagingPreference } from "@/lib/browser/order-session";
import { formatEgp } from "@/lib/utils";
import { getStorefrontCopy } from "@/lib/storefront/copy";

export function CartView() {
  const locale = useLocale() === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(locale);
  const { cart, loading, updateItem, removeItem } = useCart();
  const giftPackaging = getGiftPackagingPreference();

  const subtotal = useMemo(
    () =>
      cart?.items?.reduce(
        (sum, item) => sum + (item.unit_price ?? 0) * item.quantity,
        0
      ) ?? 0,
    [cart]
  );
  const giftFee = giftPackaging ? 3000 : 0;
  const total = subtotal + giftFee;

  if (loading) {
    return <p className="text-deep-umber">{locale === "ar" ? "جارٍ تحميل السلة..." : "Loading your bag..."}</p>;
  }

  if (!cart?.items?.length) {
    return (
      <EmptyState
        title={copy.cart.emptyTitle}
        description={copy.cart.emptyBody}
        action={(
          <Button asChild>
            <Link href="/collections">{copy.common.browseCollections}</Link>
          </Button>
        )}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
      <section className="space-y-4">
        {cart.items.map((item) => (
          <article
            key={item.id}
            className="horo-frame-card p-4 md:p-5"
          >
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-20 overflow-hidden rounded-radius-md bg-parchment">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title ?? "HORO piece"}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : null}
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-charcoal">
                      {item.title ?? "HORO piece"}
                    </h2>
                    <p className="mt-1 text-sm text-charcoal">
                      {formatEgp(item.unit_price ?? 0, locale)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-burnt-sienna hover:underline"
                    onClick={() => removeItem(item.id)}
                  >
                    {copy.cart.remove}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center border border-sandstone rounded-md">
                    <button
                      type="button"
                      className="h-11 w-11 text-charcoal hover:bg-parchment"
                      onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}
                    >
                      −
                    </button>
                    <span className="min-w-10 text-center text-charcoal">{item.quantity}</span>
                    <button
                      type="button"
                      className="h-11 w-11 text-charcoal hover:bg-parchment"
                      onClick={() => updateItem(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-charcoal">
                    {formatEgp((item.unit_price ?? 0) * item.quantity, locale)}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="h-fit lg:sticky lg:top-24">
        <div className="horo-paper-panel p-6">
          <h2 className="text-lg font-semibold text-charcoal">{copy.cart.orderSummary}</h2>
          <dl className="mt-5 space-y-3 text-sm text-deep-umber">
            <div className="flex items-center justify-between">
              <dt>{copy.cart.items}</dt>
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
              <dt>{copy.cart.shippingAtCheckout}</dt>
              <dd>{copy.cart.shippingAtCheckoutValue}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-sandstone/50 pt-3 font-semibold text-charcoal">
              <dt>{copy.cart.totalBeforeShipping}</dt>
              <dd>{formatEgp(total, locale)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm leading-7 text-deep-umber">
            {copy.cart.codNote}
          </p>
          <Button asChild className="mt-6 w-full">
            <Link href="/checkout">{copy.common.continueToCheckout}</Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}
