// src/Components/AddListing/Step2Location.jsx

import Input from "../Shared/Input.jsx";
import Label from "../Shared/Label.jsx";
import MapView from "../../Map.jsx"; 
import { useFormContext } from "../contexts/NewListingFormContext.jsx";
export default function Step2Location() {
    const { form, errors, updateForm, parseNumberOrNull } = useFormContext();

    const latNum = parseNumberOrNull(form.latitude);
    const lngNum = parseNumberOrNull(form.longitude);

    const handleLocationSelected = (lat, lng) => {
        updateForm({
            latitude: lat.toFixed(6),
            longitude: lng.toFixed(6),
        });
    };

    return (
        <section>
            <header className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">Where is it?</h2>
                <p className="text-sm text-slate-500">Mapbox coming soon — use coordinates for now.</p>
            </header>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Latitude Input */}
                <div>
                    <Label htmlFor="lat">Latitude</Label>
                    <Input
                        id="lat"
                        placeholder="27.9878"
                        value={form.latitude}
                        onChange={(e) => updateForm({ latitude: e.target.value })}
                    />
                    {errors.latitude && <p className="mt-1 text-xs text-rose-600">{errors.latitude}</p>}
                </div>
                {/* Longitude Input */}
                <div>
                    <Label htmlFor="lng">Longitude</Label>
                    <Input
                        id="lng"
                        placeholder="86.9250"
                        value={form.longitude}
                        onChange={(e) => updateForm({ longitude: e.target.value })}
                    />
                    {errors.longitude && <p className="mt-1 text-xs text-rose-600">{errors.longitude}</p>}
                </div>
            </div>

            {/* Map View */}
            <MapView
                mode="select"
                lat={latNum ?? 27.7172} // Default to Kathmandu
                lng={lngNum ?? 85.324}
                onLocationSelected={handleLocationSelected}
            />
        </section>
    );
}