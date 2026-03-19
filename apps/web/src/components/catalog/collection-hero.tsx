import type { ProductCategory } from "@/lib/medusa/types";
import type { SanityCollectionStory } from "@/lib/sanity/collection-stories";

interface CollectionHeroProps {
  collection: ProductCategory;
  story?: SanityCollectionStory | null;
  locale?: "ar" | "en";
}

export function CollectionHero({
  collection,
  story,
  locale = "en",
}: CollectionHeroProps) {
  const title = locale === "ar" ? story?.title_ar ?? collection.name : story?.title_en ?? collection.name;
  const body = locale === "ar"
    ? story?.body_ar ?? collection.description
    : story?.body_en ?? collection.description;

  return (
    <header className="pb-6 md:pb-8">
      {story?.theme && (
        <p className="horo-kicker">
          {story.theme.replace("_", " ")}
        </p>
      )}
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-charcoal md:text-4xl">{title}</h1>
      {body && (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-charcoal/90">{body}</p>
      )}
    </header>
  );
}
