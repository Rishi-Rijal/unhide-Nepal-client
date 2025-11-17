import StarRating from "../StarRating/StarRating";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import LikeButton from "../LikeButton/LikeButton";

const HeroSection = ({ id, title, hero, rating, reviewsCount, likesCount = 0, likedByUser = false }) => (
  <section className="relative isolate w-[90%] mx-auto mb-12 rounded-2xl overflow-hidden">
    <div className="relative">
      <div className="aspect-[16/7] w-full overflow-hidden rounded-2xl">
        <img src={hero} alt={title} className="h-full w-full object-cover" />
      </div>

      {/** Info card below the image. Slight negative margin to overlap the image for a polished look. */}
      <div className="pb-2 mx-auto w-[90%] sm:w-[85%] md:w-[70%] lg:w-[min(70%,64rem)] -mt-8 sm:-mt-12">
        <div className="bg-gradient-to-b from-white/95 to-slate-50/90 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-lg ring-1 ring-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 truncate">{title}</h1>
              <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                <StarRating value={rating} readonly />
                <span className="opacity-95"> {reviewsCount} reviews</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 mt-2 sm:mt-0">
              <FavoriteButton item={{ id: id, title }} size={18} />
              <LikeButton id={id} initialCount={likesCount} initialLiked={likedByUser} size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

);

export default HeroSection;
