import React from "react";

const LeetCodeWidget: React.FC = () => {

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="widget-card">

      <h2 className="text-lg font-bold mb-2">LeetCode Problems</h2>

      <p className="mb-4 text-sm">Keep your problem solving skills as a coder sharp!</p>
      <a
        href="https://leetcode.com/problemset/all/?difficulty=Easy&status=Todo"
        target="_blank"
        rel="noopener noreferrer"
        className="primary"
      >
        Solve a Problem
      </a>
      
      <p className="mt-4 text-xs text-gray-400">Date: {today}</p>
    </div>
  );
};

export default LeetCodeWidget;
