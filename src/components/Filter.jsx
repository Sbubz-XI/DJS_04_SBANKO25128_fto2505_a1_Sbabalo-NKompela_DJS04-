import React from "react";

export default function Filter({ genres, selected, onChange }) {
  return (
    <div className="ml-4">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border rounded text-sm"
      >
        <option value="">All Genres</option>
        {genres.map((genres) => (
          <option key={genres.id} value={genres.id}>
            {genres.title}
          </option>
        ))}
      </select>
    </div>
  );
}
