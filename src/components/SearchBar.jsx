import React from "react";

export default function SearchBar({ value, onChange, visible }) {
  return (
    <div
      className={`
        fixed top-3 right-0 transition-transform duration-300 ease-in-out
        ${visible ? "translate-x--10" : "translate-x-full"}
      `}
    >
      <input
        type="text"
        placeholder="Search podcasts..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-64 px-3 py-2 border rounded shadow-md text-sm"
      />
    </div>
  );
}
