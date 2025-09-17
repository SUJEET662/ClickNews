import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  FaGlobe,
  FaBriefcase,
  FaFilm,
  FaHeartbeat,
  FaFlask,
  FaFootballBall,
  FaLaptop,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const defaultCategories = [
  { name: "general", icon: <FaGlobe /> },
  { name: "business", icon: <FaBriefcase /> },
  { name: "entertainment", icon: <FaFilm /> },
  { name: "health", icon: <FaHeartbeat /> },
  { name: "science", icon: <FaFlask /> },
  { name: "sports", icon: <FaFootballBall /> },
  { name: "technology", icon: <FaLaptop /> },
];

export default function Sidebar({ category, setCategory }) {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  const toggleCollapse = () => setCollapsed(!collapsed);

  const toggleFavorite = (name) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  // Auto-collapse on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCollapsed(true);
      else setCollapsed(false);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCategories = defaultCategories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside
      className={`bg-gradient-to-b from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 text-white h-screen sticky top-16 flex-shrink-0 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } shadow-lg`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-blue-500 dark:border-gray-700">
          {!collapsed && <h2 className="font-bold text-lg">Categories</h2>}
          <button
            onClick={toggleCollapse}
            className="p-1 rounded hover:bg-blue-500 dark:hover:bg-gray-700 transition"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {!collapsed && (
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-1 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>
        )}

        <div className="flex flex-col mt-4 gap-2 px-2 flex-1 overflow-y-auto">
          {filteredCategories.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <button
                onClick={() => setCategory(cat.name)}
                className={`flex items-center justify-between gap-3 px-4 py-2 rounded transition-all duration-300 w-full relative ${
                  category === cat.name
                    ? "bg-white text-blue-600 dark:bg-gray-100 dark:text-gray-800 font-semibold shadow"
                    : "hover:bg-blue-500 dark:hover:bg-gray-700 text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  {cat.icon}
                  {!collapsed &&
                    cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </span>

                {!collapsed && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(cat.name);
                    }}
                    className="text-yellow-400 hover:text-yellow-300 transition cursor-pointer"
                  >
                    <Star
                      size={16}
                      color={
                        favorites.includes(cat.name)
                          ? "#FFD700"
                          : "currentColor"
                      }
                      fill={favorites.includes(cat.name) ? "#FFD700" : "none"}
                    />
                  </span>
                )}

                {category === cat.name && !collapsed && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded"
                  />
                )}
              </button>

              {collapsed && (
                <AnimatePresence>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap pointer-events-none z-50"
                  >
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                  </motion.span>
                </AnimatePresence>
              )}
            </motion.div>
          ))}
        </div>

        {!collapsed && (
          <div className="p-4 border-t border-blue-500 dark:border-gray-700 text-sm text-gray-200">
            DailyScope © 2025
          </div>
        )}
      </div>
    </aside>
  );
}
