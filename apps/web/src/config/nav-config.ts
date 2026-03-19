/**
 * nav-config.ts — Schema-driven navigation configuration
 * Single source of truth for primary nav, utility nav, and footer nav.
 * No hardcoded navigation in components.
 */

export interface NavItem {
  key: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  key: string;
  items: NavItem[];
}

export const primaryNav: NavItem[] = [
  {
    key: "themes",
    href: "/collections",
    children: [
      { key: "identity", href: "/collections/identity" },
      { key: "emotion", href: "/collections/emotion" },
      { key: "career", href: "/collections/career" },
      { key: "culture", href: "/collections/culture" },
      { key: "portraits", href: "/collections/portraits" },
      { key: "limitedEditions", href: "/collections/limited" },
    ],
  },
  { key: "artists", href: "/artists" },
  { key: "gifts", href: "/gifts" },
  { key: "newDrops", href: "/collections/new" },
  { key: "stories", href: "/stories" },
];

export const utilityNav = [
  "search",
  "wishlist",
  "account",
  "cart",
] as const;

export type UtilityNavItem = (typeof utilityNav)[number];

export const footerNav: FooterColumn[] = [
  {
    key: "shop",
    items: [
      { key: "newArrivals", href: "/collections/new" },
      { key: "themes", href: "/collections" },
      { key: "artists", href: "/artists" },
      { key: "limitedEditions", href: "/collections/limited" },
      { key: "giftSets", href: "/gifts" },
    ],
  },
  {
    key: "customerCare",
    items: [
      { key: "exchangePolicy", href: "/policies/exchange" },
      { key: "shippingDelivery", href: "/policies/shipping" },
      { key: "sizeGuide", href: "/size-guide" },
      { key: "paymentMethods", href: "/policies/privacy" },
      { key: "faq", href: "/policies/exchange" },
      { key: "orderTracking", href: "/account" },
    ],
  },
  {
    key: "about",
    items: [
      { key: "ourStory", href: "/stories" },
      { key: "ourArtists", href: "/artists" },
      { key: "sustainability", href: "/stories" },
    ],
  },
];

/** Category tiles shown on homepage — compact nav below hero */
export const categoryTiles = [
  { key: "identity", href: "/collections/identity", emoji: "🎭" },
  { key: "emotion", href: "/collections/emotion", emoji: "🎨" },
  { key: "culture", href: "/collections/culture", emoji: "🏛️" },
  { key: "giftSets", href: "/gifts", emoji: "🎁" },
  { key: "artists", href: "/artists", emoji: "📂" },
  { key: "newDrops", href: "/collections/new", emoji: "⭐" },
] as const;
