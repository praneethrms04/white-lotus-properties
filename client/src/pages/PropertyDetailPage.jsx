import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyById } from '../api/properties';
import ErrorState from '../components/ui/ErrorState';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProperty() {
    try {
      setLoading(true);
      setError('');
      const response = await fetchPropertyById(id);
      setProperty(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperty();
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading residence" />;
  if (error) return <div className="px-6 py-16"><ErrorState message={error} onRetry={loadProperty} /></div>;
  if (!property) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">{property.location}</p>
      <h1 className="mt-3 font-display text-5xl text-charcoal">{property.name}</h1>
      <p className="mt-4 max-w-3xl text-lg text-charcoal-soft">
        {property.shortDescription || property.description}
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="aspect-[16/10] overflow-hidden border border-border bg-ivory-deep">
          {property.images?.[0] ? (
            <img
              src={property.images[0]}
              alt={property.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-stone">
              Image coming soon
            </div>
          )}
        </div>
        <aside className="border border-border bg-white/70 p-6">
          <p className="text-sm uppercase tracking-[0.16em] text-stone">Overview</p>
          <dl className="mt-4 space-y-3 text-charcoal-soft">
            <div className="flex justify-between gap-4">
              <dt>Price</dt>
              <dd className="text-charcoal">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(property.price)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Area</dt>
              <dd>{property.area} sq.ft</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Bedrooms</dt>
              <dd>{property.bedrooms}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Bathrooms</dt>
              <dd>{property.bathrooms}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Status</dt>
              <dd className="capitalize">{property.status}</dd>
            </div>
          </dl>
          <p className="mt-8 text-sm text-stone">
            Inquiry form will be wired in the next implementation phase.
          </p>
        </aside>
      </div>
    </div>
  );
}
