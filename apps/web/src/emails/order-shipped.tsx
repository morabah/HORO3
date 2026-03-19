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

type OrderShippedEmailProps = {
  orderId?: string;
  trackingUrl?: string;
  locale?: string;
};

export function OrderShippedEmail({
  orderId = "HORO-001",
  trackingUrl,
  locale = "ar",
}: OrderShippedEmailProps) {
  const isRtl = locale === "ar";
  return (
    <Html dir={isRtl ? "rtl" : "ltr"} lang={locale}>
      <Head />
      <Preview>{locale === "ar" ? "تم شحن طلبك" : "Your order has shipped"}</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Text style={emailStyles.eyebrow}>{locale === "ar" ? "تحديث الشحن" : "Shipping update"}</Text>
          <Heading style={emailStyles.heading}>HORO</Heading>
          <Section>
            <Text style={emailStyles.text}>
              {locale === "ar"
                ? `تم شحن طلبك #${orderId}.${trackingUrl ? ` يمكنك تتبع الشحنة هنا: ${trackingUrl}` : " سنرسل لك نافذة الوصول حالما تتأكد مع شركة الشحن."}`
                : `Your order #${orderId} has shipped.${trackingUrl ? ` You can track it here: ${trackingUrl}` : " We will share the delivery window as soon as the courier confirms it."}`}
            </Text>
          </Section>
          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.footer}>{getEmailBrandSignature(locale)}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default OrderShippedEmail;
