import { setRequestLocale } from "next-intl/server";
import { getSiteSettings } from "@/lib/sanity/site-settings";
import { PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 300;

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = locale === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(localeKey);
  const settings = await getSiteSettings();

  return (
    <PageShell width="default">
      <PageIntro
        title={copy.policies.privacyTitle}
        description={copy.policies.privacyBody}
        eyebrow={localeKey === "ar" ? "البيانات" : "Data policy"}
        aside={settings.support_email ? (
          <p>
            {copy.policies.privacyContact}: {settings.support_email}
          </p>
        ) : undefined}
      />
    </PageShell>
  );
}
