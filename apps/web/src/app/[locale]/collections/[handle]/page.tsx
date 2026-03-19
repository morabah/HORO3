import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollectionByHandle } from "@/lib/medusa/collections";
import { getProducts } from "@/lib/medusa/products";
import { getCollectionStoryByHandle } from "@/lib/sanity/collection-stories";
import { getArtists } from "@/lib/sanity/queries";
import { CollectionHero } from "@/components/catalog/collection-hero";
import { ProductCard } from "@/components/catalog/product-card";
import { EmptyState, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string; handle: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, handle } = await params;
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";
  const [collection, story] = await Promise.all([
    getCollectionByHandle(handle),
    getCollectionStoryByHandle(handle),
  ]);

  const title = localeKey === "ar"
    ? story?.title_ar ?? collection?.name
    : story?.title_en ?? collection?.name;
  const description = localeKey === "ar"
    ? story?.excerpt_ar ?? story?.body_ar ?? collection?.description
    : story?.excerpt_en ?? story?.body_en ?? collection?.description;

  return {
    title: title ?? "Collection",
    description: description ?? undefined,
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      images: story?.hero_image?.asset?.url ? [story.hero_image.asset.url] : undefined,
    },
  };
}

export default async function CollectionHandlePage({ params }: Props) {
  const { locale, handle } = await params;
  setRequestLocale(locale);
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";
  const copy = getStorefrontCopy(localeKey);

  const collection = await getCollectionByHandle(handle);
  if (!collection) notFound();
  const story = await getCollectionStoryByHandle(handle);

  let products: Awaited<ReturnType<typeof getProducts>>["products"] = [];
  let artists: Awaited<ReturnType<typeof getArtists>> = [];
  try {
    const [productRes, artistRes] = await Promise.all([
      getProducts({ collection_id: collection.id, limit: 50 }),
      getArtists().catch(() => []),
    ]);
    products = productRes.products ?? [];
    artists = artistRes;
  } catch {
    // ignore and render customer-safe fallbacks
  }

  const artistMap = new Map(
    artists.map((artist) => [
      artist._id,
      localeKey === "ar" ? artist.name_ar ?? artist.name_en : artist.name_en ?? artist.name_ar,
    ])
  );
  const hasPendingProducts = products.some((product) => !product.compliance?.canPurchase);

  return (
    <div className="flex-grow w-full max-w-[1600px] mx-auto px-6 md:px-12 py-8 md:py-12 flex flex-col lg:flex-row gap-12 relative bg-[#F8F4EC]">
      
      {/* Left Sidebar: Title & Filters */}
      <aside className="w-full lg:w-1/4 xl:w-1/5 lg:sticky lg:top-[120px] self-start space-y-12">
        
        {/* Header Info */}
        <div className="space-y-6">
          <h1 className="font-serif text-[44px] md:text-6xl font-black tracking-tight text-[#3A302A] leading-none">
            {localeKey === "ar"
              ? story?.title_ar ?? collection.name
              : story?.title_en ?? collection.name}
          </h1>
          <p className="text-[17px] leading-[1.6] text-[#867B71] max-w-sm pr-4">
            {localeKey === "ar"
              ? story?.excerpt_ar ?? story?.body_ar ?? collection.description
              : story?.excerpt_en ?? story?.body_en ?? collection.description}
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-10 border-t border-[#EAE3DB] pt-10">
          
          {/* Category Filter */}
          <div className="space-y-5">
            <button className="w-full flex justify-between items-center text-[13px] font-bold tracking-[0.15em] text-[#867B71] uppercase">
              {localeKey === "ar" ? "الفئة" : "CATEGORY"}
              <svg className="w-4 h-4 text-[#867B71]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></svg>
            </button>
            <div className="space-y-4 pt-1 text-[17px] text-[#3A302A]">
              {['T-Shirts', 'Hoodies', 'Tote Bags', 'Accessories'].map((cat) => (
                <label key={cat} className="flex items-center cursor-pointer group">
                  <span className="group-hover:opacity-70 transition-opacity">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-5 border-t border-[#EAE3DB] pt-8">
            <button className="w-full flex justify-between items-center text-[13px] font-bold tracking-[0.15em] text-[#867B71] uppercase">
              {localeKey === "ar" ? "المقاس" : "SIZE"}
              <svg className="w-4 h-4 text-[#867B71]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></svg>
            </button>
            <div className="space-y-4 pt-1 text-[17px] text-[#3A302A]">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <label key={size} className="flex items-center space-x-3 cursor-pointer group">
                  <input className="form-checkbox h-5 w-5 text-[#3A302A] border-[#867B71] rounded-full focus:ring-[#3A302A] bg-transparent transition-colors cursor-pointer" type="checkbox" />
                  <span className="group-hover:opacity-70 transition-opacity pl-2">{size}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Product Grid Area */}
      <section className="w-full lg:w-3/4 xl:w-4/5">
        {hasPendingProducts ? (
          <div className="mb-6 rounded-[2rem] bg-white p-4 text-sm leading-7 text-[#3D352E] shadow-sm">
            {copy.collections.pendingNote}
          </div>
        ) : null}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[auto]">
            {products.map((product, index) => {
              // Determine layout placement based on index to recreate the masonry feel
              // Let's make every 1st and 4th item a large card if in a 3-col grid
              const isLargeCard = index % 3 === 0;
              
              return (
                <div 
                  key={product.id} 
                  className={isLargeCard ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : "col-span-1 flex flex-col h-full"}
                >
                  <ProductCard
                    product={product}
                    artistName={artistMap.get(product.metadata?.artist_id ?? "") ?? null}
                    isLargeCard={isLargeCard} 
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            className="mt-8"
            title={copy.collections.title}
            description={copy.collections.empty}
          />
        )}
      </section>

    </div>
  );
}
