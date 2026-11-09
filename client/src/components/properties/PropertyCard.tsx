import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../../types';
import { formatPrice } from '../../utils/format';
import StatusBadge from '../ui/StatusBadge';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const primaryImage = property.images?.[0];
  const showImage = Boolean(primaryImage) && !imageFailed;

  return (
    <Link
      to={`/properties/${property._id}`}
      className="group flex h-full flex-col overflow-hidden border border-border bg-white/55 transition duration-500 hover:border-gold/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ivory-deep">
        {showImage ? (
          <img
            src={primaryImage}
            alt={property.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm tracking-wide text-stone">
            Image coming soon
          </div>
        )}
        <div className="absolute left-4 top-4">
          <StatusBadge status={property.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-stone">{property.location}</p>
        <h3 className="font-display text-2xl leading-tight text-charcoal transition group-hover:text-gold">
          {property.name}
        </h3>
        {property.shortDescription ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-charcoal-soft">
            {property.shortDescription}
          </p>
        ) : null}
        <p className="text-sm text-charcoal-soft">
          {property.bedrooms} bed · {property.area.toLocaleString('en-IN')} sq.ft
          {property.propertyType ? ` · ${property.propertyType}` : ''}
        </p>
        <p className="mt-auto pt-2 text-gold">{formatPrice(property.price)}</p>
      </div>
    </Link>
  );
}
