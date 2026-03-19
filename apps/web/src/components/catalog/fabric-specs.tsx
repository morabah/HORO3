"use client";

import { useState } from "react";
import type { Product, ModelStat } from "@/lib/medusa/types";
import { captureEvent } from "@/lib/analytics/posthog";
import { getLocalizedProductTitle } from "@/lib/storefront/product-localization";

interface FabricSpecsProps {
  product: Product;
  locale: "ar" | "en";
}

export function FabricSpecs({ product, locale }: FabricSpecsProps) {
  const [open, setOpen] = useState(true);
  const meta = product.metadata ?? {};
  const gsm = meta.fabric_weight_gsm;
  const composition = meta.fabric_composition;
  const printMethod = meta.print_method;
  const modelStats = (meta.model_stats ?? []) as ModelStat[];
  const care = meta.care_instructions;
  const washTestVerified = meta.wash_test_verified;
  const productTitle = getLocalizedProductTitle(product, locale) ?? product.title;

  return (
    <div className="horo-frame-card overflow-hidden">
      <button
        type="button"
        onClick={() => {
          const nextOpen = !open;
          setOpen(nextOpen);
          if (nextOpen) {
            captureEvent("fabric_details_expanded", {
              handle: product.handle,
              title: productTitle,
            });
          }
        }}
        className="w-full flex items-center justify-between px-4 py-3 text-start bg-warm-linen hover:bg-parchment text-charcoal font-medium"
      >
        <span>{locale === "ar" ? "تفاصيل الخامة والطباعة" : "Fabric & print details"}</span>
        <span className="text-deep-umber">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-sandstone/50 bg-warm-linen text-sm text-deep-umber space-y-2">
          {composition && (
            <p>
              <strong className="text-charcoal">{locale === "ar" ? "الخامة:" : "Fabric:"}</strong> {composition}
            </p>
          )}
          {gsm != null && (
            <p>
              <strong className="text-charcoal">{locale === "ar" ? "الوزن:" : "Weight:"}</strong> {gsm} GSM
            </p>
          )}
          {printMethod && (
            <p>
              <strong className="text-charcoal">{locale === "ar" ? "الطباعة:" : "Print:"}</strong> {printMethod}
            </p>
          )}
          {modelStats.length > 0 && (
            <div>
              <strong className="text-charcoal">{locale === "ar" ? "الموديل:" : "Model:"}</strong>
              <ul className="mt-1 list-disc list-inside">
                {modelStats.map((m, i) => (
                  <li key={i}>
                    {locale === "ar"
                      ? `${m.height_cm} سم، ${m.weight_kg} كجم، لابس ${m.size_worn}`
                      : `${m.height_cm}cm, ${m.weight_kg}kg, wearing ${m.size_worn}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {Array.isArray(care) && care.length > 0 && (
            <p>
              <strong className="text-charcoal">{locale === "ar" ? "العناية:" : "Care:"}</strong> {care.join("; ")}
            </p>
          )}
          {washTestVerified && (
            <p className="text-charcoal">
              {locale === "ar" ? "✓ تم التحقق من اختبار الغسيل (3 غسلات أو أكثر)" : "✓ Wash-test verified (3+ washes)"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
