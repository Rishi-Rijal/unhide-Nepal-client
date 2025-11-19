import Button from '../Button/Button';
import { Search, LocateFixed, Plus } from "lucide-react";


export function SearchBox({
  value,
  onChange,
  placeholder = "Search…",
  className,
  containerClassName,
  trailing,
  leftIcon,
}) {
  return (
    <div className={`relative flex w-full max-w-2xl items-center rounded-2xl bg-white shadow-lg ring-1 ring-emerald-200/50 transition-all duration-200 hover:shadow-xl hover:ring-emerald-300/50 ${containerClassName}`}>
      {leftIcon ? (
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {leftIcon}
        </div>
      ) : null}

      <input
        type="text"
        inputMode="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={
          `w-full bg-transparent py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none ${leftIcon ? "pl-11" : "pl-5"} ${trailing ? "pr-40" : "pr-5"} ${className}`
        }
      />

      {/* trailing slot (e.g., your 'Use my location' button) */}
      {trailing ? (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {trailing}
        </div>
      ) : null}
    </div>
  );
}

export default SearchBox;
