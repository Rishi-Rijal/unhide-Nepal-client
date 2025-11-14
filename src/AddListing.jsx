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
import PhotoUploader from "./Components/AddListing/PhotoUploader";
import Label from "./Components/Shared/Label";
import Helper from "./Components/Shared/Helper";
import Input from "./Components/Shared/Input";
import Textarea from "./Components/Shared/Textarea";
import Stepper from "./Components/AddListing/Stepper";
import GROUPS from "./utils/groups";
import CategoryDropdown from "./Components/CategoryDropdown.jsx";
import MapView from "./Map.jsx";

const uniq = (arr) => Array.from(new Set(arr));
const tagsFor = (categories) => uniq(categories.flatMap((c) => GROUPS[c] || []));

// --- Main component ---
export default function NewListing() {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({
    name: "Everest Base Camp Trek",
    description:
      "An iconic trek offering breathtaking views of the world's highest peak and an immersive cultural experience in the Sherpa villages. Prepare for challenging terrain and unpredictable weather.",
    categories: [],
    tags: [],
    // location
    latitude: "",
    longitude: "",
    // photos
    photos: [], // will store File objects
    // tips
    tips: {
      permits: true,
      bestSeason: "Spring & Autumn",
      difficulty: "Challenging",
      extra: "Carry cash; ATMs are limited along the trail.",
    },
  });
  const categoryGroups = React.useMemo(() => ({ Categories: Object.keys(GROUPS) }), []);
  const tagGroups = React.useMemo(() => {
    if (form.categories.length === 0) return {};
    const out = {};
    form.categories.forEach((c) => {
      out[c] = GROUPS[c] || [];
    });
    return out;
  }, [form.categories]);

  const handleCategoriesChange = (nextCategories) => {
    const validTags = tagsFor(nextCategories);
    setForm((prev) => ({
      ...prev,
      categories: nextCategories,
      tags: prev.tags.filter((t) => validTags.includes(t)), // prune invalid tags
    }));
  };

  const handleTagsChange = (nextTags) => {
    const valid = tagsFor(form.categories);
    setForm((prev) => ({
      ...prev,
      tags: nextTags.filter((t) => valid.includes(t)), // guard against stale/invalid tags
    }));
  };

  const [errors, setErrors] = React.useState({});

  function validateStep(s) {
    const errs = {};
    if (s === 0) {
      if (!form.name || !form.name.trim()) errs.name = "Please enter a name.";
      if (!form.description || !form.description.trim()) errs.description = "Please add a short description.";
    }
    if (s === 1) {
      if (!form.latitude || Number.isNaN(Number(form.latitude))) errs.latitude = "Valid latitude required.";
      if (!form.longitude || Number.isNaN(Number(form.longitude))) errs.longitude = "Valid longitude required.";
    }
    if (s === 2) {
      if (!form.photos || form.photos.length === 0) errs.photos = "Please upload at least one photo.";
    }
    if (s === 3) {
      if (!form.tips || !form.tips.difficulty) errs.difficulty = "Please select difficulty.";
    }
    return errs;
  }

  function next() {
    const errs = validateStep(step);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 4));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit(e) {
    e?.preventDefault();
    // validate all steps before submit
    const allErrs = {
      ...validateStep(0),
      ...validateStep(1),
      ...validateStep(2),
      ...validateStep(3),
    };
    if (Object.keys(allErrs).length) {
      setErrors(allErrs);
      // jump to first errored step
      if (allErrs.name || allErrs.description || allErrs.tags) setStep(0);
      else if (allErrs.latitude || allErrs.longitude) setStep(1);
      else if (allErrs.photos) setStep(2);
      else if (allErrs.difficulty) setStep(3);
      return;
    }
    setErrors({});
    // TODO: replace with real API call that sends FormData including photos
    alert("Listing submitted!\n" + JSON.stringify({ ...form, photos: form.photos.map((f) => f.name) }, null, 2));
  }
  const parseNumberOrNull = (value) => {
    const n = Number(value);
    return value === "" || Number.isNaN(n) ? null : n;
  };



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
                    autoComplete="off"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Everest Base Camp Trek"
                  />
                  {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
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
                  {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description}</p>}
                </div>
                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1" >Categories</label>
                    <CategoryDropdown
                      groups={categoryGroups}
                      value={form.categories}
                      onChange={handleCategoriesChange}
                      placeholder="Select categories…"
                      widthClassName="w-full"
                    />
                  </div>

                  {/* Tags (dependent on categories) */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tags</label>
                    <CategoryDropdown
                      groups={tagGroups}
                      value={form.tags}
                      onChange={handleTagsChange}
                      placeholder={form.categories.length ? "Select tags…" : "Pick categories first…"}
                      disabled={form.categories.length === 0}
                      widthClassName="w-full"
                    />
                    {form.tags.length > 0 && (
                      <p className="mt-2 text-xs text-slate-500">Selected tags: {form.tags.join(", ")}</p>
                    )}
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
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        latitude: e.target.value,
                      }))
                    }
                  />
                  &nbsp;
                  {errors.latitude && <p className="mt-1 text-xs text-rose-600">{errors.latitude}</p>}
                </div>
                <div>
                  <Label htmlFor="lng">Longitude</Label>
                  <Input
                    id="lng"
                    placeholder="86.9250"
                    value={form.longitude}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        longitude: e.target.value,
                      }))
                    }
                  />
                  {errors.longitude && <p className="mt-1 text-xs text-rose-600">{errors.longitude}</p>}
                </div>
              </div>

              {(() => {
                const latNum = parseNumberOrNull(form.latitude);
                const lngNum = parseNumberOrNull(form.longitude);

                return (
                  <MapView
                    mode="select"
                    lat={latNum ?? 27.7172}
                    lng={lngNum ?? 85.324}
                    onLocationSelected={(lat, lng) => {
                      setForm((f) => ({
                        ...f,
                        latitude: lat.toFixed(6),
                        longitude: lng.toFixed(6),
                      }));
                    }}
                  />
                );
              })()}
            </section>
          )}



          {step === 2 && (
            <section>
              <header className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">Add a Few Photos</h2>
                <p className="text-sm text-slate-500">JPEG or PNG. First photo will be used as the cover.</p>
              </header>

              <div className="mt-6">
                <PhotoUploader
                  photos={form.photos}
                  setPhotos={(next) =>
                    setForm((f) => ({
                      ...f,
                      photos: typeof next === "function" ? next(f.photos) : next,
                    }))
                  }
                />
                {errors.photos && <p className="mt-2 text-xs text-rose-600">{errors.photos}</p>}
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
                    {errors.difficulty && <p className="mt-1 text-xs text-rose-600">{errors.difficulty}</p>}
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
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              aria-disabled={step === 0}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={next}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Next Step <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
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
