"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { completeCart } from "@/lib/medusa/checkout";
import { getStorefrontCopy } from "@/lib/storefront/copy";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { PageShell } from "@/components/layout/page-shell";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const localeKey = locale === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(localeKey);

  const cartId = searchParams?.get("cart_id") ?? null;
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!cartId) {
      setStatus("error");
      return;
    }
    let cancelled = false;
    (async () => {
      const result = await completeCart(cartId);
      if (cancelled) return;
      if (result?.id) {
        setOrderId(result.id);
        setStatus("done");
      } else {
        setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [cartId]);

  useEffect(() => {
    if (status !== "done" || !orderId) return;
    window.location.href = `/${locale}/order/${orderId}`;
  }, [status, orderId, locale]);

  return (
    <main className="min-h-[40vh] flex flex-col items-center justify-center px-4 py-12">
      {status === "loading" && (
        <p className="text-deep-umber">
          {copy.checkout.success.completingOrder}
        </p>
      )}
      {status === "error" && (
        <div className="text-center space-y-4">
          <h1 className="text-xl font-semibold text-charcoal">
            {copy.checkout.errors.placementFailed}
          </h1>
          <Button asChild>
            <Link href="/checkout">{localeKey === "ar" ? "العودة للدفع" : "Back to checkout"}</Link>
          </Button>
        </div>
      )}
      {status === "done" && !orderId && (
        <p className="text-deep-umber">{copy.checkout.success.completingOrder}</p>
      )}
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <PageShell width="narrow">
      <Suspense fallback={<main className="min-h-[40vh] flex items-center justify-center"><p className="text-deep-umber">Loading...</p></main>}>
        <CheckoutSuccessContent />
      </Suspense>
    </PageShell>
  );
}
