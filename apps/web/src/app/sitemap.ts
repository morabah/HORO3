import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://horo.eg";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const paths = ["", "/collections", "/artists", "/gifts", "/stories", "/size-guide", "/cart", "/checkout", "/account", "/policies/exchange", "/policies/shipping", "/policies/privacy"];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    for (const path of paths) {
      entries.push({
        url: `${BASE}${prefix}${path || ""}`,
        lastModified: new Date(),
        changeFrequency: path ? "weekly" : "daily",
        priority: path ? 0.8 : 1,
      });
    }
  }
  return entries;
}
