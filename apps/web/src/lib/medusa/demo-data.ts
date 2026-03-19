/**
 * HORO Demo Data — Realistic mock products & categories
 * Used when Medusa backend is offline (dev/demo mode)
 */
import type { Product, ProductCategory } from "./types";

/* ═══════════════════════════════════════════
   Categories (themes matching Sanity stories)
   ═══════════════════════════════════════════ */

export const DEMO_CATEGORIES: ProductCategory[] = [
  { id: "cat_identity", name: "Identity", handle: "identity", description: "Pieces that feel personal and clearly say something about the wearer." },
  { id: "cat_emotion", name: "Emotion", handle: "emotion", description: "Wearable art for moments where feeling comes first." },
  { id: "cat_career", name: "Career Pride", handle: "career-pride", description: "Giftable drops that mark achievement and professional identity." },
  { id: "cat_gift", name: "Gift-worthy", handle: "gift-worthy", description: "Ready-to-give packaging, artist cards, and intentional delivery." },
];

/* ═══════════════════════════════════════════
   Shared helpers
   ═══════════════════════════════════════════ */

const sizes = ["S", "M", "L", "XL"];

function makeVariants(basePrice: number, productId: string): Product["variants"] {
  return sizes.map((size) => ({
    id: `var_${productId}_${size.toLowerCase()}`,
    title: size,
    options: [{ value: size }],
    prices: [{ amount: basePrice, currency_code: "egp" }],
    inventory_quantity: 10,
  }));
}

/** All 6 required image tags per product — using the brand images */
function makeImages(productId: string, imgSet: { primary: string; secondary: string }): Product["images"] {
  return [
    { id: `${productId}_front`, url: imgSet.primary, metadata: { tag: "front_on_body" } },
    { id: `${productId}_back`, url: imgSet.secondary, metadata: { tag: "back_on_body" } },
    { id: `${productId}_macro`, url: "/images/brand/macro-print.png", metadata: { tag: "macro_print_closeup" } },
    { id: `${productId}_tag`, url: "/images/brand/macro-print.png", metadata: { tag: "fabric_tag_detail" } },
    { id: `${productId}_flat`, url: "/images/brand/hero-flatlay.png", metadata: { tag: "flat_lay_context" } },
    { id: `${productId}_life`, url: "/images/brand/lifestyle-mood.png", metadata: { tag: "lifestyle_mood" } },
  ];
}

/** Both male + female model stats required for compliance */
const DUAL_MODEL_STATS = [
  { height_cm: 175, weight_kg: 72, size_worn: "L", gender_presentation: "female" as const },
  { height_cm: 180, weight_kg: 78, size_worn: "L", gender_presentation: "male" as const },
];

/* ═══════════════════════════════════════════
   Products — 6 realistic demo pieces
   ═══════════════════════════════════════════ */

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "prod_01",
    title: "Silent Faces",
    handle: "silent-faces",
    description: "Abstract portrait composition by Sara Emad — DTF printed on 220 GSM Egyptian cotton. Every line tells a story the wearer chooses to share.",
    thumbnail: "/images/brand/hero-flatlay.png",
    images: makeImages("prod_01", { primary: "/images/brand/hero-flatlay.png", secondary: "/images/brand/collection-identity.png" }),
    variants: makeVariants(69900, "prod_01"),
    collection_id: "cat_identity",
    collection: { id: "cat_identity", title: "Identity", handle: "identity" },
    metadata: {
      artist_id: "artist_sara_emad",
      artist_name_ar: "سارة عماد",
      artist_name_en: "Sara Emad",
      title_ar: "وجوه صامتة",
      title_en: "Silent Faces",
      description_ar:
        "تكوين بورتريه تجريدي من سارة عماد مطبوع بتقنية DTF على قطن مصري 220 GSM. كل خط يحمل قصة يختار لابسها كيف يحكيها.",
      description_en:
        "Abstract portrait composition by Sara Emad — DTF printed on 220 GSM Egyptian cotton. Every line tells a story the wearer chooses to share.",
      fabric_composition: "100% Egyptian Combed Cotton",
      fabric_weight_gsm: 220,
      print_method: "DTF (Direct-to-Film)",
      fit_type: "Oversized",
      fit_type_ar: "واسعة",
      fit_type_en: "Oversized",
      price_tier: "core" as const,
      is_giftable: true,
      wash_test_verified: true,
      model_stats: DUAL_MODEL_STATS,
    },
  },
  {
    id: "prod_02",
    title: "Warm Echoes",
    handle: "warm-echoes",
    description: "Warm-toned abstract forms by Amira Khalil — the illustration captures the feeling of being seen without words. DTF on 220 GSM Egyptian cotton.",
    thumbnail: "/images/brand/collection-identity.png",
    images: makeImages("prod_02", { primary: "/images/brand/collection-identity.png", secondary: "/images/brand/hero-flatlay.png" }),
    variants: makeVariants(69900, "prod_02"),
    collection_id: "cat_identity",
    collection: { id: "cat_identity", title: "Identity", handle: "identity" },
    metadata: {
      artist_id: "artist_amira_khalil",
      artist_name_ar: "أميرة خليل",
      artist_name_en: "Amira Khalil",
      title_ar: "أصداء دافئة",
      title_en: "Warm Echoes",
      description_ar:
        "أشكال تجريدية دافئة من أميرة خليل تلتقط إحساس أن تكون مرئياً من غير كلام. مطبوعة DTF على قطن مصري 220 GSM.",
      description_en:
        "Warm-toned abstract forms by Amira Khalil — the illustration captures the feeling of being seen without words. DTF on 220 GSM Egyptian cotton.",
      fabric_composition: "100% Egyptian Combed Cotton",
      fabric_weight_gsm: 220,
      print_method: "DTF (Direct-to-Film)",
      fit_type: "Regular",
      fit_type_ar: "قياسية",
      fit_type_en: "Regular",
      price_tier: "core" as const,
      is_giftable: true,
      wash_test_verified: true,
      model_stats: DUAL_MODEL_STATS,
    },
  },
  {
    id: "prod_03",
    title: "Unspoken",
    handle: "unspoken",
    description: "Emotional watercolor composition by Youssef Nabil — when feelings are too big for words, you wear them. DTF on 200 GSM Egyptian cotton.",
    thumbnail: "/images/brand/collection-emotion.png",
    images: makeImages("prod_03", { primary: "/images/brand/collection-emotion.png", secondary: "/images/brand/lifestyle-mood.png" }),
    variants: makeVariants(79900, "prod_03"),
    collection_id: "cat_emotion",
    collection: { id: "cat_emotion", title: "Emotion", handle: "emotion" },
    metadata: {
      artist_id: "artist_youssef_nabil",
      artist_name_ar: "يوسف نبيل",
      artist_name_en: "Youssef Nabil",
      title_ar: "ما لا يقال",
      title_en: "Unspoken",
      description_ar:
        "تكوين مائي عاطفي من يوسف نبيل للحظات التي تصبح فيها المشاعر أكبر من الكلام. مطبوع DTF على قطن مصري 200 GSM.",
      description_en:
        "Emotional watercolor composition by Youssef Nabil — when feelings are too big for words, you wear them. DTF on 200 GSM Egyptian cotton.",
      fabric_composition: "100% Egyptian Combed Cotton",
      fabric_weight_gsm: 200,
      print_method: "DTF (Direct-to-Film)",
      fit_type: "Oversized",
      fit_type_ar: "واسعة",
      fit_type_en: "Oversized",
      price_tier: "limited_drop" as const,
      is_limited_edition: true,
      edition_size: 50,
      is_giftable: true,
      wash_test_verified: true,
      model_stats: DUAL_MODEL_STATS,
    },
  },
  {
    id: "prod_04",
    title: "First Chapter",
    handle: "first-chapter",
    description: "Graduation-worthy illustration by Nour Abdel Salam — mark the milestone with art that lasts longer than any ceremony. DTF on 220 GSM Egyptian cotton.",
    thumbnail: "/images/brand/lifestyle-mood.png",
    images: makeImages("prod_04", { primary: "/images/brand/lifestyle-mood.png", secondary: "/images/brand/collection-identity.png" }),
    variants: makeVariants(69900, "prod_04"),
    collection_id: "cat_career",
    collection: { id: "cat_career", title: "Career Pride", handle: "career-pride" },
    metadata: {
      artist_id: "artist_nour_abdel_salam",
      artist_name_ar: "نور عبد السلام",
      artist_name_en: "Nour Abdel Salam",
      title_ar: "الفصل الأول",
      title_en: "First Chapter",
      description_ar:
        "رسم مناسب للتخرج من نور عبد السلام يوثق اللحظة بقطعة تعيش أطول من أي احتفال. مطبوع DTF على قطن مصري 220 GSM.",
      description_en:
        "Graduation-worthy illustration by Nour Abdel Salam — mark the milestone with art that lasts longer than any ceremony. DTF on 220 GSM Egyptian cotton.",
      fabric_composition: "100% Egyptian Combed Cotton",
      fabric_weight_gsm: 220,
      print_method: "DTF (Direct-to-Film)",
      fit_type: "Regular",
      fit_type_ar: "قياسية",
      fit_type_en: "Regular",
      price_tier: "core" as const,
      is_giftable: true,
      wash_test_verified: true,
      model_stats: DUAL_MODEL_STATS,
    },
  },
  {
    id: "prod_05",
    title: "The Gift Set — Identity",
    handle: "gift-set-identity",
    description: "Complete gift package: Silent Faces tee + rigid gift box + tissue wrap + artist story card. Ready to give — no wrapping needed.",
    thumbnail: "/images/brand/gift-packaging.png",
    images: makeImages("prod_05", { primary: "/images/brand/gift-packaging.png", secondary: "/images/brand/hero-flatlay.png" }),
    variants: makeVariants(109900, "prod_05"),
    collection_id: "cat_gift",
    collection: { id: "cat_gift", title: "Gift-worthy", handle: "gift-worthy" },
    metadata: {
      artist_id: "artist_sara_emad",
      artist_name_ar: "سارة عماد",
      artist_name_en: "Sara Emad",
      title_ar: "طقم الهدايا — هوية",
      title_en: "The Gift Set — Identity",
      description_ar:
        "باقة هدية كاملة: تيشيرت Silent Faces مع صندوق صلب وورق تغليف وبطاقة قصة الفنان. جاهزة للتسليم من غير تجهيز إضافي.",
      description_en:
        "Complete gift package: Silent Faces tee + rigid gift box + tissue wrap + artist story card. Ready to give — no wrapping needed.",
      fabric_composition: "100% Egyptian Combed Cotton",
      fabric_weight_gsm: 220,
      print_method: "DTF (Direct-to-Film)",
      fit_type: "Oversized",
      fit_type_ar: "واسعة",
      fit_type_en: "Oversized",
      price_tier: "gift_bundle" as const,
      is_giftable: true,
      wash_test_verified: true,
      model_stats: DUAL_MODEL_STATS,
    },
  },
  {
    id: "prod_06",
    title: "Studio Light",
    handle: "studio-light",
    description: "Behind-the-scenes-inspired illustration by Dina El Mofty — captures the artist's workspace in warm, honest tones. DTF on 200 GSM Egyptian cotton.",
    thumbnail: "/images/brand/artist-portrait.png",
    images: makeImages("prod_06", { primary: "/images/brand/artist-portrait.png", secondary: "/images/brand/collection-emotion.png" }),
    variants: makeVariants(79900, "prod_06"),
    collection_id: "cat_emotion",
    collection: { id: "cat_emotion", title: "Emotion", handle: "emotion" },
    metadata: {
      artist_id: "artist_dina_el_mofty",
      artist_name_ar: "دينا المفتي",
      artist_name_en: "Dina El Mofty",
      title_ar: "ضوء الاستوديو",
      title_en: "Studio Light",
      description_ar:
        "رسم مستلهم من كواليس المرسم من دينا المفتي يلتقط دفء المساحة التي يبدأ منها العمل الفني. مطبوع DTF على قطن مصري 200 GSM.",
      description_en:
        "Behind-the-scenes-inspired illustration by Dina El Mofty — captures the artist's workspace in warm, honest tones. DTF on 200 GSM Egyptian cotton.",
      fabric_composition: "100% Egyptian Combed Cotton",
      fabric_weight_gsm: 200,
      print_method: "DTF (Direct-to-Film)",
      fit_type: "Oversized",
      fit_type_ar: "واسعة",
      fit_type_en: "Oversized",
      price_tier: "limited_drop" as const,
      is_limited_edition: true,
      edition_size: 30,
      is_giftable: true,
      wash_test_verified: true,
      model_stats: DUAL_MODEL_STATS,
    },
  },
];

/* ═══════════════════════════════════════════
   Demo API Router — routes paths to demo data
   ═══════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function demoFetch<T>(path: string, _options?: RequestInit): T | null {
  // GET /store/product-categories?handle=xxx
  if (path.includes("/product-categories")) {
    const url = new URL(path, "http://localhost");
    const handle = url.searchParams.get("handle");
    if (handle) {
      const cat = DEMO_CATEGORIES.find((c) => c.handle === handle);
      return { product_categories: cat ? [cat] : [] } as T;
    }
    return { product_categories: DEMO_CATEGORIES, count: DEMO_CATEGORIES.length } as T;
  }

  // GET /store/products?handle=xxx
  if (path.includes("/products") && path.includes("handle=")) {
    const url = new URL(path, "http://localhost");
    const handle = url.searchParams.get("handle");
    const products = DEMO_PRODUCTS.filter((p) => p.handle === handle);
    return { products, count: products.length, offset: 0, limit: 50 } as T;
  }

  // GET /store/products?collection_id[]=xxx
  if (path.includes("/products") && path.includes("collection_id")) {
    const url = new URL(path, "http://localhost");
    const collectionId = url.searchParams.get("collection_id[]");
    const products = collectionId
      ? DEMO_PRODUCTS.filter((p) => p.collection_id === collectionId)
      : DEMO_PRODUCTS;
    return { products, count: products.length, offset: 0, limit: 50 } as T;
  }

  // GET /store/products/prod_xxx
  const productIdMatch = path.match(/\/products\/(prod_\w+)$/);
  if (productIdMatch) {
    const product = DEMO_PRODUCTS.find((p) => p.id === productIdMatch[1]);
    return product ? ({ product } as T) : null;
  }

  // GET /store/products (all)
  if (path.includes("/products")) {
    return { products: DEMO_PRODUCTS, count: DEMO_PRODUCTS.length, offset: 0, limit: 50 } as T;
  }

  return null;
}
