import React, { useState, useEffect } from "react";

const LeetCodeWidget: React.FC = () => {
  const [streak, setStreak] = useState(0);
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Simulate loading streak and problems solved from localStorage
    const savedStreak = localStorage.getItem("leetcode_streak");
    const savedProblems = localStorage.getItem("leetcode_problems");
    const lastSolved = localStorage.getItem("leetcode_last_solved");
    
    if (savedStreak) setStreak(parseInt(savedStreak, 10));
    if (savedProblems) setProblemsSolved(parseInt(savedProblems, 10));
    
    // Check if user solved a problem today
    if (lastSolved === today) {
      setCurrentProblem("Two Sum"); // Example current problem
    }
  }, [today]);

  const difficulties = [
    {
      name: "Easy",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      url: "https://leetcode.com/problemset/all/?difficulty=Easy&status=Todo"
    },
    {
      name: "Medium", 
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      url: "https://leetcode.com/problemset/all/?difficulty=Medium&status=Todo"
    },
    {
      name: "Hard",
      color: "text-red-600 dark:text-red-400", 
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      url: "https://leetcode.com/problemset/all/?difficulty=Hard&status=Todo"
    }
  ];

  const handleProblemSolved = () => {
    const newProblems = problemsSolved + 1;
    const lastSolved = localStorage.getItem("leetcode_last_solved");
    
    setProblemsSolved(newProblems);
    localStorage.setItem("leetcode_problems", newProblems.toString());
    
    // Update streak if solved today
    if (lastSolved !== today) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem("leetcode_streak", newStreak.toString());
      localStorage.setItem("leetcode_last_solved", today);
    }
  };

  return (
    <div className="glass rounded-xl p-6 border border-white/20 dark:border-gray-700/30 widget-hover">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.81 2.133 7.95-.072 2.14-2.205 2.108-5.703-.072-7.834l-2.155-2.155a.508.508 0 0 1 .427-.847l3.234-.006a1.532 1.532 0 0 0 1.318-.279l5.09-4.942a1.618 1.618 0 0 0-.034-2.318l-3.875-3.764c-.218-.211-.498-.322-.784-.315l-7.809.077a1.69 1.69 0 0 0-1.248.53l-2.312 2.312z"/>
            </svg>
            LeetCode
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Keep your coding skills sharp
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-white">{streak} day streak</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{problemsSolved} solved</div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">{streak}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{problemsSolved}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Solved</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">12</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">This Week</div>
        </div>
      </div>

      {/* Current Problem */}
      {currentProblem && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Today's Problem
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                {currentProblem}
              </p>
            </div>
            <button
              onClick={handleProblemSolved}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Solved
            </button>
          </div>
        </div>
      )}

      {/* Difficulty Selection */}
      <div className="space-y-3 mb-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Practice by Difficulty</p>
        <div className="grid grid-cols-1 gap-2">
          {difficulties.map((difficulty) => (
            <a
              key={difficulty.name}
              href={difficulty.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between p-3 border rounded-lg transition-all duration-200 hover:scale-[1.02] ${difficulty.bgColor} ${difficulty.borderColor} hover:shadow-md`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${difficulty.color.replace('text-', 'bg-')}`}></div>
                <span className={`text-sm font-medium ${difficulty.color}`}>
                  {difficulty.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {difficulty.name === 'Easy' ? '156' : difficulty.name === 'Medium' ? '89' : '43'} problems
                </span>
                <svg className={`w-4 h-4 ${difficulty.color} group-hover:translate-x-1 transition-transform duration-200`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <a
          href="https://leetcode.com/problemset/all/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Solve Random Problem
        </a>
        
        <div className="flex space-x-2">
          <a
            href="https://leetcode.com/explore/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Explore
          </a>
          <a
            href="https://leetcode.com/contest/"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Contests
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-between">
          <span>Today: {today}</span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
            Active
          </span>
        </p>
      </div>
    </div>
  );
};

export default LeetCodeWidget;