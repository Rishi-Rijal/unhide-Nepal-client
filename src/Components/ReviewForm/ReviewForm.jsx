import { useState } from "react";
import StarRating from "../StarRating/StarRating.jsx";

export default function ReviewForm({ onSubmit }) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!author.trim() || !text.trim() || rating === 0) return;

    onSubmit({ author, rating, text });

    setAuthor("");
    setRating(0);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-xl shadow-sm bg-white space-y-3"
    >
      {/* Name */}
      <input
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-300"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      {/* Star Rating */}
      <div>
        <label className="text-sm font-medium text-slate-700">Your Rating:</label>
        <StarRating value={rating} size={4} onChange={setRating} />
      </div>

      {/* Review Text */}
      <textarea
        className="w-full border rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring focus:ring-amber-300"
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <button
          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-md transition shadow-sm"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
