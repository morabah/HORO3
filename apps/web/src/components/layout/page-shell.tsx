"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
  width?: "wide" | "default" | "narrow";
}

const widthClassMap = {
  wide: "max-w-7xl",
  default: "max-w-6xl",
  narrow: "max-w-3xl",
} as const;

export function PageShell({
  children,
  className,
  width = "default",
}: PageShellProps) {
  return (
    <main
      id="main-content"
      className={cn(
        "mx-auto w-full px-4 py-8 md:px-6 md:py-10",
        widthClassMap[width],
        className
      )}
    >
      {children}
    </main>
  );
}

interface PageIntroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  aside?: ReactNode;
  className?: string;
}

export function PageIntro({
  title,
  description,
  eyebrow,
  aside,
  className,
}: PageIntroProps) {
  return (
    <header className={cn("horo-paper-panel horo-soft-gradient p-6 md:p-8", className)}>
      <div className={cn("grid gap-6", aside && "lg:grid-cols-[1.15fr_0.85fr] lg:items-start")}>
        <div>
          {eyebrow ? <p className="horo-kicker">{eyebrow}</p> : null}
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-charcoal md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-3xl text-sm leading-7 text-deep-umber md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {aside ? (
          <div className="horo-frame-card p-5 text-sm leading-7 text-deep-umber">{aside}</div>
        ) : null}
      </div>
    </header>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "horo-frame-card flex flex-col items-start gap-4 p-6 md:p-8",
        className
      )}
    >
      <div>
        <h2 className="font-display text-2xl font-semibold text-charcoal">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-deep-umber">{description}</p>
      </div>
      {action}
    </section>
  );
}
