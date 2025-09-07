import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-600 dark:bg-gray-900 text-white py-4 mt-6 px-4">
      <p className="text-center text-sm sm:text-base">
        Made with <span className="text-red-500">❤️</span> by{" "}
        <span className="font-semibold">Sujeet</span> | Powered by{" "}
        <a
          href="https://newsapi.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300 dark:hover:text-gray-400 transition-colors"
        >
          NewsAPI
        </a>
      </p>
    </footer>
  );
}
