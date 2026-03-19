/**
 * filter-config.ts — Schema-driven filter/sort configuration for collection pages.
 * Single source of truth for product filters.
 */

export type FilterType = "multi-select" | "range" | "swatch";

export interface FilterDefinition {
  key: string;
  type: FilterType;
  /** Options for multi-select and swatch filters */
  options?: string[];
  /** Range config for range filters */
  range?: { min: number; max: number; step: number; unit: string };
}

export const collectionFilters: FilterDefinition[] = [
  {
    key: "size",
    type: "multi-select",
    options: ["S", "M", "L", "XL", "XXL"],
  },
  {
    key: "artist",
    type: "multi-select",
    // Options populated dynamically from Sanity artists
  },
  {
    key: "price",
    type: "range",
    range: { min: 500, max: 1500, step: 50, unit: "EGP" },
  },
  {
    key: "theme",
    type: "multi-select",
    options: ["identity", "emotion", "career", "culture", "portraits"],
  },
  {
    key: "color",
    type: "swatch",
    options: ["black", "white", "off-white"],
  },
];

export type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

export const sortOptions: SortOption[] = [
  "featured",
  "newest",
  "price-asc",
  "price-desc",
];
