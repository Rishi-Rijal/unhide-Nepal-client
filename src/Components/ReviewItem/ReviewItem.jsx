import StarRating from "../StarRating/StarRating.jsx";

export default function ReviewItem({ author, text, rating }) {
    return (
        <div className="py-4">
            <div className="flex items-start justify-between">
                <div className="text-sm font-semibold text-slate-800">{author}</div>
                <StarRating value={rating} size={3.5} />
            </div>
            <p className="mt-1 text-sm text-slate-600">{text}</p>
        </div>
    );
}