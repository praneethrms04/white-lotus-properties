import { useState } from 'react';
import { NavLink, Outlet, type NavLinkRenderProps } from 'react-router-dom';
import { BRAND } from '../constants/brand';

const navLinkClass = ({ isActive }: NavLinkRenderProps): string =>
  `text-xs tracking-[0.18em] uppercase transition ${
    isActive ? 'text-gold' : 'text-charcoal-soft hover:text-gold'
  }`;

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <NavLink to="/" className="group" onClick={() => setMenuOpen(false)}>
            <p className="font-display text-2xl tracking-[0.1em] text-charcoal transition group-hover:text-gold md:text-[1.7rem]">
              {BRAND.shortName}
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-stone">
              Group · {BRAND.city}
            </p>
          </NavLink>

          <nav className="hidden items-center gap-8 md:flex">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/properties" className={navLinkClass}>
              Residences
            </NavLink>
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
            <NavLink
              to="/properties"
              className="border border-charcoal/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-charcoal transition hover:border-gold hover:text-gold"
            >
              Enquire
            </NavLink>
          </nav>

          <button
            type="button"
            className="text-xs uppercase tracking-[0.18em] text-charcoal md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {menuOpen ? (
          <div id="mobile-nav" className="border-t border-border px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <NavLink to="/" className={navLinkClass} end onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink
                to="/properties"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Residences
              </NavLink>
              <NavLink to="/admin" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Admin
              </NavLink>
            </nav>
          </div>
        ) : null}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-24 border-t border-border bg-charcoal text-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl tracking-[0.08em]">{BRAND.name}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-champagne/90">
              Bespoke luxury residences shaped by architecture, light, and quiet living in
              Bengaluru.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">Visit</p>
            <p className="mt-3 text-sm text-ivory/80">{BRAND.address}</p>
            <p className="mt-1 text-sm text-ivory/80">{BRAND.city}, India</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">Contact</p>
            <p className="mt-3 text-sm text-ivory/80">{BRAND.email}</p>
            <p className="mt-1 text-sm text-ivory/80">{BRAND.phone}</p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs tracking-wide text-ivory/50 md:flex-row md:justify-between">
            <p>© {new Date().getFullYear()} {BRAND.name}</p>
            <p>Private residences · By appointment</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
