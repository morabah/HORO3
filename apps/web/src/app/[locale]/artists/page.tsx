import { setRequestLocale } from "next-intl/server";
import { getArtists } from "@/lib/sanity/queries";
import { ArtistCard } from "@/components/artists/artist-card";
import { EmptyState, PageIntro, PageShell } from "@/components/layout/page-shell";
import { getStorefrontCopy } from "@/lib/storefront/copy";

type Props = { params: Promise<{ locale: string }> };

// export const revalidate = 60;

export default async function ArtistsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = (locale === "ar" ? "ar" : "en") as "ar" | "en";
  const copy = getStorefrontCopy(localeKey);

  let artists: Awaited<ReturnType<typeof getArtists>> = [];
  try {
    artists = await getArtists();
  } catch {
    // ignore and render customer-safe empty state
  }

  return (
    <PageShell width="wide">
      <div className="bg-red-500 text-white p-4">DEBUG ARTISTS LEN: {artists?.length}</div>
      <PageIntro
        title={copy.artists.title}
        description={copy.artists.description}
        eyebrow={localeKey === "ar" ? "المتعاونون" : "Collaborators"}
      />
      {artists.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {artists.map((artist) => (
            <li key={artist._id}>
              <ArtistCard artist={artist} locale={localeKey} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          className="mt-8"
          title={copy.artists.emptyTitle}
          description={copy.artists.emptyBody}
        />
      )}
    </PageShell>
  );
}
