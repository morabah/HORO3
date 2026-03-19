import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { OrderSummary } from "@/components/order/order-summary";
import { PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string }> };

export default async function AccountOrdersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = locale === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(localeKey);

  return (
    <PageShell width="default">
      <PageIntro
        title={copy.account.ordersTitle}
        description={copy.account.ordersDescription}
        eyebrow={localeKey === "ar" ? "ملفات الطلب" : "Order snapshots"}
      />
      <div className="mt-8">
        <OrderSummary orderId="latest" />
      </div>
      <Link href="/account" className="mt-4 inline-block text-burnt-sienna hover:underline">
        {copy.common.backToAccount}
      </Link>
    </PageShell>
  );
}
