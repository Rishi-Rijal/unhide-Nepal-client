import React from "react";
import { Mail, Lock, User, Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [errors, setErrors] = React.useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!form.agree) e.agree = "Please accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    // TODO: hook up to your API
    alert("Registered successfully!\n" + JSON.stringify({ name: form.name, email: form.email }, null, 2));
  }

  return (
    <main className="mt-10 min-h-screen bg-white grid place-items-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 sm:p-9 shadow-sm ring-1 ring-slate-200">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 text-2xl font-extrabold text-amber-600">
        
          Unhide Nepal
        </div>

        <h1 className="mt-4 text-center text-2xl font-extrabold text-slate-900">Register for Unhide Nepal</h1>
        <p className="mt-1 text-center text-xs text-slate-500">Join the community of explorers</p>

        <form onSubmit={submit} className="mt-6 space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
            <div className="mt-1 relative">
              <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200 ${
                  errors.name ? "border-rose-300" : "border-slate-300"
                }`}
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <div className="mt-1 relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="explore@unhidenepal.com"
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200 ${
                  errors.email ? "border-rose-300" : "border-slate-300"
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <div className="mt-1 relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200 ${
                  errors.password ? "border-rose-300" : "border-slate-300"
                }`}
              />
            </div>
            {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
          </div>

          {/* Confirm */}
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-slate-700">Confirm Password</label>
            <div className="mt-1 relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                id="confirm"
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200 ${
                  errors.confirm ? "border-rose-300" : "border-slate-300"
                }`}
              />
            </div>
            {errors.confirm && <p className="mt-1 text-xs text-rose-600">{errors.confirm}</p>}
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => setForm({ ...form, agree: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-200"
            />
            <span>Agree to terms and conditions</span>
          </div>
          {errors.agree && <p className="-mt-3 text-xs text-rose-600">{errors.agree}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
          >
            Register
          </button>

          <p className="text-center text-xs text-slate-600">
            Already have an account? <Link to="/Login" className="font-semibold text-amber-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
