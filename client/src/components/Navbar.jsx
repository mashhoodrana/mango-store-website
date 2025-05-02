import React, { useState, useEffect, useCallback } from "react";

const Navbar = () => {
  // Initialize darkMode from localStorage or default to false
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Memoized toggle function
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);

  // Memoized menu toggle function
  const toggleMenu = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Mango Types", path: "/mango-types" },
    { name: "Order", path: "/order" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg py-2" 
          : "bg-white dark:bg-gray-900 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-green-700 dark:text-green-500 flex items-center transition-colors duration-300">
              <span className="mr-2 transform hover:scale-110 transition-transform duration-200">🥭</span>
              <span className="bg-gradient-to-r from-green-600 to-green-400 dark:from-green-500 dark:to-green-300 bg-clip-text text-transparent">
                MangoStore
              </span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 font-medium relative group transition-colors duration-300"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-green-500 group-hover:w-full transition-all duration-300 rounded"></span>
              </a>
            ))}
          </div>

          {/* Light/Dark Toggle */}
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={darkMode}
          >
            {darkMode ? (
              <span className="text-xl">🌙</span>
            ) : (
              <span className="text-xl">☀️</span>
            )}
          </button>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icon when menu is open */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg transition-colors duration-300">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              onClick={toggleMenu}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;