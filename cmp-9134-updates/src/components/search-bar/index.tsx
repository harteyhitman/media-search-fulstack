import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon

export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim()) {
      setIsLoading(true);
      await onSearch(query);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for media..."
          className="w-full px-4 py-2 pl-10 border-1 text-[#2372AB] placeholder:text-[#2372AB] border-[#2372AB] focus:outline-none focus:ring-2 focus:ring-[#2372AB] rounded-4xl"
        />
        <div
          onClick={handleSearch}
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2372AB] cursor-pointer ${
            isLoading ? "animate-spin" : ""
          }`}
        >
          <FaSearch />
        </div>
        {query && (
          <button
            onClick={handleReset}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[#2372AB] hover:text-[#2372AB] text-2xl cursor-pointer"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
