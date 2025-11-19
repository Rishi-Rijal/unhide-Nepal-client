import PlaceCard from "../Components/PlaceCard/PlaceCard";
import { getFavorites } from "../utils/favorites";

export default function Wishlist() {
  const favs = getFavorites();

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold">Your Wishlist</h2>
      {favs.length === 0 ? (
        <div className="mt-6 text-slate-600">No saved listings yet. Browse the Explore page and save listings you like.</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favs.map((f) => (
            <PlaceCard key={f.id} id={f.id} image={f.image} title={f.title} />
          ))}
        </div>
      )}
    </main>
  );
}
