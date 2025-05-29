import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTask,
  editTask,
  deleteTask,
}) => {
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const startEditing = (taskId: number, currentTitle: string) => {
    setEditTaskId(taskId);
    setEditTitle(currentTitle);
  };

  const cancelEditing = () => {
    setEditTaskId(null);
    setEditTitle("");
  };

  const saveEdit = () => {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle.length === 0) return;
    if (editTaskId !== null) {
      editTask(editTaskId, trimmedTitle);
      cancelEditing();
    }
  };

  return (
    <div className="widget bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Tasks
      </h2>
      <ul>
        {tasks.length === 0 && (
          <li className="text-gray-600 dark:text-gray-400 italic">No tasks added yet.</li>
        )}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md shadow-sm"
          >
            <div className="flex items-center space-x-4 flex-grow min-w-0">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400"
              />
              {editTaskId === task.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                    if (e.key === "Escape") cancelEditing();
                  }}
                  autoFocus
                  className="flex-grow bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-1 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span
                  className={`flex-grow truncate cursor-pointer select-none ${
                    task.completed
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : "text-gray-900 dark:text-gray-100"
                  }`}
                  onDoubleClick={() => startEditing(task.id, task.title)}
                  title="Double click to edit"
                >
                  {task.title}
                </span>
              )}
            </div>
            <div className="flex space-x-2 ml-4 flex-shrink-0">
              {editTaskId === task.id ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition"
                    aria-label="Save task edit"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-3 py-1 rounded-full bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold transition"
                    aria-label="Cancel task edit"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(task.id, task.title)}
                    className="px-3 py-1 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold transition"
                    aria-label="Edit task"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
                    aria-label="Delete task"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
