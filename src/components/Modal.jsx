import React from "react";
import { motion } from "framer-motion";

export default function Modal({ title, closeModal, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 z-50 max-w-lg w-full flex flex-col gap-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl text-blue-600 dark:text-blue-400">
            {title}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-700 dark:text-gray-200 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
