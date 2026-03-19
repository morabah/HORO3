"use client";

interface TrustStripProps {
  locale: "ar" | "en";
}

const messages = {
  ar: [
    "🚚 توصيل لكل المحافظات · الدفع عند الاستلام",
    "🔄 استبدال مجاني خلال ١٤ يوم",
    "💬 دعم واتساب بالعربي",
    "🎁 تغليف هدية مميز",
    "🧵 قطن مصري · GSM ظاهر",
  ],
  en: [
    "🚚 Nationwide delivery · Cash on delivery",
    "🔄 Free exchange within 14 days",
    "💬 Arabic WhatsApp support",
    "🎁 Signature gift packaging",
    "🧵 Egyptian cotton · GSM visible",
  ],
} as const;

/**
 * Continuous scrolling marquee trust bar.
 * Shows ALL trust messages simultaneously in an infinite loop —
 * pattern borrowed from editorial fashion wireframes.
 * 38px height, compact, never intrusive.
 */
export function TrustStrip({ locale }: TrustStripProps) {
  const items = messages[locale];
  // Duplicate 3× for seamless infinite loop
  const repeated = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-b border-sandstone/20 bg-sandstone/10">
      <div className="mx-auto flex w-full max-w-[100vw] items-center py-2.5">
        <div
          className="flex shrink-0 animate-[marquee_35s_linear_infinite]"
          style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
        >
          {repeated.map((msg, i) => (
            <span
              key={`${msg}-${i}`}
              className="mx-6 shrink-0 whitespace-nowrap text-xs font-medium tracking-wide text-deep-umber md:text-sm"
            >
              {msg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
