import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LocaleAttributes } from "@/components/providers/locale-attributes";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import { getSiteSettings } from "@/lib/sanity/site-settings";
import { buildLocaleMetadata, getLocalizedSiteTagline } from "@/lib/site/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = locale === "en" ? "en" : "ar";
  const siteSettings = await getSiteSettings();

  return buildLocaleMetadata(siteSettings, localeKey);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "ar" | "en")) notFound();
  setRequestLocale(locale);

  const [messages, siteSettings] = await Promise.all([
    getMessages(),
    getSiteSettings(),
  ]);
  const localeKey = locale === "en" ? "en" : "ar";
  const tagline = getLocalizedSiteTagline(siteSettings, localeKey);
  const skipToMainContent = localeKey === "ar" ? "انتقل إلى المحتوى الرئيسي" : "Skip to main content";

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleAttributes />
      <MetaPixel />
      <PostHogProvider>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-burnt-sienna focus:text-warm-linen focus:rounded-md">
          {skipToMainContent}
        </a>
        <div className="flex min-h-screen flex-col">
          <div className="flex flex-1 flex-col w-full">{children}</div>
        </div>
      </PostHogProvider>
    </NextIntlClientProvider>
  );
}
