import { setRequestLocale } from "next-intl/server";
import { EventTracker } from "@/components/analytics/event-tracker";
import { PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 300;

export default async function SizeGuidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = locale === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(localeKey);

  return (
    <PageShell width="default">
      <EventTracker event="size_guide_opened" payload={{ from: "size_guide_page" }} />
      <PageIntro
        title={copy.sizeGuide.title}
        description={copy.sizeGuide.description}
        eyebrow={localeKey === "ar" ? "المقاس" : "Fit guidance"}
        aside={(
          <div className="space-y-3">
            <p className="font-semibold text-charcoal">{copy.sizeGuide.howToMeasureTitle}</p>
            <p>{copy.sizeGuide.howToMeasureBody}</p>
          </div>
        )}
      />
      <div className="mt-8 overflow-hidden rounded-radius-lg border border-sandstone/60 bg-true-white">
        <table className="w-full text-sm text-charcoal">
          <thead className="bg-parchment">
            <tr>
              <th className="border-b border-sandstone/60 p-3 text-start">Size</th>
              <th className="border-b border-sandstone/60 p-3 text-start">Chest (cm)</th>
              <th className="border-b border-sandstone/60 p-3 text-start">Length (cm)</th>
              <th className="border-b border-sandstone/60 p-3 text-start">Shoulder (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border-b border-sandstone/40 p-3">S</td><td className="border-b border-sandstone/40 p-3">96-100</td><td className="border-b border-sandstone/40 p-3">68</td><td className="border-b border-sandstone/40 p-3">44</td></tr>
            <tr><td className="border-b border-sandstone/40 p-3">M</td><td className="border-b border-sandstone/40 p-3">100-104</td><td className="border-b border-sandstone/40 p-3">70</td><td className="border-b border-sandstone/40 p-3">46</td></tr>
            <tr><td className="border-b border-sandstone/40 p-3">L</td><td className="border-b border-sandstone/40 p-3">104-108</td><td className="border-b border-sandstone/40 p-3">72</td><td className="border-b border-sandstone/40 p-3">48</td></tr>
            <tr><td className="border-b border-sandstone/40 p-3">XL</td><td className="border-b border-sandstone/40 p-3">108-112</td><td className="border-b border-sandstone/40 p-3">74</td><td className="border-b border-sandstone/40 p-3">50</td></tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6 horo-frame-card p-5 text-sm leading-7 text-deep-umber">
        {copy.sizeGuide.fitTip}
      </div>
    </PageShell>
  );
}
