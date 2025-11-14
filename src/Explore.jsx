
import { useRef, useState, useMemo } from "react";
import { LocateFixed, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import PlaceCard from "./Components/PlaceCard/PlaceCard";
import SearchBox from "./Components/SearchBox.jsx/SearchBox";
import CategoryDropdown from "./Components/CategoryDropdown.jsx";
import GROUPS from "./utils/groups.js";
import axios from "axios";

const REVERSE_GEOMAPING_KEY = import.meta.env.VITE_REVERSE_GEOMAPING_KEY 

console.log("Reverse Geomapping Key ", REVERSE_GEOMAPING_KEY);

const PLACES = [
  {
    title: "Phoksundo Lake",
    district: "Dolpa",
    rating: 5,
    tags: ["High-Altitude", "Lake", "Trekking"],
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop",
    description:
      "Nepal's deepest lake, known for its mesmerizing turquoise color and dramatic cliffs.",
  },
  {
    title: "Annapurna Base Camp",
    district: "Kaski",
    rating: 5,
    tags: ["Trekking", "Mountain", "Viewpoint"],
    image:
      "https://images.unsplash.com/photo-1549880181-56a44cf4a9a7?q=80&w=2070&auto=format&fit=crop",
    description:
      "A world-renowned trekking destination offering breathtaking Himalayan vistas.",
  },
  {
    title: "Chitwan National Park",
    district: "Chitwan",
    rating: 4,
    tags: ["Wildlife", "Jungle Safari", "Nature"],
    image:
      "https://images.unsplash.com/photo-1568733873715-f9d49737b311?q=80&w=1932&auto=format&fit=crop",
    description:
      "Home to rhinos, tigers, and diverse flora and fauna, offering exciting jungle safaris.",
  },
  {
    title: "Begnas Lake",
    district: "Kaski",
    rating: 4,
    tags: ["Lake", "Boating", "Relaxation"],
    image:
      "https://images.unsplash.com/photo-1602459040017-9d2f0ba6727b?q=80&w=2069&auto=format&fit=crop",
    description:
      "A peaceful freshwater lake near Pokhara, ideal for boating, fishing, and picnics.",
  },
  {
    title: "Bandipur Homestay",
    district: "Tanahun",
    rating: 5,
    tags: ["Homestay", "Cultural", "Scenic"],
    image:
      "https://images.unsplash.com/photo-1581079215507-3f7a3b8f3c1c?q=80&w=2070&auto=format&fit=crop",
    description:
      "Experience authentic Newari culture and stunning Himalayan views from a hilltop town.",
  },
  {
    title: "Poon Hill",
    district: "Myagdi",
    rating: 5,
    tags: ["Trekking", "Sunrise", "Viewpoint"],
    image:
      "https://images.unsplash.com/photo-1519680772-8bba63c6f61e?q=80&w=2069&auto=format&fit=crop",
    description:
      "Famous for its spectacular sunrise views over the Annapurna and Dhaulagiri ranges.",
  },
  {
    title: "Langtang Valley",
    district: "Rasuwa",
    rating: 4,
    tags: ["Trekking", "Himalayan", "Culture"],
    image:
      "https://images.unsplash.com/photo-1519681394-2fbb3bfb60b0?q=80&w=2069&auto=format&fit=crop",
    description:
      "A beautiful valley offering stunning Himalayan landscapes and rich Tamang culture.",
  },
  {
    title: "Gosaikunda Lake",
    district: "Rasuwa",
    rating: 5,
    tags: ["Pilgrimage", "Lake", "High-Altitude"],
    image:
      "https://images.unsplash.com/photo-1666719167403-8ddcf2dcecac?q=80&w=2070&auto=format&fit=crop",
    description:
      "A sacred Hindu site; this pristine alpine lake is a popular pilgrimage and trek.",
  },
];

// FilterControls component
function FilterControls({ locationQuery, setLocationQuery, rating, setRating, distance, setDistance, onUseMyLocation, onSearch }) {
  return (
    <div className=" relative z-2 rounded-xl border border-slate-200 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 p-3 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] md:items-center gap-3">
        {/* Location input */}
        <div className="relative  ">
          <SearchBox
            value={locationQuery}
            onChange={setLocationQuery}
            placeholder="Search location (city, address, landmark)"
            containerClassName="w-full mw-full max-w-[480px]"
            trailing={
              <button type="button" onClick={onUseMyLocation}
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                aria-label="Use my location"
              >
                <LocateFixed className="h-3.5 w-3.5" aria-hidden="true" />
                Use my location
              </button>
            }
          />
        </div>
        {/* Category */}
        <div className="flex items-center justify-between md:justify-end">
          <CategoryDropdown
            groups={GROUPS}
            placeholder="Select categories"
            searchPlaceholder="Search categories…"
            widthClassName="w-72"
            showBulkActions
          />
        </div>
        {/* Rating */}
        <div className="flex items-center justify-between md:justify-end">
          <label className="sr-only" htmlFor="rating">
            Minimum rating
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white py-2.5 px-3 text-xs shadow-sm focus:outline-none hover:bg-slate-50"
          >
            <option value="any">Any rating</option>
            <option value="4+">4★ and up</option>
            <option value="3+">3★ and up</option>
            <option value="5">5★ only</option>
          </select>
        </div>
      </div>
      {/* Distance + Search Row */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="distance" className="pb-1 text-xs text-slate-600">
            Distance: <span className="font-semibold text-slate-800">{distance} km</span>
          </label>
          <input
            id="distance"
            type="range"
            min={1}
            max={250}
            step={1}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="h-1 w-56 rounded-full accent-emerald-600"
          />
        </div>
        <button
          type="button"
          onClick={onSearch}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
          aria-label="Search places"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Search
        </button>
      </div>
    </div>
  );
}

// MapPlaceholder component
function MapPlaceholder({ mapRef }) {
  return (
    <div className="relative z-0 lg:block">
      <div className="h-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100/70 shadow-sm">
        {/* Vacant area for Mapbox mount */}
        <div ref={mapRef} className="absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
          <div>
            <div className="mb-2 text-sm uppercase tracking-wide text-slate-500">Map placeholder</div>
            <p className="text-xs text-slate-600">Mount Mapbox GL on this container later.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// PlaceCardsGrid component
function PlaceCardsGrid({ places }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {places.map((p) => (
          <PlaceCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  );
}

const getLocationFromLongLat = async (lat, lng) => {
  const location = await axios.get(`https://us1.locationiq.com/v1/reverse?key=${REVERSE_GEOMAPING_KEY}&lat=${lat}&lon=${lng}&format=json`)
  return location.data.address;
}

// Main Explore component
export default function Explore() {
  const mapRef = useRef(null);
  const [distance, setDistance] = useState(50);
  const [rating, setRating] = useState("any");
  const [locationQuery, setLocationQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // Memoize places and groups if needed for performance
  const places = useMemo(() => PLACES, []);

  // TODO: Implement location usage
  // const onUseMyLocation = () => {
  //   // TODO: Use browser geolocation and update locationQuery
  // };


  const onUseMyLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }


    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        const locationName = await getLocationFromLongLat(latitude, longitude);
        setLocationQuery(`${locationName?.city_district || locationName?.road || ''} ${locationName?.county || locationName?.state || ''}, ${locationName?.country}`);
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );
  };

  // TODO: Implement search logic
  const onSearch = () => {
    // TODO: Filter places based on locationQuery, rating, distance, etc.
  };

  return (
    <main className="mt-10 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <FilterControls
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          rating={rating}
          setRating={setRating}
          distance={distance}
          setDistance={setDistance}
          onUseMyLocation={onUseMyLocation}
          onSearch={onSearch}
        />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[300px,1fr]">
          <MapPlaceholder mapRef={mapRef} />
          <PlaceCardsGrid places={places} />
        </div>
      </div>
      <Link
        to="/Listing/New"
        className="fixed bottom-11 right-6 inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-rose-700"
        aria-label="Add Place"
      >
        <Plus className="h-4 w-4" /> Add Place
      </Link>
    </main>
  );
}

