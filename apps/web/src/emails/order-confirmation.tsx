import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { emailStyles, getEmailBrandSignature } from "./shared";

type OrderConfirmationEmailProps = {
  orderId?: string;
  locale?: string;
};

export function OrderConfirmationEmail({
  orderId = "HORO-001",
  locale = "ar",
}: OrderConfirmationEmailProps) {
  const isRtl = locale === "ar";
  const preview = locale === "ar" ? `تم تأكيد طلب HORO رقم ${orderId}` : `Your HORO order ${orderId} is confirmed`;

  return (
    <Html dir={isRtl ? "rtl" : "ltr"} lang={locale}>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Text style={emailStyles.eyebrow}>{locale === "ar" ? "تأكيد الطلب" : "Order confirmation"}</Text>
          <Heading style={emailStyles.heading}>HORO</Heading>
          <Section>
            <Text style={emailStyles.text}>
              {locale === "ar"
                ? `تم تأكيد طلبك #${orderId}. سنرسل لك تحديثات الشحن عبر البريد الإلكتروني أو واتساب، وسنراجع أي تفاصيل تخص الدفع عند الاستلام قبل الإرسال.`
                : `Your order #${orderId} is confirmed. We will send shipping updates by email or WhatsApp, and we will confirm any cash-on-delivery details before dispatch.`}
            </Text>
          </Section>
          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.footer}>{getEmailBrandSignature(locale)}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default OrderConfirmationEmail;
