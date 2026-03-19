"use client";

interface HomePalimpsestProps {
  locale: "ar" | "en";
}

import Image from "next/image";

// Temporary static images
const mUGC = [
  "/images/brand/hero-flatlay.png",
  "/images/brand/lifestyle-mood.png",
  "/images/brand/artist-portrait.png",
  "/images/brand/gift-packaging.png",
];

export function HomePalimpsest({ locale }: HomePalimpsestProps) {
  return (
    <section className="py-12 px-4" data-purpose="ugc-masonry">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold text-charcoal mb-2 ${locale === "ar" ? "font-sans-rtl" : "font-sans"}`}>
          {locale === "ar" ? "شيل الفن معاك" : "Carry the Art"}
        </h2>
        <p className="text-charcoal/60">
          {locale === "ar" ? "من قبل المجتمع" : "Tagged by the community"}
        </p>
      </div>

      <div className="columns-2 gap-[12px]">
        {mUGC.map((imgSrc, index) => (
          <div key={index} className="mb-[12px] break-inside-avoid">
            <Image
              src={imgSrc}
              alt="Customer Wearing HORO"
              width={400}
              height={500}
              className="w-full rounded-sm object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a 
          href="https://instagram.com/horo.eg" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold text-charcoal border border-charcoal/20 px-6 py-3 rounded-full hover:bg-warm-linen transition-colors"
        >
          <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
          Follow @HORO.EG
        </a>
      </div>
    </section>
  );
}
