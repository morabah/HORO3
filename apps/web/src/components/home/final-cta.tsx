"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

interface FinalCtaProps {
  locale: "ar" | "en";
}

export function FinalCta({ locale }: FinalCtaProps) {
  return (
    <section className="horo-home-section">
      <div className="overflow-hidden rounded-[28px] border border-sandstone/35">
        <div className="grid md:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col items-center justify-center p-8 text-center md:items-start md:p-14 md:text-start">
            <p className="horo-kicker">
              {locale === "ar" ? "ابدأ من هنا" : "Start here"}
            </p>
            <h2 className="mt-4 max-w-md text-xl font-bold tracking-tight text-charcoal md:text-2xl">
              {locale === "ar"
                ? "كل قطعة بتحكي قصة.\nاكتشف اللي بتحسها."
                : "Every piece tells a story.\nFind the one that speaks to you."}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-deep-umber/75">
              {locale === "ar"
                ? "رسومات أصلية من فنانين مصريين. قماش يستاهل. خدمة بالعربي."
                : "Original illustration by Egyptian artists. Fabric worth keeping. Arabic-first service."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="default" size="lg">
                <Link href="/collections">
                  {locale === "ar" ? "تسوّق الآن" : "Shop now"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/gifts">
                  {locale === "ar" ? "هدايا جاهزة" : "Gift sets"}
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden aspect-[3/4] md:block">
            <Image
              src="/images/brand/lifestyle-mood.png"
              alt={locale === "ar" ? "تيشيرت هورو في الحياة اليومية" : "HORO tee in everyday life"}
              fill
              className="object-cover"
              sizes="320px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
