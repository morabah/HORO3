import type { ProductComplianceReason } from "@/lib/medusa/types";
import { getStorefrontCopy, type StorefrontLocale } from "@/lib/storefront/copy";

interface ProductCompliancePanelProps {
  locale: StorefrontLocale;
  blockingReasons: ProductComplianceReason[];
}

export function ProductCompliancePanel({
  locale,
  blockingReasons,
}: ProductCompliancePanelProps) {
  const copy = getStorefrontCopy(locale);

  return (
    <section className="horo-frame-card border-terracotta/30 bg-true-white p-5">
      <p className="horo-kicker text-terracotta">{copy.product.launchPendingTitle}</p>
      <h2 className="mt-2 text-xl font-semibold text-charcoal">
        {copy.product.launchPendingChecklistTitle}
      </h2>
      <p className="mt-3 text-sm leading-7 text-deep-umber">
        {copy.product.launchPendingBody}
      </p>
      <p className="mt-3 text-sm leading-7 text-deep-umber">
        {copy.product.launchPendingChecklistBody}
      </p>
      <ul className="mt-5 space-y-2 text-sm text-deep-umber" role="list">
        {blockingReasons.map((reason) => (
          <li key={reason} className="rounded-radius-md border border-sandstone/50 bg-warm-linen px-3 py-2">
            {copy.product.reasons[reason]}
          </li>
        ))}
      </ul>
    </section>
  );
}
