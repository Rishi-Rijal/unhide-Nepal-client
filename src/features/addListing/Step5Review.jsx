import { useFormContext } from "../../contexts/NewListingFormContext.jsx";

export default function Step5Review() {
    const { form } = useFormContext();

    return (
        <section>
            <header className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">Review & Submit</h2>
                <p className="text-sm text-slate-500">Double‑check your details below.</p>
            </header>

            <div className="mt-6 grid grid-cols-1 gap-4">
                {/* Basics Section */}
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="text-sm font-semibold text-slate-700">Basics</div>
                    <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                        <div><dt className="font-medium">Name</dt><dd>{form.name}</dd></div>
                        <div><dt className="font-medium">Category</dt><dd>{form.categories && form.categories.length ? form.categories.join(", ") : "-"}</dd></div>
                        <div className="sm:col-span-2"><dt className="font-medium">Description</dt><dd>{form.description}</dd></div>
                        <div className="sm:col-span-2"><dt className="font-medium">Tags</dt><dd>{form.tags.join(", ") || "-"}</dd></div>
                    </dl>
                </div>
                
                {/* Location Section */}
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="text-sm font-semibold text-slate-700">Location</div>
                    <dl className="mt-2 grid grid-cols-2 gap-2 text-sm text-slate-600">
                        <div><dt className="font-medium">Lat</dt><dd>{form.latitude || "-"}</dd></div>
                        <div><dt className="font-medium">Lng</dt><dd>{form.longitude || "-"}</dd></div>
                    </dl>
                </div>
                
                {/* Tips Section */}
                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="text-sm font-semibold text-slate-700">Tips</div>
                    <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                        <div><dt className="font-medium">Permits</dt><dd>{form.tips.permitsRequired ? "Yes" : "No"}</dd></div>
                        <div className="sm:col-span-2"><dt className="font-medium">Permit Details</dt><dd>{form.tips.permitsDescription || "-"}</dd></div>
                        <div><dt className="font-medium">Best season</dt><dd>{form.tips.bestSeason || "-"}</dd></div>
                        <div><dt className="font-medium">Difficulty</dt><dd>{form.tips.difficulty || "-"}</dd></div>
                        <div className="sm:col-span-2"><dt className="font-medium">Extra Advice</dt><dd>{form.tips.extraAdvice || "-"}</dd></div>
                    </dl>
                </div>
            </div>
        </section>
    );
}