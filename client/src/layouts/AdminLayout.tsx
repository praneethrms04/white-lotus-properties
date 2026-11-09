import { NavLink, Outlet, type NavLinkRenderProps } from 'react-router-dom';

const linkClass = ({ isActive }: NavLinkRenderProps): string =>
  `rounded-sm px-3 py-2 text-sm tracking-wide transition ${
    isActive
      ? 'bg-charcoal text-ivory'
      : 'text-charcoal-soft hover:bg-ivory-deep hover:text-charcoal'
  }`;

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-sm border border-border bg-white/70 p-4">
          <p className="mb-4 font-display text-2xl text-charcoal">Admin</p>
          <nav className="flex flex-col gap-1">
            <NavLink to="/admin" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/properties" className={linkClass}>
              Properties
            </NavLink>
            <NavLink to="/admin/inquiries" className={linkClass}>
              Inquiries
            </NavLink>
            <NavLink to="/" className={linkClass}>
              View site
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
