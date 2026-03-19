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

type ReviewRequestEmailProps = {
  locale?: string;
};

export function ReviewRequestEmail({ locale = "ar" }: ReviewRequestEmailProps) {
  const isRtl = locale === "ar";
  return (
    <Html dir={isRtl ? "rtl" : "ltr"} lang={locale}>
      <Head />
      <Preview>{locale === "ar" ? "شاركنا رأيك" : "Share your experience"}</Preview>
      <Body style={emailStyles.main}>
        <Container style={emailStyles.container}>
          <Text style={emailStyles.eyebrow}>{locale === "ar" ? "رأيك يهمنا" : "Customer proof"}</Text>
          <Heading style={emailStyles.heading}>HORO</Heading>
          <Section>
            <Text style={emailStyles.text}>
              {locale === "ar"
                ? "وصلك الطلب؟ نتمنى تكون القطعة عجبتك بالفعل. شاركنا رأيك أو صورة بعد الاستلام، وإذا أحببت سننشرها بإذنك."
                : "Did your order arrive? We hope the piece feels right. Share your feedback or a photo after delivery, and with your permission we may feature it."}
            </Text>
          </Section>
          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.footer}>{getEmailBrandSignature(locale)}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ReviewRequestEmail;
