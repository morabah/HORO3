import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getStories } from "@/lib/sanity/stories";
import { EmptyState, PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 300;

export default async function StoriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";
  const copy = getStorefrontCopy(localeKey);

  let stories: Awaited<ReturnType<typeof getStories>> = [];
  try {
    stories = await getStories(50);
  } catch {
    // ignore and render customer-safe empty state
  }

  return (
    <PageShell width="wide">
      <PageIntro
        title={copy.stories.title}
        description={copy.stories.description}
        eyebrow={localeKey === "ar" ? "السرد" : "Editorial context"}
      />
      {stories.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {stories.map((story) => {
            const title = localeKey === "ar"
              ? story.title_ar ?? story.title_en
              : story.title_en ?? story.title_ar;
            const slug = story.slug?.current ?? story._id;
            const coverUrl = story.cover_image?.asset?.url;

            return (
              <li key={story._id}>
                <Link
                  href={`/stories/${slug}`}
                  className="group block overflow-hidden transition-all horo-frame-card"
                >
                  <div className="relative aspect-video overflow-hidden bg-parchment">
                    {coverUrl ? (
                      <Image
                        src={coverUrl}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-sandstone/70">
                        <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {localeKey === "ar" ? "عرض المزيد" : "View"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="font-semibold text-charcoal">{title}</h2>
                    <div className="mt-6 flex items-center justify-end text-sm">
                      <span className="text-burnt-sienna underline-offset-4 decoration-burnt-sienna/50 transition-all hover:underline hover:decoration-burnt-sienna">
                        {localeKey === "ar" ? "اقرأ القصة" : "Read Story"}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState
          className="mt-8"
          title={copy.stories.emptyTitle}
          description={copy.stories.emptyBody}
        />
      )}
    </PageShell>
  );
}
