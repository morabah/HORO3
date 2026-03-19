"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import type { SanityCollectionStory } from "@/lib/sanity/collection-stories";

interface HomeHeroProps {
  locale: "ar" | "en";
  featuredStory?: SanityCollectionStory | null;
}

export function HomeHero({ locale, featuredStory }: HomeHeroProps) {
  const title = locale === "ar" ? "الفن اللي بتلبسه" : "Art You Wear";
  const subtitle =
    locale === "ar"
      ? "رسومات أصلية من فنانين مصريين\nعلى قطن مصري ثقيل وفاخر."
      : "Original illustrations by Egyptian artists\non premium heavy cotton.";

  return (
    <section className="relative h-[80vh] w-full overflow-hidden" data-purpose="hero-banner">
      {/* Background Image */}
      <Image
        src="/images/brand/hero-flatlay.png"
        alt={locale === "ar" ? "الفن اللي بتلبسه" : "Model wearing HORO art-wear in Cairo"}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-black/10 to-black/60 p-8 text-white">
        <motion.h2
          className={`mb-4 text-4xl font-bold leading-tight ${locale === "ar" ? "font-sans-rtl" : "font-sans"}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className={`mb-8 max-w-xs whitespace-pre-line text-lg font-light opacity-90 ${locale === "ar" ? "font-sans-rtl" : "font-sans"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <Link
            href="/collections"
            className={`block rounded-sm bg-burnt-sienna px-8 py-4 text-center text-lg font-bold text-warm-linen shadow-lg transition-transform active:scale-95 ${locale === "ar" ? "font-sans-rtl" : "font-sans"}`}
          >
            {locale === "ar" ? "تسوق الكولكشن" : "Shop the Collection"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
