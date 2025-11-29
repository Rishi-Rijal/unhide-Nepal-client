import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

export default function CategoryFilterModal({
  isOpen,
  onClose,
  groups, // Expecting object: { "Cuisine": ["Italian", "Thai"], "Vibe": [...] }
  selectedCategories,
  onApply,
}) {
  // 1. Internal state so we don't trigger a search on every checkbox click
  const [tempSelected, setTempSelected] = useState(selectedCategories);

  // Sync internal state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempSelected(selectedCategories);
    }
  }, [isOpen, selectedCategories]);

  if (!isOpen) return null;

  const toggleCategory = (cat) => {
    setTempSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleClear = () => {
    setTempSelected([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-2xl"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
            <p className="text-sm text-slate-500">Select categories to filter results</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 text-slate-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {Object.entries(groups).map(([groupName, items]) => (
              <div key={groupName}>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
                  {groupName}
                </h3>
                {/* Grid Layout for Tags */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {items.map((item) => {
                    const isSelected = tempSelected.includes(item);
                    return (
                      <label
                        key={item}
                        className={`
                          cursor-pointer flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-all
                          ${isSelected 
                            ? "border-emerald-600 bg-emerald-50 text-emerald-700 font-medium" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"}
                        `}
                      >
                        {item}
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          onChange={() => toggleCategory(item)}
                        />
                        {isSelected && <Check className="h-4 w-4 text-emerald-600" />}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50 rounded-b-xl">
          <button
            onClick={handleClear}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline"
          >
            Clear all
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onApply(tempSelected);
                onClose();
              }}
              className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 shadow-sm"
            >
              Apply Filters {tempSelected.length > 0 && `(${tempSelected.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}