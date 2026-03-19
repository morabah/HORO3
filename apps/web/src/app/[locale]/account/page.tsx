import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { AccountOverview } from "@/components/account/account-overview";
import { PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string }> };

export default async function AccountPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = locale === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(localeKey);

  return (
    <PageShell width="default">
      <PageIntro
        title={copy.account.title}
        description={copy.account.description}
        eyebrow={localeKey === "ar" ? "الحساب" : "Account"}
      />
      <div className="mt-8">
        <AccountOverview />
      </div>
      <Link
        href="/account/orders"
        className="mt-6 inline-block text-burnt-sienna font-medium hover:underline"
      >
        {copy.account.viewOrders}
      </Link>
    </PageShell>
  );
}
