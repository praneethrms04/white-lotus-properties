import { useState } from 'react';
import Alert from '../../components/ui/Alert';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import ErrorState from '../../components/ui/ErrorState';
import Input from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import StatusBadge from '../../components/ui/StatusBadge';
import { useUpdateInquiryStatus } from '../../hooks/mutations/useUpdateInquiryStatus';
import { useInquiries } from '../../hooks/queries/useInquiries';
import type { Inquiry, InquiryFilters, InquiryPropertySummary, InquiryStatus } from '../../types';
import { formatDate } from '../../utils/format';

function getPropertyName(property: Inquiry['property'] | null | undefined): string {
  if (!property) return 'Property unavailable';
  if (typeof property === 'string') return property;
  return property.name;
}

function getPropertyId(property: Inquiry['property'] | null | undefined): string {
  if (!property) return 'n/a';
  if (typeof property === 'string') return property;
  return property._id;
}

const defaultFilters: InquiryFilters = { limit: 50 };

export default function AdminInquiriesPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<InquiryStatus | ''>('');
  const [filters, setFilters] = useState<InquiryFilters>(defaultFilters);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const inquiriesQuery = useInquiries(filters);
  const updateStatusMutation = useUpdateInquiryStatus();

  const inquiries = inquiriesQuery.data?.data || [];
  const loading = inquiriesQuery.isLoading;
  const error = inquiriesQuery.error?.message || '';

  function applyFilters() {
    setFilters({
      search: search.trim() || undefined,
      status: status || undefined,
      limit: 50,
    });
  }

  async function handleStatusChange(id: string, nextStatus: InquiryStatus) {
    try {
      setUpdatingId(id);
      setActionError('');
      setActionSuccess('');
      await updateStatusMutation.mutateAsync({ id, status: nextStatus });
      setActionSuccess('Inquiry status updated.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      setActionError(message);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Leads</p>
        <h1 className="mt-2 font-display text-4xl text-charcoal">Inquiries</h1>
        <p className="mt-2 text-charcoal-soft">
          Review buyer interest and keep follow-up status current.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_180px_auto]">
        <Input
          id="inquiry-search"
          label="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by buyer name or email"
        />
        <Input
          id="inquiry-status"
          label="Status"
          as="select"
          value={status}
          onChange={(event) => setStatus(event.target.value as InquiryStatus | '')}
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </Input>
        <div className="flex items-end">
          <Button variant="secondary" className="w-full md:w-auto" onClick={applyFilters}>
            Apply
          </Button>
        </div>
      </div>

      {actionSuccess ? <Alert tone="success">{actionSuccess}</Alert> : null}
      {actionError ? <Alert tone="error">{actionError}</Alert> : null}

      {loading ? <LoadingSpinner label="Loading inquiries" /> : null}
      {!loading && error ? (
        <ErrorState message={error} onRetry={() => void inquiriesQuery.refetch()} />
      ) : null}
      {!loading && !error && inquiries.length === 0 ? (
        <EmptyState
          title="No inquiries yet"
          description="Buyer inquiries from property pages will appear here."
        />
      ) : null}

      {!loading && !error && inquiries.length > 0 ? (
        <div className="overflow-hidden border border-border bg-white/75">
          <div className="hidden border-b border-border bg-ivory-deep/60 px-5 py-3 text-xs uppercase tracking-[0.14em] text-stone md:grid md:grid-cols-[1.1fr_1fr_0.8fr_0.7fr]">
            <span>Buyer</span>
            <span>Property</span>
            <span>Submitted</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-border">
            {inquiries.map((inquiry) => {
              const property = inquiry.property as string | InquiryPropertySummary | null;
              return (
                <article key={inquiry._id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl text-charcoal">{inquiry.name}</h2>
                      <p className="mt-1 text-sm text-charcoal-soft">
                        {inquiry.email} · {inquiry.phone}
                      </p>
                      <p className="mt-2 text-sm text-stone">
                        Property:{' '}
                        <span className="text-charcoal">{getPropertyName(property)}</span>
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone">
                        {formatDate(inquiry.createdAt)}
                      </p>
                    </div>
                    <StatusBadge status={inquiry.status} />
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-charcoal-soft">
                    {inquiry.message}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <label
                      className="text-xs uppercase tracking-[0.14em] text-stone"
                      htmlFor={`status-${inquiry._id}`}
                    >
                      Update status
                    </label>
                    <select
                      id={`status-${inquiry._id}`}
                      className="rounded-sm border border-border bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-gold"
                      value={inquiry.status}
                      disabled={updatingId === inquiry._id}
                      onChange={(event) =>
                        void handleStatusChange(
                          inquiry._id,
                          event.target.value as InquiryStatus
                        )
                      }
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <span className="text-xs text-stone">
                      Ref: {getPropertyId(property).slice(-6)}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
