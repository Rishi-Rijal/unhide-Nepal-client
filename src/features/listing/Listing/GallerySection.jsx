import { useState, useEffect, useRef, useImperativeHandle } from "react";
import { removeImage, addImages } from "../../../services/listing.api.js";
import { useToast } from "../../../components";
import {ConfirmModal} from "../../../components";
import { useSelector } from "react-redux";

const MAX_SHOW = 9;

const GallerySection = ({ gallery = [], id, onUpdated }, ref) => {
  const [showGallery, setShowGallery] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const items = (gallery || []).map((g) => (typeof g === "string" ? { url: g } : g));
  const extraImages = Math.max(0, items.length - MAX_SHOW);
  const hasActive = activeIndex !== null;
  const rootRef = useRef(null);
  const fileRef = useRef(null);
  const [pendingFiles, setPendingFiles] = useState([]); // { file, url }
  const [previewOpen, setPreviewOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.isAdmin;

  const showPrev = () => {
    if (!hasActive) return;
    setActiveIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  };
  const showNext = () => {
    if (!hasActive) return;
    setActiveIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  };

  const { showToast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);

  useImperativeHandle(ref, () => ({
    openManager: () => {
      setShowGallery(true);
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    focusSection: () => {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  }));

  const closeConfirm = () => {
    setConfirmOpen(false);
    setConfirmTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (!confirmTarget?.public_id) return closeConfirm();
    const pid = confirmTarget.public_id;
    try {
      await removeImage(id, pid);
      if (typeof onUpdated === "function") onUpdated();
      showToast("Image removed", "success");
      if (confirmTarget.from === 'single') setActiveIndex(null);
    } catch (err) {
      console.error(err);
      showToast("Failed to remove image", "error");
    } finally {
      closeConfirm();
    }
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

  const onFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // create preview URLs
    const previews = files.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setPendingFiles(previews);
    setPreviewOpen(true);

    // reset input so same file can be re-selected later
    e.target.value = null;
  };

  // cleanup object URLs when pendingFiles change/cleared
  useEffect(() => {
    return () => {
      (pendingFiles || []).forEach((p) => p.url && URL.revokeObjectURL(p.url));
    };
  }, [pendingFiles]);

  const removePendingAt = (index) => {
    setPendingFiles((prev) => {
      const next = [...prev];
      const removed = next.splice(index, 1)[0];
      if (removed?.url) URL.revokeObjectURL(removed.url);
      return next;
    });
  };

  const cancelPreview = () => {
    // revoke urls
    (pendingFiles || []).forEach((p) => p.url && URL.revokeObjectURL(p.url));
    setPendingFiles([]);
    setPreviewOpen(false);
  };

  const uploadPending = async () => {
    if (!pendingFiles || pendingFiles.length === 0) return;
    try {
      const files = pendingFiles.map((p) => p.file);
      await addImages(id, files);
      if (typeof onUpdated === 'function') onUpdated();
      showToast('Images uploaded', 'success');
      (pendingFiles || []).forEach((p) => p.url && URL.revokeObjectURL(p.url));
      setPendingFiles([]);
      setPreviewOpen(false);
    } catch (err) {
      console.error(err);
      showToast('Failed to upload images', 'error');
    }
  };

  return (
    <section className="py-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Photo Gallery</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => fileRef.current?.click()} className="rounded border px-3 py-1 text-sm text-slate-700 hover:bg-slate-100">Add Photos</button>
          <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={onFilesSelected} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {(extraImages > 0 ? items.slice(0, MAX_SHOW) : items).map((item, i, arr) => {
          const isLastTile = extraImages > 0 && i === arr.length - 1;
          return (
            <div key={i} className="relative">
              <img
                src={item.url}
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
        <div ref={rootRef} className="fixed inset-0 z-50 bg-black/70 p-3 sm:p-6" onClick={() => setShowGallery(false)}>
          <div className="mx-auto max-w-5xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 flex flex-col max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-3">
              <h4 className="text-base font-semibold text-slate-900">Gallery</h4>
              <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm hover:bg-slate-200" onClick={() => setShowGallery(false)}>
                Close
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {items.map((item, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={item.url}
                      alt={`All ${idx + 1}`}
                      onClick={() => setActiveIndex(idx)}
                      className="h-36 w-full rounded-lg object-cover cursor-pointer hover:opacity-90 transition"
                    />
                  </div>
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
              src={items[activeIndex]?.url}
              alt={`Preview ${activeIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            />
            {/* Prev / Next */}
            <button aria-label="Previous image" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-red-600/30 px-3 py-2 text-white hover:bg-red-600/50" onClick={showPrev}>
              ‹
            </button>
            <button aria-label="Next image" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-red-600/30 px-3 py-2 text-white hover:bg-red-600/50" onClick={showNext}>
              ›
            </button>
            {/* Close + Remove */}
            <div className="absolute top-4 right-4 flex gap-2">
              {items[activeIndex]?.public_id && isAdmin && (
                <>
                  <button
                    className="rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-white/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      const pid = items[activeIndex].public_id;
                      if (!pid) return;
                      setConfirmTarget({ public_id: pid, from: 'single' });
                      setConfirmOpen(true);
                    }}
                  >
                    Remove
                  </button>
                </>
              )}
              <button className="rounded-lg bg-white/50 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-white/40" onClick={() => setActiveIndex(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Pending files preview modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 p-3 sm:p-6" onClick={cancelPreview}>
          <div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 flex flex-col max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-3">
              <h4 className="text-base font-semibold text-slate-900">Preview Selected Images</h4>
              <button className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm hover:bg-slate-200" onClick={cancelPreview}>
                Cancel
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              {pendingFiles.length === 0 ? (
                <p className="text-sm text-slate-600">No images selected.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {pendingFiles.map((p, idx) => (
                    <div key={idx} className="relative">
                      <img src={p.url} alt={`Pending ${idx + 1}`} className="h-36 w-full rounded-lg object-cover" />
                      <button
                        type="button"
                        className="absolute top-2 right-2 rounded bg-white/80 px-2 py-1 text-xs text-rose-600"
                        onClick={() => removePendingAt(idx)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-slate-200 p-4 flex justify-end gap-2">
              <button className="rounded-md px-4 py-2 bg-slate-100 text-sm" onClick={cancelPreview}>Cancel</button>
              <button className="rounded-md px-4 py-2 bg-sky-600 text-white" onClick={uploadPending} disabled={pendingFiles.length === 0}>Upload</button>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        open={confirmOpen}
        title="Remove image"
        message={confirmTarget ? `Are you sure?  This will delete it on the server.` : 'Remove image?'}
        onConfirm={handleConfirmDelete}
        onCancel={closeConfirm}
        confirmText="Remove"
      />
    </section>
  );
};

export default GallerySection;
