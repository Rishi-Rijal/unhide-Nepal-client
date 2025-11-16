import ReviewItem from "../ReviewItem/ReviewItem";
import ReviewForm from "../ReviewForm/ReviewForm";

const ReviewsSection = ({ reviews, onAddReview }) => (
  <section className="py-8 max-w-5xl mx-auto px-4">
    <h3 className="text-base font-semibold text-slate-900">Reviews</h3>
    {onAddReview && (
      <div className="mt-3">
        <ReviewForm onSubmit={onAddReview} />
      </div>
    )}
    {reviews.length>0 && 
    <div className="mt-2 divide-y divide-slate-200 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
      {reviews.map((r, idx) => (
        <ReviewItem key={idx} {...r} />
      ))}
    </div>
    }
  </section>
);

export default ReviewsSection;
