"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BrandLogo } from "@/components/brand/logo";
import { footerNav } from "@/config/nav-config";

interface FooterProps {
  tagline?: string;
  supportEmail?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
}

/** Footer section label translations */
const sectionLabels: Record<string, { ar: string; en: string }> = {
  shop: { ar: "تسوق", en: "Shop" },
  customerCare: { ar: "خدمة العملاء", en: "Customer Care" },
  about: { ar: "عن HORO", en: "About HORO" },
};

/** Footer link label translations */
const linkLabels: Record<string, { ar: string; en: string }> = {
  newArrivals: { ar: "جديد", en: "New Arrivals" },
  themes: { ar: "الأفكار", en: "Themes" },
  artists: { ar: "الفنانون", en: "Artists" },
  limitedEditions: { ar: "إصدارات محدودة", en: "Limited Editions" },
  giftSets: { ar: "طقم هدايا", en: "Gift Sets" },
  exchangePolicy: { ar: "سياسة الاستبدال", en: "Exchange & Returns" },
  shippingDelivery: { ar: "الشحن والتوصيل", en: "Shipping & Delivery" },
  sizeGuide: { ar: "دليل المقاسات", en: "Size Guide" },
  paymentMethods: { ar: "وسائل الدفع", en: "Payment Methods" },
  faq: { ar: "الأسئلة الشائعة", en: "FAQs" },
  orderTracking: { ar: "تتبع الطلب", en: "Order Tracking" },
  ourStory: { ar: "قصتنا", en: "Our Story" },
  ourArtists: { ar: "فنانونا", en: "Our Artists" },
  sustainability: { ar: "الاستدامة", en: "Sustainability" },
};

export function Footer({
  tagline,
  supportEmail,
  instagramUrl,
  whatsappNumber,
}: FooterProps) {
  const t = useTranslations("nav");
  const locale = useLocale() === "ar" ? "ar" : "en";
  const resolvedTagline =
    tagline || (locale === "ar" ? "ارتدِ هويتك عبر الفن" : "Wear Identity Through Art");

  return (
    <footer className="mt-auto border-t border-sandstone/30 bg-warm-linen/90 pt-12 pb-8 px-6">
      <div className="mx-auto w-full max-w-7xl">
        
        <div className="md:grid md:grid-cols-[1fr_2fr] md:gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Top Section: Newsletter (Left Column on Desktop) */}
          <div className="mb-12 md:mb-0">
            <h3 className={`text-lg font-bold mb-4 text-charcoal ${locale === "ar" ? "font-sans-rtl" : "font-sans"}`}>
              {locale === "ar" ? "كن أول من يعرف عن الدروب الجاي" : "Be the first to know about the next drop"}
            </h3>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={locale === "ar" ? "بريدك الإلكتروني" : "Your email"}
                className={`flex-grow rounded-sm border border-sandstone/30 bg-white/50 px-4 py-3 text-sm text-charcoal placeholder:text-deep-umber/50 focus:border-burnt-sienna focus:ring-1 focus:ring-burnt-sienna focus:outline-none ${locale === "ar" ? "font-sans-rtl" : "font-sans"}`}
              />
              <button
                type="submit"
                className={`shrink-0 rounded-sm bg-burnt-sienna px-6 py-3 font-bold text-warm-linen transition-transform active:scale-95 ${locale === "ar" ? "font-sans-rtl" : "font-sans"}`}
              >
                {locale === "ar" ? "اشترك" : "Subscribe"}
              </button>
            </form>

            {/* Brand Logo & Tagline (Desktop under newsletter, mobile hidden or bottom) */}
            <div className="mt-8 hidden md:block">
              <BrandLogo variant="bilingual" className="w-24 md:w-28" />
              <p className="mt-4 max-w-sm text-sm leading-7 text-deep-umber/80">
                {resolvedTagline}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:w-full">
            {/* Middle Section: Links Grid */}
            <div className="grid grid-cols-2 gap-8 mb-12 md:grid-cols-3">
              {footerNav.map((column) => (
                <div key={column.key} className="flex flex-col gap-3">
                  <h4 className="font-bold text-burnt-sienna uppercase text-xs tracking-widest">
                    {sectionLabels[column.key]?.[locale] ?? column.key}
                  </h4>
                  {column.items.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="text-sm font-medium text-deep-umber transition-colors hover:text-burnt-sienna"
                    >
                      {linkLabels[item.key]?.[locale] ?? item.key}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            {/* Prominent WhatsApp CTA */}
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-center gap-3 rounded-lg bg-[#25D366] py-4 font-bold text-white shadow-md transition-transform active:scale-95 mb-12 md:mb-8 md:max-w-md ${locale === "ar" ? "font-sans-rtl" : "font-sans"}`}
                aria-label={locale === "ar" ? "واتساب" : "WhatsApp"}
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Support / تواصل معنا
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar: Brand Logo & Copyright */}
        <div className="text-center border-t border-sandstone/30 pt-8">
          <div className="md:hidden flex justify-center mb-6">
            <BrandLogo variant="bilingual" className="w-24" />
          </div>

          <div className="flex justify-center gap-6 mb-4 opacity-60">
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="text-charcoal hover:text-burnt-sienna transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            )}
            <a href="https://tiktok.com/@horo.eg" target="_blank" rel="noreferrer" className="text-charcoal hover:text-burnt-sienna transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .55.04.81.11V9a6.27 6.27 0 00-.81-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.26a8.27 8.27 0 004.86 1.57V7.38a4.84 4.84 0 01-1.1-.69z" />
              </svg>
            </a>
          </div>
          
          <p className="text-[10px] text-deep-umber/50 uppercase tracking-widest font-sans">
            © {new Date().getFullYear()} HORO EGYPT. ALL RIGHTS RESERVED.
          </p>
          <div className="mt-3 flex justify-center gap-4 text-[10px] text-deep-umber/50 uppercase tracking-widest font-sans">
            <Link href="/policies/privacy" className="hover:text-burnt-sienna transition-colors">
              Privacy & Cookies
            </Link>
            <Link href="/policies/exchange" className="hover:text-burnt-sienna transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
