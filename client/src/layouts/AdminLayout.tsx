import { NavLink, Outlet, type NavLinkRenderProps } from 'react-router-dom';
import { BRAND } from '../constants/brand';

const linkClass = ({ isActive }: NavLinkRenderProps): string =>
  `rounded-sm px-3 py-2.5 text-sm tracking-wide transition ${
    isActive
      ? 'bg-charcoal text-ivory'
      : 'text-charcoal-soft hover:bg-ivory-deep hover:text-charcoal'
  }`;

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="border-b border-border bg-white/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="font-display text-2xl text-charcoal">{BRAND.shortName}</p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-stone">Sales portal</p>
          </div>
          <NavLink
            to="/"
            className="text-xs uppercase tracking-[0.16em] text-charcoal-soft transition hover:text-gold"
          >
            View public site
          </NavLink>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit border border-border bg-white/80 p-4 lg:sticky lg:top-6">
          <p className="mb-4 px-3 text-xs uppercase tracking-[0.18em] text-stone">Navigate</p>
          <nav className="flex flex-col gap-1">
            <NavLink to="/admin" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/properties" className={linkClass}>
              Properties
            </NavLink>
            <NavLink to="/admin/properties/new" className={linkClass}>
              Add property
            </NavLink>
            <NavLink to="/admin/inquiries" className={linkClass}>
              Inquiries
            </NavLink>
          </nav>
        </aside>

        <section className="min-w-0">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
