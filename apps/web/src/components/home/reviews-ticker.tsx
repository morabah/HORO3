"use client";

import type { SanityReview } from "@/lib/sanity/reviews";

interface ReviewsTickerProps {
  reviews: SanityReview[];
  locale: "ar" | "en";
}

export function ReviewsTicker({ reviews, locale }: ReviewsTickerProps) {
  if (reviews.length === 0) return null;
  const bodyKey = locale === "ar" ? "body_ar" : "body_en";

  return (
    <section className="horo-home-section">
      <div className="max-w-2xl">
        <p className="horo-kicker">
          {locale === "ar" ? "آراء العملاء" : "Customer reviews"}
        </p>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-charcoal md:text-2xl">
          {locale === "ar"
            ? "ما الذي يلاحظه الناس أولاً"
            : "What customers notice first"}
        </h2>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reviews.slice(0, 6).map((r) => (
          <article key={r._id} className="horo-home-quote p-5 md:p-6">
            <p className="text-3xl leading-none text-burnt-sienna/60">&quot;</p>
            <p className="mt-2 text-sm leading-6 text-deep-umber/80 line-clamp-4">
              {(r[bodyKey as keyof SanityReview] as string) ?? ""}
            </p>
            <div className="mt-4 flex items-center gap-2 border-t border-sandstone/25 pt-3">
              <div className="flex text-burnt-sienna">
                {"★".repeat(r.rating ?? 5)}
              </div>
              <span className="text-xs font-medium text-deep-umber/65">
                {r.author_name}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
