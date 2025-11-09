import Button from '../Button/Button';
import { Search, LocateFixed, Plus } from "lucide-react";

const SearchBox = ({ handleClick, className }) => {
  return (
    <div className={` flex max-w-xl items-center rounded-2xl bg-white p-2 shadow-lg ring-1 ring-slate-200 ${className}`}>

      <Search className="ml-1 mt-4 left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <input
        placeholder="Search places, trails, or waterfalls..."
        className="ml-5 w-full rounded-xl border-0 px-2 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
      />

      <Button className="ml-3" onClick={handleClick}>
        Search
      </Button>
    </div>
  );
};

export default SearchBox;