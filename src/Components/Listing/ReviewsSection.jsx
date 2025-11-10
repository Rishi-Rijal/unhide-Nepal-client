import ReviewItem from "../ReviewItem/ReviewItem";

const ReviewsSection = ({ reviews }) => (
  <section className="py-8 max-w-5xl mx-auto px-4">
    <h3 className="text-base font-semibold text-slate-900">Reviews</h3>
    <div className="mt-2 divide-y divide-slate-200 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
      {reviews.map((r, idx) => (
        <ReviewItem key={idx} {...r} />
      ))}
    </div>
  </section>
);

export default ReviewsSection;
