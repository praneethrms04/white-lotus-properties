import { Link } from 'react-router-dom';
import PropertyCard from '../components/properties/PropertyCard';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import { PropertyCardSkeleton } from '../components/ui/Skeleton';
import { BRAND, BRAND_IMAGES } from '../constants/brand';
import { useProperties } from '../hooks/queries/useProperties';

const featuredFilters = { featured: true, limit: 3, sort: 'newest' as const };
const collectionFilters = { limit: 6, sort: 'newest' as const };

export default function HomePage() {
  const featuredQuery = useProperties(featuredFilters);
  const collectionQuery = useProperties(collectionFilters);

  const loading = featuredQuery.isLoading || collectionQuery.isLoading;
  const error =
    featuredQuery.error?.message ||
    collectionQuery.error?.message ||
    '';

  const featuredList = featuredQuery.data?.data || [];
  const collectionList = collectionQuery.data?.data || [];
  const featured = featuredList.length > 0 ? featuredList : collectionList.slice(0, 3);

  function handleRetry() {
    void featuredQuery.refetch();
    void collectionQuery.refetch();
  }

  return (
    <div>
      <section className="relative min-h-[88vh] overflow-hidden">
        <img
          src={BRAND_IMAGES.hero}
          alt="Luxury architectural residence"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/35 to-charcoal/20" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-28">
          <p className="mb-5 text-xs uppercase tracking-[0.32em] text-champagne fade-in">
            {BRAND.name} · {BRAND.city}
          </p>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.05] text-ivory fade-in md:text-7xl">
            Exceptional Living. Thoughtfully Designed.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 md:text-lg">
            Discover residences composed around light, material, and quiet grandeur — crafted for
            those who seek beauty without excess.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/properties">
              <Button variant="gold" size="lg">
                Explore properties
              </Button>
            </Link>
            <a href="#collection">
              <Button
                variant="secondary"
                size="lg"
                className="border-ivory/40 text-ivory hover:border-champagne hover:text-champagne"
              >
                View collection
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">The atelier</p>
            <h2 className="mt-3 font-display text-4xl text-charcoal md:text-5xl">
              Architecture as a way of living
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-charcoal-soft md:text-lg">
            White Lotus Group develops intimate residential experiences in Bengaluru — places where
            proportion, texture, and landscape meet. Each home is curated for permanence, privacy,
            and a quieter kind of luxury.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-white/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Featured</p>
              <h2 className="mt-2 font-display text-4xl text-charcoal">Selected residences</h2>
            </div>
            <Link
              to="/properties"
              className="text-xs uppercase tracking-[0.18em] text-charcoal-soft transition hover:text-gold"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              <PropertyCardSkeleton />
              <PropertyCardSkeleton />
              <PropertyCardSkeleton />
            </div>
          ) : null}

          {!loading && error ? <ErrorState message={error} onRetry={handleRetry} /> : null}

          {!loading && !error && featured.length === 0 ? (
            <EmptyState
              title="Residences arriving soon"
              description="Our latest collection will appear here once listings are published."
            />
          ) : null}

          {!loading && !error && featured.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section id="collection" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Collection</p>
          <h2 className="mt-2 font-display text-4xl text-charcoal">The White Lotus portfolio</h2>
          <p className="mt-3 max-w-2xl text-charcoal-soft">
            Explore apartments, villas, and private homes shaped for contemporary Bengaluru living.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
          </div>
        ) : null}

        {!loading && !error && collectionList.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {collectionList.map((property) => (
              <PropertyCard key={`collection-${property._id}`} property={property} />
            ))}
          </div>
        ) : null}

        <div className="mt-12 text-center">
          <Link to="/properties">
            <Button variant="secondary">Browse all residences</Button>
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="min-h-[28rem] overflow-hidden">
            <img
              src={BRAND_IMAGES.lifestyle}
              alt="Interior living space with natural light"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center bg-charcoal px-8 py-16 text-ivory md:px-14">
            <p className="text-xs uppercase tracking-[0.22em] text-gold-soft">Lifestyle</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Spaces that breathe with the city
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/75 md:text-base">
              From courtyard calm to skyline quietude, every White Lotus residence is designed for
              unhurried mornings, generous gatherings, and enduring materiality.
            </p>
            <div className="mt-8">
              <Link to="/properties">
                <Button variant="gold">Discover residences</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 overflow-hidden border border-border md:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-white/50 p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Private viewing</p>
            <h2 className="mt-3 font-display text-4xl text-charcoal">
              Experience a residence by appointment
            </h2>
            <p className="mt-4 max-w-lg text-charcoal-soft">
              Speak with our advisors to arrange a private tour. Share your preferences through any
              property page and we will respond personally.
            </p>
            <p className="mt-8 text-sm text-stone">
              {BRAND.email}
              <br />
              {BRAND.phone}
            </p>
          </div>
          <div className="min-h-[18rem]">
            <img
              src={BRAND_IMAGES.architecture}
              alt="Architectural facade detail"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
