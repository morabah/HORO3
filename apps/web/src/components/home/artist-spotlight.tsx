"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { SanityArtist } from "@/lib/sanity/queries";

interface ArtistSpotlightProps {
  locale: "ar" | "en";
  artists: SanityArtist[];
}

export function ArtistSpotlight({ locale, artists }: ArtistSpotlightProps) {
  return (
    <section className="py-12 bg-white/40" data-purpose="artist-carousel">
      <div className="px-4 mb-8">
        <h2 className="text-2xl font-bold text-charcoal flex items-center gap-2">
          {locale === "ar" ? "تعرف على فنانين هورو" : "Meet HORO Artists"}
          <span className="w-8 h-[2px] bg-burnt-sienna"></span>
        </h2>
      </div>
      <div className="flex overflow-x-auto gap-6 px-4 scrollbar-hide snap-x snap-mandatory">
        {artists.slice(0, 4).map((artist) => {
          const name =
            locale === "ar"
              ? artist.name_ar ?? artist.name_en
              : artist.name_en ?? artist.name_ar;
          const slug = artist.slug?.current ?? "artists";
          const portraitUrl = artist.portrait?.asset?.url || "/images/brand/artist-portrait.png";

          return (
            <div key={artist._id} className="min-w-[280px] snap-center bg-warm-linen p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={portraitUrl}
                  alt={name ?? "HORO artist"}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full border-2 border-burnt-sienna object-cover"
                />
                <div>
                  <p className="font-bold text-lg">{name}</p>
                  <p className="text-xs text-burnt-sienna font-medium">Visual Artist</p>
                </div>
              </div>
              
              <div className="aspect-video bg-charcoal/10 rounded mb-4 flex items-center justify-center overflow-hidden">
                <svg className="w-10 h-10 text-charcoal/30" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>

              <Link
                href={`/artists/${slug}`}
                className="text-burnt-sienna font-bold border-b border-burnt-sienna pb-1 text-sm inline-block"
              >
                {locale === "ar" ? "تصفح مجموعة الفنان" : "View Artist Collection"}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
