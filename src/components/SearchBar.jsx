import React, { useState } from "react";

export default function SearchBar({ onSearch, visible }) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(input);
    }
  };

  return (
    visible && (
      <div className={"absolute top-5 right-20"}>
        <input
          type="text"
          placeholder="Search podcasts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-64 px-3 py-2 border rounded shadow-md text-sm text-gray-600"
        />
      </div>
    )
  );
}
