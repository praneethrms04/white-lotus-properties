import EmptyState from '../../components/ui/EmptyState';

export default function AdminInquiriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Leads</p>
        <h1 className="mt-2 font-display text-4xl text-charcoal">Inquiries</h1>
      </div>
      <EmptyState
        title="Inquiry inbox coming next"
        description="This page will list live inquiries from MongoDB and allow status updates."
      />
    </div>
  );
}
