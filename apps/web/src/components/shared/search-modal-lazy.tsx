"use client";

import dynamic from "next/dynamic";

export const SearchModalLazy = dynamic(
  () => import("./search-modal").then((m) => ({ default: m.SearchModal })),
  { ssr: false }
);
