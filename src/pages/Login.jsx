import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/user.api.js";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/authSlice.js";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.api.js";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await loginUser({ email: form.email, password: form.password });
      // normalize to user object stored in slice
      dispatch(setUser(user.data));
      navigate("/");

    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      setError(errorMessage || "Login failed. Please try again.");
    }
  }

  return (
    <main className="mt-10 min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:py-14">
        <div className="grid items-center">
          {/* Login card */}
          <section className="flex w-full items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-slate-200">
              <h1 className="text-center text-2xl font-bold text-slate-900">Login</h1>
              <p className="mt-1 text-center text-xs text-slate-500">Welcome back! Enter your details to explore Nepal.</p>
              {error && (
                <div className="mt-4 rounded-md bg-rose-50 p-3 text-sm text-rose-700">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                  <div className="mt-1 relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                  <div className="mt-1 relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      id="password"
                      type={showPw ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-10 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:bg-slate-100"
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={form.remember}
                      onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-200"
                    />
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="text-xs font-medium text-amber-600 hover:underline">Forgot password?</Link>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
                >
                  Login
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-[11px] text-slate-500">OR CONTINUE WITH</span>
                  </div>
                </div>

                {/* Social */}
                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const base = api.defaults.baseURL || import.meta.env.VITE_SERVER_URI || "";
                      const url = `${base.replace(/\/$/, "")}/api/v1/user/auth/google`;
                      window.location.href = url;
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
                  >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-4 w-4" />
                    Sign in with Google
                  </button>
                </div>

                <p className="text-center text-xs text-slate-600">
                  Don't have an account? <Link to="/Register" className="font-semibold text-amber-600 hover:underline">Register</Link>
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
