import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
  forwardRef,
} from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

const CategoryDropdown =
  (
    {
      groups,

      value,
      defaultValue = [],
      onChange,

      placeholder = "Select…",
      searchPlaceholder = "Search…",
      debounceMs = 200,
      disabled = false,

      maxMenuHeight = 224, // px
      showBulkActions = true,
      selectAllLabel = "Select All",
      clearAllLabel = "Clear All",

      renderTag,
      renderOption,

      className,
      chipClassName,
      controlClassName,
      menuClassName,
      optionClassName,
      groupHeaderClassName,

      filterFn,
      noResultsLabel = "No results found",
      closeOnSelect = false,
      widthClassName = "w-72",
    },
    ref
  ) => {
    const uniqStrings = (arr) => [...new Set(arr)];
    const flatten = (g) => uniqStrings(Object.values(g).flat());

    const isControlled = value !== undefined;
    const [internalSelected, setInternalSelected] = useState(defaultValue);
    const selected = isControlled ? value : internalSelected;

    const setSelected = (next) => {
      const deduped = uniqStrings(next);
      if (!isControlled) setInternalSelected(deduped);
      onChange?.(deduped);
    };

    const allOptions = useMemo(() => flatten(groups), [groups]);

    // open/search/highlight
    const [open, setOpen] = useState(false);
    const [rawSearch, setRawSearch] = useState("");
    const [search, setSearch] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(0);

    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    // a11y ids
    const uid = useId();
    const listboxId = `gms-listbox-${uid}`;
    const inputId = `gms-input-${uid}`;

    // debounce
    useEffect(() => {
      const t = setTimeout(() => {
        setSearch(rawSearch);
        setHighlightIndex(0);
      }, debounceMs);
      return () => clearTimeout(t);
    }, [rawSearch, debounceMs]);

    // filter groups
    const defaultFilter = (v, s) => v.toLowerCase().includes(s.trim().toLowerCase());
    const activeFilter = filterFn ?? ((v, s) => defaultFilter(v, s));

    const filteredGroups = useMemo(() => {
      if (!search.trim()) return groups;
      const out = {};
      Object.entries(groups).forEach(([key, arr]) => {
        const filtered = arr.filter((v) => activeFilter(v, search, key));
        if (filtered.length) out[key] = filtered;
      });
      return out;
    }, [groups, search, activeFilter]);

    const flatFiltered = useMemo(() => {
      const unique = new Set();
      const arr = [];
      Object.values(filteredGroups).flat().forEach((v) => {
        if (!unique.has(v)) {
          unique.add(v);
          arr.push(v);
        }
      });
      return arr;
    }, [filteredGroups]);

    // click outside
    useEffect(() => {
      const handler = (e) => {
        if (!wrapperRef.current) return;
        if (!wrapperRef.current.contains(e.target)) setOpen(false);
      };
      window.addEventListener("mousedown", handler);
      return () => window.removeEventListener("mousedown", handler);
    }, []);

    const toggleValue = (v) => {
      setSelected(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
      if (closeOnSelect) setOpen(false);
    };

    const toggleGroup = (groupKey) => {
      const ids = groups[groupKey] ?? [];
      const allSelected = ids.length > 0 && ids.every((id) => selected.includes(id));
      if (allSelected) {
        setSelected(selected.filter((s) => !ids.includes(s)));
      } else {
        setSelected([...selected, ...ids]);
      }
    };

    const selectAll = () => setSelected(allOptions);
    const clearAll = () => setSelected([]);

    const backspaceChipDelete = (e) => {
      if (e.key === "Backspace" && rawSearch === "" && selected.length > 0) {
        setSelected(selected.slice(0, -1));
        e.preventDefault();
      }
    };

    const onKeyDown = (e) => {
      if (disabled) return;
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          setOpen(true);
          requestAnimationFrame(() => inputRef.current?.focus());
          e.preventDefault();
        }
        return;
      }

      const len = flatFiltered.length;
      if (len === 0) {
        if (e.key === "Escape") setOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        setHighlightIndex((p) => (p + 1) % len);
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setHighlightIndex((p) => (p - 1 + len) % len);
        e.preventDefault();
      } else if (e.key === "Home") {
        setHighlightIndex(0);
        e.preventDefault();
      } else if (e.key === "End") {
        setHighlightIndex(len - 1);
        e.preventDefault();
      } else if (e.key === "Enter") {
        const target = flatFiltered[highlightIndex];
        if (target) toggleValue(target);
        e.preventDefault();
      } else if (e.key === "Escape") {
        setOpen(false);
        e.preventDefault();
      } else if (e.key === "Tab") {
        setOpen(false);
      }
    };

    // keep highlighted visible
    useEffect(() => {
      if (!open) return;
      const list = listRef.current;
      if (!list) return;
      const optionId = `${listboxId}-opt-${highlightIndex}`;
      const el = document.getElementById(optionId);
      if (el && list) {
        const { top, bottom } = el.getBoundingClientRect();
        const { top: lTop, bottom: lBottom } = list.getBoundingClientRect();
        if (top < lTop) list.scrollTop -= lTop - top;
        if (bottom > lBottom) list.scrollTop += bottom - lBottom;
      }
    }, [highlightIndex, open, listboxId]);

    const renderDefaultTag = ({ value, remove }) => (
      <span
        key={value}
        className={[
          "flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs",
          chipClassName,
        ].filter(Boolean).join(" ")}
      >
        {value}
        <XMarkIcon
          className="w-4 h-4 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            remove();
          }}
        />
      </span>
    );

    const renderDefaultOption = ({ value, selected, highlighted, toggle }) => (
      <div
        className={[
          "flex items-center px-3 py-2 text-sm cursor-pointer",
          highlighted ? "bg-blue-50" : "hover:bg-slate-100",
          optionClassName,
        ].filter(Boolean).join(" ")}
        onMouseEnter={() => setHighlightIndex(flatFiltered.indexOf(value))}
        onMouseDown={(e) => e.preventDefault()}
        onClick={toggle}
        role="option"
        aria-selected={selected}
      >
        <input type="checkbox" checked={selected} readOnly className="mr-2" tabIndex={-1} name={`option-${value}`} />
        {value}
      </div>
    );

    const hasResults = flatFiltered.length > 0;

    return (
      <div
        ref={(node) => {
          wrapperRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={["relative", className].filter(Boolean).join(" ")}
        onKeyDown={onKeyDown}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {/* Control */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            setOpen((o) => !o);
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
          className={[
            `min-h-[42px] ${widthClassName} flex flex-wrap items-center gap-2 rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm shadow-sm cursor-pointer text-left`,
            disabled ? "opacity-60 cursor-not-allowed" : "",
            controlClassName,
          ].filter(Boolean).join(" ")}
          aria-controls={listboxId}
          aria-expanded={open}
          aria-labelledby={inputId}
        >
          {selected.length > 0 ? (
            selected.map((v) =>
              (renderTag ?? renderDefaultTag)({
                value: v,
                remove: () => toggleValue(v),
              })
            )
          ) : (
            <span className="text-slate-500">{placeholder}</span>
          )}
          <ChevronDownIcon className="w-5 h-5 ml-auto text-slate-600" />
        </button>

        {/* Menu */}
        {open && (
          <div
            className={[
              `absolute mt-2 ${widthClassName} bg-white border border-slate-300 rounded-lg shadow-lg z-20 animate-fadeIn`,
              menuClassName,
            ].filter(Boolean).join(" ")}
            role="listbox"
            id={listboxId}
            aria-multiselectable="true"
          >
            {/* Search */}
            <input
              id={inputId}
              ref={inputRef}
              type="text"
              placeholder={searchPlaceholder}
              className="w-full px-3 py-2 border-b text-sm outline-none"
              value={rawSearch}
              name={`option-${value}`}
              onChange={(e) => setRawSearch(e.target.value)}
              onKeyDown={backspaceChipDelete}
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-expanded={open}
              aria-activedescendant={
                flatFiltered.length > 0 ? `${listboxId}-opt-${highlightIndex}` : undefined
              }
            />

            {/* Bulk */}
            {showBulkActions && (
              <div className="flex justify-between px-3 py-2 border-b text-xs text-blue-600">
                <button onClick={selectAll} className="hover:underline" type="button">
                  {selectAllLabel}
                </button>
                <button onClick={clearAll} className="hover:underline" type="button">
                  {clearAllLabel}
                </button>
              </div>
            )}

            {/* List */}
            <div ref={listRef} style={{ maxHeight: maxMenuHeight, overflowY: "auto" }}>
              {Object.entries(filteredGroups).map(([groupKey, items]) => {
                const allSelected = items.length > 0 && items.every((v) => selected.includes(v));
                return (
                  <div key={groupKey}>
                    <p
                      className={[
                        "px-3 py-1 text-xs font-semibold text-slate-500 bg-slate-50 cursor-pointer hover:bg-slate-100",
                        groupHeaderClassName,
                      ].filter(Boolean).join(" ")}
                      onClick={() => toggleGroup(groupKey)}
                    >
                      {groupKey}{" "}
                      <span className="text-xs text-blue-500">({allSelected ? "✓" : "+"})</span>
                    </p>

                    {items.map((v) => {
                      const idx = flatFiltered.indexOf(v);
                      const highlighted = idx === highlightIndex;
                      const isSelected = selected.includes(v);
                      const node = (renderOption ?? renderDefaultOption)({
                        value: v,
                        selected: isSelected,
                        highlighted,
                        toggle: () => toggleValue(v),
                      });
                      return (
                        <div key={`${groupKey}-${v}`} id={`${listboxId}-opt-${idx}`} role="none">
                          {node}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {!hasResults && <p className="text-sm text-slate-500 p-3">{noResultsLabel}</p>}
            </div>
          </div>
        )}

        {/* Tiny animation */}
        <style>{`
          .animate-fadeIn {
            animation: fadeIn 0.15s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  };

// CategoryDropdown.displayName = "CategoryDropdown";

export default CategoryDropdown;