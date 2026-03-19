import { sanityClient } from "./client";

export interface SanityStory {
  _id: string;
  title_ar?: string;
  title_en?: string;
  slug?: { current: string };
  body_ar?: string;
  body_en?: string;
  cover_image?: { asset?: { url?: string } };
  published_at?: string;
}

const storyFields = `
  _id,
  title_ar,
  title_en,
  slug,
  body_ar,
  body_en,
  cover_image,
  published_at
`;

const mockStories: SanityStory[] = [
  {
    _id: "story_1",
    title_ar: "قصة مجموعة الهوية",
    title_en: "Identity Collection Story",
    slug: { current: "identity-story" },
    cover_image: { asset: { url: "/images/brand/collection-identity.png" } },
    published_at: "2026-03-01T00:00:00Z",
  },
  {
    _id: "story_2",
    title_ar: "خلف كواليس سارة عماد",
    title_en: "Behind the Scenes with Sara Emad",
    slug: { current: "bts-sara-emad" },
    cover_image: { asset: { url: "/images/brand/artist-portrait.png" } },
    published_at: "2026-03-10T00:00:00Z",
  },
];

export async function getStories(limit = 20): Promise<SanityStory[]> {
  try {
    const res = await sanityClient.fetch<SanityStory[]>(
      `*[_type == "story"] | order(published_at desc) [0...$limit] { ${storyFields} }`,
      { limit }
    );
    return res?.length ? res : mockStories.slice(0, limit);
  } catch {
    return mockStories.slice(0, limit);
  }
}

export async function getStoryBySlug(slug: string): Promise<SanityStory | null> {
  try {
    const res = await sanityClient.fetch<SanityStory | null>(
      `*[_type == "story" && slug.current == $slug][0] { ${storyFields} }`,
      { slug }
    );
    return res ?? mockStories.find((s) => s.slug?.current === slug) ?? null;
  } catch {
    return mockStories.find((s) => s.slug?.current === slug) ?? null;
  }
}
