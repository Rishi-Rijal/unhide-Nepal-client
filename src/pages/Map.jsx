import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl"; 
import "maplibre-gl/dist/maplibre-gl.css"; 

import markerIcon from "../../public/web-logo.png";

const DEFAULT_LAT = 27.7172;
const DEFAULT_LNG = 85.3240;

// Helpers to keep maplibre happy
function toValidLat(value, fallback = DEFAULT_LAT) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(90, Math.max(-90, n)); // clamp
}

function toValidLng(value, fallback = DEFAULT_LNG) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  // normalize to [-180, 180]
  let wrapped = ((n + 180) % 360 + 360) % 360 - 180;
  return wrapped;
}

export default function MapView({
  mode = "select",            // "select" | "view"
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  onLocationSelected = () => {},
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  const [coords, setCoords] = useState({
    lat: toValidLat(lat),
    lng: toValidLng(lng),
  });

  const [theme, setTheme] = useState("terrain");

  const initialPositionRef = useRef({
    lat: toValidLat(lat),
    lng: toValidLng(lng),
  });

  const modeRef = useRef(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const MAP_STYLES = {
    satellite: "https://tiles.stadiamaps.com/styles/alidade_satellite.json",
    terrain: "https://tiles.stadiamaps.com/styles/outdoors.json",
  };

  // 1) Initialize map once
  useEffect(() => {
    if (map.current) return;

    const startLat = toValidLat(lat);
    const startLng = toValidLng(lng);

    initialPositionRef.current = { lat: startLat, lng: startLng };

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLES[theme],
      center: [startLng, startLat],
      zoom: 12,
    });

    // Marker element
    const el = document.createElement("div");
    el.className = "w-9 h-9 bg-cover bg-center"; 
    el.style.backgroundImage = `url(${markerIcon})`;

    marker.current = new maplibregl.Marker({ element: el })
      .setLngLat([startLng, startLat])
      .addTo(map.current);

    const handleClick = (e) => {
      if (modeRef.current !== "select") return; 

      const { lng: clickLng, lat: clickLat } = e.lngLat || {};
      if (!Number.isFinite(clickLat) || !Number.isFinite(clickLng)) return;

      const safeLat = toValidLat(clickLat);
      const safeLng = toValidLng(clickLng);

      setCoords({ lat: safeLat, lng: safeLng });

      if (marker.current) marker.current.setLngLat([safeLng, safeLat]);

      try {
        onLocationSelected(safeLat, safeLng);
      } catch (err) {
        console.error("onLocationSelected callback failed", err);
      }
    };

    map.current.on("click", handleClick);
  }, []); // init once

  useEffect(() => {
    if (!map.current || !marker.current) return;

    const safeLat = toValidLat(lat);
    const safeLng = toValidLng(lng);

    if (!Number.isFinite(safeLat) || !Number.isFinite(safeLng)) return;

    map.current.flyTo({
      center: [safeLng, safeLat],
      zoom: map.current.getZoom(),
      speed: 1.2,
    });

    marker.current.setLngLat([safeLng, safeLat]);
    setCoords({ lat: safeLat, lng: safeLng });
  }, [lat, lng]);

  // Theme switcher
  const changeTheme = (t) => {
    setTheme(t);
    if (!map.current) return;

    map.current.setStyle(MAP_STYLES[t]);

    map.current.once("idle", () => {
      if (marker.current) marker.current.addTo(map.current);
    });
  };

  const goToInitialPosition = () => {
    if (!map.current || !marker.current) return;

    const { lat: initLat, lng: initLng } = initialPositionRef.current;

    map.current.flyTo({
      center: [initLng, initLat],
      zoom: 12,
      speed: 1.2,
    });

    marker.current.setLngLat([initLng, initLat]);
    setCoords({ lat: initLat, lng: initLng });
  };

  return (
    <div className="relative h-[40vh] min-h-[320px] max-h-[520px] w-full rounded-lg overflow-hidden">
      {/* MAP */}
      <div
        ref={mapContainer}
        className="h-full w-full rounded-lg overflow-hidden"
      />

      {/* THEME SWITCHER */}
      <div className="absolute top-3 left-3 bg-white border rounded-lg p-1 shadow-md flex gap-1 z-10">
        {["satellite", "terrain"].map((t) => (
          <button
            key={t}
            onClick={() => changeTheme(t)}
            className={`
              px-3 py-1 text-sm rounded-md capitalize
              ${
                theme === t
                  ? "bg-emerald-600 text-white"
                  : "bg-white border text-slate-700"
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 🔹 RESET BUTTON */}
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={goToInitialPosition}
          className="px-3 py-1 text-sm rounded-md bg-white border shadow-md text-slate-700 hover:bg-slate-100"
        >
          Initial position
        </button>
      </div>

      {/* COORDINATES */}
      <div className="absolute bottom-3 left-3 bg-white border rounded-md px-3 py-2 text-xs text-slate-700 shadow z-10">
        <p>Lat: {Number.isFinite(coords.lat) ? coords.lat.toFixed(6) : "—"}</p>
        <p>Lng: {Number.isFinite(coords.lng) ? coords.lng.toFixed(6) : "—"}</p>
      </div>
    </div>
  );
}
