import React, { useEffect, useState } from "react";
import PodcastTile from "./components/PodcastTile.jsx";
import PodModal from "./components/PodModal.jsx";
import SearchBar from "./components/SearchBar.jsx";

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

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
        <section
          aria-label="Podcast Grid"
          className="bg-grey-500 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {loading ? (
            <div className="col-span-full flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
              <span className="ml-4 text-lg font-semibold">
                Loading podcasts...
              </span>
            </div>
          ) : (
            podcasts

              .filter((podcast) =>
                podcast.title.toLowerCase().includes(search.toLowerCase())
              )

              .map((podcast) => (
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
