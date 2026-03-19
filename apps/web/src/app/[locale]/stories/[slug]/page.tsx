import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getStoryBySlug } from "@/lib/sanity/stories";
import { PageShell } from "@/components/layout/page-shell";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";
  const story = await getStoryBySlug(slug);

  if (!story) {
    return { title: "Story" };
  }

  const title = localeKey === "ar" ? story.title_ar ?? story.title_en : story.title_en ?? story.title_ar;
  const description = localeKey === "ar" ? story.body_ar : story.body_en;

  return {
    title: title ?? "Story",
    description: description ?? undefined,
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      images: story.cover_image?.asset?.url ? [story.cover_image.asset.url] : undefined,
    },
  };
}

export default async function StorySlugPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";

  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const title = localeKey === "ar" ? story.title_ar ?? story.title_en : story.title_en ?? story.title_ar;
  const body = localeKey === "ar" ? story.body_ar ?? story.body_en : story.body_en ?? story.body_ar;
  const coverUrl = story.cover_image?.asset?.url;

  return (
    <PageShell width="default">
      <article className="horo-paper-panel p-6 md:p-8">
        {coverUrl ? (
          <div className="relative mb-6 aspect-video overflow-hidden rounded-radius-lg bg-parchment">
            <Image
              src={coverUrl}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        ) : null}
        <p className="horo-kicker">{localeKey === "ar" ? "قصة" : "Story"}</p>
        <h1 className="mt-3 text-3xl font-semibold text-charcoal">{title}</h1>
        {body ? (
          <div className="mt-6 whitespace-pre-wrap text-sm leading-8 text-deep-umber">
            {body}
          </div>
        ) : null}
      </article>
    </PageShell>
  );
}
