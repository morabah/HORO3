"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-12 md:h-11 w-full rounded-md border border-sandstone bg-true-white px-3 py-2 text-base text-charcoal",
          "focus:outline-none focus:ring-2 focus:ring-burnt-sienna focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "text-start",
          "transition-normal",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Select };
