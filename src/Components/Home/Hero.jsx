import { LocateFixed, Search } from "lucide-react";
import Container from "../Container/Container";
import SearchBox from "../SearchBox.jsx/SearchBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = (query || "").trim();
    if (!trimmed) return;
    navigate(`/explore?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section id="hero" className="relative isolate pt-24 pb-24 sm:pb-28 bg-gradient-to-b from-teal-50 to-white">
      <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-70"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742')" }}
      />
      <div className=" flex absolute inset-0 -z-10 bg-gradient-to-b from-white/70 to-white" />
      <Container className="text-center mt-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
          Discover Hidden Gems of Nepal
        </h1>
        <div className="mt-8 flex justify-center">
          <SearchBox 
            value={query}
            onChange={setQuery}
            placeholder="Search places, trails, or waterfalls..."
            containerClassName="mx-auto justify-center"
            leftIcon={<Search className="h-5 w-5" />}
            trailing={
              <button
                type="button"
                onClick={handleSearch}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 active:scale-95"
                aria-label="Search"
              >
                <LocateFixed className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Search</span>
              </button>
            }
          />
        </div>
      </Container>
    </section>
  );
}

export default Hero;
