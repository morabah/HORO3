"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const locales = [
  { code: "ar" as const, label: "العربية" },
  { code: "en" as const, label: "English" },
];

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "ar" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      className="inline-flex rounded-full border border-sandstone/40 bg-white/80 p-1 shadow-sm"
      role="tablist"
      aria-label="Language"
    >
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          role="tab"
          aria-selected={locale === code}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold min-h-[var(--touch-target)] md:min-h-0 transition-colors",
            locale === code
              ? "bg-burnt-sienna text-warm-linen"
              : "bg-transparent text-deep-umber hover:bg-warm-linen"
          )}
          onClick={() => switchLocale(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
