import React from "react";

export default function SortBy({ value, onChange }) {
  return (
    <div className="ml-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border rounded text-sm"
      >
        <option value="newest">Newest First</option>
        <option value="az">Title A–Z</option>
        <option value="za">Title Z–A</option>
      </select>
    </div>
  );
}
