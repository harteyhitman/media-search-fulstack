"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/search-bar";
import { searchMedia } from "@/utils/api";
import Image from "next/image";
import logo from "../../../public/openverse_logo.png";

export default function DashBoard() {
  const [images, setImages] = useState([]);
  const [audio, setAudio] = useState([]);
  const [history, setHistory] = useState<string[]>([]);
  const [filter, setFilter] = useState("all"); // "all", "images", "audio"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Pagination limit
  const [userEmail, setUserEmail] = useState(""); // State for user email
  const [username, setUsername] = useState("");

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("mediaSearchHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("userEmail"); // Assume email is stored in localStorage
    if (email) {
      setUserEmail(email);
      const namePart = email.split("@")[0];
      setUsername(namePart);
      localStorage.setItem("username", namePart); // Optional: store in localStorage
    }
  }, []);

  const updateHistory = (query: string) => {
    const newHistory = [
      query,
      ...history.filter((item) => item !== query),
    ].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("mediaSearchHistory", JSON.stringify(newHistory));
  };

  const handleSearch = async (query: string) => {
    const results = await searchMedia(query);
    setImages(results.images);
    setAudio(results.audio);
    updateHistory(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDeleteHistory = (query: string) => {
    const updated = history.filter((item) => item !== query);
    setHistory(updated);
    localStorage.setItem("mediaSearchHistory", JSON.stringify(updated));
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem("mediaSearchHistory");
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username"); // ✅ Important
    localStorage.removeItem("mediaSearchHistory");
    window.location.href = "/login";
  };

  const paginatedItems = (items: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (items: any[]) => Math.ceil(items.length / itemsPerPage);

  return (
    <>
      <main className="p-6 max-w-6xl mx-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#474948]"></h1>
          <div className="flex  items-center gap-1">
            <span className="text-[#474948] mr-4 text-2xl">
              {" "}
              Welcome, {username || "Loading..."}
            </span>
            <button
              onClick={handleLogout}
              className="text-md text-[#2469A6] underline cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="logo-container flex justify-center items-center px-2 py-1 my-5 bg-[white]">
          <Image
            src={logo}
            alt="Openverse Logo"
            className="logo-image rounded-full shadow-lg"
          />
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Filter Tabs */}
        <div className="flex gap-4 mt-4 border-b border-gray-300">
          {["all", "images", "audio"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 ${
                filter === tab
                  ? "border-b-2 border-[#2469A6] text-[#2469A6]"
                  : "text-[#474948]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Search History */}
        {history.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-[#474948]">
              Search History
            </h2>
            <div className="flex flex-wrap gap-2">
              {history.map((term) => (
                <div
                  key={term}
                  className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
                >
                  <button onClick={() => handleSearch(term)}>{term}</button>
                  <button
                    onClick={() => handleDeleteHistory(term)}
                    className="ml-2 text-red-600 hover:text-red-800 cursor-pointer font-bold"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={clearAllHistory}
              className="mt-2 text-md text-[#2469A6] underline cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Results */}
        <div className="mt-6">
          {filter !== "audio" && (
            <>
              <h2 className="text-xl font-bold mb-2 text-[#474948]">Images</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {paginatedItems(images).length > 0 ? (
                  paginatedItems(images).map((media: any) => (
                    <div
                      key={media.id}
                      className="border border-[[#474948]] rounded shadow hover:shadow-lg transition"
                    >
                      <img
                        src={media.thumbnail}
                        alt={media.title}
                        className="w-full h-32 sm:h-48 object-cover"
                      />
                      <div className="p-2">
                        <p className="font-semibold text-[#474948] text-sm sm:text-base">
                          {media.title || "Untitled"}
                        </p>
                        <a
                          href={media.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm underline text-[#474948]"
                        >
                          View Source
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#474948]">No images found.</p>
                )}
              </div>
            </>
          )}

          {filter !== "images" && (
            <>
              <h2 className="text-xl font-bold mb-2 text-[#474948]">Audio</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {paginatedItems(audio).length > 0 ? (
                  paginatedItems(audio).map((track: any) => (
                    <div key={track.id} className="text-center">
                      <p className="font-medium text-[#474948] text-sm sm:text-base">
                        {track.title}
                      </p>
                      <audio
                        controls
                        src={track.url}
                        className="w-full"
                      ></audio>
                    </div>
                  ))
                ) : (
                  <p className="text-[#474948]">No audio found.</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from(
            { length: totalPages(filter === "images" ? images : audio) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 mx-1 ${
                  currentPage === i + 1
                    ? "bg-[#2469A6] text-[#474948]"
                    : "bg-gray-300"
                } rounded`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </main>
    </>
  );
}
