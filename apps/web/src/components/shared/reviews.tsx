"use client";

import Image from "next/image";
import type { SanityReview } from "@/lib/sanity/reviews";

interface ReviewsProps {
  reviews: SanityReview[];
  locale: "ar" | "en";
}

export function Reviews({ reviews, locale }: ReviewsProps) {
  if (reviews.length === 0) return null;

  const bodyKey = locale === "ar" ? "body_ar" : "body_en";

  return (
    <section className="mt-12 border-t border-sandstone/50 pt-10">
      <div className="flex flex-col items-center text-center">
        <p className="horo-kicker">{locale === "ar" ? "آراء العملاء" : "Community Voices"}</p>
        <h2 className="mt-3 text-2xl font-semibold text-charcoal">
          {locale === "ar" ? "هورو في شوارع القاهرة" : "HORO on the Streets"}
        </h2>
        <p className="mt-2 text-sm text-deep-umber max-w-xl">
          {locale === "ar" 
            ? "تجارب حقيقية وصور من مجتمعنا بعد الاستلام." 
            : "Real experiences and styles from our community."}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => {
          const hasImage = !!r.ugc_photo?.asset?.url;
          const bodyText = r[bodyKey as keyof SanityReview] as string;

          return (
            <div 
              key={r._id} 
              className={`horo-frame-card flex flex-col overflow-hidden transition-transform duration-normal hover:-translate-y-1 ${hasImage ? 'row-span-2' : ''}`}
            >
              {hasImage ? (
                <div className="relative aspect-[9/16] w-full bg-sandstone/10">
                  <Image
                    src={r.ugc_photo!.asset!.url!}
                    alt={`Photo by ${r.author_name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Overlay text for image cards */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-true-white">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-medium">{r.author_name}</span>
                      {r.rating != null && (
                        <span className="text-xs tracking-widest text-[#F5F0E8]" aria-label={`${r.rating} out of 5`}>
                          {"★".repeat(r.rating)}
                        </span>
                      )}
                    </div>
                    {bodyText && (
                      <p className="text-sm line-clamp-3 leading-relaxed text-[#F5F0E8]/90">
                        {bodyText}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* Text-only cards */
                <div className="p-6 flex flex-col h-full justify-between bg-warm-linen/40">
                  <div>
                    {r.rating != null && (
                      <div className="mb-4 text-sm text-burnt-sienna tracking-widest" aria-label={`${r.rating} out of 5`}>
                        {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                      </div>
                    )}
                    {bodyText && (
                      <p className="text-sm leading-relaxed text-deep-umber italic">
                        &ldquo;{bodyText}&rdquo;
                      </p>
                    )}
                  </div>
                  <div className="mt-6 font-medium text-sm text-charcoal">
                    — {r.author_name}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
