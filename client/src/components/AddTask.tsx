import React, { useState } from "react";

interface AddTaskProps {
  addTask: (title: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;
    addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="widget p-4 bg-white dark:bg-gray-700 rounded-md shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Add Task
      </h2>
      <div className="flex">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="New task title"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors duration-200"
          aria-label="Add task"
          disabled={newTaskTitle.trim() === ""}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTask;
