import {useEffect, useState} from "react";
import { Star, Navigation, Info } from "lucide-react";
import Badge from "./Components/Badge/Badge";
import StarRating from "./Components/StarRating/StarRating";
import ReviewItem from "./Components/ReviewItem/ReviewItem";
import RelatedCard from "./Components/RelatedCard/RelatedCard";


export default function Listing() {
    const listing = {
        title: "Annapurna Base Camp",
        hero:
            "https://images.unsplash.com/photo-1642156456271-458c1d19af24?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFubmFwdXJuYSUyMGJhc2UlMjBjYW1wfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
        rating: 4.8,
        reviewsCount: 980,
        overview:
            "Annapurna Base Camp (ABC) trek is one of the most popular treks in the Annapurna region. It is a spectacular journey through diverse landscapes and cultures, leading to the base of the mighty Annapurna.",
        tags: ["Trekking", "Adventure", "Nature"],
        locationImage:
            "https://images.unsplash.com/photo-1549880181-56a44cf4a9a7?q=80&w=1600&auto=format&fit=crop",
        tips: [
            {
                title: "Transport",
                body:
                    "Drive from Pokhara to Siwai (1.5–2 hrs). Bus to Nayapul also works.",
            },
            {
                title: "Permits",
                body: "ACAP & TIMS card required; obtainable in Pokhara/Kathmandu.",
            },
            {
                title: "Distance",
                body: "Approx. 85–115 km / 7–10 days (out from Pokhara).",
            },
            {
                title: "Local Homestays",
                body: "Find homestays in *Ghandruk*, *Chhomrong*, *Sinuwa*.",
            },
        ],
        gallery: [
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519680772-8bba63c6f61e?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1532634896-26909d0d4b6a?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1602459040017-9d2f0ba6727b?q=80&w=1200&auto=format&fit=crop",
        ],
        reviews: [
            {
                author: "trekkermom_ne",
                text:
                    "Absolutely stunning views and a challenging but rewarding trek! Highly recommend.",
                rating: 5,
            },
            {
                author: "adventurer_chris",
                text:
                    "The ABC route was incredible. The views are unmatched. Make sure to pack warm clothes!",
                rating: 4,
            },
        ],
        related: [
            {
                image:
                    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop",
                title: "Everest Base Camp",
                rating: 4.6,
                reviews: 1200,
            },
            {
                image:
                    "https://images.unsplash.com/photo-1519681394-2fbb3bfb60b0?q=80&w=1200&auto=format&fit=crop",
                title: "Langtang Valley",
                rating: 4.5,
                reviews: 570,
            },
            {
                image:
                    "https://images.unsplash.com/photo-1549893079-842a07a8d1a8?q=80&w=1200&auto=format&fit=crop",
                title: "Upper Mustang",
                rating: 4.4,
                reviews: 680,
            },
        ],
    };

    const [showGallery, setShowGallery] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null); // <-- index, not URL
    const MAX_SHOW = 9;
    const extraImages = Math.max(0, listing.gallery.length - MAX_SHOW);

    // Lightbox helpers
    const hasActive = activeIndex !== null;
    const showPrev = () => {
        if (!hasActive) return;
        setActiveIndex((i) => (i === 0 ? listing.gallery.length - 1 : i - 1));
    };
    const showNext = () => {
        if (!hasActive) return;
        setActiveIndex((i) => (i === listing.gallery.length - 1 ? 0 : i + 1));
    };

    useEffect(() => {
        if (!hasActive) return;
        const onKey = (e) => {
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "Escape") setActiveIndex(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [hasActive]);

    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="relative isolate w-[99%] align-middle mx-auto mb-12 rounded-lg">

                <div className="relative">
                    <div className="aspect-[16/7] w-full overflow-hidden rounded-b-[2rem]">
                        <img
                            src={listing.hero}
                            alt={listing.title}
                            className="h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.35)_100%)]" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                    </div>
                    <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[min(92%,64rem)]">
                        <div className="backdrop-blur-sm bg-white/20 ring-1 ring-white/30 rounded-2xl p-4 sm:p-6 text-white ">
                            <h1 className="text-2xl sm:text-3xl font-bold drop-shadow-sm">
                                {listing.title}
                            </h1>
                            <div className="mt-1 flex items-center gap-3">
                                <StarRating value={listing.rating} />
                                <span className="text-sm opacity-90">
                                    {listing.rating} · {listing.reviewsCount} reviews
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="py-8 max-w-5xl mx-auto px-4">
                <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                    {listing.overview}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {listing.tags.map((t) => (
                        <Badge key={t}>{t}</Badge>
                    ))}
                </div>
            </section>

            {/* Location */}
            <section className="py-6 max-w-5xl mx-auto px-4">
                <h3 className="text-base font-semibold text-slate-900">Location</h3>
                <div className="mt-3 overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200">
                    <img
                        src={listing.locationImage}
                        alt="Map"
                        className="h-72 w-full object-cover"
                    />
                    <div className="p-3">
                        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                            <Navigation className="h-4 w-4" /> Get Directions to{" "}
                            {listing.title}
                        </button>
                    </div>
                </div>
            </section>

            {/* Tips */}
            <section className="py-6 max-w-5xl mx-auto px-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                    <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                        <Info className="h-5 w-5 text-slate-500" /> Tips & Access Information
                    </h3>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                        {listing.tips.map((t) => (
                            <div key={t.title}>
                                <div className="font-medium text-slate-800">{t.title}</div>
                                <p className="mt-1 text-slate-600">{t.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-6 max-w-5xl mx-auto px-4">
                <h3 className="text-base font-semibold text-slate-900">Photo Gallery</h3>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {(extraImages > 0 ? listing.gallery.slice(0, MAX_SHOW) : listing.gallery).map(
                        (src, i, arr) => {
                            const isLastTile = extraImages > 0 && i === arr.length - 1;
                            return (
                                <div key={i} className="relative">
                                    <img
                                        src={src}
                                        alt={`Gallery ${i + 1}`}
                                        onClick={() =>
                                            isLastTile ? setShowGallery(true) : setActiveIndex(i)
                                        }
                                        className="h-40 w-full rounded-xl object-cover cursor-pointer hover:opacity-90 transition"
                                    />
                                    {isLastTile && (
                                        <button
                                            type="button"
                                            onClick={() => setShowGallery(true)}
                                            className="absolute inset-0 grid place-items-center rounded-xl bg-black/50 text-white text-sm font-semibold"
                                        >
                                            See all (+{extraImages})
                                        </button>
                                    )}
                                </div>
                            );
                        }
                    )}
                </div>

                {/* Gallery Modal */}
                {showGallery && (
                    <div
                        className="fixed inset-0 z-50 bg-black/70 p-3 sm:p-6"
                        onClick={() => setShowGallery(false)}
                    >
                        <div
                            className="mx-auto max-w-5xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 flex flex-col max-h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-3">
                                <h4 className="text-base font-semibold text-slate-900">
                                    Gallery
                                </h4>
                                <button
                                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm hover:bg-slate-200"
                                    onClick={() => setShowGallery(false)}
                                >
                                    Close
                                </button>
                            </div>
                            <div className="overflow-y-auto p-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {listing.gallery.map((src, idx) => (
                                        <img
                                            key={idx}
                                            src={src}
                                            alt={`All ${idx + 1}`}
                                            onClick={() => setActiveIndex(idx)}
                                            className="h-36 w-full rounded-lg object-cover cursor-pointer hover:opacity-90 transition"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Single Image Modal with arrows */}
                {hasActive && (
                    <div
                        className="fixed inset-0 z-50 bg-black/90 grid place-items-center p-4"
                        onClick={() => setActiveIndex(null)}
                    >
                        <div
                            className="relative w-full h-full max-h-[90vh] max-w-[90vw] grid place-items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={listing.gallery[activeIndex]}
                                alt={`Preview ${activeIndex + 1}`}
                                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                            />

                            {/* Prev / Next */}
                            <button
                                aria-label="Previous image"
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-white hover:bg-white/30"
                                onClick={showPrev}
                            >
                                ‹
                            </button>
                            <button
                                aria-label="Next image"
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-white hover:bg-white/30"
                                onClick={showNext}
                            >
                                ›
                            </button>

                            {/* Close */}
                            <button
                                className="absolute top-4 right-4 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/30"
                                onClick={() => setActiveIndex(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {/* Reviews */}
            <section className="py-8 max-w-5xl mx-auto px-4">
                <h3 className="text-base font-semibold text-slate-900">Reviews</h3>
                <div className="mt-2 divide-y divide-slate-200 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                    {listing.reviews.map((r, idx) => (
                        <ReviewItem key={idx} {...r} />
                    ))}
                </div>
            </section>

            {/* Related */}
            <section className="py-8 max-w-5xl mx-auto px-4">
                <h3 className="text-base font-semibold text-slate-900">
                    Related Places
                </h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {listing.related.map((r) => (
                        <RelatedCard key={r.title} {...r} />
                    ))}
                </div>
            </section>

            <div className="h-12" />
        </main>
    );
}
