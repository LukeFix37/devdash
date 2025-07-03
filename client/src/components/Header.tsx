import React from "react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <h1>DevDash</h1>
      <button
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
};

export default Header;