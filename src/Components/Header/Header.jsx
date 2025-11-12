import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Container/Container";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-slate-200
        bg-white/90 supports-[backdrop-filter]:bg-white/60 backdrop-blur
        pt-[env(safe-area-inset-top)]
      "
    >
      <Container className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <span className="grid h-7 w-7 place-items-center rounded-xl ">
            <img
              src="/web-logo.png"
              alt="Unhide Nepal logo"
              className="h-5 w-5 object-contain bg-transparent"
              loading="lazy"
            />
          </span>
          <span className="font-semibold text-slate-800 truncate">Unhide Nepal</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm">
          <Link to="/" className="text-slate-600 hover:text-cyan-700">Home</Link>
          <Link to="/Explore" className="text-slate-600 hover:text-cyan-700">Explore</Link>
          <Link to="/Listing/New" className="text-slate-600 hover:text-cyan-700">Add Place</Link>
          <Link to="#about" className="text-slate-600 hover:text-cyan-700">About</Link>
        </nav>

        {/* Right action (desktop) */}
        <Link
          to="/Login"
          className="hidden md:inline-flex items-center justify-center rounded-xl border border-cyan-200 bg-white px-4 py-1.5 text-sm font-medium text-cyan-700 hover:border-cyan-300 hover:bg-cyan-50"
        >
          Login
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-600"
        >
          <span className="sr-only">Open menu</span>
          {/* Icon */}
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </Container>
      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur">
          <nav className="px-4 py-3 flex flex-col items-start gap-2 text-sm">
            <Link onClick={() => setOpen(false)} to="/" className="py-2 text-slate-700 hover:text-cyan-700">Home</Link>
            <Link onClick={() => setOpen(false)} to="/Explore" className="py-2 text-slate-700 hover:text-cyan-700">Explore</Link>
            <Link onClick={() => setOpen(false)} to="/Listing/New" className="py-2 text-slate-700 hover:text-cyan-700">Add Place</Link>
            <Link onClick={() => setOpen(false)} to="#about" className="py-2 text-slate-700 hover:text-cyan-700">About</Link>
            <Link
              onClick={() => setOpen(false)}
              to="/Login"
              className="mt-2 inline-flex items-center justify-center rounded-xl border border-cyan-200 bg-white px-4 py-2 font-medium text-cyan-700 hover:border-cyan-300 hover:bg-cyan-50"
            >
              Login
            </Link>
          </nav>
        </div>
      )}

    </header>
  );
};

export default Header;
