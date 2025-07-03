import React, { useState, useEffect } from "react";

interface LeetCodeStats {
  problemsSolved: number;
  streak: number;
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
}

const LeetCodeWidget: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [dailyChallenge, setDailyChallenge] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  // Mock data for demonstration
  useEffect(() => {
    const mockStats: LeetCodeStats = {
      problemsSolved: 247,
      streak: 12,
      difficulty: {
        easy: 89,
        medium: 132,
        hard: 26
      }
    };

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
      setStats(mockStats);
      setDailyChallenge(challenges[Math.floor(Math.random() * challenges.length)]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20';
      case 'medium':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
      case 'hard':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20';
    }
  };

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
    <div className="widget-container bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200/50 dark:border-orange-700/50">
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
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats?.problemsSolved || 0}
            </div>
            <div className="text-xs text-orange-600/70 dark:text-orange-400/70 font-medium">
              Problems Solved
            </div>
          </div>
          <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center">
              {stats?.streak || 0}
              <svg className="w-4 h-4 ml-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-xs text-amber-600/70 dark:text-amber-400/70 font-medium">
              Day Streak
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Difficulty Breakdown
          </h4>
          <div className="space-y-2">
            {stats && Object.entries(stats.difficulty).map(([difficulty, count]) => (
              <div key={difficulty} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    difficulty === 'easy' ? 'bg-emerald-500' :
                    difficulty === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium capitalize text-slate-700 dark:text-slate-300">
                    {difficulty}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyColor(difficulty)}`}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

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
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Solve today's daily challenge to maintain your streak!
              </p>
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
              className="inline-flex items-center justify-center px-3 py-2 border border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-medium rounded-lg transition-colors text-sm"
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
              className="inline-flex items-center justify-center px-3 py-2 border border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-medium rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Discuss
            </a>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="pt-3 border-t border-orange-200/50 dark:border-orange-700/50">
          <div className="flex items-center justify-between text-xs text-orange-600 dark:text-orange-400 mb-2">
            <span>Daily Goal Progress</span>
            <span>2/3 problems</span>
          </div>
          <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500" style={{ width: '67%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeWidget;