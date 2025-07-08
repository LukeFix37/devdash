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
import { apiService } from "./services/api";
import "./App.css";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load dark mode preference from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setIsDarkMode(saved === "true");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
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

  // Load tasks from API on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tasksFromAPI = await apiService.getTasks();
      setTasks(tasksFromAPI);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError('Failed to load tasks. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  
  const addTask = async (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    try {
      const newTask = await apiService.createTask({ title: trimmed });
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      console.error('Failed to create task:', err);
      setError('Failed to create task. Please try again.');
      throw err;
    }
  };

  const editTask = async (id: string, newTitle: string) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    try {
      const updatedTask = await apiService.updateTask(id, { title: trimmed });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      console.error('Failed to update task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await apiService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  const toggleTaskCompleted = async (id: string) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    try {
      const updatedTask = await apiService.updateTask(id, { completed: !task.completed });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? updatedTask : t))
      );
    } catch (err) {
      console.error('Failed to toggle task completion:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  // Handle dropping tasks inside the TaskList (reordering)
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.source.droppableId === "taskList" && result.destination.droppableId === "taskList") {
      const newTasks = Array.from(tasks);
      const [removed] = newTasks.splice(result.source.index, 1);
      newTasks.splice(result.destination.index, 0, removed);
      setTasks(newTasks);
      // Note: You could implement a bulk update API call here if you want to persist the order
    }
  };

  // Handle drop onto calendar from FullCalendar external drag
  const handleEventReceive = async (taskId: string, date: Date) => {
    try {
      const updatedTask = await apiService.updateTask(taskId, { start: date.toISOString() });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      console.error('Failed to schedule task:', err);
      setError('Failed to schedule task. Please try again.');
    }
  };

  const taskEvents: EventInput[] = tasks
    .filter((task) => task.start)
    .map((task) => ({
      id: task._id,
      title: task.title,
      start: task.start,
    }));

  const clearError = () => setError(null);

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen gradient-bg-subtle">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Error Banner */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mx-4 mt-4 mb-4 flex justify-between items-center">
            <span>{error}</span>
            <div className="flex gap-2">
              <button 
                onClick={loadTasks}
                className="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200 font-medium"
              >
                Retry
              </button>
              <button 
                onClick={clearError}
                className="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <main className="main-container">
          <div className="dashboard-grid">
            {/* Sidebar with widgets */}
            <aside className="sidebar-grid fadeIn">
              <div className="widget-container">
                <div className="widget-header">
                  <AddTask addTask={addTask} />
                </div>
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
                        </div>
                      </div>
                    </div>
                    <TaskList 
                      tasks={tasks} 
                      editTask={editTask} 
                      deleteTask={deleteTask}
                      toggleCompleted={toggleTaskCompleted}
                    />
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
                  <TaskList 
                    tasks={tasks} 
                    editTask={editTask} 
                    deleteTask={deleteTask}
                    toggleCompleted={toggleTaskCompleted}
                  />
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