import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export default function Sidebar({ category, setCategory }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-blue-600 dark:bg-gray-900 text-white h-screen transition-all duration-500 ${
        isOpen ? "w-64" : "w-16"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-500 dark:border-gray-700">
        {isOpen && (
          <h1 className="text-lg font-bold select-none">Categories</h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded hover:bg-blue-500 dark:hover:bg-gray-700 transition"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-col mt-4 gap-2 px-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex items-center gap-2 w-full rounded font-medium transition-all duration-300 px-3 py-2 hover:bg-blue-500 dark:hover:bg-gray-700 ${
              category === cat
                ? "bg-white text-blue-600 dark:bg-gray-100 dark:text-gray-800 shadow-lg"
                : "text-white"
            }`}
          >
            <span className="font-bold">{cat.charAt(0).toUpperCase()}</span>
            {isOpen && (
              <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
            )}
          </button>
        ))}
      </div>

      <div
        className={`absolute bottom-0 left-0 w-full h-1 bg-purple-500 transition-all duration-500`}
        style={{ transform: isOpen ? "scaleX(1)" : "scaleX(0.5)" }}
      />
    </div>
  );
}
