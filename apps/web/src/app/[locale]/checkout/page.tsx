import { setRequestLocale } from "next-intl/server";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string }> };

export default async function CheckoutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = locale === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(localeKey);

  return (
    <PageShell width="wide">
      <PageIntro
        title={copy.checkout.title}
        description={copy.checkout.description}
        eyebrow={localeKey === "ar" ? "الدفع" : "Checkout"}
        aside={(
          <p>
            {copy.common.finalPriceInclusive}
          </p>
        )}
      />
      <CheckoutForm className="mt-8" />
    </PageShell>
  );
}
