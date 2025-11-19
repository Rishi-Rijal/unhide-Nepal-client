import  Badge  from "../Badge/Badge.jsx";
import StarRating from "../StarRating/StarRating.jsx";

const FeatureCard = ({ image, tag, title, rating }) => (
  <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="relative h-36 w-full overflow-hidden">
      <img src={image} alt={title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
    </div>
    <div className="space-y-2 p-4">
      <Badge>{tag}</Badge>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <StarRating value={rating} readonly={true} />
    </div>
  </div>
);

export default FeatureCard;
