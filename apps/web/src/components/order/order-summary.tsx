"use client";

import { useLocale } from "next-intl";
import { getLastOrder } from "@/lib/browser/order-session";
import { getStorefrontCopy } from "@/lib/storefront/copy";
import { formatEgp } from "@/lib/utils";

interface OrderSummaryProps {
  orderId: string;
}

export function OrderSummary({ orderId }: OrderSummaryProps) {
  const locale = useLocale() === "ar" ? "ar" : "en";
  const copy = getStorefrontCopy(locale);
  const order = getLastOrder();
  const activeOrder = order?.id === orderId || orderId === "latest" ? order : null;
  const isCOD = activeOrder?.paymentMethod === "cod";
  const whatsappNumber = "201000000000"; // Placeholder, replace with actual business number
  const whatsappMessage = encodeURIComponent(
    locale === "ar"
      ? `مرحباً HORO، لقد قمت بطلب أوردر رقم ${orderId}. يرجى تأكيد الطلب لتجهيز الشحن.`
      : `Hello HORO, I just placed order #${orderId}. Please confirm my order so it can be shipped.`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  if (!activeOrder) {
    return (
      <div className="horo-frame-card p-6">
        <p className="text-deep-umber">{copy.common.localSnapshotMissing}</p>
      </div>
    );
  }

  const paymentLabel =
    activeOrder.paymentMethod === "cod"
      ? copy.checkout.paymentMethods.cod.title
      : activeOrder.paymentMethod === "card"
        ? copy.checkout.paymentMethods.card.title
        : copy.checkout.paymentMethods.wallet.title;
  const shippingLabel =
    activeOrder.shippingMethod === "express"
      ? copy.checkout.shippingMethods.express.title
      : copy.checkout.shippingMethods.standard.title;

  return (
    <div className="space-y-4">
      <div className="horo-paper-panel p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-charcoal">{copy.order.details}</h2>
            <p className="mt-2 text-sm leading-7 text-deep-umber">
              {copy.order.snapshotBody}
            </p>
          </div>
          <p className="text-sm text-deep-umber">
            {new Date(activeOrder.createdAt).toLocaleDateString(
              locale === "ar" ? "ar-EG" : "en-EG"
            )}
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {activeOrder.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-radius-md border border-sandstone/60 bg-warm-linen px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                <p className="mt-1 text-sm text-deep-umber">
                  {copy.order.items}: {item.quantity}
                </p>
              </div>
              <p className="font-mono text-sm text-charcoal">
                {formatEgp(item.unitPrice * item.quantity, locale)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="horo-frame-card p-6">
        <dl className="space-y-3 text-sm text-deep-umber">
          <div className="flex items-center justify-between">
            <dt>{copy.order.payment}</dt>
            <dd>{paymentLabel}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>{copy.order.shipping}</dt>
            <dd>{shippingLabel}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>{copy.order.giftPackaging}</dt>
            <dd>
              {activeOrder.giftPackaging
                ? copy.common.giftPackagingIncluded
                : copy.common.giftPackagingNotSelected}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>{copy.order.deliveryArea}</dt>
            <dd>{activeOrder.shippingAddress.city}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>{copy.order.phone}</dt>
            <dd>{activeOrder.shippingAddress.phone}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-sandstone/50 pt-3 font-semibold text-charcoal">
            <div>
              <dt>{copy.order.total}</dt>
              <span className="text-xs font-normal text-deep-umber/80 block mt-0.5">
                {locale === "ar" ? "(شامل الشحن والرسوم)" : "(Includes shipping & fees)"}
              </span>
            </div>
            <dd className="text-right">{formatEgp(activeOrder.total, locale)}</dd>
          </div>
        </dl>
      </div>

      {isCOD && (
        <div className="horo-frame-card p-6 mt-6 bg-[#F5F0E8] border-burnt-sienna/50">
          <h3 className="text-lg font-semibold text-charcoal mb-2">
            {locale === "ar" ? "خطوة أخيرة لتأكيد طلبك" : "One final step to confirm your order"}
          </h3>
          <p className="text-sm font-medium text-burnt-sienna mb-2">
            {locale === "ar" 
              ? "سنتواصل معك عبر واتساب خلال ساعتين لتأكيد الشحن."
              : "We will WhatsApp you within 2 hours to confirm dispatch."}
          </p>
          <p className="text-sm text-deep-umber mb-4">
            {locale === "ar" 
              ? "يمكنك أيضاً تسريع العملية وتأكيد الطلب الآن بالضغط على الزر أدناه."
              : "You can also speed up the process and confirm your order now by clicking the button below."}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-radius-md bg-[#25D366] px-4 py-3 text-sm font-semibold text-true-white hover:bg-[#20bd5a] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.181-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.688.063-2.002-.487-1.558-.65-2.56-2.23-2.613-2.301-.053-.071-.624-.834-.624-1.593 0-.759.395-1.127.534-1.282.14-.155.304-.194.404-.194.101 0 .202.001.289.005.093.003.218-.037.342.261.128.307.439 1.077.478 1.154.039.077.065.166.013.269-.053.103-.079.166-.157.257-.078.092-.164.205-.235.281-.079.083-.162.176-.068.338.093.161.417.689.897 1.119.619.554 1.139.728 1.303.805.164.077.26.062.357-.035.097-.097.417-.487.528-.655.111-.168.223-.14.373-.083.15.056.953.45 1.116.531.164.081.273.123.313.194.041.071.041.412-.103.817z" />
            </svg>
            {locale === "ar" ? "تأكيد الطلب عبر واتساب" : "Confirm via WhatsApp"}
          </a>
        </div>
      )}
    </div>
  );
}
