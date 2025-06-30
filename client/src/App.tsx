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
      <div className="app-container">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <main className="main-grid">
          <section className="sidebar">
            <AddTask addTask={addTask} />
            <div className="widgets">
              <WeatherWidget />
              <SpotifyWidget />
              <LeetCodeWidget />
            </div>
          </section>

          <section className="content">
            {!selectedDate ? (
              <>
                <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
                <Calendar events={taskEvents} onEventReceive={handleEventReceive} />
              </>
            ) : (
              <div className="selected-date-tasks">
                <div className="header-row">
                  <h2>Tasks for {selectedDate}</h2>
                  <button onClick={() => setSelectedDate(null)}>Back</button>
                </div>
                <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
                <AddTask addTask={addTask} />
              </div>
            )}
          </section>
        </main>
      </div>
    </DragDropContext>
  );
};

export default App;
