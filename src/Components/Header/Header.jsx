import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../api/user.api.js";
import { clearUser } from "../../utils/authSlice.js";

// Small helper to render user initials
const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const UserMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const initials = getInitials(user?.name || user?.email || "U");

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-800 font-medium focus:outline-none ring-1 ring-slate-100"
        title={user?.name || user?.email}
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 py-2 z-50">
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="font-medium text-slate-800 truncate">{user?.name}</div>
            <div className="text-xs text-slate-500 truncate">{user?.email}</div>
          </div>
          <Link
            to="/change-password"
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Change password
          </Link>
          <button
            type="button"
            onClick={async () => {
              setOpen(false);
              await onLogout();
            }}
            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed:", err);
    }
    dispatch(clearUser());
  }

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-slate-200
        bg-white/90 supports-[backdrop-filter]:bg-white/60 backdrop-blur
        pt-[env(safe-area-inset-top)]
        lg:text-lg 
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
        <nav className="hidden md:flex items-center gap-10 lg:gap-16 text-sm">
          <Link to="/" className="text-slate-600 hover:text-cyan-700">Home</Link>
          <Link to="/explore" className="text-slate-600 hover:text-cyan-700">Explore</Link>
          <Link to="/wishlist" className="text-slate-600 hover:text-cyan-700">WishList</Link>
          <Link to="/listing/new" className="text-slate-600 hover:text-cyan-700">Add Place</Link>
          <Link to="/about" className="text-slate-600 hover:text-cyan-700">About</Link>
        </nav>

        {/* Right action (desktop) */}
        {!user && (<Link
          to="/login"
          className="hidden md:inline-flex items-center justify-center rounded-xl border border-cyan-200 bg-white px-4 py-1.5 text-sm font-medium text-cyan-700 hover:border-cyan-300 hover:bg-cyan-50"
        >
          Login
        </Link>)}
        {user && (
          <div className="hidden md:flex items-center gap-3 relative">
            <UserMenu user={user} onLogout={handleLogout} />
          </div>
        )}


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
            <Link onClick={() => setOpen(false)} to="/explore" className="py-2 text-slate-700 hover:text-cyan-700">Explore</Link>
            <Link onClick={() => setOpen(false)} to="/wishlist" className="py-2 text-slate-700 hover:text-cyan-700">WishList</Link>
            <Link onClick={() => setOpen(false)} to="/listing/new" className="py-2 text-slate-700 hover:text-cyan-700">Add Place</Link>
            <Link onClick={() => setOpen(false)} to="/about" className="py-2 text-slate-700 hover:text-cyan-700">About</Link>
            {!user && <Link
              onClick={() => setOpen(false)}
              to="/login"
              className="mt-2 inline-flex items-center justify-center rounded-xl border border-cyan-200 bg-white px-4 py-2 font-medium text-cyan-700 hover:border-cyan-300 hover:bg-cyan-50"
            >
              Login
            </Link>}
            {user && (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  to="/ChangePassword"
                  className="py-2 text-slate-700 hover:text-cyan-700"
                >
                  Change password
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    setOpen(false);
                    await handleLogout();
                  }}
                  className="mt-2 inline-flex items-center justify-center rounded-xl border border-cyan-200 bg-white px-4 py-2 font-medium text-cyan-700 hover:border-cyan-300 hover:bg-cyan-50"
                >
                  Logout
                </button>
              </>
            )}
            
          </nav>
        </div>
      )}

    </header>
  );
};

export default Header;
