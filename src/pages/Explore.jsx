import { useRef, useState, useEffect } from "react";
import { LocateFixed, Plus, Search, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import PlaceCard from "../Components/PlaceCard/PlaceCard";
import SearchBox from "../Components/SearchBox/SearchBox";
import CategoryDropdown from "../Components/CategoryDropdown.jsx";
import GROUPS from "../utils/groups.js";
import axios from "axios";
import MapView from "../Map.jsx";
import Container from "../Components/Container/Container";
import { getFilteredListings } from "../api/listing.api.js";
import { getLocationFromLongLat } from "../utils/getLocation.js";

const REVERSE_GEOMAPING_KEY = import.meta.env.VITE_REVERSE_GEOMAPING_KEY

// FilterControls component
function FilterControls({
  locationQuery,
  setLocationQuery,
  rating,
  setRating,
  distance,
  setDistance,
  selectedCategories,
  setSelectedCategories,
  onUseMyLocation,
  onSearch,
  onOpenMapPicker,
}) {

  const [locationDraft, setLocationDraft] = useState(locationQuery ?? "");

  useEffect(() => {
    setLocationDraft(locationQuery ?? "");
  }, [locationQuery]);

  const commitLocation = () => {
    const next = (locationDraft ?? "").trim();
    const current = (locationQuery ?? "").trim();
    if (next !== current) {
      setLocationQuery(next);
    }
  };


  return (
    <div className="lg:px-10 relative z-2 rounded-xl border border-slate-200 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 p-3 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] md:items-center gap-3">
        {/* Location input */}
        <div onBlur={commitLocation} className="relative">
          <SearchBox
            value={locationDraft}
            onChange={setLocationDraft}
            placeholder="Search location (city, address, landmark)"
            containerClassName="w-full mw-full h-12 max-w-[480px]"
          />


          {/*  buttons directly under the search box */}
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={onUseMyLocation}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 hover:bg-slate-50"
            >
              <LocateFixed className="h-3.5 w-3.5" />
              Use my location
            </button>

            <button
              type="button"
              onClick={onOpenMapPicker}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 hover:bg-slate-50"
            >
              <MapPin className="h-3.5 w-3.5" />
              Choose on map
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center hjustify-between relative md:-top-5  md:justify-end">
          <CategoryDropdown
            groups={GROUPS}
            placeholder="Select categories"
            searchPlaceholder="Search categories…"
            widthClassName="w-72"
            value={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between relative md:-top-5 md:justify-end">
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
            <option value="4">4★ and up</option>
            <option value="3">3★ and up</option>
            <option value="5">5★ only</option>
          </select>
        </div>
      </div>

      {/* Distance + Search Row */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col items-start gap-1">
          <label htmlFor="distance" className="pb-1 text-xs text-slate-600">
            Distance: {" "}
            <span className="font-semibold text-slate-800">
              {distance} km
            </span>
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

// PlaceCardsGrid component
function PlaceCardsGrid({ places }) {
  const normalized = Array.isArray(places)
    ? places.map((p, i) => ({
      id: p._id || i,
      image: p.images?.[0]?.url || "https://images.unsplash.com/photo-1529733905113-027ed85d7e33?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmVwYWx8ZW58MHx8MHx8fDA%3D",          // first image URL
      title: p.name || "",
      district: p?.physicalAddress?.substring(0, p.physicalAddress.lastIndexOf(",")),                             // not in API yet empty for now
      rating: typeof p.averageRating === "number" ? p.averageRating : 0,
      tags: Array.isArray(p.tags) ? p.tags : [],
      categories: Array.isArray(p.categories) ? p.categories : [],
      description: p.description || "",
    }))
    : [];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {normalized.map((place) => (
          <PlaceCard key={place.id} {...place} />
        ))}
      </div>
    </div>
  );
}


const getLatLngFromLocationName = async (locationText) => {
  const apiKey = "82adf37af56e432ea04596b30e80b0f0";

  const response = await axios.get(
    "https://api.geoapify.com/v1/geocode/search",
    {
      params: {
        text: locationText,
        apiKey: apiKey,
      },
    }
  );
  return response.data.features[0].geometry.coordinates;
};


// Main Explore component
export default function Explore() {
  const [distance, setDistance] = useState(50);
  const [rating, setRating] = useState("any");
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [locationQuery, setLocationQuery] = useState(initialQuery);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isMapPickerOpen, setIsMapPickerOpen] = useState(false);
  const [places, setPlaces] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([]);
  const lastChangeRef = useRef(null); // "coords" | "text" | null
  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false);



  const onUseMyLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (err) => {
        setError(err.message);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const buildFilterOptions = (extra = {}) => ({
    tags: selectedCategories,
    minRating: rating,
    lat: location?.latitude,
    lng: location?.longitude,
    distanceKm: distance,
    limit: 12,
    ...extra, // cursor etc
  });

  const onSearch = async () => {
    try {
      setError(null);
      const filterOptions = buildFilterOptions();
      const filteredListings = await getFilteredListings(filterOptions);

      setPlaces(filteredListings.data);
      setCursor(filteredListings.nextCursor);
      setHasNextPage(filteredListings.hasNextPage);
    } catch (error) {
      console.error("Error during search:", error);
      setError("Failed to fetch listings. Please try again later.");
    } 
  };

  const handleLoadMore = async () => {
    if (!hasNextPage || !cursor) return;

    try {
      setIsLoadingMore(true);
      setError(null);

      const filterOptions = buildFilterOptions({ cursor });
      const filteredListings = await getFilteredListings(filterOptions);

      // append results
      setPlaces(prev => [...prev, ...filteredListings.data]);
      setCursor(filteredListings.nextCursor);
      setHasNextPage(filteredListings.hasNextPage);
    } catch (error) {
      console.error("Error loading more listings:", error);
      setError("Failed to load more listings. Please try again.");
    } finally {
      setIsLoadingMore(false);
    }
  };


  useEffect(() => {
    if (!location) return;
    if (location.latitude == null || location.longitude == null) return;

    async function fetchLocation() {
      const { latitude, longitude } = location;
      const locationName = await getLocationFromLongLat(latitude, longitude);

      if (lastChangeRef.current === "text") {
        lastChangeRef.current = null;
        return;
      }
      setLocationQuery(
        `${locationName?.city_district ||
        locationName?.road ||
        ""} ${locationName?.county ||
        locationName?.state ||
        ""}, ${locationName?.country}`
      );
    }

    fetchLocation();
  }, [location]);

  useEffect(() => {
    if (!location) return;
    onSearch();
  }, [location]);

  useEffect(() => {
    onSearch()
  }, [])

  useEffect(() => {
    const trimmed = (locationQuery ?? "").trim();

    if (!trimmed) {
      setLocation(null);
      lastChangeRef.current = null;
      return;
    }

    if (lastChangeRef.current === "coords") {
      lastChangeRef.current = null;
      return;
    }
    lastChangeRef.current = "text";

    async function fetchCoords() {
      const coords = await getLatLngFromLocationName(trimmed); // geocoding fn
      if (!coords) return;
      setLocation({
        latitude: coords[1],
        longitude: coords[0],
      });
    }
    fetchCoords();
  }, [locationQuery]);

  return (
    <main className="mt-10 bg-slate-50">
      <Container className="py-8">
        <FilterControls
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          rating={rating}
          setRating={setRating}
          distance={distance}
          setDistance={setDistance}
          onUseMyLocation={onUseMyLocation}
          onSearch={onSearch}
          onOpenMapPicker={() => setIsMapPickerOpen(true)}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6">
          <PlaceCardsGrid places={places} />
        </div>

        {hasNextPage && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </Container>

      <Link
        to="/Listing/New"
        className="fixed lg:bottom-11 sm:bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-rose-700"
        aria-label="Add Place"
      >
        <Plus className="h-4 w-4" /> Add Place
      </Link>

      {/* Map picker modal */}
      {isMapPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-4xl h-[70vh] rounded-xl bg-white shadow-xl overflow-hidden flex flex-col">
            <header className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
              <h2 className="text-sm font-semibold text-slate-900">
                Choose location on map
              </h2>
              <button
                type="button"
                className="text-sm text-slate-500 hover:text-slate-700"
                onClick={() => setIsMapPickerOpen(false)}
              >
                Close
              </button>
            </header>

            <div className="flex-1">
              <MapView
                mode="select"
                lat={location?.latitude || 27.7172}
                lng={location?.longitude || 85.324}
                onLocationSelected={(lat, lng) => {
                  setLocation({ latitude: lat, longitude: lng });
                  setIsMapPickerOpen(false);
                }}
              />
            </div>

            <footer className="px-4 py-3 border-t border-slate-200 text-xs text-slate-500">
              Tap on the map to select a location. We’ll fill the address above automatically.
            </footer>
          </div>
        </div>
      )}
    </main>
  );
}
