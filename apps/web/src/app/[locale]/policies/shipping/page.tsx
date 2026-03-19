import { setRequestLocale } from "next-intl/server";
import { getSiteSettings } from "@/lib/sanity/site-settings";
import { PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 300;

export default async function ShippingPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = locale === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(localeKey);
  const settings = await getSiteSettings();
  const shippingCopy =
    localeKey === "ar"
      ? settings.shipping_copy_ar ?? "شحن داخل مصر مع تتبع على واتساب وتأكيد COD قبل الإرسال."
      : settings.shipping_copy_en ?? "Shipping across Egypt with WhatsApp tracking and COD confirmation before dispatch.";
  const prepaidCopy =
    localeKey === "ar"
      ? settings.prepaid_shipping_copy_ar ?? "الطلبات المدفوعة أونلاين تحصل على شحن مجاني."
      : settings.prepaid_shipping_copy_en ?? "Prepaid orders qualify for free shipping.";

  return (
    <PageShell width="default">
      <PageIntro
        title={copy.policies.shippingTitle}
        description={shippingCopy}
        eyebrow={localeKey === "ar" ? "التوصيل" : "Delivery policy"}
        aside={<p>{prepaidCopy}</p>}
      />
    </PageShell>
  );
}
