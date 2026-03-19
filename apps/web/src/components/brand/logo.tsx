"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "latin" | "arabic" | "bilingual" | "frame";

const sources: Record<LogoVariant, { src: string; width: number; height: number; alt: string }> = {
  latin: {
    src: "/brand/horo-wordmark-latin.svg",
    width: 240,
    height: 72,
    alt: "HORO wordmark",
  },
  arabic: {
    src: "/brand/horo-wordmark-arabic.svg",
    width: 220,
    height: 80,
    alt: "هورو wordmark",
  },
  bilingual: {
    src: "/brand/horo-lockup-bilingual.svg",
    width: 220,
    height: 110,
    alt: "HORO هورو bilingual lockup",
  },
  frame: {
    src: "/brand/horo-frame.svg",
    width: 128,
    height: 128,
    alt: "HORO frame motif",
  },
};

interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
  decorative?: boolean;
}

export function BrandLogo({
  variant = "latin",
  className,
  decorative = false,
}: BrandLogoProps) {
  const asset = sources[variant];

  return (
    <Image
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={decorative ? "" : asset.alt}
      aria-hidden={decorative ? true : undefined}
      className={cn("block h-auto max-w-full", className)}
      priority={variant !== "frame"}
    />
  );
}
