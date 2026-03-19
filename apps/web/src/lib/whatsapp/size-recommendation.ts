import { fallbackSizeMatrix } from "@/lib/content/fallback";
import { getSiteSettings } from "@/lib/sanity/site-settings";

export interface SizeRecommendation {
  size: string;
  heightCm: number;
  weightKg: number;
}

export function parseHeightWeightMessage(text: string) {
  const numbers = text.match(/\d{2,3}/g)?.map(Number) ?? [];
  if (numbers.length < 2) return null;

  const plausible = numbers.filter((value) => value >= 35 && value <= 230);
  if (plausible.length < 2) return null;

  const [first, second] = plausible;
  const maybeHeight = first > second ? first : second;
  const maybeWeight = first > second ? second : first;

  if (maybeHeight < 140 || maybeHeight > 220 || maybeWeight < 35 || maybeWeight > 180) {
    return null;
  }

  return {
    heightCm: maybeHeight,
    weightKg: maybeWeight,
  };
}

export async function recommendSizeFromMessage(text: string): Promise<SizeRecommendation | null> {
  const parsed = parseHeightWeightMessage(text);
  if (!parsed) return null;

  const settings = await getSiteSettings();
  const matrix = settings.size_recommendation_matrix?.length
    ? settings.size_recommendation_matrix
    : fallbackSizeMatrix;

  const rule = matrix.find((entry) => (
    parsed.heightCm >= entry.min_height_cm &&
    parsed.heightCm <= entry.max_height_cm &&
    parsed.weightKg >= entry.min_weight_kg &&
    parsed.weightKg <= entry.max_weight_kg
  ));

  if (!rule) return null;

  return {
    size: rule.size,
    heightCm: parsed.heightCm,
    weightKg: parsed.weightKg,
  };
}

export function isConfirmationText(text: string) {
  const normalized = text.trim().toLowerCase();
  return ["تم", "confirmed", "confirm", "تأكيد", "ok", "okay"].some((token) => normalized.includes(token));
}
