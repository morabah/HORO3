"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { SanityArtist } from "@/lib/sanity/queries";

interface ArtistCardProps {
  artist: SanityArtist;
  locale: "ar" | "en";
}

export function ArtistCard({ artist, locale }: ArtistCardProps) {
  const name = locale === "ar" ? artist.name_ar ?? artist.name_en : artist.name_en ?? artist.name_ar;
  const slug = artist.slug?.current ?? artist._id;
  const portraitUrl = artist.portrait?.asset?.url;

  return (
    <Link
      href={`/artists/${slug}`}
      className="group block overflow-hidden transition-all horo-frame-card"
    >
      <div className="relative aspect-[4/5] bg-parchment overflow-hidden">
        {portraitUrl ? (
          <Image
            src={portraitUrl}
            alt={name ?? ""}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-sandstone/70">
            <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {locale === "ar" ? "عرض المزيد" : "View"}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h2 className="font-semibold text-charcoal">{name}</h2>
        {artist.studio_location && (
          <p className="mt-1 text-sm text-deep-umber">{artist.studio_location}</p>
        )}
        <div className="mt-6 flex items-center justify-end text-sm">
          <span className="text-burnt-sienna underline-offset-4 decoration-burnt-sienna/50 transition-all hover:underline hover:decoration-burnt-sienna">
            {locale === "ar" ? "أعمال الفنان" : "View Artist"}
          </span>
        </div>
      </div>
    </Link>
  );
}
