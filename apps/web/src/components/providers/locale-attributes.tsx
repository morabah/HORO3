"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

export function LocaleAttributes() {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return null;
}
