import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyById } from '../api/properties';
import InquiryForm from '../components/inquiries/InquiryForm';
import ErrorState from '../components/ui/ErrorState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import StatusBadge from '../components/ui/StatusBadge';
import type { Property } from '../types';
import { formatPrice } from '../utils/format';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProperty(): Promise<void> {
    if (!id) {
      setError('Property ID is missing');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await fetchPropertyById(id);
      setProperty(response.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load property';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProperty();
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading residence" />;
  if (error) {
    return (
      <div className="px-6 py-16">
        <ErrorState message={error} onRetry={() => void loadProperty()} />
      </div>
    );
  }
  if (!property) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs uppercase tracking-[0.22em] text-gold">{property.location}</p>
        <StatusBadge status={property.status} />
      </div>
      <h1 className="mt-3 font-display text-5xl text-charcoal">{property.name}</h1>
      <p className="mt-4 max-w-3xl text-lg text-charcoal-soft">
        {property.shortDescription || property.description}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
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

          {property.images.length > 1 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {property.images.slice(1, 4).map((image) => (
                <div key={image} className="aspect-[4/3] overflow-hidden border border-border">
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          ) : null}

          <section className="border border-border bg-white/60 p-6">
            <h2 className="font-display text-3xl text-charcoal">About this residence</h2>
            <p className="mt-4 whitespace-pre-line text-charcoal-soft">{property.description}</p>
            {property.amenities?.length ? (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-stone">Amenities</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="border border-border px-3 py-1.5 text-sm text-charcoal-soft"
                    >
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        </div>

        <div className="space-y-6">
          <aside className="border border-border bg-white/70 p-6">
            <p className="text-sm uppercase tracking-[0.16em] text-stone">Overview</p>
            <dl className="mt-4 space-y-3 text-charcoal-soft">
              <div className="flex justify-between gap-4">
                <dt>Price</dt>
                <dd className="text-charcoal">{formatPrice(property.price)}</dd>
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
                <dt>Type</dt>
                <dd>{property.propertyType}</dd>
              </div>
            </dl>
          </aside>

          <aside className="border border-border bg-white/70 p-6">
            <InquiryForm propertyId={property._id} propertyName={property.name} />
          </aside>
        </div>
      </div>
    </div>
  );
}
