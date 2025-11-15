import StarRating from "../StarRating/StarRating";

const HeroSection = ({ title, hero, rating, reviewsCount }) => (
  <section className="relative isolate w-[99%] mx-auto mb-12 rounded-2xl overflow-hidden">
    <div className="relative">
      <div className="aspect-[16/7] w-full overflow-hidden">
        <img src={hero} alt={title} className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.35)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      </div>
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[90%] sm:w-[85%] md:w-[70%] lg:w-[min(70%,64rem)] " >
        <div className="backdrop-blur-sm bg-white/20 ring-1 ring-white/30 rounded-2xl p-4 sm:p-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold drop-shadow-sm">{title}</h1>
          <div className="mt-1 flex items-center gap-3">
            <StarRating value={rating} />
            <span className="text-sm opacity-90">{rating} · {reviewsCount} reviews</span>
          </div>
        </div>
      </div>
    </div>
  </section>

);

export default HeroSection;
