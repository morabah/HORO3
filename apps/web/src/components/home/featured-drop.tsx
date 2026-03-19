"use client";

import { Link } from "@/i18n/routing";
import { ProductCard } from "@/components/catalog/product-card";
import type { Product } from "@/lib/medusa/types";

interface FeaturedDropProps {
  locale: "ar" | "en";
  products: Product[];
}

export function FeaturedDrop({ locale, products }: FeaturedDropProps) {
  if (products.length === 0) return null;

  return (
    <section className="horo-home-section">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="horo-kicker">
            {locale === "ar" ? "الإصدار الحالي" : "Current drop"}
          </p>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-charcoal md:text-2xl">
            {locale === "ar"
              ? "قطع جاهزة — مش مجرد صور"
              : "Ready to buy — not just to browse"}
          </h2>
          <p className="mt-3 text-base leading-7 text-deep-umber/80">
            {locale === "ar"
              ? "كل قطعة هنا عليها تفاصيل القماش والمقاس والفنان قبل ما تشتري."
              : "Every piece here shows fabric, sizing, and artist details before checkout."}
          </p>
        </div>
        <Link
          href="/collections"
          className="inline-flex shrink-0 text-sm font-semibold text-burnt-sienna hover:underline"
        >
          {locale === "ar" ? "كل الإصدارات →" : "All drops →"}
        </Link>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
