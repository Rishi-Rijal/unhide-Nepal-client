import { useState, useEffect } from "react";

const MAX_SHOW = 9;

const GallerySection = ({ gallery }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const extraImages = Math.max(0, gallery.length - MAX_SHOW);
  const hasActive = activeIndex !== null;

  const showPrev = () => {
    if (!hasActive) return;
    setActiveIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
  };
  const showNext = () => {
    if (!hasActive) return;
    setActiveIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));
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
    <section className="py-6 max-w-5xl mx-auto px-4">
      <h3 className="text-base font-semibold text-slate-900">Photo Gallery</h3>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {(extraImages > 0 ? gallery.slice(0, MAX_SHOW) : gallery).map((src, i, arr) => {
          const isLastTile = extraImages > 0 && i === arr.length - 1;
          return (
            <div key={i} className="relative">
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                onClick={() => (isLastTile ? setShowGallery(true) : setActiveIndex(i))}
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
        })}
      </div>
      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/70 p-3 sm:p-6" onClick={() => setShowGallery(false)}>
          <div className="mx-auto max-w-5xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 flex flex-col max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-3">
              <h4 className="text-base font-semibold text-slate-900">Gallery</h4>
              <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm hover:bg-slate-200" onClick={() => setShowGallery(false)}>
                Close
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gallery.map((src, idx) => (
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
        <div className="fixed inset-0 z-50 bg-black/90 grid place-items-center p-4" onClick={() => setActiveIndex(null)}>
          <div className="relative w-full h-full max-h-[90vh] max-w-[90vw] grid place-items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[activeIndex]}
              alt={`Preview ${activeIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            />
            {/* Prev / Next */}
            <button aria-label="Previous image" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-white hover:bg-white/30" onClick={showPrev}>
              ‹
            </button>
            <button aria-label="Next image" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-3 py-2 text-white hover:bg-white/30" onClick={showNext}>
              ›
            </button>
            {/* Close */}
            <button className="absolute top-4 right-4 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/30" onClick={() => setActiveIndex(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
