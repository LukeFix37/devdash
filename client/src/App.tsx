import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask"; 
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";
import WeatherWidget from "./components/WeatherWidget";
import SpotifyWidget from "./components/SpotifyWidget";
import LeetCodeWidget from "./components/LeetCodeWidget";
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
      <div className="min-h-screen gradient-bg-subtle">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <main className="main-container">
          <div className="dashboard-grid">
            {/* Sidebar with widgets */}
            <aside className="sidebar-grid fadeIn">
              <div className="widget-container">
                <div className="widget-header">
                  <h2 className="widget-title">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Quick Add
                  </h2>
                </div>
                <AddTask addTask={addTask} />
              </div>

              {/* Task Stats Card */}
              <div className="widget-container">
                <div className="widget-header">
                  <h2 className="widget-title">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Task Overview
                  </h2>
                  <div className="status-online"></div>
                </div>
                <div className="widget-content">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{tasks.length}</div>
                      <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Total</div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {tasks.filter(task => task.completed).length}
                      </div>
                      <div className="text-xs text-emerald-600/70 dark:text-emerald-400/70">Done</div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Progress</span>
                      <span className="font-medium">
                        {tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: tasks.length > 0 ? `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` : '0%' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <WeatherWidget />
              <SpotifyWidget />
              <LeetCodeWidget />
            </aside>

            {/* Main content area */}
            <section className="main-content-grid">
              {!selectedDate ? (
                <>
                  <div className="card-modern card-hover fadeIn">
                    <div className="widget-header mb-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                        </div>
                        My Tasks
                      </h2>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">Live</span>
                        </div>
                      </div>
                    </div>
                    <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
                  </div>

                  <div className="card-modern card-hover fadeIn">
                    <div className="widget-header mb-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        Calendar
                      </h2>
                      <button className="btn-ghost text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </button>
                    </div>
                    <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                      <Calendar events={taskEvents} onEventReceive={handleEventReceive} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="card-modern fadeIn">
                  <div className="widget-header mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      Tasks for {selectedDate}
                    </h2>
                    <button 
                      onClick={() => setSelectedDate(null)}
                      className="btn-ghost"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back
                    </button>
                  </div>
                  <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <AddTask addTask={addTask} />
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </DragDropContext>
  );
};

export default App;