import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <div className="app-container">
      <Header isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />

      <div className="flex-col-gap">
        <section className="section flex-row-gap">
          <TaskList />
        </section>
        <section className="section">
          <Calendar />
        </section>
      </div>
    </div>
  );
}

export default App;
