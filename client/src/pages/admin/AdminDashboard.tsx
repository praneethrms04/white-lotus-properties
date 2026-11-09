import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Sales portal</p>
        <h1 className="mt-2 font-display text-4xl text-charcoal">Dashboard</h1>
        <p className="mt-2 text-charcoal-soft">
          Manage luxury listings and review buyer inquiries.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-border bg-white/70 p-6">
          <h2 className="font-display text-2xl text-charcoal">Properties</h2>
          <p className="mt-2 text-sm text-stone">
            Create, edit, and publish residences for the public showcase.
          </p>
          <div className="mt-5">
            <Link to="/admin/properties">
              <Button>Manage properties</Button>
            </Link>
          </div>
        </div>
        <div className="border border-border bg-white/70 p-6">
          <h2 className="font-display text-2xl text-charcoal">Inquiries</h2>
          <p className="mt-2 text-sm text-stone">
            Track leads submitted from property detail pages.
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
