import React from "react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="header-modern sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          {/* Logo/Icon */}
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          
          {/* Title */}
          <div>
            <h1 className="header-title text-2xl lg:text-3xl font-bold">
              DevDash
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
              Developer Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-4">
        {/* Status indicator */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <div className="status-online"></div>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Online
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-110 transform focus:outline-none focus:ring-4 focus:ring-blue-500/50">
          <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 17h5v5l-5-5zM4 7h5V2L4 7zM15 7h5V2l-5 5z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </button>


        {/* Dark mode toggle */}
        <button
          className="dark-mode-toggle relative overflow-hidden"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <div className={`transition-transform duration-500 ${isDarkMode ? 'rotate-180' : 'rotate-0'}`}>
            {isDarkMode ? (
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;