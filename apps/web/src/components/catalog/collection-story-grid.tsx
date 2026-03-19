"use client";

import { Link } from "@/i18n/routing";
import type { SanityCollectionStory } from "@/lib/sanity/collection-stories";

interface CollectionStoryGridProps {
  stories: SanityCollectionStory[];
  locale: "ar" | "en";
  className?: string;
}

export function CollectionStoryGrid({
  stories,
  locale,
  className = "",
}: CollectionStoryGridProps) {
  if (!stories.length) {
    return (
      <p className="py-8 text-deep-umber">
        {locale === "ar" ? "لا توجد قصص مجموعات بعد." : "No collection stories yet."}
      </p>
    );
  }

  return (
    <ul className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${className}`} role="list">
      {stories.map((story) => {
        const title = locale === "ar" ? story.title_ar ?? story.title_en : story.title_en ?? story.title_ar;
        const excerpt = locale === "ar" ? story.excerpt_ar ?? story.body_ar : story.excerpt_en ?? story.body_en;
        const handle = story.medusa_collection_handle ?? story.slug?.current ?? story._id;

        return (
          <li key={story._id}>
            <Link
              href={`/collections/${handle}`}
              className={`group block overflow-hidden transition-all ${story.is_gift_collection ? "horo-paper-panel" : "horo-frame-card"}`}
            >
              <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden bg-warm-linen/50 horo-soft-gradient">
                {story.hero_image?.asset?.url ? (
                  <img
                    src={story.hero_image.asset.url}
                    alt={title ?? ""}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-sandstone/70">
                    <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {locale === "ar" ? "عرض المزيد" : "View"}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                {story.theme && (
                  <p className="horo-kicker">
                    {story.theme.replace("_", " ")}
                  </p>
                )}
                <h2 className={`text-2xl font-semibold text-charcoal ${story.theme ? "mt-3" : ""}`}>{title}</h2>
                {excerpt && (
                  <p className="mt-3 text-sm leading-7 text-deep-umber line-clamp-4">{excerpt}</p>
                )}
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-deep-umber">
                    {story.artists?.length
                      ? `${story.artists.length} ${locale === "ar" ? "فنانين مشاركين" : "artists"}`
                      : locale === "ar"
                        ? "قصة فنية منسقة"
                        : "Editorial collection story"}
                  </span>
                  <span className="text-burnt-sienna underline-offset-4 decoration-burnt-sienna/50 transition-all hover:underline hover:decoration-burnt-sienna">
                    {locale === "ar" ? "استكشف" : "Explore"}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
