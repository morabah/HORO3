import { fallbackThemeCards } from "@/lib/content/fallback";
import { sanityClient } from "./client";

export interface SanityCollectionStory {
  _id: string;
  title_ar?: string;
  title_en?: string;
  slug?: { current: string };
  theme?: string;
  excerpt_ar?: string;
  excerpt_en?: string;
  body_ar?: string;
  body_en?: string;
  hero_image?: { asset?: { url?: string } };
  hero_video?: { asset?: { url?: string } };
  artists?: {
    _id: string;
    name_ar?: string;
    name_en?: string;
    slug?: { current: string };
  }[];
  medusa_collection_handle?: string;
  is_gift_collection?: boolean;
}

const collectionStoryFields = `
  _id,
  title_ar,
  title_en,
  slug,
  theme,
  excerpt_ar,
  excerpt_en,
  body_ar,
  body_en,
  hero_image,
  hero_video,
  medusa_collection_handle,
  is_gift_collection,
  artists[]->{
    _id,
    name_ar,
    name_en,
    slug
  }
`;

const fallbackStories: SanityCollectionStory[] = fallbackThemeCards.map((card) => ({
  _id: card.id,
  title_ar: card.title_ar,
  title_en: card.title_en,
  slug: { current: card.handle },
  theme: card.theme,
  excerpt_ar: card.description_ar,
  excerpt_en: card.description_en,
  body_ar: card.description_ar,
  body_en: card.description_en,
  medusa_collection_handle: card.handle,
  is_gift_collection: card.theme === "gift",
  hero_image: card.hero_image ? { asset: { url: card.hero_image } } : undefined,
  artists: [],
}));

export async function getCollectionStories(limit = 12): Promise<SanityCollectionStory[]> {
  try {
    const res = await sanityClient.fetch<SanityCollectionStory[]>(
      `*[_type == "collectionStory"] | order(title_en asc) [0...$limit] { ${collectionStoryFields} }`,
      { limit }
    );
    return res?.length ? res : fallbackStories;
  } catch {
    return fallbackStories;
  }
}

export async function getCollectionStoryByHandle(handle: string): Promise<SanityCollectionStory | null> {
  try {
    const res = await sanityClient.fetch<SanityCollectionStory | null>(
      `*[_type == "collectionStory" && medusa_collection_handle == $handle][0] { ${collectionStoryFields} }`,
      { handle }
    );
    return res ?? fallbackStories.find((story) => story.medusa_collection_handle === handle) ?? null;
  } catch {
    return fallbackStories.find((story) => story.medusa_collection_handle === handle) ?? null;
  }
}
