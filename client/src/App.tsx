import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";
import "./App.css";

interface Task {
  id: number;
  title: string;
}

const App: React.FC = () => {
  // Initialize dark mode from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [tasks, setTasks] = useState<Task[]>([]);

  // Sync dark mode state to HTML class and localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const addTask = (title: string) => {
    if (!title.trim()) return;
    const newTask: Task = { id: Date.now(), title: title.trim() };
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = (id: number, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex justify-center gap-6 p-6">
        <AddTask addTask={addTask} />
        <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
        <Calendar events={[]} /> {/* Empty events array for now */}
      </main>
    </div>
  );
};

export default App;
