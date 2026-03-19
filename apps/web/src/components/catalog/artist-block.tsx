"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";

interface ArtistBlockProps {
  name: string;
  href: string;
  locale: "ar" | "en";
  portraitUrl?: string | null;
  bio?: string | null;
  studioLocation?: string | null;
  btsVideoUrl?: string | null;
}

export function ArtistBlock({
  name,
  href,
  locale,
  portraitUrl,
  bio,
  studioLocation,
  btsVideoUrl,
}: ArtistBlockProps) {
  return (
    <div className="horo-paper-panel p-5">
      <div className="flex gap-4">
        {portraitUrl && (
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 bg-parchment">
            <Image
              src={portraitUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="min-w-0">
          <p className="horo-kicker">{locale === "ar" ? "الفنان" : "The artist"}</p>
          <Link
            href={href}
            className="mt-2 inline-flex text-lg font-semibold text-charcoal hover:text-burnt-sienna"
          >
            {name}
          </Link>
          {studioLocation && (
            <p className="text-sm text-deep-umber mt-0.5">{studioLocation}</p>
          )}
          {bio && (
            <p className="text-sm leading-7 text-deep-umber mt-3 line-clamp-4">{bio}</p>
          )}
          {btsVideoUrl && (
          <div className="mt-4 rounded-xl overflow-hidden bg-black/5 max-w-sm">
            <video
              src={btsVideoUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-[4/5] object-cover"
              poster={portraitUrl || undefined}
            />
            <div className="p-3 bg-warm-linen/50 backdrop-blur-sm border-t border-sandstone/10">
              <p className="text-xs font-semibold tracking-wide text-charcoal">
                {locale === "ar" ? "الفنان في الأستوديو 🎥" : "Studio process 🎥"}
              </p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
