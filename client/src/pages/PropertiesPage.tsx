import { useState } from 'react';
import PropertyCard from '../components/properties/PropertyCard';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import Input from '../components/ui/Input';
import { PropertyCardSkeleton } from '../components/ui/Skeleton';
import { useProperties } from '../hooks/queries/useProperties';
import type { PropertyFilters, PropertySort } from '../types';

const defaultFilters: PropertyFilters = {
  sort: 'newest',
  limit: 24,
};

export default function PropertiesPage() {
  const [search, setSearch] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [sort, setSort] = useState<PropertySort>('newest');
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);

  const propertiesQuery = useProperties(filters);
  const properties = propertiesQuery.data?.data || [];
  const loading = propertiesQuery.isLoading;
  const error = propertiesQuery.error?.message || '';

  function applyFilters() {
    setFilters({
      search: search.trim() || undefined,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      propertyType: propertyType || undefined,
      sort,
      limit: 24,
    });
  }

  return (
    <div>
      <section className="border-b border-border bg-white/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Residences</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-charcoal md:text-6xl">
            The collection
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-charcoal-soft">
            Browse available homes across Bengaluru — refined apartments, villas, and private
            residences from the White Lotus portfolio.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-4 border border-border bg-white/60 p-4 md:grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr_auto]">
          <Input
            id="listing-search"
            label="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name or location"
          />
          <Input
            id="listing-bedrooms"
            label="Bedrooms"
            as="select"
            value={bedrooms}
            onChange={(event) => setBedrooms(event.target.value)}
          >
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Input>
          <Input
            id="listing-type"
            label="Type"
            as="select"
            value={propertyType}
            onChange={(event) => setPropertyType(event.target.value)}
          >
            <option value="">All types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Townhouse">Townhouse</option>
          </Input>
          <Input
            id="listing-sort"
            label="Sort"
            as="select"
            value={sort}
            onChange={(event) => setSort(event.target.value as PropertySort)}
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
          </Input>
          <div className="flex items-end">
            <Button variant="secondary" className="w-full" onClick={applyFilters}>
              Apply
            </Button>
          </div>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              <PropertyCardSkeleton />
              <PropertyCardSkeleton />
              <PropertyCardSkeleton />
            </div>
          ) : null}

          {!loading && error ? (
            <ErrorState message={error} onRetry={() => void propertiesQuery.refetch()} />
          ) : null}

          {!loading && !error && properties.length === 0 ? (
            <EmptyState
              title="No residences match"
              description="Try adjusting search, bedroom, or property type filters."
            />
          ) : null}

          {!loading && !error && properties.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
