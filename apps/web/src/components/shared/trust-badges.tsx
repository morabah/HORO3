"use client";

interface TrustBadgesProps {
  locale?: "ar" | "en";
}

export function TrustBadges({ locale = "en" }: TrustBadgesProps) {
  const items = locale === "ar"
    ? [
        "قماش ووزن GSM واضح",
        "غسيل مجرب وموثق",
        "تأكيد واتساب للـ COD",
        "نسبة الفنان ظاهرة",
      ]
    : [
        "Fabric composition + GSM",
        "Wash-test verified",
        "COD via WhatsApp confirmation",
        "Artist attribution included",
      ];

  return (
    <ul className="flex flex-wrap gap-4 text-sm text-deep-umber" role="list">
      {items.map((item) => (
        <li key={item}>✓ {item}</li>
      ))}
    </ul>
  );
}
