import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProperties } from '../api/properties';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { Property } from '../types';
import { formatPrice } from '../utils/format';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProperties(): Promise<void> {
    try {
      setLoading(true);
      setError('');
      const response = await fetchProperties({ limit: 12, sort: 'newest' });
      setProperties(response.data || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load properties';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProperties();
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(156,129,85,0.18),transparent_35%)]" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-6 pb-16 pt-24">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-gold">Bengaluru</p>
          <h1 className="max-w-3xl font-display text-5xl leading-tight text-charcoal md:text-7xl">
            White Lotus
          </h1>
          <p className="mt-5 max-w-xl text-lg text-charcoal-soft">
            Curated luxury residences designed for quiet grandeur and modern living.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Collection</p>
            <h2 className="mt-2 font-display text-4xl text-charcoal">Featured residences</h2>
          </div>
        </div>

        {loading ? <LoadingSpinner label="Loading residences" /> : null}
        {!loading && error ? (
          <ErrorState message={error} onRetry={() => void loadProperties()} />
        ) : null}
        {!loading && !error && properties.length === 0 ? (
          <EmptyState
            title="No residences yet"
            description="Properties will appear here once the sales team publishes listings."
          />
        ) : null}

        {!loading && !error && properties.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <Link
                key={property._id}
                to={`/properties/${property._id}`}
                className="group overflow-hidden border border-border bg-white/60 transition hover:border-gold/50"
              >
                <div className="aspect-[4/3] overflow-hidden bg-ivory-deep">
                  {property.images?.[0] ? (
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm tracking-wide text-stone">
                      Image coming soon
                    </div>
                  )}
                </div>
                <div className="space-y-2 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone">
                    {property.location}
                  </p>
                  <h3 className="font-display text-2xl text-charcoal">{property.name}</h3>
                  <p className="text-sm text-charcoal-soft">
                    {property.bedrooms} bed · {property.area} sq.ft
                  </p>
                  <p className="pt-2 text-gold">{formatPrice(property.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
