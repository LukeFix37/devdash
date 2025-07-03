import React from "react";

interface DashboardContainerProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ children, className = "" }) => (
  <div
    className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-8 ${className}`}
    style={{ minHeight: "100vh" }}
  >
    {children}
  </div>
);

export default DashboardContainer;