import React from "react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DevDash</h1>
      <button
        onClick={toggleDarkMode}
        className={`rounded-full p-3 text-xl transition-colors duration-300 ${
          isDarkMode ? "bg-blue-600" : "bg-slate-400"
        } text-white`}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? "🌞" : "🌙"}
      </button>
    </header>
  );
};

export default Header;
