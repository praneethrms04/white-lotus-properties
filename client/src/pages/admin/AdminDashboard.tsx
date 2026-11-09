import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchInquiries } from '../../api/inquiries';
import { fetchProperties } from '../../api/properties';
import Button from '../../components/ui/Button';
import ErrorState from '../../components/ui/ErrorState';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface DashboardStats {
  properties: number;
  available: number;
  inquiries: number;
  newInquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadStats(): Promise<void> {
    try {
      setLoading(true);
      setError('');
      const [propertiesResponse, inquiriesResponse] = await Promise.all([
        fetchProperties({ limit: 50 }),
        fetchInquiries({ limit: 50 }),
      ]);

      const properties = propertiesResponse.data || [];
      const inquiries = inquiriesResponse.data || [];

      setStats({
        properties: propertiesResponse.meta?.total ?? properties.length,
        available: properties.filter((property) => property.status === 'available').length,
        inquiries: inquiriesResponse.meta?.total ?? inquiries.length,
        newInquiries: inquiries.filter((inquiry) => inquiry.status === 'new').length,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load dashboard';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadStats();
  }, []);

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
      {!loading && error ? (
        <ErrorState message={error} onRetry={() => void loadStats()} />
      ) : null}

      {!loading && !error && stats ? (
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
