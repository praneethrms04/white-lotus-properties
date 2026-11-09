import { NavLink, Outlet } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  `text-sm tracking-[0.16em] uppercase transition ${
    isActive ? 'text-gold' : 'text-charcoal-soft hover:text-gold'
  }`;

export default function PublicLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/80 bg-ivory/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <NavLink to="/" className="font-display text-2xl tracking-[0.08em] text-charcoal">
            White Lotus
          </NavLink>
          <nav className="flex items-center gap-8">
            <NavLink to="/" className={navLinkClass} end>
              Residences
            </NavLink>
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-border/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-stone md:flex-row md:items-center md:justify-between">
          <p className="font-display text-xl text-charcoal">White Lotus Group</p>
          <p>Luxury residences in Bengaluru</p>
        </div>
      </footer>
    </div>
  );
}
