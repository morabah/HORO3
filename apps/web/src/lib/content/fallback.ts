export interface FallbackThemeCard {
  id: string;
  theme: "identity" | "emotion" | "career" | "gift";
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  handle: string;
  hero_image?: string;
}

export interface SizeRecommendationRule {
  size: string;
  min_height_cm: number;
  max_height_cm: number;
  min_weight_kg: number;
  max_weight_kg: number;
}

export const fallbackThemeCards: FallbackThemeCard[] = [
  {
    id: "identity",
    theme: "identity",
    title_ar: "هوية",
    title_en: "Identity",
    description_ar: "قطع تشبه الشخص الذي يلبسها وتحمل معنى واضحاً.",
    description_en: "Pieces that feel personal and clearly say something about the wearer.",
    handle: "identity",
    hero_image: "/images/brand/collection-identity.png",
  },
  {
    id: "emotion",
    theme: "emotion",
    title_ar: "مشاعر",
    title_en: "Emotion",
    description_ar: "فن يُرتدى عندما يكون الإحساس هو البداية.",
    description_en: "Wearable art for moments where feeling comes first.",
    handle: "emotion",
    hero_image: "/images/brand/collection-emotion.png",
  },
  {
    id: "career",
    theme: "career",
    title_ar: "فخر مهني",
    title_en: "Career Pride",
    description_ar: "هدايا أو قطع تحتفل بالإنجاز والهوية المهنية.",
    description_en: "Giftable drops that mark achievement and professional identity.",
    handle: "career-pride",
    hero_image: "/images/brand/lifestyle-mood.png",
  },
  {
    id: "gift",
    theme: "gift",
    title_ar: "هدايا",
    title_en: "Gift-worthy",
    description_ar: "تغليف جاهز، بطاقة فنان، وتجربة وصول مقصودة.",
    description_en: "Ready-to-give packaging, artist cards, and intentional delivery.",
    handle: "gift-worthy",
    hero_image: "/images/brand/gift-packaging.png",
  },
];

export const fallbackSizeMatrix: SizeRecommendationRule[] = [
  { size: "S", min_height_cm: 155, max_height_cm: 168, min_weight_kg: 48, max_weight_kg: 60 },
  { size: "M", min_height_cm: 165, max_height_cm: 176, min_weight_kg: 58, max_weight_kg: 72 },
  { size: "L", min_height_cm: 170, max_height_cm: 184, min_weight_kg: 70, max_weight_kg: 84 },
  { size: "XL", min_height_cm: 176, max_height_cm: 194, min_weight_kg: 82, max_weight_kg: 98 },
  { size: "2XL", min_height_cm: 178, max_height_cm: 198, min_weight_kg: 96, max_weight_kg: 114 },
];

export const fallbackSiteSettings = {
  title: "HORO",
  description:
    "Original illustrated T-shirts from Egypt, organized around mood, personality, culture, career, and emotion.",
  description_ar:
    "تيشيرتات برسومات أصلية من مصر، مرتبة حول المزاج والشخصية والثقافة والعمل والمشاعر.",
  description_en:
    "Original illustrated T-shirts from Egypt, organized around mood, personality, culture, career, and emotion.",
  tagline_ar: "ارتدِ ما تقصده",
  tagline_en: "Wear What You Mean",
  whatsapp_number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  support_email: "orders@horo.eg",
  instagram_url: "https://instagram.com/horo.eg",
  gift_packaging_fee_egp: 30,
  prepaid_shipping_copy_ar: "شحن مجاني للطلبات المدفوعة أونلاين.",
  prepaid_shipping_copy_en: "Free shipping on prepaid orders.",
  shipping_copy_ar: "شحن داخل مصر مع تأكيد واتساب للـ COD وتحديثات تتبع عند الإرسال.",
  shipping_copy_en: "Shipping across Egypt with WhatsApp COD confirmation and tracking updates.",
  size_recommendation_matrix: fallbackSizeMatrix,
};

export interface FallbackArtist {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  portrait: string;
  studio_location: string;
}

export const fallbackArtists: FallbackArtist[] = [
  {
    id: "artist_sara_emad",
    name_ar: "سارة عماد",
    name_en: "Sara Emad",
    slug: "sara-emad",
    portrait: "/images/brand/artist-portrait.png",
    studio_location: "Zamalek, Cairo",
  },
  {
    id: "artist_amira_khalil",
    name_ar: "أميرة خليل",
    name_en: "Amira Khalil",
    slug: "amira-khalil",
    portrait: "/images/brand/artist-portrait.png",
    studio_location: "Downtown, Cairo",
  },
  {
    id: "artist_youssef_nabil",
    name_ar: "يوسف نبيل",
    name_en: "Youssef Nabil",
    slug: "youssef-nabil",
    portrait: "/images/brand/artist-portrait.png",
    studio_location: "Maadi, Cairo",
  },
  {
    id: "artist_nour_abdel_salam",
    name_ar: "نور عبد السلام",
    name_en: "Nour Abdel Salam",
    slug: "nour-abdel-salam",
    portrait: "/images/brand/artist-portrait.png",
    studio_location: "Alexandria, Egypt",
  },
  {
    id: "artist_dina_el_mofty",
    name_ar: "دينا المفتي",
    name_en: "Dina El Mofty",
    slug: "dina-el-mofty",
    portrait: "/images/brand/artist-portrait.png",
    studio_location: "Heliopolis, Cairo",
  },
];
