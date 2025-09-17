import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ExternalLink } from "lucide-react";

const NewsCard = ({ article, loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  const { title, description, urlToImage, url, source, publishedAt, author } =
    article;

  const handleCardClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={
              urlToImage || "https://via.placeholder.com/400x200?text=No+Image"
            }
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x200?text=No+Image";
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
              {source?.name || "Unknown"}
            </span>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {description || "No description available."}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{formatDate(publishedAt)}</span>
              </div>
              {author && (
                <div className="flex items-center">
                  <User size={14} className="mr-1" />
                  <span className="truncate max-w-20">{author}</span>
                </div>
              )}
            </div>

            {/* Read More Indicator */}
            <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
              <span className="text-sm font-medium">Read</span>
              <ExternalLink size={14} className="ml-1" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
