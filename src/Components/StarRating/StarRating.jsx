import { Star } from "lucide-react";

const StarRating = ({ rating = 1 }) => {
  const full = Math.floor(rating);
  const fraction = rating - full;

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < full;
        const isPartial = i === full && fraction > 0;

        return (
          <div key={i} className="relative h-3.5 w-3.5">
            {/* Empty star */}
            <Star className="h-3.5 w-3.5 text-slate-300 absolute top-0 left-0" />

            {/* Filled or partially filled star */}
            {(isFull || isPartial) && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: isFull ? "100%" : `${fraction * 100}%` }}
              >
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              </div>
            )}
          </div>
        );
      })}
      <span className="text-[11px] text-slate-500">({rating.toFixed(1)})</span>
    </div>
  );
};

export default StarRating;
