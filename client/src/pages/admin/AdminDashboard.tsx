import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ErrorState from '../../components/ui/ErrorState';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useInquiries } from '../../hooks/queries/useInquiries';
import { useProperties } from '../../hooks/queries/useProperties';

const propertyFilters = { limit: 50 } as const;
const inquiryFilters = { limit: 50 } as const;

export default function AdminDashboard() {
  const propertiesQuery = useProperties(propertyFilters);
  const inquiriesQuery = useInquiries(inquiryFilters);

  const loading = propertiesQuery.isLoading || inquiriesQuery.isLoading;
  const error =
    propertiesQuery.error?.message ||
    inquiriesQuery.error?.message ||
    '';

  const properties = propertiesQuery.data?.data || [];
  const inquiries = inquiriesQuery.data?.data || [];

  const stats = {
    properties: propertiesQuery.data?.meta?.total ?? properties.length,
    available: properties.filter((property) => property.status === 'available').length,
    inquiries: inquiriesQuery.data?.meta?.total ?? inquiries.length,
    newInquiries: inquiries.filter((inquiry) => inquiry.status === 'new').length,
  };

  function handleRetry() {
    void propertiesQuery.refetch();
    void inquiriesQuery.refetch();
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Sales portal</p>
        <h1 className="mt-2 font-display text-4xl text-charcoal">Dashboard</h1>
        <p className="mt-2 text-charcoal-soft">
          Overview of inventory and buyer interest across White Lotus residences.
        </p>
      </div>

      {loading ? <LoadingSpinner label="Loading overview" /> : null}
      {!loading && error ? <ErrorState message={error} onRetry={handleRetry} /> : null}

      {!loading && !error ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Properties', value: stats.properties },
            { label: 'Available', value: stats.available },
            { label: 'Inquiries', value: stats.inquiries },
            { label: 'New leads', value: stats.newInquiries },
          ].map((item) => (
            <div key={item.label} className="border border-border bg-white/75 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-stone">{item.label}</p>
              <p className="mt-3 font-display text-4xl text-charcoal">{item.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-border bg-white/75 p-6">
          <h2 className="font-display text-2xl text-charcoal">Properties</h2>
          <p className="mt-2 text-sm text-stone">
            Publish, refine, and retire residences in the public collection.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/admin/properties">
              <Button>Manage properties</Button>
            </Link>
            <Link to="/admin/properties/new">
              <Button variant="secondary">Add property</Button>
            </Link>
          </div>
        </div>
        <div className="border border-border bg-white/75 p-6">
          <h2 className="font-display text-2xl text-charcoal">Inquiries</h2>
          <p className="mt-2 text-sm text-stone">
            Follow up on viewing requests and keep lead status current.
          </p>
          <div className="mt-5">
            <Link to="/admin/inquiries">
              <Button variant="secondary">View inquiries</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
