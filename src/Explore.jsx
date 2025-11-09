import {useRef, useState} from "react";
import { LocateFixed, Plus } from "lucide-react";
import PlaceCard from "./Components/PlaceCard/PlaceCard";
import SearchBox from "./Components/SearchBox.jsx/SearchBox";



export default function ExplorePlaces() {
  // Mapbox placeholder: attach your Mapbox GL instance to mapRef when ready
  const mapRef = useRef(null);
  const [distance, setDistance] = useState(50);

  const places = [
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
        "A world‑renowned trekking destination offering breathtaking Himalayan vistas.",
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

  return (
    <main className=" mt-10 bg-slate-50">
      {/* Top spacing so it slots under your existing header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Row */}
        <div className=" rounded-xl border border-slate-200 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 p-3 md:p-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] md:items-center gap-3">
            {/* Search */}
            <div className="relative">
              <SearchBox className="w-full" />
            </div>

            {/* Category */}
            <div className="flex items-center justify-between md:justify-end">
              <select className="rounded-lg border border-slate-200 bg-white py-2.5 px-3 text-sm shadow-sm focus:outline-none hover:bg-slate-50">
                <option>All Categories</option>
                <option>Lake</option>
                <option>Trekking</option>
                <option>Wildlife</option>
                <option>Culture</option>
              </select>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-between md:justify-end">
              <select className="rounded-lg border border-slate-200 bg-white py-2.5 px-3 text-sm shadow-sm focus:outline-none hover:bg-slate-50">
                <option>Any Rating</option>
                <option>4★ and up</option>
                <option>5★ only</option>
              </select>
            </div>
          </div>

          {/* Distance + Location Row */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-600">Distance: <span className="font-semibold text-slate-800">{distance} km</span></span>
              <input
                type="range"
                min={1}
                max={250}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="h-1 w-56 rounded-full accent-emerald-600"
              />
            </div>

            <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700">
              <LocateFixed className="h-4 w-4" /> Use my location
            </button>
          </div>
        </div>


        {/* Content Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[300px,1fr]">
          {/* Map */}
          <div className="hidden lg:block">
            <div className="relative h-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100/70 shadow-sm">
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

          {/* Cards */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {places.map((p) => (
                <PlaceCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Add button */}
      <button
        className="fixed bottom-11 right-6 inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-rose-700"
        aria-label="Add Place"
      >
        <Plus className="h-4 w-4" /> Add Place
      </button>
    </main>
  );
}

