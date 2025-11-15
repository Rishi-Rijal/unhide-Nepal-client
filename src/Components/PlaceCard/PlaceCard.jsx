import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

export default function PlaceCard({ id, image, title, district, rating = 0, tags = [], description }) {
  const item = { id: id || title, title, image };

  return (
    <Link to={`/Listing/${id}`} className="block">
      <div className=" bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="h-44 w-full overflow-hidden relative">
          <img src={image} alt={title} className="h-44 w-full object-cover" />
          <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
            <FavoriteButton item={item} />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900 font-semibold leading-tight line-clamp-1">{title}</h3>
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(rating) ? "fill-amber-500" : "fill-transparent"}`} />
              ))}
            </div>
          </div>

          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5" />
            <span>{district}</span>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <span key={i} className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                {t}
              </span>
            ))}
          </div>

          {description && <p className="mt-3 text-sm text-slate-600 line-clamp-3">{description}</p>}
        </div>
      </div>
    </Link>
  );
}
