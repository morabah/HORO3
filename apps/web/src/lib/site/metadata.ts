import type { Metadata } from "next";

export type SiteMetadataLocale = "ar" | "en";

export interface SiteMetadataSettings {
  title?: string;
  description?: string;
  description_ar?: string;
  description_en?: string;
  tagline_ar?: string;
  tagline_en?: string;
}

const DEFAULT_SITE_NAME = "HORO";
const DEFAULT_TAGLINES: Record<SiteMetadataLocale, string> = {
  ar: "ارتدِ ما تقصده",
  en: "Wear What You Mean",
};
const DEFAULT_DESCRIPTIONS: Record<SiteMetadataLocale, string> = {
  ar: "تيشيرتات برسومات أصلية من مصر، مرتبة حول المزاج والشخصية والثقافة والعمل والمشاعر.",
  en: "Original illustrated T-shirts from Egypt, organized around mood, personality, culture, career, and emotion.",
};

function firstDefined(...values: Array<string | undefined | null>) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}

export function getLocalizedSiteTagline(
  settings: SiteMetadataSettings,
  locale: SiteMetadataLocale
) {
  return locale === "ar"
    ? firstDefined(settings.tagline_ar, settings.tagline_en, DEFAULT_TAGLINES.ar)
    : firstDefined(settings.tagline_en, settings.tagline_ar, DEFAULT_TAGLINES.en);
}

export function getLocalizedSiteDescription(
  settings: SiteMetadataSettings,
  locale: SiteMetadataLocale
) {
  return locale === "ar"
    ? firstDefined(
        settings.description_ar,
        settings.description_en,
        settings.description,
        DEFAULT_DESCRIPTIONS.ar
      )
    : firstDefined(
        settings.description_en,
        settings.description_ar,
        settings.description,
        DEFAULT_DESCRIPTIONS.en
      );
}

export function buildLocaleMetadata(
  settings: SiteMetadataSettings,
  locale: SiteMetadataLocale
): Metadata {
  const siteName = firstDefined(settings.title, DEFAULT_SITE_NAME) ?? DEFAULT_SITE_NAME;
  const tagline = getLocalizedSiteTagline(settings, locale) ?? DEFAULT_TAGLINES[locale];
  const description = getLocalizedSiteDescription(settings, locale) ?? DEFAULT_DESCRIPTIONS[locale];
  const siteTitle = `${siteName} | ${tagline}`;

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteName}`,
    },
    description,
    openGraph: {
      title: siteTitle,
      description,
      siteName,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
      images: ["/brand/horo-frame.svg"],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description,
      images: ["/brand/horo-frame.svg"],
    },
  };
}
