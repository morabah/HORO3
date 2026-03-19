import { setRequestLocale } from "next-intl/server";
import { getCollectionStories } from "@/lib/sanity/collection-stories";
import { CollectionStoryGrid } from "@/components/catalog/collection-story-grid";
import { PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 60;

export default async function CollectionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";
  const copy = getStorefrontCopy(localeKey);

  const stories = await getCollectionStories(20);

  return (
    <PageShell width="wide">
      <PageIntro
        title={copy.collections.title}
        description={copy.collections.description}
        eyebrow={localeKey === "ar" ? "المسارات" : "Theme-first browsing"}
        aside={<p>{copy.collections.pendingNote}</p>}
      />
      <CollectionStoryGrid stories={stories} locale={localeKey} className="mt-8" />
    </PageShell>
  );
}
