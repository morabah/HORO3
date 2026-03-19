import { sanityClient } from "./client";

export interface SanityArtist {
  _id: string;
  name_ar?: string;
  name_en?: string;
  slug?: { current: string };
  portrait?: { asset?: { url?: string } };
  bio_ar?: string;
  bio_en?: string;
  studio_location?: string;
  meaning_quote_ar?: string;
  meaning_quote_en?: string;
  collaboration_number?: number;
  bts_video?: { asset?: { url?: string } };
  featured?: boolean;
}

const artistFields = `
  _id,
  name_ar,
  name_en,
  slug,
  portrait,
  bio_ar,
  bio_en,
  studio_location,
  meaning_quote_ar,
  meaning_quote_en,
  collaboration_number,
  bts_video,
  featured
`;

const mockArtists: SanityArtist[] = [
  {
    _id: "artist_sara_emad",
    name_ar: "سارة عماد",
    name_en: "Sara Emad",
    slug: { current: "sara-emad" },
    portrait: { asset: { url: "/images/brand/artist-portrait.png" } },
    studio_location: "Zamalek, Cairo",
    featured: true,
  }
];

export async function getArtists(): Promise<SanityArtist[]> {
  return mockArtists;
  try {
    const res = await sanityClient.fetch<SanityArtist[]>(
      `*[_type == "artist"] | order(name_en asc) { ${artistFields} }`
    );
    return res?.length ? res : mockArtists;
  } catch {
    return mockArtists;
  }
}

export async function getFeaturedArtists(limit = 3): Promise<SanityArtist[]> {
  try {
    const res = await sanityClient.fetch<SanityArtist[]>(
      `*[_type == "artist" && featured == true] | order(name_en asc) [0...$limit] { ${artistFields} }`,
      { limit }
    );
    return res?.length ? res : mockArtists.slice(0, limit);
  } catch {
    return mockArtists.slice(0, limit);
  }
}

export async function getArtistBySlug(slug: string): Promise<SanityArtist | null> {
  try {
    const res = await sanityClient.fetch<SanityArtist | null>(
      `*[_type == "artist" && slug.current == $slug][0] { ${artistFields} }`,
      { slug }
    );
    return res ?? mockArtists.find((a) => a.slug?.current === slug) ?? null;
  } catch {
    return mockArtists.find((a) => a.slug?.current === slug) ?? null;
  }
}

export async function getArtistById(id: string): Promise<SanityArtist | null> {
  try {
    const res = await sanityClient.fetch<SanityArtist | null>(
      `*[_type == "artist" && _id == $id][0] { ${artistFields} }`,
      { id }
    );
    return res ?? mockArtists.find((a) => a._id === id) ?? null;
  } catch {
    return mockArtists.find((a) => a._id === id) ?? null;
  }
}
