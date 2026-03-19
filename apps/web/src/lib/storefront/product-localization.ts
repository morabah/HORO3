import type { Product } from "../medusa/types";

export type ProductLocale = "ar" | "en";

const FIT_TRANSLATIONS: Record<string, Record<ProductLocale, string>> = {
  oversized: { ar: "واسعة", en: "Oversized" },
  regular: { ar: "قياسية", en: "Regular" },
  relaxed: { ar: "مريحة", en: "Relaxed" },
  boxy: { ar: "بوكسية", en: "Boxy" },
  slim: { ar: "محددة", en: "Slim" },
  cropped: { ar: "قصيرة", en: "Cropped" },
};

function firstDefined(...values: Array<string | undefined | null>) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}

function getFitTranslation(value: string | undefined, locale: ProductLocale) {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase().replace(/[\s-]+/g, "_");
  return FIT_TRANSLATIONS[normalized]?.[locale] ?? value;
}

export function getLocalizedProductTitle(product: Product, locale: ProductLocale) {
  const metadata = product.metadata;
  return locale === "ar"
    ? firstDefined(metadata?.title_ar, metadata?.title_en, product.title)
    : firstDefined(metadata?.title_en, metadata?.title_ar, product.title);
}

export function getLocalizedProductDescription(product: Product, locale: ProductLocale) {
  const metadata = product.metadata;
  return locale === "ar"
    ? firstDefined(metadata?.description_ar, metadata?.description_en, product.description)
    : firstDefined(metadata?.description_en, metadata?.description_ar, product.description);
}

export function getLocalizedArtistName(product: Product, locale: ProductLocale) {
  const metadata = product.metadata;
  return locale === "ar"
    ? firstDefined(metadata?.artist_name_ar, metadata?.artist_name_en)
    : firstDefined(metadata?.artist_name_en, metadata?.artist_name_ar);
}

export function getLocalizedFitType(product: Product, locale: ProductLocale) {
  const metadata = product.metadata;
  const explicit = locale === "ar"
    ? firstDefined(metadata?.fit_type_ar, getFitTranslation(metadata?.fit_type, "ar"))
    : firstDefined(metadata?.fit_type_en, metadata?.fit_type, getFitTranslation(metadata?.fit_type_ar, "en"));

  return explicit;
}
