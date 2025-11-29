import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { isFavorited, toggleFavorite } from "../../../utils/favorites.js";

export default function FavoriteButton({ item, size = 20 }) {
  const id = item?.id || item?.title;
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorited(id));
  }, [id]);

  function onToggle(e) {
    e.stopPropagation();
    const next = toggleFavorite({ id, title: item?.title || "", image: item?.image || item?.hero || item?.photo || "" });
    setFav(next.some((it) => it.id === id));
  }

  return (
    <button
      aria-pressed={fav}
      onClick={onToggle}
      title={fav ? "Remove from wishlist" : "Save to wishlist"}
      className={`inline-flex items-center justify-center p-1 rounded-full bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200 hover:scale-105 transition-transform`}
      style={{ width: size + 8, height: size + 8 }}
    >
      <Heart strokeWidth={1.5} fill={fav ? "#f97316" : "none"} color={fav ? "#f97316" : "#0f172a"} style={{ width: size, height: size }} />
    </button>
  );
}
