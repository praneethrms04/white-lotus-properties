import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';

export default function AdminPropertiesPage() {
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

      <EmptyState
        title="Property management coming next"
        description="Listing, create, and edit flows will connect to the live Properties API in the next phase."
      />
    </div>
  );
}
