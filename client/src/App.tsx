import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask"; 
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";
import WeatherWidget from "./components/WeatherWidget";
import SpotifyWidget from "./components/SpotifyWidget";
import LeetCodeWidget from "./components/LeetCodeWidget";
import StatsWidget from "./components/StatsWidget";
import QuickLinksWidget from "./components/QuickLinksWidget";
import type { Task } from "./types";
import type { EventInput} from "@fullcalendar/core";
import type { DropResult } from "react-beautiful-dnd";
import { DragDropContext} from "react-beautiful-dnd";
import "./App.css";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Load dark mode preference and tasks from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setIsDarkMode(saved === "true");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  

  const addTask = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const newTask: Task = { id: Date.now(), title: trimmed };
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = (id: number, newTitle: string) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: trimmed } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Handle dropping tasks inside the TaskList (reordering)
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.source.droppableId === "taskList" && result.destination.droppableId === "taskList") {
      const newTasks = Array.from(tasks);
      const [removed] = newTasks.splice(result.source.index, 1);
      newTasks.splice(result.destination.index, 0, removed);
      setTasks(newTasks);
    }
  };

  // Handle drop onto calendar from FullCalendar external drag
  const handleEventReceive = (taskId: number, date: Date) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, start: date.toISOString() } : task
      )
    );
  };

  const taskEvents: EventInput[] = tasks
    .filter((task) => task.start)
    .map((task) => ({
      id: String(task.id),
      title: task.title,
      start: task.start,
    }));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {!selectedDate ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Sidebar - Widgets */}
              <div className="lg:col-span-3 space-y-6">
                <div className="glass rounded-xl p-6 border border-white/20 dark:border-gray-700/30">
                  <AddTask addTask={addTask} />
                </div>
                
                <div className="space-y-6">
                  <StatsWidget tasks={tasks} />
                  <WeatherWidget />
                  <QuickLinksWidget />
                  <LeetCodeWidget />
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-6 space-y-6">
                {/* Task List */}
                <div className="glass rounded-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Active Tasks
                      </h2>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {tasks.length} total
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
                  </div>
                </div>

                {/* Calendar */}
                <div className="glass rounded-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Schedule
                    </h2>
                  </div>
                  <div className="p-6">
                    <Calendar events={taskEvents} onEventReceive={handleEventReceive} />
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Music & Additional Widgets */}
              <div className="lg:col-span-3 space-y-6">
                <SpotifyWidget />
                
                {/* Recent Activity */}
                <div className="glass rounded-xl p-6 border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Completed task: "Fix responsive layout"
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Added new task to calendar
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Updated project documentation
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass rounded-xl p-6 border border-white/20 dark:border-gray-700/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tasks for {selectedDate}
                </h2>
                <button 
                  onClick={() => setSelectedDate(null)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboard
                </button>
              </div>
              <div className="space-y-6">
                <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
                <AddTask addTask={addTask} />
              </div>
            </div>
          )}
        </main>
      </div>
    </DragDropContext>
  );
};

export default App;