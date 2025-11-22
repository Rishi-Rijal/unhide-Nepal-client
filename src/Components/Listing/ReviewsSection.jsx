import { useState, useRef } from "react";
import ReviewItem from "../ReviewItem/ReviewItem";
import ReviewForm from "../ReviewForm/ReviewForm";

const ReviewsSection = ({ reviews = [], onAddReview, onEditReview, onDeleteReview }) => {
  const [showForm, setShowForm] = useState(false);
  const prevScroll = useRef(null);

  const handleSubmit = async (data) => {
    if (onAddReview) await onAddReview(data);
    // close after submit and try to restore scroll
    setShowForm(false);
    try {
      const y = prevScroll.current ?? 0;
      window.scrollTo(0, y);
    } catch{
      // ignore
    }
  };

  const toggleForm = () => {
    try {
      if (!showForm) {
        // opening: save current scroll position
        prevScroll.current = window.scrollY || window.pageYOffset || 0;
        setShowForm(true);
      } else {
        // closing: restore saved scroll position
        setShowForm(false);
        const y = prevScroll.current || 0;
        window.scrollTo(0, y);
      }
    } catch {
      setShowForm((s) => !s);
    }
  };

  return (
    <section className="py-8">
      <h3 className="text-base font-semibold text-slate-900">Reviews</h3>

      {onAddReview && (
        <div className="mt-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-white bg-amber-500 hover:bg-amber-600`}
              onClick={toggleForm}
              aria-expanded={showForm}
              aria-label={showForm ? 'Close review form' : 'Leave a review...'}
            >
              {showForm ? <span aria-hidden>✕</span> : 'Leave a review...'}
            </button>
          </div>

          {showForm && (
            <div className="mt-3">
              <ReviewForm onSubmit={handleSubmit} onCancel={toggleForm} />
            </div>
          )}
        </div>
      )}

      {reviews.length > 0 && (
        <div className="mt-2 divide-y divide-slate-200 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
          {reviews.map((r) => (
            <ReviewItem key={r._id || r.id || r.createdAt} {...r} onEdit={onEditReview} onDelete={onDeleteReview} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
