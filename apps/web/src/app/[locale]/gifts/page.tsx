import { setRequestLocale } from "next-intl/server";
import { getSiteSettings } from "@/lib/sanity/site-settings";
import { PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";
import { formatEgp } from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

export default async function GiftsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";
  const copy = getStorefrontCopy(localeKey);
  const settings = await getSiteSettings();
  const giftFee = (settings.gift_packaging_fee_egp ?? 30) * 100;

  return (
    <PageShell width="default">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <PageIntro
          title={copy.gifts.title}
          description={copy.gifts.description}
          eyebrow={localeKey === "ar" ? "الإهداء" : "Gift-ready service"}
          aside={(
            <p>
              {localeKey === "ar"
                ? `ترقية الهدية الحالية: ${formatEgp(giftFee, localeKey)}`
                : `Current gift upgrade: ${formatEgp(giftFee, localeKey)}`}
            </p>
          )}
          className="h-full"
        />
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-radius-lg border border-sandstone/30 bg-parchment lg:aspect-auto lg:h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/gift-packaging.png"
            alt="HORO Premium Gift Packaging"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <article className="horo-frame-card p-6">
          <h2 className="text-lg font-semibold text-charcoal">{copy.gifts.standardOrder}</h2>
          <p className="mt-3 text-sm leading-7 text-deep-umber">{copy.gifts.standardBody}</p>
        </article>
        <article className="horo-paper-panel p-6">
          <h2 className="text-lg font-semibold text-charcoal">{copy.gifts.giftUpgrade}</h2>
          <p className="mt-3 text-sm leading-7 text-deep-umber">{copy.gifts.giftUpgradeBody}</p>
        </article>
        <article className="horo-frame-card p-6">
          <h2 className="text-lg font-semibold text-charcoal">{copy.gifts.giftCriteria}</h2>
          <p className="mt-3 text-sm leading-7 text-deep-umber">{copy.gifts.giftCriteriaBody}</p>
        </article>
      </div>
    </PageShell>
  );
}
