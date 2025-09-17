import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [category, setCategory] = useState("general");

  const toggleSidebar = () => setCollapsed(!collapsed);


  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex flex-1">
       
        <Sidebar
          category={category}
          setCategory={setCategory}
          collapsed={collapsed}
          toggleCollapse={toggleSidebar}
        />

        
        <Home
          category={category}
          setCategory={setCategory}
          darkMode={darkMode}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;
