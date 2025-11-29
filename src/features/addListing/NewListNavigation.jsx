import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react"; 
import { useFormContext } from "../../contexts/NewListingFormContext.jsx";
export default function NewListingNavigation() {
    const { step, next, back, handleSubmit, submitting } = useFormContext();

    return (
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
                type="button"
                onClick={back}
                disabled={step === 0}
                aria-disabled={step === 0}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm disabled:opacity-50"
            >
                <ChevronLeft className="h-4 w-4" /> Back
            </button>

            {step < 4 ? (
                <button
                    type="button"
                    onClick={next}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
                >
                    Next Step <ChevronRight className="h-4 w-4" />
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
                    disabled={submitting}
                    aria-disabled={submitting}
                >
                    <CheckCircle2 className="h-4 w-4" /> 
                    {submitting ? "Submitting..." : "Submit Listing"}
                </button>
            )}
        </div>
    );
}