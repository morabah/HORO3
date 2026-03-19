import {
  Body,
  Button,
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

type AbandonedCartEmailProps = {
  locale?: string;
  cartUrl?: string;
};

export function AbandonedCartEmail({
  locale = "ar",
  cartUrl = "https://horo.eg/cart",
}: AbandonedCartEmailProps) {
  const isRtl = locale === "ar";
  return (
    <Html dir={isRtl ? "rtl" : "ltr"} lang={locale}>
      <Head />
      <Preview>{locale === "ar" ? "سلتك في انتظارك" : "Your bag is waiting"}</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Text style={emailStyles.eyebrow}>{locale === "ar" ? "تذكير بالسلة" : "Bag reminder"}</Text>
          <Heading style={emailStyles.heading}>HORO</Heading>
          <Section>
            <Text style={emailStyles.text}>
              {locale === "ar"
                ? "نسيت حاجة؟ السلّة اللي اخترتها لسه موجودة. كمل طلبك أو تواصل معانا على واتساب لو محتاج مساعدة."
                : "Forgot something? The items you left in your bag are still there. Complete your order or message us on WhatsApp if you need help."}
            </Text>
            <Button style={emailStyles.button} href={cartUrl}>
              {locale === "ar" ? "استكمل الطلب" : "Complete order"}
            </Button>
          </Section>
          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.footer}>{getEmailBrandSignature(locale)}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default AbandonedCartEmail;
