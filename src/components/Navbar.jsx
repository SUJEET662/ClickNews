import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleScrollHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  const menuItems = [
    { name: "Home", action: handleScrollHome },
    { name: "About", action: () => setAboutOpen(true) },
    { name: "Contact", action: () => setContactOpen(true) },
    { name: "Settings", action: () => setSettingsOpen(true) },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-2xl animate-bounce">📰</span>
            <h1 className="text-xl font-bold tracking-wide">ClickNews</h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-blue-500 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded hover:bg-blue-500 dark:hover:bg-gray-700 transition relative"
            >
              <motion.div
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white mb-1"
              />
              <motion.div
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white mb-1"
              />
              <motion.div
                animate={
                  menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                }
                className="w-6 h-0.5 bg-white"
              />
            </button>
          </div>
        </div>

        {/* Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-64 h-full bg-gradient-to-b from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 z-50 p-6 flex flex-col gap-4"
            >
              {menuItems.map((item, idx) => (
                <motion.button
                  key={item.name}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => {
                    item.action();
                    setMenuOpen(false);
                  }}
                  className="text-white dark:text-gray-200 font-semibold hover:text-yellow-300 text-left transition-colors duration-300"
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals */}
      {aboutOpen && (
        <Modal title="About" closeModal={() => setAboutOpen(false)}>
          <div className="p-2">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              Welcome to DailyScope!
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Stay updated with the latest news across all categories: Business,
              Sports, Technology, Entertainment, Health, and Science. Built with
              React, Tailwind CSS, and Framer Motion for smooth animations.
            </p>
          </div>
        </Modal>
      )}

      {contactOpen && (
        <Modal title="Contact" closeModal={() => setContactOpen(false)}>
          <div className="p-2">
            <p>Email: mainsujeethoon@gmail.com</p>
            <p>Phone: +91 9519653810</p>
          </div>
        </Modal>
      )}

      {settingsOpen && (
        <Modal title="Settings" closeModal={() => setSettingsOpen(false)}>
          <div className="flex items-center gap-2">
            <span>Dark Mode:</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-2 py-1 rounded bg-blue-500 text-white dark:bg-gray-700"
            >
              Toggle
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
