import { Navigation } from "lucide-react";

const LocationSection = ({ locationImage, title }) => (
  <section className="py-6 max-w-5xl mx-auto px-4">
    <h3 className="text-base font-semibold text-slate-900">Location</h3>
    <div className="mt-3 overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200">
      <img src={locationImage} alt="Map" className="h-72 w-full object-cover" />
      <div className="p-3">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
          <Navigation className="h-4 w-4" /> Get Directions to {title}
        </button>
      </div>
    </div>
  </section>
);

export default LocationSection;
