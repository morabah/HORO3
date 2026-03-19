"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type BuyerPersona = "gift" | "aesthetic" | "default";

/**
 * Detects the buyer persona based on the `?buyer=` query parameter.
 * Default is 'default' if no parameter is provided.
 */
export function useBuyerPersona(): BuyerPersona {
  const searchParams = useSearchParams();
  const [persona, setPersona] = useState<BuyerPersona>("default");

  useEffect(() => {
    if (!searchParams) return;
    const buyerParam = searchParams.get("buyer");
    if (buyerParam === "gift" || buyerParam === "aesthetic") {
      setPersona(buyerParam as BuyerPersona);
      
      // Optionally persist this in sessionStorage or localStorage if needed across pages
      // sessionStorage.setItem("horo_buyer_persona", buyerParam);
    } else {
      // const saved = sessionStorage.getItem("horo_buyer_persona");
      // if (saved === "gift" || saved === "aesthetic") setPersona(saved as BuyerPersona);
    }
  }, [searchParams]);

  return persona;
}
