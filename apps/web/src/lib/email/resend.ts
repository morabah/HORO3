import type { ReactElement } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: ReactElement;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set; skipping email");
    return { id: null, error: new Error("Resend not configured") };
  }
  return resend.emails.send({
    from: process.env.RESEND_FROM ?? "HORO <orders@horo.example.com>",
    to: [to],
    subject,
    react,
  });
}
