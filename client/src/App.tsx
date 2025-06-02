import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";
import WeatherWidget from "./components/WeatherWidget";
import SpotifyEmbed from "./components/SpotifyWidget";
import type { Task } from "./types";
import "./App.css";


const App: React.FC = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {

    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {

      setIsDarkMode(saved === "true");
    } 

    else {

      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);

    }

  }, []);

  useEffect(() => {

    if (isDarkMode) {

      document.documentElement.classList.add("dark");

    } 
    else {

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

        {/* Left side: AddTask + WeatherWidget stacked vertically */}

        <div className="flex flex-col gap-6">

          <div className="add-task-widget">

            <AddTask addTask={addTask} />

          </div>

          <WeatherWidget />

          <SpotifyEmbed />

        </div>

        {/* Right side: TaskList and Calendar */}

        {!selectedDate ? (

          <>

            <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />

            <Calendar

              events={[]}
              onDateClick={(dateStr: string) => setSelectedDate(dateStr)}

            />
          </>

        ) : (

          <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">

            <h2 className="text-2xl font-bold mb-4">Tasks for {selectedDate}</h2>

            <button

              onClick={() => setSelectedDate(null)}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"

            >
              Back to Calendar

            </button>

            <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
            <AddTask addTask={addTask} />

          </div>
        )}

      </main>

    </div>

  );

};

export default App;
