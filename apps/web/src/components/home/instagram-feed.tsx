"use client";

import Image from "next/image";

interface InstagramFeedProps {
  locale: "ar" | "en";
}

/**
 * Static Instagram feed section.
 * Uses placeholder images initially — future: Instagram Basic Display API.
 */
const FEED_IMAGES = [
  { src: "/images/brand/hero-flatlay.png", alt: "HORO tee flat lay" },
  { src: "/images/brand/macro-print.png", alt: "HORO macro print detail" },
  { src: "/images/brand/gift-packaging.png", alt: "HORO gift packaging" },
  { src: "/images/brand/lifestyle-mood.png", alt: "HORO lifestyle" },
  { src: "/images/brand/artist-portrait.png", alt: "HORO artist" },
  { src: "/images/brand/collection-identity.png", alt: "Identity collection" },
];

export function InstagramFeed({ locale }: InstagramFeedProps) {
  return (
    <section className="horo-home-section">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="horo-kicker">@horo.eg</p>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-charcoal md:text-2xl">
            {locale === "ar" ? "شوفها على الناس" : "See it styled"}
          </h2>
        </div>
        <a
          href="https://instagram.com/horo.eg"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-burnt-sienna hover:underline"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          {locale === "ar" ? "تابعنا على إنستجرام" : "Follow on Instagram"}
        </a>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
        {FEED_IMAGES.map((img) => (
          <a
            key={img.src}
            href="https://instagram.com/horo.eg"
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden rounded-[16px] border border-sandstone/30 bg-parchment/40"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 33vw, 16vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors group-hover:bg-charcoal/20">
              <svg
                className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
