"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { useFeatureFlag } from "@/hooks/use-feature-flag";
import { FEATURE_FLAGS } from "@/lib/analytics/feature-flags";
import { BrandLogo } from "@/components/brand/logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { primaryNav } from "@/config/nav-config";

/** Nav label translations — driven by nav-config keys */
const navLabels: Record<string, { ar: string; en: string }> = {
  themes: { ar: "الأفكار", en: "Themes" },
  artists: { ar: "الفنانون", en: "Artists" },
  gifts: { ar: "هدايا", en: "Gifts" },
  newDrops: { ar: "جديد", en: "New Drops" },
  stories: { ar: "القصص", en: "Stories" },
  // Sub-categories
  identity: { ar: "الهوية", en: "Identity" },
  emotion: { ar: "المشاعر", en: "Emotion" },
  career: { ar: "المهنة", en: "Career" },
  culture: { ar: "الثقافة", en: "Culture" },
  portraits: { ar: "بورتريه", en: "Portraits" },
  limitedEditions: { ar: "إصدارات محدودة", en: "Limited Editions" },
};

function getLabel(key: string, locale: "ar" | "en"): string {
  return navLabels[key]?.[locale] ?? key;
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() === "ar" ? "ar" : "en";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themesOpen, setThemesOpen] = useState(false);
  const [mobileThemesExpanded, setMobileThemesExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logoLockup = useFeatureFlag(FEATURE_FLAGS.logo_lockup);
  const showBilingualLogo = locale === "ar" || logoLockup === "bilingual";
  const searchLabel = locale === "ar" ? "بحث" : "Search";
  const homeLabel = locale === "ar" ? "العودة إلى الرئيسية" : "Go to home";
  const mainNavLabel = locale === "ar" ? "التنقل الرئيسي" : "Main navigation";
  const mobileNavLabel = locale === "ar" ? "قائمة الجوال" : "Mobile navigation";
  const menuLabel = locale === "ar" ? "القائمة" : "Menu";
  const wishlistLabel = locale === "ar" ? "المفضلة" : "Wishlist";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setThemesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themesItem = primaryNav.find((item) => item.key === "themes");

  return (
    <header className="sticky top-0 z-50 border-b border-sandstone/30 bg-warm-linen/90 backdrop-blur supports-[backdrop-filter]:bg-warm-linen/75">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:grid md:grid-cols-[auto_1fr_auto] md:gap-6 md:px-6 md:py-4">
        
        {/* Mobile Menu Toggle (Left on mobile, hidden on desktop) */}
        <button
          type="button"
          className="inline-flex p-2 text-charcoal hover:bg-white/50 rounded-full md:hidden"
          aria-expanded={mobileOpen}
          aria-label={menuLabel}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        {/* Brand Logo (Center on mobile, Left on desktop) */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center md:inline-flex md:min-w-[180px] md:rounded-[22px] md:border md:border-sandstone/40 md:bg-white/70 md:px-4 md:py-3 md:shadow-sm"
          aria-label={homeLabel}
        >
          <BrandLogo
            variant={showBilingualLogo ? "bilingual" : "latin"}
            className={showBilingualLogo ? "h-8 md:h-auto md:w-28" : "h-8 md:h-auto md:w-32"}
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center justify-center gap-1 md:flex"
          aria-label={mainNavLabel}
        >
          {primaryNav.map((item) => {
            if (item.children && item.children.length > 0) {
              // Themes with dropdown
              return (
                <div
                  key={item.key}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setThemesOpen(true)}
                  onMouseLeave={() => setThemesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-sandstone/30 hover:bg-white/70 hover:text-burnt-sienna"
                    onClick={() => setThemesOpen(false)}
                  >
                    {getLabel(item.key, locale)}
                    <svg
                      className={`ms-1 inline-block h-3 w-3 transition-transform ${themesOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 4.5L6 7.5L9 4.5" />
                    </svg>
                  </Link>

                  {/* Dropdown */}
                  {themesOpen && (
                    <div className="absolute start-0 top-full z-50 mt-1 min-w-[200px] overflow-hidden rounded-[16px] border border-sandstone/35 bg-warm-linen/95 p-2 shadow-lg backdrop-blur">
                      {item.children.map((child) => (
                        <Link
                          key={child.key}
                          href={child.href}
                          className="block rounded-xl px-4 py-2.5 text-sm text-charcoal transition-colors hover:bg-white/70 hover:text-burnt-sienna"
                          onClick={() => setThemesOpen(false)}
                        >
                          {getLabel(child.key, locale)}
                        </Link>
                      ))}
                      <div className="mx-2 my-1 border-t border-sandstone/25" />
                      <Link
                        href={item.href}
                        className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-burnt-sienna transition-colors hover:bg-white/70"
                        onClick={() => setThemesOpen(false)}
                      >
                        {locale === "ar" ? "كل المجموعات →" : "All collections →"}
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-sandstone/30 hover:bg-white/70 hover:text-burnt-sienna"
              >
                {getLabel(item.key, locale)}
              </Link>
            );
          })}
        </nav>

        {/* Utility nav (Right on mobile & desktop) */}
        <div className="flex items-center justify-end gap-2">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>
          <button
            type="button"
            className="hidden rounded-full border border-sandstone/35 bg-white/75 p-2 text-charcoal transition-colors hover:bg-white md:inline-flex"
            aria-label={searchLabel}
            onClick={() => window.dispatchEvent(new CustomEvent("horo:open-search"))}
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          <Link
            href="/wishlist"
            className="hidden rounded-full border border-sandstone/35 bg-white/75 p-2 text-charcoal transition-colors hover:bg-white md:inline-flex"
            aria-label={wishlistLabel}
          >
            <HeartIcon className="h-5 w-5" />
          </Link>
          <Link
            href="/account"
            className="hidden rounded-full border border-sandstone/35 bg-white/75 p-2 text-charcoal transition-colors hover:bg-white md:inline-flex"
            aria-label={t("account")}
          >
            <UserIcon className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full border border-transparent p-2 text-charcoal transition-colors hover:bg-white/50 md:border-sandstone/35 md:bg-white/75 md:hover:bg-white"
            aria-label={t("cart")}
          >
            <CartIcon className="h-6 w-6 md:h-5 md:w-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-burnt-sienna rounded-full border border-warm-linen"></span>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="border-t border-sandstone/30 bg-warm-linen px-4 py-4 md:hidden"
          aria-label={mobileNavLabel}
        >
          <ul className="rounded-[28px] border border-sandstone/40 bg-white/75 p-4 shadow-sm">
            <li className="mb-4 flex justify-end">
              <LocaleSwitcher />
            </li>
            {primaryNav.map((item) => (
              <li key={item.key}>
                {item.children && item.children.length > 0 ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-charcoal transition-colors hover:bg-warm-linen hover:text-burnt-sienna"
                      onClick={() => setMobileThemesExpanded((o) => !o)}
                    >
                      {getLabel(item.key, locale)}
                      <svg
                        className={`h-4 w-4 transition-transform ${mobileThemesExpanded ? "rotate-180" : ""}`}
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 4.5L6 7.5L9 4.5" />
                      </svg>
                    </button>
                    {mobileThemesExpanded && (
                      <ul className="ms-4 border-s border-sandstone/25 ps-3">
                        {item.children.map((child) => (
                          <li key={child.key}>
                            <Link
                              href={child.href}
                              className="block rounded-xl px-3 py-2.5 text-sm text-charcoal transition-colors hover:bg-warm-linen hover:text-burnt-sienna"
                              onClick={() => setMobileOpen(false)}
                            >
                              {getLabel(child.key, locale)}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href={item.href}
                            className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-burnt-sienna"
                            onClick={() => setMobileOpen(false)}
                          >
                            {locale === "ar" ? "كل المجموعات →" : "All collections →"}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block rounded-2xl px-3 py-3 text-charcoal transition-colors hover:bg-warm-linen hover:text-burnt-sienna"
                    onClick={() => setMobileOpen(false)}
                  >
                    {getLabel(item.key, locale)}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link
                href="/wishlist"
                className="block rounded-2xl px-3 py-3 text-charcoal transition-colors hover:bg-warm-linen hover:text-burnt-sienna"
                onClick={() => setMobileOpen(false)}
              >
                {wishlistLabel}
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                className="block rounded-2xl px-3 py-3 text-charcoal transition-colors hover:bg-warm-linen hover:text-burnt-sienna"
                onClick={() => setMobileOpen(false)}
              >
                {t("account")}
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="block rounded-2xl px-3 py-3 text-charcoal transition-colors hover:bg-warm-linen hover:text-burnt-sienna"
                onClick={() => setMobileOpen(false)}
              >
                {t("cart")}
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="mt-1 flex w-full items-center rounded-2xl px-3 py-3 text-charcoal transition-colors hover:bg-warm-linen hover:text-burnt-sienna"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("horo:open-search"));
                  setMobileOpen(false);
                }}
              >
                {searchLabel}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12h16" />
      <path d="M4 6h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
