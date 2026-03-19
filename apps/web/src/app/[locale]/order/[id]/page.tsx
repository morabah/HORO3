import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { OrderSummary } from "@/components/order/order-summary";
import { PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function OrderPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const localeKey = locale === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(localeKey);

  return (
    <PageShell width="narrow">
      <PageIntro
        title={copy.order.title}
        description={copy.order.description}
        eyebrow={localeKey === "ar" ? "بعد الدفع" : "After checkout"}
        aside={(
          <p>
            {copy.order.codNote}
          </p>
        )}
      />
      <div className="mt-8">
        <OrderSummary orderId={id} />
      </div>
      <Button asChild className="mt-6">
        <Link href="/collections">{copy.common.continueShopping}</Link>
      </Button>
    </PageShell>
  );
}
