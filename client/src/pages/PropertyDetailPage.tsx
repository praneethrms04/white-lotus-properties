import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import InquiryForm from '../components/inquiries/InquiryForm';
import PropertyCard from '../components/properties/PropertyCard';
import ErrorState from '../components/ui/ErrorState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import StatusBadge from '../components/ui/StatusBadge';
import { useProperties } from '../hooks/queries/useProperties';
import { useProperty } from '../hooks/queries/useProperty';
import { formatPrice } from '../utils/format';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const propertyQuery = useProperty(id);
  const property = propertyQuery.data?.data;
  const locationPrefix = property?.location.split(',')[0]?.trim();

  const relatedQuery = useProperties(
    {
      location: locationPrefix,
      limit: 4,
      sort: 'newest',
    },
    { enabled: Boolean(locationPrefix) }
  );

  useEffect(() => {
    setActiveImage(0);
    setFailedImages({});
  }, [id, property?._id]);

  const related = (relatedQuery.data?.data || [])
    .filter((item) => item._id !== property?._id)
    .slice(0, 3);

  const loading = propertyQuery.isLoading;
  const error =
    !id
      ? 'Property ID is missing'
      : propertyQuery.error?.message || '';

  if (loading) {
    return (
      <div className="px-6 py-24">
        <LoadingSpinner label="Loading residence" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-16">
        <ErrorState message={error} onRetry={() => void propertyQuery.refetch()} />
      </div>
    );
  }

  if (!property) return null;

  const images = (property.images?.length ? property.images : []).filter(
    (image) => !failedImages[image]
  );
  const currentImage = images[Math.min(activeImage, Math.max(images.length - 1, 0))];

  return (
    <div>
      <section className="border-b border-border bg-white/35">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          <Link
            to="/properties"
            className="text-xs uppercase tracking-[0.18em] text-stone transition hover:text-gold"
          >
            ← Residences
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">{property.location}</p>
            <StatusBadge status={property.status} />
          </div>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="max-w-3xl font-display text-4xl text-charcoal md:text-6xl">
              {property.name}
            </h1>
            <p className="font-display text-3xl text-gold md:text-4xl">
              {formatPrice(property.price)}
            </p>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-charcoal-soft">
            {property.shortDescription || property.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.85fr]">
          <div className="space-y-4">
            <div className="aspect-[16/10] overflow-hidden border border-border bg-ivory-deep">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={property.name}
                  className="h-full w-full object-cover"
                  onError={() =>
                    setFailedImages((current) => ({ ...current, [currentImage]: true }))
                  }
                />
              ) : (
                <div className="flex h-full items-center justify-center text-stone">
                  Image coming soon
                </div>
              )}
            </div>

            {images.length > 1 ? (
              <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`aspect-[4/3] overflow-hidden border transition ${
                      index === activeImage
                        ? 'border-gold'
                        : 'border-border hover:border-gold/50'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={() =>
                        setFailedImages((current) => ({ ...current, [image]: true }))
                      }
                    />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="border border-border bg-white/55 p-6 md:p-8">
              <h2 className="font-display text-3xl text-charcoal">About this residence</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-charcoal-soft">
                {property.description}
              </p>

              {property.amenities?.length ? (
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-[0.16em] text-stone">Amenities</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {property.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="border border-border px-3 py-2 text-sm text-charcoal-soft"
                      >
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <aside className="border border-border bg-white/70 p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-stone">Specifications</p>
              <dl className="mt-5 space-y-3 text-sm text-charcoal-soft">
                <div className="flex justify-between gap-4 border-b border-border/70 pb-3">
                  <dt>Type</dt>
                  <dd className="text-charcoal">{property.propertyType}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border/70 pb-3">
                  <dt>Area</dt>
                  <dd className="text-charcoal">{property.area.toLocaleString('en-IN')} sq.ft</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border/70 pb-3">
                  <dt>Bedrooms</dt>
                  <dd className="text-charcoal">{property.bedrooms}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border/70 pb-3">
                  <dt>Bathrooms</dt>
                  <dd className="text-charcoal">{property.bathrooms}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Availability</dt>
                  <dd className="capitalize text-charcoal">{property.status}</dd>
                </div>
              </dl>
            </aside>

            <aside className="border border-border bg-ivory-deep/70 p-6 shadow-[0_20px_50px_rgba(28,27,26,0.05)]">
              <InquiryForm propertyId={property._id} propertyName={property.name} />
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-border bg-white/40 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Nearby</p>
            <h2 className="mt-2 font-display text-4xl text-charcoal">Related residences</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <PropertyCard key={item._id} property={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
