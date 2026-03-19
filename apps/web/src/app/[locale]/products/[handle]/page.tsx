import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { getProductByHandle, getProducts } from "@/lib/medusa/products";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { PriceDisplay } from "@/components/catalog/price-display";
import { FabricSpecs } from "@/components/catalog/fabric-specs";
import { AddToCart } from "@/components/catalog/add-to-cart";
import { ArtistBlock } from "@/components/catalog/artist-block";
import { ProductCompliancePanel } from "@/components/catalog/product-compliance-panel";
import { TrustBadges } from "@/components/shared/trust-badges";
import { Reviews } from "@/components/shared/reviews";
import { ProductPassport } from "@/components/catalog/product-passport";
import { getReviewsForProduct } from "@/lib/sanity/reviews";
import { getArtistById } from "@/lib/sanity/queries";
import { getCollectionStoryByHandle } from "@/lib/sanity/collection-stories";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductViewTracker } from "@/components/analytics/product-view-tracker";
import { PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";
import {
  getLocalizedArtistName,
  getLocalizedFitType,
  getLocalizedProductDescription,
  getLocalizedProductTitle,
} from "@/lib/storefront/product-localization";

type Props = { 
  params: Promise<{ locale: string; handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const revalidate = 30;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, handle } = await params;
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";
  const data = await getProductByHandle(handle);
  if (!data) return { title: "Product" };
  const title = getLocalizedProductTitle(data.product, localeKey);
  const description = getLocalizedProductDescription(data.product, localeKey);

  return {
    title: title ?? "Product",
    description: description ?? undefined,
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
    },
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { locale, handle } = await params;
  const searchProps = await searchParams;
  const buyer = searchProps?.buyer as "gift" | "aesthetic" | undefined;
  
  setRequestLocale(locale);
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";
  const copy = getStorefrontCopy(localeKey);

  const data = await getProductByHandle(handle);
  if (!data) notFound();
  const { product } = data;
  const productTitle = getLocalizedProductTitle(product, localeKey) ?? product.title;
  const productDescription = getLocalizedProductDescription(product, localeKey) ?? product.description;
  const localizedArtistName = getLocalizedArtistName(product, localeKey);
  const localizedFitType = getLocalizedFitType(product, localeKey);

  const artistId = product.metadata?.artist_id as string | undefined;
  const artist = artistId ? await getArtistById(artistId).catch(() => null) : null;
  const collectionHandle = product.collection?.handle;
  const story = collectionHandle ? await getCollectionStoryByHandle(collectionHandle) : null;
  const artistName = localeKey === "ar"
    ? artist?.name_ar ?? artist?.name_en ?? localizedArtistName ?? "فنان HORO"
    : artist?.name_en ?? artist?.name_ar ?? localizedArtistName ?? "HORO artist";
  const artistHref = artist?.slug?.current ? `/artists/${artist.slug.current}` : "/artists";
  const relatedProducts = collectionHandle && product.collection_id
    ? ((await getProducts({ collection_id: product.collection_id, limit: 8 }).catch(() => ({ products: [] }))).products ?? [])
        .filter((related) => related.id !== product.id)
        .filter((related) => related.compliance?.canPurchase)
        .slice(0, 4)
    : [];

  // "More from Artist" recommendation: fetch products by same artist across all collections
  const artistProducts = artistId
    ? ((await getProducts({ limit: 12 }).catch(() => ({ products: [] }))).products ?? [])
        .filter((p) => p.metadata?.artist_id === artistId && p.id !== product.id)
        .filter((p) => p.compliance?.canPurchase)
        .slice(0, 4)
    : [];
  const canPurchase = product.compliance?.canPurchase ?? true;

  let reviews: Awaited<ReturnType<typeof getReviewsForProduct>> = [];
  try {
    reviews = await getReviewsForProduct(product.id, localeKey);
  } catch {
    // ignore
  }

  return (
    <PageShell width="wide">
      <ProductViewTracker
        handle={product.handle}
        title={productTitle}
        artist={artistName}
        price={product.variants?.[0]?.prices?.[0]?.amount ?? null}
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery product={product} locale={localeKey} />
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="horo-paper-panel p-5 md:p-6">
            {buyer === "gift" && (
              <div className="mb-6 rounded-[12px] bg-burnt-sienna/10 p-4 border border-burnt-sienna/20">
                <p className="font-semibold text-burnt-sienna text-sm mb-1">
                  {localeKey === "ar" ? "جاهزة كهدية" : "Ready to give"}
                </p>
                <p className="text-xs text-deep-umber leading-relaxed">
                  {localeKey === "ar" 
                    ? "تصل هذه القطعة في صندوق هدية من HORO مع بطاقة فنان وتحديثات تسليم سريعة."
                    : "This piece arrives in a HORO gift box with an artist card and fast delivery updates."}
                </p>
              </div>
            )}
            
            {buyer === "aesthetic" && (
              <div className="mb-6 rounded-[12px] bg-sandstone/15 p-4 border border-sandstone/40">
                <p className="font-semibold text-charcoal text-sm mb-1">
                  {localeKey === "ar" ? "دفعة فنية جديدة" : "Fresh art drop"}
                </p>
                <p className="text-xs text-deep-umber leading-relaxed">
                  {localeKey === "ar"
                    ? "اكتشف القصة وراء العمل الفني مع تفاصيل طباعة واضحة وإرشاد مقاس يساعدك تختار بثقة."
                    : "Discover the story behind the art with sharp print detail and fit guidance that helps you choose with confidence."}
                </p>
              </div>
            )}
            
            <p className="horo-kicker">{copy.product.giftWorthyPiece}</p>
            <p className="mt-3 text-sm text-deep-umber">
              {copy.product.illustrationBy}{" "}
              <Link href={artistHref} className="text-burnt-sienna hover:underline">
                {artistName}
              </Link>
            </p>
            <h1 className="mt-2 font-display text-xl font-semibold tracking-tight text-charcoal md:text-3xl">
              {productTitle}
            </h1>
            {productDescription ? (
              <p className="mt-4 text-sm leading-7 text-deep-umber">
                {productDescription}
              </p>
            ) : null}
            <div className="mt-4 flex items-baseline gap-3">
              <PriceDisplay product={product} />
              {reviews.length > 0 ? (
                <span className="text-sm text-deep-umber">
                  {"★".repeat(Math.round(reviews.reduce((s, r) => s + (r.rating ?? 5), 0) / reviews.length))}
                  {" "}
                  ({reviews.length} {copy.product.reviewSummary})
                </span>
              ) : null}
            </div>
            {localizedFitType ? (
              <p className="mt-2 text-sm text-deep-umber">
                <span className="font-medium text-charcoal">{copy.product.fitLabel}</span>{" "}
                {localizedFitType}
              </p>
            ) : null}
            {product.metadata?.is_limited_edition && product.metadata?.edition_size ? (
              <p className="mt-2 text-sm text-deep-umber">
                {localeKey === "ar"
                  ? `دفعة جديدة - المتبقي ${product.metadata.edition_size} من هذه الرسمة`
                  : `Fresh drop - ${product.metadata.edition_size} left in this illustration run`}
              </p>
            ) : null}

            <div className="mt-6 rounded-radius-md border border-sandstone/60 bg-warm-linen p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-burnt-sienna">
                {copy.product.buyBox.heading}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-deep-umber" role="list">
                <li>{copy.product.buyBox.shipping}</li>
                <li>{copy.product.buyBox.prepaid}</li>
                <li>{copy.product.buyBox.exchange}</li>
                <li>{copy.product.buyBox.gift}</li>
              </ul>
            </div>
            <div className="mt-6 horo-quiet-rule pt-6">
              <AddToCart product={product} />
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/size-guide"
                className="inline-flex flex-1 items-center justify-center rounded-[12px] border border-sandstone/40 bg-white/60 p-3 text-sm font-semibold text-charcoal transition-colors hover:bg-white hover:border-sandstone shadow-sm"
              >
                {localeKey === "ar" ? "دليل المقاسات" : "Size Guide"}
              </Link>
              <Link
                href="/policies/returns"
                className="inline-flex flex-1 items-center justify-center rounded-[12px] border border-sandstone/40 bg-white/60 p-3 text-sm font-semibold text-charcoal transition-colors hover:bg-white hover:border-sandstone shadow-sm"
              >
                {localeKey === "ar" ? "سياسة الاسترجاع (CPA 2023)" : "Return Policy (CPA 2023)"}
              </Link>
            </div>
            <div className="mt-5 rounded-radius-md border border-sandstone/40 bg-sandstone/10 p-4 space-y-3 text-sm leading-6 text-deep-umber">
              <p className="whitespace-pre-line">{copy.product.riskReduction.shipping}</p>
              <p className="whitespace-pre-line">{copy.product.riskReduction.exchange}</p>
              <p className="whitespace-pre-line">{copy.product.riskReduction.packaging}</p>
            </div>
            <div className="mt-6">
              <TrustBadges locale={localeKey} />
            </div>
          </div>

          {!canPurchase && product.compliance?.blockingReasons ? (
            <ProductCompliancePanel
              locale={localeKey}
              blockingReasons={product.compliance.blockingReasons}
            />
          ) : null}

          <div className="horo-frame-card p-4 text-sm text-deep-umber">
            {copy.product.exchangeCard}
          </div>

          <ProductPassport locale={localeKey} artistName={artistName} />

          <FabricSpecs product={product} locale={localeKey} />
          <Reviews reviews={reviews} locale={localeKey} />

          {artistId ? (
            <ArtistBlock
              name={artistName}
              href={artistHref}
              locale={localeKey}
              portraitUrl={artist?.portrait?.asset?.url}
              bio={localeKey === "ar" ? artist?.bio_ar ?? artist?.bio_en : artist?.bio_en ?? artist?.bio_ar}
              studioLocation={artist?.studio_location}
              btsVideoUrl={artist?.bts_video?.asset?.url}
            />
          ) : null}

          {story ? (
            <section className="horo-frame-card p-5">
              <p className="horo-kicker">{localeKey === "ar" ? "قصة المجموعة" : "Collection story"}</p>
              <h2 className="mt-2 text-lg font-semibold text-charcoal">
                {localeKey === "ar" ? story.title_ar ?? story.title_en : story.title_en ?? story.title_ar}
              </h2>
              <p className="mt-3 text-sm leading-7 text-deep-umber">
                {localeKey === "ar" ? story.body_ar ?? story.excerpt_ar : story.body_en ?? story.excerpt_en}
              </p>
            </section>
          ) : null}
        </div>
      </div>

      {artistProducts.length > 0 ? (
        <section className="mt-14 border-t border-sandstone/50 pt-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-semibold text-charcoal">
              {copy.product.moreFromArtist} {artistName}
            </h2>
            <Link href={artistHref} className="text-sm text-burnt-sienna hover:underline">
              {localeKey === "ar" ? "كل أعمال الفنان" : "View all by artist"}
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4" role="list">
            {artistProducts.map((artistProduct) => (
              <li key={artistProduct.id}>
                <ProductCard product={artistProduct} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {relatedProducts.length > 0 ? (
        <section className="mt-14 border-t border-sandstone/50 pt-10">
          <h2 className="text-2xl font-semibold text-charcoal">
            {copy.product.relatedPieces}
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4" role="list">
            {relatedProducts.map((relatedProduct) => (
              <li key={relatedProduct.id}>
                <ProductCard product={relatedProduct} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </PageShell>
  );
}
