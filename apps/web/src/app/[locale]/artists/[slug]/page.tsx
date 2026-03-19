import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getArtistBySlug } from "@/lib/sanity/queries";
import { PageShell } from "@/components/layout/page-shell";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    return { title: "Artist" };
  }

  const title = localeKey === "ar" ? artist.name_ar ?? artist.name_en : artist.name_en ?? artist.name_ar;
  const description = localeKey === "ar" ? artist.bio_ar ?? artist.meaning_quote_ar : artist.bio_en ?? artist.meaning_quote_en;

  return {
    title: title ?? "Artist",
    description: description ?? undefined,
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      images: artist.portrait?.asset?.url ? [artist.portrait.asset.url] : undefined,
    },
  };
}

export default async function ArtistSlugPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";

  const artist = await getArtistBySlug(slug);
  if (!artist) notFound();

  const name = localeKey === "ar" ? artist.name_ar ?? artist.name_en : artist.name_en ?? artist.name_ar;
  const bio = localeKey === "ar" ? artist.bio_ar ?? artist.bio_en : artist.bio_en ?? artist.bio_ar;
  const meaningQuote = localeKey === "ar" ? artist.meaning_quote_ar ?? artist.meaning_quote_en : artist.meaning_quote_en ?? artist.meaning_quote_ar;
  const portraitUrl = artist.portrait?.asset?.url;

  return (
    <PageShell width="default">
      <article className="horo-paper-panel p-6 md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {portraitUrl ? (
            <div className="relative h-40 w-40 overflow-hidden rounded-radius-lg bg-parchment shrink-0">
              <Image src={portraitUrl} alt={name ?? ""} fill className="object-cover" />
            </div>
          ) : null}
          <div>
            <p className="horo-kicker">{localeKey === "ar" ? "ملف الفنان" : "Artist profile"}</p>
            <h1 className="mt-3 text-3xl font-semibold text-charcoal">{name}</h1>
            {artist.studio_location ? (
              <p className="mt-2 text-deep-umber">{artist.studio_location}</p>
            ) : null}
            {artist.collaboration_number != null ? (
              <p className="mt-2 text-sm text-burnt-sienna">
                {localeKey === "ar"
                  ? `التعاون رقم ${artist.collaboration_number}`
                  : `Collaboration #${artist.collaboration_number}`}
              </p>
            ) : null}
          </div>
        </div>
        {meaningQuote ? (
          <blockquote className="mt-6 rounded-radius-md border border-sandstone/60 bg-warm-linen p-4 text-deep-umber italic">
            {meaningQuote}
          </blockquote>
        ) : null}
        {bio ? (
          <p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-deep-umber">{bio}</p>
        ) : null}
      </article>
    </PageShell>
  );
}
