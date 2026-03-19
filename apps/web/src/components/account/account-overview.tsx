"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { getLastOrder } from "@/lib/browser/order-session";
import { getStorefrontCopy } from "@/lib/storefront/copy";
import { formatEgp } from "@/lib/utils";

export function AccountOverview() {
  const locale = useLocale() === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(locale);
  const lastOrder = getLastOrder();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="horo-paper-panel p-6">
        <h2 className="text-lg font-semibold text-charcoal">{copy.account.servicePromise}</h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-deep-umber">
          {copy.account.promiseItems.map((item) => (
            <li key={item} className="rounded-radius-md border border-sandstone/50 bg-warm-linen px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="horo-frame-card p-6">
        <h2 className="text-lg font-semibold text-charcoal">{copy.account.latestOrder}</h2>
        {lastOrder ? (
          <div className="mt-4 space-y-3 text-sm text-deep-umber">
            <p>
              <span className="font-medium text-charcoal">#{lastOrder.id}</span>
            </p>
            <p>{formatEgp(lastOrder.total, locale)}</p>
            <p>{new Date(lastOrder.createdAt).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-EG")}</p>
            <Link href={`/order/${lastOrder.id}`} className="inline-flex text-burnt-sienna hover:underline">
              {copy.account.viewOrderDetails}
            </Link>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-deep-umber">
            {copy.account.noOrder}
          </p>
        )}
      </section>
    </div>
  );
}
