import PhotoUploader from "./PhotoUploader.jsx"; 
import { useFormContext } from "../contexts/NewListingFormContext.jsx";
export default function Step3Photos() {
    const { form, errors, updateForm } = useFormContext();

    const setPhotos = (nextPhotos) => {
        updateForm({ 
            photos: typeof nextPhotos === "function" ? nextPhotos(form.photos) : nextPhotos 
        });
    };

    return (
        <section>
            <header className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">Add a Few Photos</h2>
                <p className="text-sm text-slate-500">JPEG or PNG. First photo will be used as the cover.</p>
            </header>

            <div className="mt-6">
                <PhotoUploader
                    photos={form.photos}
                    setPhotos={setPhotos}
                />
                {errors.photos && <p className="mt-2 text-xs text-rose-600">{errors.photos}</p>}
            </div>
        </section>
    );
}