import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";

const PAGE_SIZE = 20;

export default function Home({ category }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const fetchNews = useCallback(
  async (currentPage = 1, query = "") => {
    setLoading(true);
    setError("");

    try {
      const params = {
        page: currentPage,
        pageSize: PAGE_SIZE,
        _: Date.now(),
      };

      if (query && query.trim() !== "") {
        params.q = query;
      } else {
        params.category = category;
      }

      // ADD THIS - Dynamic API URL for production/development
      const API_BASE =
        process.env.NODE_ENV === "production"
          ? "/api"
          : "http://localhost:3001/api";

      const res = await axios.get(`${API_BASE}/news`, {
        params: params,
      });

      const newArticles = res.data.articles || [];

      if (currentPage === 1) {
        setArticles(newArticles);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
      }

      setHasMore(newArticles.length === PAGE_SIZE);
    } catch (err) {
      setError("Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  },
  [category]
);

  useEffect(() => {
    setPage(1);
    setSearchQuery("");
    fetchNews(1, "");
  }, [category, fetchNews]);

  const fetchMoreData = () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage, searchQuery);
  };

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    setPage(1);
    setArticles([]);
    fetchNews(1, trimmedQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPage(1);
    setArticles([]);
    fetchNews(1, "");
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            {searchQuery ? `Search: "${searchQuery}"` : "Latest News"}
          </h1>

          <div className="mt-4">
            <SearchBar onSearch={handleSearch} currentQuery={searchQuery} />
          </div>

          {searchQuery && (
            <div className="mt-3 text-center">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
                🔍 Searching: "{searchQuery}"
              </span>
              <button
                onClick={clearSearch}
                className="ml-3 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="text-center">
              <div className="text-red-600 dark:text-red-400 font-semibold mb-1">
                Failed to load news
              </div>
              <p className="text-red-500 dark:text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {!loading && articles.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
              {searchQuery ? "🔍" : "📰"}
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-2">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : "No articles found"}
            </h3>
          </div>
        )}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          }
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
        >
          {articles.length === 0 && loading
            ? Array.from({ length: PAGE_SIZE }).map((_, idx) => (
                <NewsCard key={idx} loading={true} />
              ))
            : articles.map((article, index) => (
                <motion.div
                  key={`${article.url}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <NewsCard article={article} />
                </motion.div>
              ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
