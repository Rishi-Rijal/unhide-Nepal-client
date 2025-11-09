import React from "react";
import {
  CheckCircle2,
  Image as ImageIcon,
  MapPin,
  FileCheck2,
  Info,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";


// --- Small reusable UI bits ---
function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
      {children}
    </label>
  );
}

function Helper({ children }) {
  return <p className="mt-1 text-xs text-slate-500">{children}</p>;
}

function Input({ id, ...props }) {
  return (
    <input
      id={id}
      {...props}
      className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 ${props.className || ""
        }`}
    />
  );
}

function Textarea({ id, ...props }) {
  return (
    <textarea
      id={id}
      {...props}
      className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 ${props.className || ""
        }`}
    />
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${active
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"
        }`}
    >
      {children}
    </button>
  );
}

function Step({ title, icon: Icon, index, current }) {
  const state = index < current ? "done" : index === current ? "current" : "todo";
  const base = "flex flex-col items-center gap-2 min-w-[84px]";
  const circle =
    state === "done"
      ? "bg-emerald-600 text-white"
      : state === "current"
        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
        : "bg-white text-slate-500 ring-1 ring-slate-200";
  return (
    <div className={base}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${circle}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-xs font-medium text-slate-600 text-center max-w-[90px] leading-tight">
        {title}
      </div>
    </div>
  );
}

function Stepper({ current }) {
  const steps = [
    { title: "Details", icon: Info },
    { title: "Location", icon: MapPin },
    { title: "Photos", icon: ImageIcon },
    { title: "Tips", icon: Sparkles },
    { title: "Review & Submit", icon: FileCheck2 },
  ];
  return (
    <div className="flex items-center justify-center md:gap-4 gap-1">
      {steps.map((s, i) => (
        <React.Fragment key={s.title}>
          <Step title={s.title} icon={s.icon} index={i} current={current} />
          {i !== steps.length - 1 && (
            <div className="hidden sm:block h-px w-12 bg-slate-200" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// --- Main component ---
export default function NewListing() {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({
    name: "Everest Base Camp Trek",
    description:
      "An iconic trek offering breathtaking views of the world's highest peak and an immersive cultural experience in the Sherpa villages. Prepare for challenging terrain and unpredictable weather.",
    category: "Adventure",
    tags: ["Hiking", "Photography", "Camping"],
    // location
    latitude: "",
    longitude: "",
    // photos
    photos: [],
    // tips
    tips: {
      permits: true,
      bestSeason: "Spring & Autumn",
      difficulty: "Challenging",
      extra: "Carry cash; ATMs are limited along the trail.",
    },
  });

  const allTags = [
    "Hiking",
    "Waterfalls",
    "Temples",
    "Local Cuisine",
    "Wildlife Spotting",
    "Family Friendly",
    "Photography",
    "Camping",
    "Spiritual",
    "Historical",
  ];

  function toggleTag(tag) {
    setForm((f) => {
      const has = f.tags.includes(tag);
      return { ...f, tags: has ? f.tags.filter((t) => t !== tag) : [...f.tags, tag] };
    });
  }

  function next() {
    if (step === 0) {
      // Simple validation for details
      if (!form.name || !form.description) return alert("Please fill name and description.");
    }
    if (step === 1) {
      if (!form.latitude || !form.longitude)
        return alert("Please provide latitude and longitude (temporary until Mapbox is wired).");
    }
    setStep((s) => Math.min(s + 1, 4));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit(e) {
    e?.preventDefault();
    // TODO: replace with real API call
    alert("Listing submitted!\n" + JSON.stringify(form, null, 2));
  }

  return (
    <main className=" mt-10 bg-slate-50 min-h-screen py-10">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Add a New Hidden Gem to Unhide Nepal
        </h1>
        <div className="mt-6">
          <Stepper current={step} />
        </div>

        {/* Card */}
        <div className="mt-8 rounded-2xl bg-white p-2 sm:p-8 shadow-sm ring-1 ring-slate-200">
          {step === 0 && (
            <section>
              <header className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">Tell Us About Your Spot</h2>
                <p className="text-sm text-slate-500">Share the basics so others can find this hidden gem.</p>
              </header>

              <div className="mt-6 space-y-5">
                <div>
                  <Label htmlFor="name">Place Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Everest Base Camp Trek"
                  />
                </div>
                <div>
                  <Label htmlFor="desc">Short Description</Label>
                  <Textarea
                    id="desc"
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="What makes it special?"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option>Adventure</option>
                    <option>Nature</option>
                    <option>Culture</option>
                    <option>Relaxation</option>
                    <option>Pilgrimage</option>
                  </select>
                </div>
                <div>
                  <Label>Tags (What makes it special?)</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {allTags.map((t) => (
                      <Pill key={t} active={form.tags.includes(t)} onClick={() => toggleTag(t)}>
                        {t}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {step === 1 && (
            <section>
              <header className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">Where is it?</h2>
                <p className="text-sm text-slate-500">Mapbox coming soon — use coordinates for now.</p>
              </header>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="lat">Latitude</Label>
                  <Input
                    id="lat"
                    placeholder="27.9878"
                    value={form.latitude}
                    onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                  />
                  <Helper>Paste from map until auto‑picker is added.</Helper>
                </div>
                <div>
                  <Label htmlFor="lng">Longitude</Label>
                  <Input
                    id="lng"
                    placeholder="86.9250"
                    value={form.longitude}
                    onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                  />
                </div>
              </div>

              {/* Mapbox placeholder container */}
              <div className="mt-6 h-64 rounded-xl border border-dashed border-slate-300 bg-slate-50 grid place-items-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-6 w-6 text-slate-400" />
                  <p className="mt-2 text-xs text-slate-500">Map placeholder — mount Mapbox GL here later.</p>
                </div>
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <header className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">Add a Few Photos</h2>
                <p className="text-sm text-slate-500">JPEG or PNG. First photo will be used as the cover.</p>
              </header>

              <div className="mt-6">
                <label
                  htmlFor="photos"
                  className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center hover:bg-slate-100"
                >
                  <ImageIcon className="h-8 w-8 text-slate-400" />
                  <div className="text-sm text-slate-600">
                    Drag & drop or <span className="font-semibold">browse</span> to upload
                  </div>
                  <input
                    id="photos"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setForm({ ...form, photos: files.map((f) => f.name) });
                    }}
                  />
                </label>

                {form.photos.length > 0 && (
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {form.photos.map((p) => (
                      <li key={p} className="truncate rounded-md bg-white px-3 py-2 ring-1 ring-slate-200">
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <header className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">Helpful Tips</h2>
                <p className="text-sm text-slate-500">Share what visitors should know before they go.</p>
              </header>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      id="permits"
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
                      checked={form.tips.permits}
                      onChange={(e) => setForm({ ...form, tips: { ...form.tips, permits: e.target.checked } })}
                    />
                    <Label htmlFor="permits">Permits required</Label>
                  </div>

                  <div>
                    <Label htmlFor="season">Best season</Label>
                    <Input
                      id="season"
                      value={form.tips.bestSeason}
                      onChange={(e) => setForm({ ...form, tips: { ...form.tips, bestSeason: e.target.value } })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <select
                      id="difficulty"
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      value={form.tips.difficulty}
                      onChange={(e) => setForm({ ...form, tips: { ...form.tips, difficulty: e.target.value } })}
                    >
                      <option>Easy</option>
                      <option>Moderate</option>
                      <option>Challenging</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="extra">Extra advice</Label>
                  <Textarea
                    id="extra"
                    rows={6}
                    value={form.tips.extra}
                    onChange={(e) => setForm({ ...form, tips: { ...form.tips, extra: e.target.value } })}
                    placeholder="What to pack, safety notes, local etiquette, etc."
                  />
                </div>
              </div>
            </section>
          )}

          {step === 4 && (
            <section>
              <header className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">Review & Submit</h2>
                <p className="text-sm text-slate-500">Double‑check your details below.</p>
              </header>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-sm font-semibold text-slate-700">Basics</div>
                  <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                    <div><dt className="font-medium">Name</dt><dd>{form.name}</dd></div>
                    <div><dt className="font-medium">Category</dt><dd>{form.category}</dd></div>
                    <div className="sm:col-span-2"><dt className="font-medium">Description</dt><dd>{form.description}</dd></div>
                    <div className="sm:col-span-2"><dt className="font-medium">Tags</dt><dd>{form.tags.join(", ") || "—"}</dd></div>
                  </dl>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-sm font-semibold text-slate-700">Location</div>
                  <dl className="mt-2 grid grid-cols-2 gap-2 text-sm text-slate-600">
                    <div><dt className="font-medium">Lat</dt><dd>{form.latitude || "—"}</dd></div>
                    <div><dt className="font-medium">Lng</dt><dd>{form.longitude || "—"}</dd></div>
                  </dl>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-sm font-semibold text-slate-700">Tips</div>
                  <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                    <div><dt className="font-medium">Permits</dt><dd>{form.tips.permits ? "Yes" : "No"}</dd></div>
                    <div><dt className="font-medium">Best season</dt><dd>{form.tips.bestSeason}</dd></div>
                    <div><dt className="font-medium">Difficulty</dt><dd>{form.tips.difficulty}</dd></div>
                    <div className="sm:col-span-2"><dt className="font-medium">Extra</dt><dd>{form.tips.extra}</dd></div>
                  </dl>
                </div>
              </div>
            </section>
          )}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Next Step <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                <CheckCircle2 className="h-4 w-4" /> Submit Listing
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
