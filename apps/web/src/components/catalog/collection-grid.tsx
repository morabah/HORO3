"use client";

import { Link } from "@/i18n/routing";
import type { ProductCategory } from "@/lib/medusa/types";

interface CollectionGridProps {
  collections: ProductCategory[];
  className?: string;
}

export function CollectionGrid({ collections, className = "" }: CollectionGridProps) {
  if (collections.length === 0) {
    return (
      <p className="text-deep-umber py-8">
        No collections yet. Add products and categories in Medusa.
      </p>
    );
  }

  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      role="list"
    >
      {collections.map((c) => (
        <li key={c.id}>
          <Link
            href={`/collections/${c.handle}`}
            className="block rounded-radius-lg border border-sandstone/50 bg-warm-linen p-6 hover:border-sandstone hover:shadow-sm transition-all"
          >
            <h2 className="text-lg font-semibold text-charcoal">{c.name}</h2>
            {c.description && (
              <p className="mt-2 text-sm text-deep-umber line-clamp-2">{c.description}</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
