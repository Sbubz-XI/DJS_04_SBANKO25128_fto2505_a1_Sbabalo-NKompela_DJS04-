import React, { useEffect, useState } from "react";
import PodcastTile from "./components/PodcastTile.jsx";
import PodModal from "./components/PodModal.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Filter from "./components/Filter.jsx";
import SortBy from "./components/SortBy.jsx";
import { genres } from "./data.js";

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [genreId, setGenreId] = useState("");

  useEffect(() => {
    async function fetchPreviews() {
      try {
        const response = await fetch("https://podcast-api.netlify.app/");
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        console.error("Error fetching podcast previews:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPreviews();
  }, []);

  const openPodcast = async (preview) => {
    try {
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${preview.id}`
      );
      const fullPodcast = await response.json();
      setSelectedPodcast(fullPodcast);
    } catch (error) {
      console.error("Error fetching podcast details:", error);
    }
  };

  const closePodcast = () => {
    setSelectedPodcast(null);
  };

  const filteredPodcasts = podcasts
    .filter((p) =>
      genreId ? (p.genre_ids || []).includes(Number(genreId)) : true
    )
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const sortedPodcasts = filteredPodcasts.slice().sort((a, b) => {
    if (sortBy === "newest") {
      const dateA = new Date(a.updated_at || 0);
      const dateB = new Date(b.updated_at || 0);
      return dateB - dateA;
    } else if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div className="p-4">
      <header className="bg-white border-gray-400 shadow h-12 flex items-center pl-4">
        <div className="bg-[url('/src/assets/podcast-.png')] bg-cover bg-center h-6 w-6 mr-1"></div>
        <div className="text-lg font-semibold">Podcast App</div>

        <div className="absolute right-3 flex space-x-3 items-center">
          <div
            onClick={() => setShowSearch((prev) => !prev)}
            className="bg-[url('/src/assets/loupe.png')] bg-cover bg-center h-4 w-4 cursor-pointer"
          ></div>

          <div className="bg-[url('/src/assets/profile.png')] bg-cover bg-center h-6 w-6"></div>
        </div>
      </header>

      <main>
        <div className="flex items-center mt-4 mb-4 space-x-4">
          <Filter genres={genres} selected={genreId} onChange={setGenreId} />
          <SortBy
            value={sortBy}
            onChange={setSortBy}
            options={[
              { label: "Newest First", value: "newest" },
              { label: "Title A–Z", value: "title-asc" },
              { label: "Title Z–A", value: "title-desc" },
            ]}
          />
        </div>
        <section
          aria-label="Podcast Grid"
          className="bg-grey-500 md:px-1 lg:px-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {loading ? (
            <div className="col-span-full flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
              <span className="ml-4 text-lg font-semibold">
                Loading podcasts...
              </span>
            </div>
          ) : (
            sortedPodcasts.map((podcast) => (
              <PodcastTile
                key={podcast.id}
                podcast={podcast}
                onClick={openPodcast}
              />
            ))
          )}
        </section>

        <PodModal podcast={selectedPodcast} onClose={closePodcast} />
        <SearchBar onSearch={setSearch} visible={showSearch} />
      </main>
    </div>
  );
}

export default App;
