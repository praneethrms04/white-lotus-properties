import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProperty, fetchProperties } from '../../api/properties';
import Alert from '../../components/ui/Alert';
import Button from '../../components/ui/Button';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import ErrorState from '../../components/ui/ErrorState';
import Input from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import StatusBadge from '../../components/ui/StatusBadge';
import type { Property, PropertyStatus } from '../../types';
import { formatPrice } from '../../utils/format';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PropertyStatus | ''>('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  async function loadProperties(nextSearch = search, nextStatus = status) {
    try {
      setLoading(true);
      setError('');
      const response = await fetchProperties({
        search: nextSearch || undefined,
        status: nextStatus || undefined,
        limit: 50,
        sort: 'newest',
      });
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

  async function handleDelete() {
    if (!deletingId) return;

    try {
      setDeleteLoading(true);
      setActionError('');
      await deleteProperty(deletingId);
      setProperties((current) => current.filter((property) => property._id !== deletingId));
      setActionSuccess('Property deleted successfully.');
      setDeletingId(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete property';
      setActionError(message);
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Inventory</p>
          <h1 className="mt-2 font-display text-4xl text-charcoal">Properties</h1>
        </div>
        <Link to="/admin/properties/new">
          <Button>Add property</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_180px_auto]">
        <Input
          id="property-search"
          label="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name or location"
        />
        <Input
          id="property-status"
          label="Status"
          as="select"
          value={status}
          onChange={(event) => setStatus(event.target.value as PropertyStatus | '')}
        >
          <option value="">All statuses</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </Input>
        <div className="flex items-end">
          <Button
            variant="secondary"
            className="w-full md:w-auto"
            onClick={() => void loadProperties(search, status)}
          >
            Apply
          </Button>
        </div>
      </div>

      {actionSuccess ? <Alert tone="success">{actionSuccess}</Alert> : null}
      {actionError ? <Alert tone="error">{actionError}</Alert> : null}

      {loading ? <LoadingSpinner label="Loading properties" /> : null}
      {!loading && error ? (
        <ErrorState message={error} onRetry={() => void loadProperties()} />
      ) : null}
      {!loading && !error && properties.length === 0 ? (
        <EmptyState
          title="No properties found"
          description="Add a residence or adjust your search filters."
          action={
            <Link to="/admin/properties/new">
              <Button>Add property</Button>
            </Link>
          }
        />
      ) : null}

      {!loading && !error && properties.length > 0 ? (
        <div className="overflow-x-auto border border-border bg-white/70">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-ivory-deep/70 text-xs uppercase tracking-[0.14em] text-stone">
              <tr>
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Beds</th>
                <th className="px-4 py-3 font-medium">Baths</th>
                <th className="px-4 py-3 font-medium">Area</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id} className="border-b border-border/70 align-top">
                  <td className="px-4 py-4">
                    <div className="flex gap-3">
                      <div className="h-16 w-20 shrink-0 overflow-hidden bg-ivory-deep">
                        {property.images?.[0] ? (
                          <img
                            src={property.images[0]}
                            alt={property.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-wide text-stone">
                            No image
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-charcoal">{property.name}</p>
                        <p className="text-xs text-stone">{property.propertyType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-charcoal-soft">{property.location}</td>
                  <td className="px-4 py-4 text-charcoal">{formatPrice(property.price)}</td>
                  <td className="px-4 py-4">{property.bedrooms}</td>
                  <td className="px-4 py-4">{property.bathrooms}</td>
                  <td className="px-4 py-4">{property.area} sq.ft</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={property.status} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/admin/properties/${property._id}/edit`}>
                        <Button size="sm" variant="secondary">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setActionSuccess('');
                          setActionError('');
                          setDeletingId(property._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <ConfirmDialog
        open={Boolean(deletingId)}
        title="Delete property?"
        description="This permanently removes the listing from MongoDB. This action cannot be undone."
        confirmLabel="Delete"
        loading={deleteLoading}
        onCancel={() => setDeletingId(null)}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}
