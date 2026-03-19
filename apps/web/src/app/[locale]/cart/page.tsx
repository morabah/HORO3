import { setRequestLocale } from "next-intl/server";
import { CartView } from "@/components/cart/cart-view";
import { PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string }> };

export default async function CartPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = locale === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(localeKey);

  return (
    <PageShell width="wide">
      <PageIntro
        title={copy.cart.title}
        description={copy.cart.description}
        eyebrow={localeKey === "ar" ? "من الاختيار إلى الدفع" : "From selection to checkout"}
        aside={(
          <p>
            {copy.cart.codNote}
          </p>
        )}
      />
      <div className="mt-8">
        <CartView />
      </div>
    </PageShell>
  );
}
