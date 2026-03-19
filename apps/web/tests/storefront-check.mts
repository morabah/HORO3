import assert from "node:assert/strict";
import { getProductCompliance } from "../src/lib/storefront/compliance.ts";
import { fallbackSiteSettings } from "../src/lib/content/fallback.ts";
import { DEMO_PRODUCTS } from "../src/lib/medusa/demo-data.ts";
import type { Product } from "../src/lib/medusa/types.ts";
import {
  getLocalizedArtistName,
  getLocalizedFitType,
  getLocalizedProductDescription,
  getLocalizedProductTitle,
} from "../src/lib/storefront/product-localization.ts";
import { getStorefrontCopy } from "../src/lib/storefront/copy.ts";

const compliantProduct: Product = {
  id: "prod_launch_ready",
  title: "Launch Ready Tee",
  handle: "launch-ready-tee",
  images: [
    { id: "1", url: "/1.jpg", metadata: { tag: "front_on_body" } },
    { id: "2", url: "/2.jpg", metadata: { tag: "back_on_body" } },
    { id: "3", url: "/3.jpg", metadata: { tag: "macro_print_closeup" } },
    { id: "4", url: "/4.jpg", metadata: { tag: "fabric_tag_detail" } },
    { id: "5", url: "/5.jpg", metadata: { tag: "flat_lay_context" } },
    { id: "6", url: "/6.jpg", metadata: { tag: "lifestyle_mood" } },
  ],
  variants: [{ id: "var_1", title: "M", prices: [{ amount: 69900, currency_code: "egp" }], options: [] }],
  metadata: {
    artist_id: "artist_1",
    fabric_composition: "100% Egyptian cotton",
    fabric_weight_gsm: 240,
    print_method: "DTF",
    wash_test_verified: true,
    model_stats: [
      { height_cm: 182, weight_kg: 78, size_worn: "L", gender_presentation: "male" },
      { height_cm: 168, weight_kg: 58, size_worn: "M", gender_presentation: "female" },
    ],
  },
};

const blockedProduct: Product = {
  id: "prod_pending",
  title: "Pending Tee",
  handle: "pending-tee",
  images: [{ id: "1", url: "/1.jpg", metadata: { tag: "front_on_body" } }],
  variants: [{ id: "var_2", title: "M", prices: [{ amount: 69900, currency_code: "egp" }], options: [] }],
  metadata: {
    fabric_weight_gsm: 220,
    model_stats: [{ height_cm: 182, weight_kg: 78, size_worn: "L", gender_presentation: "male" }],
  },
};

async function runComplianceChecks() {
  const ready = getProductCompliance(compliantProduct);
  assert.equal(ready.requiredShotsComplete, true, "Expected compliant product to include all required shots");
  assert.equal(ready.requiredProofComplete, true, "Expected compliant product to include all proof data");
  assert.equal(ready.canPurchase, true, "Expected compliant product to be purchasable");
  assert.equal(ready.blockingReasons.length, 0, "Expected compliant product to have no blocking reasons");

  const blocked = getProductCompliance(blockedProduct);
  assert.equal(blocked.canPurchase, false, "Expected incomplete product to be blocked");
  assert(blocked.blockingReasons.includes("missing_artist_attribution"));
  assert(blocked.blockingReasons.includes("missing_fabric_composition"));
  assert(blocked.blockingReasons.includes("missing_print_method"));
  assert(blocked.blockingReasons.includes("missing_wash_test"));
  assert(blocked.blockingReasons.includes("missing_model_stats"));
  assert(blocked.blockingReasons.includes("missing_back_on_body"));
  assert(blocked.blockingReasons.includes("missing_macro_print_closeup"));
}

function runLocalizationChecks() {
  const demoProduct = DEMO_PRODUCTS[0];
  assert.equal(getLocalizedProductTitle(demoProduct, "ar"), "وجوه صامتة");
  assert.equal(getLocalizedArtistName(demoProduct, "ar"), "سارة عماد");
  assert.equal(getLocalizedFitType(demoProduct, "ar"), "واسعة");
  assert.match(
    getLocalizedProductDescription(demoProduct, "ar") ?? "",
    /سارة عماد/
  );
  assert.equal(getStorefrontCopy("ar").product.fitLabel, "القصّة:");
  assert.equal(fallbackSiteSettings.tagline_ar, "ارتدِ ما تقصده");
  assert.equal(fallbackSiteSettings.tagline_en, "Wear What You Mean");
  assert.match(fallbackSiteSettings.description_ar ?? "", /تيشيرتات برسومات أصلية من مصر/);
  assert.match(fallbackSiteSettings.description_en ?? "", /Original illustrated T-shirts from Egypt/);
}

async function runRouteSmokeChecks() {
  const baseUrl = process.env.STOREFRONT_BASE_URL;
  if (!baseUrl) {
    console.log("Skipping route smoke checks: STOREFRONT_BASE_URL is not set.");
    return;
  }

  const routes = [
    "/en",
    "/en/collections",
    "/en/gifts",
    "/en/size-guide",
    "/en/cart",
    "/en/checkout",
    "/en/account",
    "/en/account/orders",
    "/en/policies/exchange",
    "/en/policies/shipping",
    "/en/policies/privacy",
    "/en/stories",
    "/en/artists",
    "/ar",
    "/ar/collections",
    "/ar/gifts",
    "/ar/size-guide",
    "/ar/cart",
    "/ar/checkout",
    "/ar/account",
    "/ar/account/orders",
    "/ar/policies/exchange",
    "/ar/policies/shipping",
    "/ar/policies/privacy",
    "/ar/stories",
    "/ar/artists",
  ];

  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 200, `Expected ${route} to respond with 200`);
    const html = await response.text();
    assert(html.includes("<html"), `Expected ${route} to return HTML`);
  }

  const localizedChecks = [
    {
      route: "/products/silent-faces",
      includes: ["وجوه صامتة", "انتقل إلى المحتوى الرئيسي"],
      excludes: ["Skip to main content", "القصّة: Oversized"],
    },
    {
      route: "/en/products/silent-faces",
      includes: ["Silent Faces", "Skip to main content"],
      excludes: ["وجوه صامتة | HORO"],
    },
  ];

  for (const check of localizedChecks) {
    const response = await fetch(`${baseUrl}${check.route}`);
    assert.equal(response.status, 200, `Expected ${check.route} to respond with 200`);
    const html = await response.text();

    for (const value of check.includes) {
      assert(html.includes(value), `Expected ${check.route} to include "${value}"`);
    }

    for (const value of check.excludes) {
      assert(!html.includes(value), `Expected ${check.route} to omit "${value}"`);
    }
  }
}

async function main() {
  await runComplianceChecks();
  runLocalizationChecks();
  await runRouteSmokeChecks();
  console.log("Storefront checks passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
