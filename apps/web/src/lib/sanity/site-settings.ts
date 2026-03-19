import { fallbackSiteSettings } from "@/lib/content/fallback";
import { sanityClient } from "./client";

export interface SiteSettings {
  title?: string;
  description?: string;
  description_ar?: string;
  description_en?: string;
  tagline_ar?: string;
  tagline_en?: string;
  whatsapp_number?: string;
  support_email?: string;
  instagram_url?: string;
  gift_packaging_fee_egp?: number;
  prepaid_shipping_copy_ar?: string;
  prepaid_shipping_copy_en?: string;
  shipping_copy_ar?: string;
  shipping_copy_en?: string;
  size_recommendation_matrix?: {
    size: string;
    min_height_cm: number;
    max_height_cm: number;
    min_weight_kg: number;
    max_weight_kg: number;
  }[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await sanityClient.fetch<SiteSettings | null>(
      `*[_type == "siteSettings"][0]{
        title,
        description,
        description_ar,
        description_en,
        tagline_ar,
        tagline_en,
        whatsapp_number,
        support_email,
        instagram_url,
        gift_packaging_fee_egp,
        prepaid_shipping_copy_ar,
        prepaid_shipping_copy_en,
        shipping_copy_ar,
        shipping_copy_en,
        size_recommendation_matrix
      }`
    );
    return { ...fallbackSiteSettings, ...(res ?? {}) };
  } catch {
    return fallbackSiteSettings;
  }
}
