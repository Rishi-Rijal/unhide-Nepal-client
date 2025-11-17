import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import { addLike, removeLike } from "../../api/listing.api";

// LocalStorage key
const LIKE_KEY = "liked_listing_";

// Helpers
const getLocalLike = (id) =>
  localStorage.getItem(LIKE_KEY + id) === "true";

const setLocalLike = (id, liked) => {
  if (liked) {
    localStorage.setItem(LIKE_KEY + id, "true");
  } else {
    localStorage.removeItem(LIKE_KEY + id);
  }
};

export default function LikeButton({
  id,
  initialCount = 0,
  initialLiked = false,
  size = 16,
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [popped, setPopped] = useState(false);

  // Sync props
  useEffect(() => setLiked(initialLiked), [initialLiked]);
  useEffect(() => setCount(initialCount ?? 0), [initialCount]);

  async function handleLike(e) {
    e.stopPropagation();
    if (!id || loading) return;

    // Prevent liking again
    if (!liked && getLocalLike(id)) {
      console.log("Already liked this listing locally.");
      return;
    }

    const nextLiked = !liked;
    const optimisticCount = count + (nextLiked ? 1 : -1);

    // Optimistic UI update
    setLiked(nextLiked);
    setCount(Math.max(0, optimisticCount));
    setPopped(true);
    setTimeout(() => setPopped(false), 180);
    setLoading(true);

    // Save in browser
    setLocalLike(id, nextLiked);

    try {
      if (nextLiked) {
        await addLike(id);
      } else {
        await removeLike(id);
      }
    } catch (error) {
      console.error("Like failed:", error);

      // rollback UI
      setLiked(!nextLiked);
      setCount(count);
      setLocalLike(id, !nextLiked);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      title={liked ? "Remove Kudos" : "Give Kudos"}
      onClick={handleLike}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200 hover:scale-105 transition-transform text-slate-900 ${loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
    >
      <ThumbsUp
        size={size}
        fill={liked ? "#f97316" : "none"}
        color={liked ? "#f97316" : "#0f172a"}
        strokeWidth={1.5}
        className={`transition-transform ${popped || liked ? "scale-110" : "scale-100"
          }`}
      />
      <span className="sm:inline text-sm font-medium">{count}</span>
    </button>
  );
}
