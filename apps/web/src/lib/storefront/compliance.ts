import type {
  Product,
  ProductCompliance,
  ProductComplianceReason,
  ProductImageTag,
} from "../medusa/types";

export const REQUIRED_PRODUCT_SHOTS: ProductImageTag[] = [
  "front_on_body",
  "back_on_body",
  "macro_print_closeup",
  "fabric_tag_detail",
  "flat_lay_context",
  "lifestyle_mood",
];

export function getProductCompliance(product: Product): ProductCompliance {
  const metadata = product.metadata ?? {};
  const imageTags = new Set(
    (product.images ?? []).map((image) =>
      (image.metadata?.tag ?? "lifestyle_mood") as ProductImageTag
    )
  );
  const missingShots = REQUIRED_PRODUCT_SHOTS.filter((tag) => !imageTags.has(tag));
  const modelStats = metadata.model_stats ?? [];
  const modelPresentations = new Set(modelStats.map((entry) => entry.gender_presentation));

  const hasArtistAttribution = Boolean(metadata.artist_id);
  const hasModelStats =
    modelStats.length > 0 &&
    modelPresentations.has("male") &&
    modelPresentations.has("female");
  const hasFabricComposition = Boolean(metadata.fabric_composition);
  const hasFabricWeightGsm = typeof metadata.fabric_weight_gsm === "number";
  const hasPrintMethod = Boolean(metadata.print_method);
  const hasWashTest = Boolean(metadata.wash_test_verified);

  const blockingReasons: ProductComplianceReason[] = [];

  if (!hasArtistAttribution) blockingReasons.push("missing_artist_attribution");
  if (!hasFabricComposition) blockingReasons.push("missing_fabric_composition");
  if (!hasFabricWeightGsm) blockingReasons.push("missing_fabric_weight_gsm");
  if (!hasPrintMethod) blockingReasons.push("missing_print_method");
  if (!hasWashTest) blockingReasons.push("missing_wash_test");
  if (!hasModelStats) blockingReasons.push("missing_model_stats");
  missingShots.forEach((tag) => {
    blockingReasons.push(`missing_${tag}` as ProductComplianceReason);
  });

  const requiredShotsComplete = missingShots.length === 0;
  const requiredProofComplete =
    hasArtistAttribution &&
    hasFabricComposition &&
    hasFabricWeightGsm &&
    hasPrintMethod &&
    hasWashTest &&
    hasModelStats;

  return {
    requiredShotsComplete,
    requiredProofComplete,
    hasArtistAttribution,
    hasModelStats,
    canPurchase: requiredShotsComplete && requiredProofComplete,
    blockingReasons,
  };
}

export function withProductCompliance(product: Product): Product {
  return {
    ...product,
    compliance: getProductCompliance(product),
  };
}
