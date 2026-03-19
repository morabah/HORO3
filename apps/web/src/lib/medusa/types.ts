/**
 * Medusa + HORO product types (Visual Identity V1.0)
 * Product images use tags: front_on_body, back_on_body, macro_print_closeup, fabric_tag_detail, flat_lay_context, lifestyle_mood
 */

export type ProductImageTag =
  | "front_on_body"
  | "back_on_body"
  | "macro_print_closeup"
  | "fabric_tag_detail"
  | "flat_lay_context"
  | "lifestyle_mood";

export type ProductComplianceReason =
  | "missing_artist_attribution"
  | "missing_fabric_composition"
  | "missing_fabric_weight_gsm"
  | "missing_print_method"
  | "missing_wash_test"
  | "missing_model_stats"
  | "missing_front_on_body"
  | "missing_back_on_body"
  | "missing_macro_print_closeup"
  | "missing_fabric_tag_detail"
  | "missing_flat_lay_context"
  | "missing_lifestyle_mood";

export type PriceTier = "core" | "limited_drop" | "gift_bundle";

export interface ModelStat {
  height_cm: number;
  weight_kg: number;
  size_worn: string;
  gender_presentation: "male" | "female";
}

export interface ProductImage {
  id: string;
  url: string;
  metadata?: { tag?: ProductImageTag };
}

export interface ProductCompliance {
  requiredShotsComplete: boolean;
  requiredProofComplete: boolean;
  hasArtistAttribution: boolean;
  hasModelStats: boolean;
  canPurchase: boolean;
  blockingReasons: ProductComplianceReason[];
}

export interface ProductVariant {
  id: string;
  title: string;
  prices: { amount: number; currency_code: string }[];
  options: { value: string }[];
  inventory_quantity?: number;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  thumbnail?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  collection_id?: string;
  collection?: { id: string; title: string; handle: string };
  metadata?: {
    artist_id?: string;
    artist_name_ar?: string;
    artist_name_en?: string;
    title_ar?: string;
    title_en?: string;
    description_ar?: string;
    description_en?: string;
    collection_story_id?: string;
    fabric_composition?: string;
    fabric_weight_gsm?: number;
    print_method?: string;
    care_instructions?: string[];
    is_limited_edition?: boolean;
    edition_size?: number;
    drop_date?: string;
    is_giftable?: boolean;
    price_tier?: PriceTier;
    model_stats?: ModelStat[];
    wash_test_verified?: boolean;
    fit_type?: string;
    fit_type_ar?: string;
    fit_type_en?: string;
  };
  compliance?: ProductCompliance;
}

export interface ProductCategory {
  id: string;
  name: string;
  handle: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  products?: T[];
  count: number;
  offset: number;
  limit: number;
}
