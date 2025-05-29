import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean; // you can keep this if you want, but unused now
}

interface TaskListProps {
  tasks: Task[];
  editTask: (id: number, newTitle: string) => void;
  deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
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
    if (trimmedTitle.length === 0) return; // prevent empty title
    if (editTaskId !== null) {
      editTask(editTaskId, trimmedTitle);
      cancelEditing();
    }
  };

  return (
    <div className="widget p-4 bg-white dark:bg-gray-700 rounded-md shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Tasks
      </h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between mb-2 p-2 bg-white dark:bg-gray-800 rounded shadow"
          >
            <div className="flex items-center space-x-2 flex-grow">
              {editTaskId === task.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                    if (e.key === "Escape") cancelEditing();
                  }}
                  className="flex-grow px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <span className="flex-grow">{task.title}</span>
              )}
            </div>

            {editTaskId === task.id ? (
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={saveEdit}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => startEditing(task.id, task.title)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="text-gray-600 dark:text-gray-400">No tasks added yet.</li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
