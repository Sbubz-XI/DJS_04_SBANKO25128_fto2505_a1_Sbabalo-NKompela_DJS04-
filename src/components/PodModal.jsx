import React from "react";
import { genres } from "../data.js";
import "./PodModal.css"; // Keep your original CSS for dialog

function PodModal({ podcast, onClose }) {
  if (!podcast) return null;

  // Format last updated date
  const formattedDate = podcast.updated
    ? new Date(podcast.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Map genre IDs to titles
  const genreTitles = podcast.genres?.length
    ? podcast.genres.map(
        (id) => genres.find((g) => g.id === id)?.title || "Unknown"
      )
    : ["Unknown"];

  // For seasons and episodes, API should provide an array
  const podcastSeasons = podcast.seasons || [];

  return (
    <dialog id="podcast-modal" open className="pod-modal">
      <form
        method="dialog"
        className="md:flex-row gap-6 p-6 relative bg-white rounded-lg"
      >
        {/* Close Button */}
        <button
          type="button"
          id="close-modal"
          onClick={onClose}
          className="absolute right-2 top-4 h-10 w-10 text-gray-600 hover:bg-gray-300 rounded-full"
        >
          &times;
        </button>

        {/* Podcast Image & Description */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <img
            src={podcast.image}
            alt={podcast.title}
            className="w-full h-full md:w-1/3 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-700 mb-4">{podcast.description}</p>
          </div>
        </div>

        {/* Genres */}
        <h2 className="text-lg font-semibold">Genres</h2>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
          {genreTitles.map((title, index) => (
            <span
              key={index}
              className="text-md font-bold text-gray-600 px-2 py-1 rounded border bg-gray-100"
            >
              {title}
            </span>
          ))}
        </div>

        {/* Last Updated */}
        {formattedDate && (
          <p id="modal-updated" className="text-sm text-gray-500 mb-4">
            Last updated: {formattedDate}
          </p>
        )}

        {/* Seasons */}
        {podcastSeasons.map((season, index) => (
          <div
            key={season.id || index}
            className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 mb-3"
          >
            <h3 className="font-semibold">{season.title}</h3>
            <span className="text-gray-700 font-medium">
              {season.episodes?.length || 0} episodes
            </span>
          </div>
        ))}
      </form>
    </dialog>
  );
}

export default PodModal;
