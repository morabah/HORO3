"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface SearchHit {
  id?: string;
  title?: string;
  handle?: string;
}

export function SearchModal() {
  const router = useRouter();
  const locale = useLocale() === "ar" ? "ar" : "en";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setHits([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&locale=${locale}`);
      const data = await res.json();
      setHits(Array.isArray(data.hits) ? data.hits : []);
    } catch {
      setHits([]);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    const t = setTimeout(() => runSearch(query), 300);
    return () => clearTimeout(t);
  }, [query, runSearch]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("horo:open-search", onOpen);
    return () => window.removeEventListener("horo:open-search", onOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{locale === "ar" ? "ابحث في القطع" : "Search products"}</DialogTitle>
        </DialogHeader>
        <Input
          placeholder={locale === "ar" ? "ابحث عن قطعة أو فنان" : "Search products or artists"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="mt-4"
        />
        {loading && <p className="text-sm text-deep-umber mt-2">{locale === "ar" ? "جاري البحث..." : "Searching..."}</p>}
        <ul className="mt-4 max-h-64 overflow-y-auto space-y-2" role="list">
          {hits.map((hit) => (
            <li key={hit.id ?? hit.handle ?? ""}>
              <button
                type="button"
                className="w-full text-start px-3 py-2 rounded-md hover:bg-parchment text-charcoal"
                onClick={() => {
                  if (hit.handle) router.push(`/products/${hit.handle}`);
                  setOpen(false);
                }}
              >
                {hit.title ?? hit.handle}
              </button>
            </li>
          ))}
        </ul>
        {query && !loading && hits.length === 0 && (
          <p className="text-sm text-deep-umber mt-2">{locale === "ar" ? "لا توجد نتائج." : "No results."}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
