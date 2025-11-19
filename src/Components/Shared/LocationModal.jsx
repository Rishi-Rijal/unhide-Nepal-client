import { useState, useEffect } from 'react';
import MapView from '../../Map';

const LocationModal = ({ open, latitude, longitude, onSave, onCancel }) => {
  const [lat, setLat] = useState(latitude ?? '');
  const [lng, setLng] = useState(longitude ?? '');

  useEffect(() => {
    setLat(latitude ?? '');
    setLng(longitude ?? '');
  }, [latitude, longitude, open]);

  if (!open) return null;

  const handleMapSelect = (newLat, newLng) => {
    setLat(String(newLat));
    setLng(String(newLng));
  };

  const handleSave = () => {
    const nlat = parseFloat(lat);
    const nlng = parseFloat(lng);
    if (!Number.isFinite(nlat) || !Number.isFinite(nlng)) {
      // simple client-side validation
      alert('Please provide valid latitude and longitude');
      return;
    }
    onSave(nlat, nlng);
  };

  return (
    <div className="fixed inset-0 z-60 grid place-items-center bg-black/50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold">Edit Location</h3>
        <p className="text-sm text-slate-600 mt-1">Click on the map to pick a new location; you can also fine-tune the values below.</p>
        <div className="mt-3 grid grid-cols-1 gap-3">
          <div className="h-[40vh]">
            <MapView mode="select" lat={Number(latitude) || undefined} lng={Number(longitude) || undefined} onLocationSelected={handleMapSelect} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm text-slate-700">Latitude</label>
              <input className="w-full rounded border px-2 py-1" value={lat} onChange={(e) => setLat(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-slate-700">Longitude</label>
              <input className="w-full rounded border px-2 py-1" value={lng} onChange={(e) => setLng(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-1 rounded border" onClick={onCancel}>Cancel</button>
          <button
            className="px-3 py-1 rounded bg-amber-500 text-white"
            onClick={handleSave}
          >Save</button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
