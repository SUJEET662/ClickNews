console.log("API Key:", process.env.REACT_APP_NEWS_API_KEY);

import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";

const PAGE_SIZE = 20;

// Detect local vs Vercel
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/news"
    : "/api/news";

export default function Home({ category, setCategory, darkMode }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNews = async (currentPage = 1) => {
    setLoading(true);
    setError("");
    try {
      const url = searchQuery
        ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${currentPage}&pageSize=${PAGE_SIZE}`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${currentPage}&pageSize=${PAGE_SIZE}`;

      const res = await axios.get(url);
      const newArticles = res.data.articles || [];
      setArticles(
        currentPage === 1 ? newArticles : [...articles, ...newArticles]
      );
      setHasMore(newArticles.length === PAGE_SIZE);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch news. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, searchQuery]);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <div className="flex-1">
      <SearchBar onSearch={handleSearch} />

      {error && (
        <div className="text-center text-red-500 font-semibold my-4">
          {error}
        </div>
      )}

      {!loading && articles.length === 0 && !error && (
        <div className="text-center text-gray-500 dark:text-gray-300 font-semibold my-4">
          No Results Found
        </div>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <h4 className="text-center text-gray-700 dark:text-gray-300">
            Loading...
          </h4>
        }
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
      >
        {loading && articles.length === 0
          ? Array.from({ length: PAGE_SIZE }).map((_, idx) => (
              <NewsCard key={idx} loading={true} />
            ))
          : articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <NewsCard article={article} />
              </motion.div>
            ))}
      </InfiniteScroll>
    </div>
  );
}
