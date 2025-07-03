import React, { useState, useEffect } from "react";
const LeetCodeWidget: React.FC = () => {
  const [dailyChallenge, setDailyChallenge] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  // Mock data for demonstration
  useEffect(() => {

    const challenges = [
      "Two Sum",
      "Valid Parentheses", 
      "Merge Two Sorted Lists",
      "Maximum Subarray",
      "Climbing Stairs",
      "Binary Tree Inorder Traversal",
      "Symmetric Tree",
      "Palindrome Number"
    ];

    setTimeout(() => {
      setDailyChallenge(challenges[Math.floor(Math.random() * challenges.length)]);
      setIsLoading(false);
    }, 1000);
  }, []);



  if (isLoading) {
    return (
      <div className="widget-container">
        <div className="widget-header">
          <h3 className="widget-title">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            LeetCode
          </h3>
          <div className="status-busy"></div>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="widget-container leetcode-card-hover bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200/50 dark:border-orange-700/50 transition-all duration-300">
      <div className="widget-header">
        <h3 className="widget-title text-orange-700 dark:text-orange-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          LeetCode
        </h3>
        <div className="status-online"></div>
      </div>

      <div className="widget-content space-y-4">


        {/* Daily Challenge */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Today's Challenge
            </h4>
            <div className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
                {today}
              </span>
            </div>
          </div>
          
          {dailyChallenge && (
            <div className="p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg border border-orange-200/50 dark:border-orange-700/50">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-slate-900 dark:text-slate-100">
                  {dailyChallenge}
                </h5>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                  Easy
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <a
            href="https://leetcode.com/problemset/all/?difficulty=Easy&status=Todo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 transform shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-500/50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Solve Problems
          </a>
          
          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://leetcode.com/contest/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-2 border border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-medium rounded-lg transition-all duration-200 text-sm hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Contests
            </a>
            <a
              href="https://leetcode.com/discuss/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-2 border border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-medium rounded-lg transition-all duration-200 text-sm hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Discuss
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeetCodeWidget;