import {useEffect, useState, useRef} from "react";

export default function PhotoUploader({ photos = [], setPhotos, maxFiles = 12 }) {
  const fileInputRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  useEffect(() => {
    if (!photos || photos.length === 0) {
      setPreviews([]);
      return;
    }
    const urls = photos.map((f) => ({ name: f.name, url: URL.createObjectURL(f) }));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u.url));
  }, [photos]);

  function onFiles(selected) {
    const files = Array.from(selected || []);
    if (!files.length) return;
    // cap total files
    const combined = [...photos, ...files].slice(0, maxFiles);
    setPhotos(combined);
  }

  function removeAt(index) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function onDrop(e) {
    e.preventDefault();
    onFiles(e.dataTransfer.files);
  }

  return (
    <div>
      <label
        htmlFor="photos"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center hover:bg-slate-100"
      >
        <svg className="h-8 w-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="7 10 12 5 17 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="5" x2="12" y2="19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="text-sm text-slate-600">
          Drag & drop or <span className="font-semibold">browse</span> to upload
        </div>
        <input
          ref={fileInputRef}
          id="photos"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
      </label>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {previews.map((p, idx) => (
            <div key={p.url} className="relative rounded-lg overflow-hidden">
              <img src={p.url} alt={p.name} className="h-28 w-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="absolute right-1 top-1 inline-flex items-center justify-center rounded-full bg-white/80 p-1 text-xs text-slate-700 hover:bg-white"
                aria-label={`Remove ${p.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
