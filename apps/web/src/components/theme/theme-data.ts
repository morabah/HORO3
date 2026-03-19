import { MapPin, Moon, Briefcase, Shirt, ShieldCheck, Ruler, Gift, Truck, Package, RotateCcw, Lock } from "lucide-react";

const FABRIC_NOTE = "220gsm combed cotton, DTF print with sharp detail";

export const PRODUCTS = [
  {
    id: 1,
    name: "The Overthinker",
    theme: "Mood",
    price: 549,
    originalPrice: 610,
    tagline: "For the ones whose mind never really switches off.",
    description:
      "A design born from late-night thought spirals and quiet self-awareness. The illustration captures the weight and beauty of an overactive mind — drawn digitally from scratch, never sourced from a trend board.",
    fit: "Oversized",
    fitNote:
      "Runs 1 size larger than standard. If you're between sizes, go with your usual.",
    badge: "Bestseller",
    badgeReason: "Top seller across 3 consecutive drops",
    stock: 18,
    sizes: ["S", "M", "L", "XL"],
    fabric: FABRIC_NOTE,
    image: "/images/theme/prod_1.png",
  },
  {
    id: 2,
    name: "Nile Energy",
    theme: "Culture",
    price: 599,
    tagline: "Rooted, current, and easy to wear.",
    description:
      "An illustrated tribute to the rhythm of Egyptian life — the hum of the city, the calm of the river, the pride that doesn't need to shout. Original digital artwork by a Cairo-based illustrator.",
    fit: "Relaxed",
    fitNote:
      "True to size with a comfortable drape. Standard sizing recommended.",
    badge: "New",
    badgeReason: "Dropped this week",
    stock: 24,
    sizes: ["M", "L", "XL", "XXL"],
    fabric: FABRIC_NOTE,
    image: "/images/theme/prod_2.png",
  },
  {
    id: 3,
    name: "Scorpio Silence",
    theme: "Personality",
    price: 549,
    tagline: "Sees everything, says little.",
    description:
      "Personality as illustration — a design for the quietly intense. Framed as self-expression, not fortune-telling. The Scorpio archetype drawn as character trait, not cosmic prediction.",
    fit: "Regular",
    fitNote: "Standard fit. Go true to size for a clean silhouette.",
    badge: null,
    badgeReason: null,
    stock: 12,
    sizes: ["S", "M", "L", "XL"],
    fabric: FABRIC_NOTE,
    image: "/images/theme/prod_3.png",
  },
  {
    id: 4,
    name: "The Builder",
    theme: "Career",
    price: 599,
    tagline: "For people making something from nothing.",
    description:
      "An original illustration for the ones building — a startup, a side hustle, a life from scratch. The design speaks to effort without performing hustle culture.",
    fit: "Relaxed",
    fitNote: "Comfortable through the body. Standard sizing recommended.",
    badge: "New",
    badgeReason: "Dropped this week",
    stock: 30,
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: FABRIC_NOTE,
    image: "/images/theme/prod_4.png",
  },
  {
    id: 5,
    name: "Quiet Storm",
    theme: "Emotion",
    price: 549,
    tagline: "Calm face, loud inner world.",
    description:
      "Abstract emotion rendered as wearable art. For anyone who holds a universe inside and only lets it out in chosen moments. Original digital illustration.",
    fit: "Oversized",
    fitNote:
      "Runs 1 size larger. Go with your usual for the intended oversized drape.",
    badge: "Low stock",
    badgeReason: "Only 6 left from this illustration run",
    stock: 6,
    sizes: ["M", "L", "XL"],
    fabric: FABRIC_NOTE,
    image: "/images/theme/prod_1.png",
  },
  {
    id: 6,
    name: "Leo Fire",
    theme: "Personality",
    price: 549,
    tagline: "Presence without apology.",
    description:
      "A personality-driven design for natural presence. The Leo archetype as character illustration — warm, unshakeable, and impossible to ignore. Not horoscope. Personality.",
    fit: "Regular",
    fitNote: "Standard fit, true to size.",
    badge: null,
    badgeReason: null,
    stock: 15,
    sizes: ["S", "M", "L", "XL"],
    fabric: FABRIC_NOTE,
    image: "/images/theme/prod_2.png",
  },
  {
    id: 7,
    name: "Night Owl",
    theme: "Mood",
    price: 549,
    tagline: "Late-night thoughts, drawn into form.",
    description:
      "For the ones who come alive when the city goes quiet. An original mood-driven illustration that wears the feeling of 2am clarity.",
    fit: "Oversized",
    fitNote: "Runs 1 size larger than standard.",
    badge: "New",
    badgeReason: "Dropped this week",
    stock: 22,
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: FABRIC_NOTE,
    image: "/images/theme/prod_3.png",
  },
  {
    id: 8,
    name: "Ibn El Balad",
    theme: "Culture",
    price: 599,
    tagline: "A local pulse, cleanly translated.",
    description:
      "Egyptian cultural pride worn simply. An illustration that says 'from here' without reducing identity to a single symbol. Original artwork, locally inspired, globally readable.",
    fit: "Relaxed",
    fitNote: "Comfortable drape, standard sizing.",
    badge: "Bestseller",
    badgeReason: "Top seller across 3 consecutive drops",
    stock: 9,
    sizes: ["M", "L", "XL"],
    fabric: FABRIC_NOTE,
    image: "/images/theme/prod_4.png",
  },
];

export const LOOKBOOK = [
  {
    title: "Culture",
    desc: "An Egyptian pulse.",
    icon: MapPin,
    image: "/images/theme/hero_bg.png",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    title: "Mood",
    desc: "How it feels.",
    icon: Moon,
    image: "/images/theme/prod_1.png",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Career",
    desc: "The builder mindset.",
    icon: Briefcase,
    image: "/images/theme/prod_4.png",
    span: "col-span-1 row-span-1",
  },
];

export const UGC = [
  {
    name: "Mariam, Cairo",
    product: "The Overthinker",
    quote: "Found a design that says what I couldn't say directly.",
    img: "/images/theme/prod_1.png",
  },
  {
    name: "Youssef, Giza",
    product: "Ibn El Balad",
    quote: "It felt chosen, not random.",
    img: "/images/theme/prod_2.png",
  },
  {
    name: "Ahmed, Alex",
    product: "Quiet Storm",
    quote: "The print quality surprised me. Heavier than expected.",
    img: "/images/theme/prod_3.png",
  },
];

export const ASSURANCE = [
  {
    icon: Shirt,
    title: "Original illustration",
    text: "Every design starts from a fresh digital concept, not a copied trend board.",
  },
  {
    icon: ShieldCheck,
    title: "Premium-feel finish",
    text: "220gsm combed cotton with DTF printing. Heavier and sharper than a typical print-shop tee.",
  },
  {
    icon: Ruler,
    title: "Fit guidance before checkout",
    text: "Size chart, fit notes, and body-type recommendations visible on every product page.",
  },
  {
    icon: Gift,
    title: "Gift-ready presentation",
    text: "Built for self-expression and for gifts that feel chosen, not random.",
  },
];

export const TRUST = [
  { icon: Truck, label: "Free shipping on prepaid" },
  { icon: Package, label: "COD available nationwide" },
  { icon: RotateCcw, label: "14-day exchange policy" },
  { icon: Lock, label: "Secure checkout (SSL)" },
];
