import { setRequestLocale } from "next-intl/server";
import { PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 300;

export default async function ExchangePolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = locale === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(localeKey);

  return (
    <PageShell width="default">
      <PageIntro
        title={copy.policies.exchangeTitle}
        description={localeKey === "ar" ? "سياسة واضحة بدون تعقيد أو لوم." : "A clear policy without friction or blame."}
        eyebrow={localeKey === "ar" ? "الخدمة" : "Service policy"}
      />
      <section className="mt-8 horo-frame-card p-6">
        <ul className="space-y-3 text-sm leading-7 text-deep-umber" role="list">
          {copy.policies.exchangeLines.map((line) => (
            <li key={line} className="rounded-radius-md border border-sandstone/50 bg-warm-linen px-4 py-3">
              {line}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
