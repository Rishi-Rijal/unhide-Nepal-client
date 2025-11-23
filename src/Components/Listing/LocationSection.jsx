import { Navigation } from "lucide-react";
import MapView from "../../Map.jsx";
import { useSelector } from "react-redux";

const handleDirection = (latitude, longitude) => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  window.open(url, "_blank");

}

const LocationSection = ({ latitude, longitude, title, onOpenLocation, authorId }) => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.isAdmin;
  const isOwner = (user && authorId) ? (user._id === authorId) : false;
  return (
  <section className="py-6">
    <h3 className="text-base font-semibold text-slate-900">Location</h3>
    <div className="mt-3 overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200">
      <MapView
        mode="view"
        lat={latitude || 27.7172}
        lng={longitude || 85.324}
      ></MapView>
      <div className="p-3">
        <div className="flex gap-2">
          <button onClick={() => handleDirection(latitude, longitude)} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
            <Navigation className="h-4 w-4" /> Get Directions to {title}
          </button>
          {typeof onOpenLocation === 'function' && (isAdmin || isOwner) && (
            <button onClick={onOpenLocation} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              Edit Location
            </button>
          )}
        </div>
      </div>
    </div>
  </section>
  );
};

export default LocationSection;
