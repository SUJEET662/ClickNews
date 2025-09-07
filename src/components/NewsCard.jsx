import React from "react";
import { motion } from "framer-motion";

export default function NewsCard({ article, loading }) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse h-80 w-full"></div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full cursor-pointer"
      whileHover={{ scale: 1.05, rotateX: 3 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {article.urlToImage && (
        <motion.img
          src={article.urlToImage}
          alt={article.title}
          className="h-48 w-full object-cover transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
        />
      )}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {article.title}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {article.description || "No description available."}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors duration-300"
        >
          Read More
        </a>
      </div>
    </motion.div>
  );
}
