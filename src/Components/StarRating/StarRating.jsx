import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({ value = 0, onChange, size = 3.5, readonly = false }) {
  const [hoverValue, setHoverValue] = useState(null);

  const displayValue = hoverValue ?? value;
  const full = Math.floor(displayValue);
  const fraction = displayValue - full;

  function handleClick(i) {
    if (readonly) return;
    onChange?.(i + 1); // Sets rating from 1–5
  }

  return (
    <div className="flex items-center gap-1.5 select-none">
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < full;
        const isPartial = i === full && fraction > 0;

        return (
          <div
            key={i}
            className={`relative cursor-${readonly ? "default" : "pointer"}`}
            style={{ height: size * 4, width: size * 4 }}
            onMouseEnter={() => !readonly && setHoverValue(i + 1)}
            onMouseLeave={() => !readonly && setHoverValue(null)}
            onClick={() => handleClick(i)}
          >
            {/* Empty star */}
            <Star
              className="absolute top-0 left-0 text-slate-300"
              style={{ height: size * 4, width: size * 4 }}
            />

            {/* Filled or partially filled star */}
            {(isFull || isPartial) && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{
                  width: isFull ? "100%" : `${fraction * 100}%`,
                  height: size * 4,
                }}
              >
                <Star
                  className="fill-amber-400 text-amber-400"
                  style={{ height: size * 4, width: size * 4 }}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* Optional rating number */}
      {value > 0 && (
        <span className="text-[11px] text-slate-500">
          ({value.toFixed(1)})
        </span>
      )}
    </div>
  );
}
