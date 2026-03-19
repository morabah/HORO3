"use client";

import Image from "next/image";

interface TrustSectionProps {
  locale: "ar" | "en";
}

const features = {
  ar: [
    { title: "١٠٠٪ قطن مصري", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48ZM12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /> },
    { title: "طباعة DTF فاخرة", icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.618 0-1.113-.493-1.12-1.112L5.87 18m11.79 0H6.34M18 13.187V9.25A2.25 2.25 0 0 0 15.75 7h-7.5A2.25 2.25 0 0 0 6 9.25v3.937m12 0a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 6 13.187m12 0c.15.021.298.046.446.075a2.25 2.25 0 0 0 2.304-2.23V7.312a2.25 2.25 0 0 0-2.304-2.23C17.298 5.111 16.15 5.064 15 5.043M6 13.187a2.252 2.252 0 0 1-.446.075 2.25 2.25 0 0 1-2.304-2.23V7.312a2.25 2.25 0 0 1 2.304-2.23C6.702 5.111 7.85 5.064 9 5.043M15 5.043V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2.043m6 0a45.02 45.02 0 0 1-6 0" /></> },
    { title: "تغليف هدايا راقي", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /> },
    { title: "الدفع عند الاستلام + تتبع واتساب", icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-.442-.256-.837-.662-1.012l-3.358-1.44a1.125 1.125 0 0 0-1.002 0l-3.358 1.44c-.406.175-.662.57-.662 1.012v3m3.375 3.375h-1.5m1.5-1.5v1.5m0-1.5h1.5m-1.5 0v-1.5" /></> },
  ],
  en: [
    { title: "100% Egyptian Cotton", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48ZM12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /> },
    { title: "Premium DTF Print", icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.618 0-1.113-.493-1.12-1.112L5.87 18m11.79 0H6.34M18 13.187V9.25A2.25 2.25 0 0 0 15.75 7h-7.5A2.25 2.25 0 0 0 6 9.25v3.937m12 0a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 6 13.187m12 0c.15.021.298.046.446.075a2.25 2.25 0 0 0 2.304-2.23V7.312a2.25 2.25 0 0 0-2.304-2.23C17.298 5.111 16.15 5.064 15 5.043M6 13.187a2.252 2.252 0 0 1-.446.075 2.25 2.25 0 0 1-2.304-2.23V7.312a2.25 2.25 0 0 1 2.304-2.23C6.702 5.111 7.85 5.064 9 5.043M15 5.043V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2.043m6 0a45.02 45.02 0 0 1-6 0" /></> },
    { title: "Gift-Ready Packaging", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /> },
    { title: "COD + WhatsApp Tracking", icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-.442-.256-.837-.662-1.012l-3.358-1.44a1.125 1.125 0 0 0-1.002 0l-3.358 1.44c-.406.175-.662.57-.662 1.012v3m3.375 3.375h-1.5m1.5-1.5v1.5m0-1.5h1.5m-1.5 0v-1.5" /></> },
  ],
};

export function TrustSection({ locale }: TrustSectionProps) {
  const items = locale === "ar" ? features.ar : features.en;

  return (
    <section className="py-8 px-4 bg-charcoal text-warm-linen" data-purpose="features-strip">
      <div className="grid grid-cols-2 gap-y-8 gap-x-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-10 h-10 mb-2 opacity-80">
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {item.icon}
              </svg>
            </div>
            <p className={`text-[13px] font-medium ${locale === "ar" ? "font-sans-rtl" : "font-sans"}`}>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
