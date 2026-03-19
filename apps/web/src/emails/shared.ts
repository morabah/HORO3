import type { CSSProperties } from "react";

const fontFamily = "\"IBM Plex Sans Arabic\", \"IBM Plex Sans\", \"Segoe UI\", Arial, sans-serif";

export const emailStyles: Record<string, CSSProperties> = {
  main: {
    backgroundColor: "#F5F0E8",
    fontFamily,
    padding: "24px 0",
  },
  container: {
    margin: "0 auto",
    padding: "28px",
    maxWidth: "560px",
    backgroundColor: "#FFF8F0",
    border: "1px solid #C4A882",
    borderRadius: "20px",
  },
  eyebrow: {
    margin: "0 0 12px",
    color: "#A1542A",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  },
  heading: {
    margin: "0",
    color: "#2C2C2C",
    fontSize: "28px",
    fontWeight: "700",
    lineHeight: "1.3",
  },
  text: {
    margin: "0",
    color: "#3D3229",
    fontSize: "16px",
    lineHeight: "28px",
  },
  button: {
    display: "inline-block",
    marginTop: "18px",
    backgroundColor: "#8B5E3C",
    color: "#F5F0E8",
    padding: "12px 24px",
    borderRadius: "999px",
    fontWeight: "600",
    textDecoration: "none",
  },
  hr: {
    borderColor: "#C4A882",
    margin: "24px 0",
  },
  footer: {
    margin: "0",
    color: "#6F5A4C",
    fontSize: "12px",
    lineHeight: "20px",
  },
};

export function getEmailBrandSignature(locale: string) {
  return locale === "ar"
    ? "HORO | ارتدِ هويتك عبر الفن"
    : "HORO | Wear Identity Through Art";
}
