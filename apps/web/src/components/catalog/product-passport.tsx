"use client";



interface ProductPassportProps {
  locale: "ar" | "en";
  artistName: string;
}

export function ProductPassport({ locale, artistName }: ProductPassportProps) {
  return (
    <div className="mt-8 rounded-[16px] border border-sandstone/40 bg-warm-linen/50 p-5 md:p-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-sandstone/5 mix-blend-multiply opacity-50" style={{ backgroundImage: 'url("/images/noise-texture.png")', backgroundSize: '150px' }}></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-sandstone/30 pb-4 mb-4">
          <h3 className="text-sm font-semibold tracking-wide text-charcoal uppercase">
            {locale === "ar" ? "جواز سفر القطعة الفنية" : "Digital Product Passport"}
          </h3>
          <div className="h-6 w-6 rounded-sm bg-charcoal/5 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal/60">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
        </div>

        <ul className="space-y-5">
          {/* Step 1: Material */}
          <li className="flex items-start gap-4">
            <div className="mt-0.5 shrink-0 rounded-full bg-sandstone/20 p-2 text-burnt-sienna">
              <SpoolIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">
                {locale === "ar" ? "100% قطن مصري" : "100% Egyptian Cotton"}
              </p>
              <p className="mt-1 text-xs text-deep-umber/80 leading-relaxed">
                {locale === "ar"
                  ? "قماش سميك بوزن 280 GSM منسوج محلياً لتحمل الغسيل المتكرر والحفاظ على شكل القطعة."
                  : "Heavyweight 280 GSM locally milled fabric, designed for structural drape and longevity."}
              </p>
            </div>
          </li>

          {/* Step 2: Artist Attribution */}
          <li className="flex items-start gap-4">
            <div className="mt-0.5 shrink-0 rounded-full bg-sandstone/20 p-2 text-burnt-sienna">
              <BrushIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">
                {locale === "ar" ? `رسمة أصلية لـ ${artistName}` : `Original Art by ${artistName}`}
              </p>
              <p className="mt-1 text-xs text-deep-umber/80 leading-relaxed">
                {locale === "ar"
                  ? "الفنان شريك في هذا العمل ويحصل على نسبة عادلة من كل قطعة مباعة. (Fair Royalty Paid)"
                  : "The artist is a partner in this drop and receives a fair royalty from every sale."}
              </p>
            </div>
          </li>

          {/* Step 3: Print Tech */}
          <li className="flex items-start gap-4">
            <div className="mt-0.5 shrink-0 rounded-full bg-sandstone/20 p-2 text-burnt-sienna">
              <PrinterIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">
                {locale === "ar" ? "مطبوع في القاهرة (DTF)" : "DTF Printed in Cairo"}
              </p>
              <p className="mt-1 text-xs text-deep-umber/80 leading-relaxed">
                {locale === "ar"
                  ? "تمت الطباعة بأحدث تقنيات الـ DTF لضمان ألوان دقيقة لا تتشقق وتصمد لآلاف الغسلات."
                  : "Printed using advanced Direct-To-Film technology for crack-resistant, ultra-high definition colors."}
              </p>
            </div>
          </li>
        </ul>

        <div className="mt-5 border-t border-sandstone/30 pt-4 flex items-center gap-3">
          <QrCodeIcon className="h-5 w-5 text-deep-umber/50" />
          <p className="text-[11px] uppercase tracking-widest text-deep-umber/60">
            {locale === "ar" ? "أصالة محققة عبر HORO" : "Authenticity Verified By HORO"}
          </p>
        </div>
      </div>
    </div>
  );
}

function SpoolIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/>
      <path d="M12 3v18"/><path d="M8 9h8"/><path d="M8 15h8"/>
    </svg>
  );
}

function BrushIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>
    </svg>
  );
}

function PrinterIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>
    </svg>
  );
}

function QrCodeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>
    </svg>
  );
}
