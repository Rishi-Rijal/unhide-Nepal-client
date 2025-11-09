import  StarRating from "../StarRating/StarRating.jsx";

export default function RelatedCard({ image, title, rating, reviews }) {
    return (
        <div className="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-md transition">
            <img src={image} alt={title} className="h-28 w-full object-cover" />
            <div className="p-3">
                <div className="text-sm font-semibold text-slate-800 line-clamp-1">
                    {title}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                    <StarRating value={rating} size={3.5} />
                    <span className="text-[11px] text-slate-500">
                        ({reviews} reviews)
                    </span>
                </div>
            </div>
        </div>
    );
}