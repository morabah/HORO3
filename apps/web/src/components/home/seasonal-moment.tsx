"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { getStorefrontCopy } from "@/lib/storefront/copy";

interface SeasonalEvent {
  key: string;
  emoji: string;
  headline: { ar: string; en: string };
  /** Month/day pairs: [startMonth, startDay, endMonth, endDay] (1-indexed) */
  window: [number, number, number, number];
  href: string;
}

/**
 * Schema-driven seasonal events config.
 * Adding new events = adding to this array. No hardcoded visibility logic.
 */
const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    key: "mothers-day",
    emoji: "🎁",
    headline: {
      ar: "عيد الأم قرّب — هدية بمعنى حقيقي",
      en: "Mother's Day is near — a gift with real meaning",
    },
    window: [2, 19, 3, 21],
    href: "/gifts",
  },
  {
    key: "valentines",
    emoji: "❤️",
    headline: {
      ar: "قطعة فنية للي تحبهم",
      en: "An art piece for the ones you love",
    },
    window: [1, 15, 2, 14],
    href: "/gifts",
  },
  {
    key: "graduation",
    emoji: "🎓",
    headline: {
      ar: "هدية التخرج اللي ما حد هيقلدها",
      en: "A graduation gift no one else will have",
    },
    window: [5, 1, 6, 30],
    href: "/gifts",
  },
  {
    key: "ramadan",
    emoji: "🌙",
    headline: {
      ar: "هدايا رمضان جاهزة",
      en: "Ramadan gifts ready",
    },
    window: [2, 20, 4, 10],
    href: "/gifts",
  },
];

function isWithinWindow(
  now: Date,
  [sm, sd, em, ed]: [number, number, number, number]
): boolean {
  const year = now.getFullYear();
  const start = new Date(year, sm - 1, sd);
  const end = new Date(year, em - 1, ed, 23, 59, 59);
  return now >= start && now <= end;
}

function daysUntilEnd(
  now: Date,
  [, , em, ed]: [number, number, number, number]
): number {
  const year = now.getFullYear();
  const end = new Date(year, em - 1, ed, 23, 59, 59);
  return Math.max(
    0,
    Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );
}

interface SeasonalMomentProps {
  locale: "ar" | "en";
}

export function SeasonalMoment({ locale }: SeasonalMomentProps) {
  const copy = getStorefrontCopy(locale);
  const now = new Date();
  const active = SEASONAL_EVENTS.find((e) => isWithinWindow(now, e.window));

  if (!active) return null;

  const remaining = daysUntilEnd(now, active.window);
  const countdownText =
    locale === "ar" ? `باقي ${remaining} يوم` : `${remaining} days left`;

  return (
    <section className="horo-home-section">
      <div className="overflow-hidden rounded-[24px] border border-sandstone/35 bg-[linear-gradient(135deg,rgba(196,168,130,0.08),rgba(245,240,232,0.96))]">
        <div className="flex flex-col items-center gap-6 px-6 py-10 text-center md:flex-row md:px-10 md:py-12 md:text-start">
          <div className="text-5xl md:text-6xl">{active.emoji}</div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-charcoal md:text-2xl">
              {active.headline[locale]}
            </h2>
            <p className="mt-2 text-sm text-deep-umber/70">{countdownText}</p>
          </div>
          <Button asChild variant="default" size="lg">
            <Link href={active.href}>{copy.home.seasonalMoment.cta}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
