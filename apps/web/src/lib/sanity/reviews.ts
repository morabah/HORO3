import { sanityClient } from "./client";

export interface SanityReview {
  _id: string;
  author_name?: string;
  rating?: number;
  body_ar?: string;
  body_en?: string;
  ugc_photo?: { asset?: { url?: string } };
  product_ref?: string;
  featured?: boolean;
}

export async function getReviewsForProduct(
  productRef: string,
  locale: "ar" | "en",
  limit = 5
): Promise<SanityReview[]> {
  const res = await sanityClient.fetch<SanityReview[]>(
    `*[_type == "review" && product_ref == $productRef] | order(_createdAt desc) [0...$limit] {
      _id, author_name, rating, body_ar, body_en, "ugc_photo": ugc_photo { "asset": asset->{url} }, featured
    }`,
    { productRef, limit }
  );
  return res ?? [];
}

export async function getFeaturedReviews(locale: "ar" | "en", limit = 6): Promise<SanityReview[]> {
  const res = await sanityClient.fetch<SanityReview[]>(
    `*[_type == "review" && featured == true] | order(_createdAt desc) [0...$limit] {
      _id, author_name, rating, body_ar, body_en, "ugc_photo": ugc_photo { "asset": asset->{url} }
    }`,
    { limit }
  );
  return res ?? [];
}
