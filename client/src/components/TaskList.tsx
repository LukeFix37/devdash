import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
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
    if (trimmedTitle.length === 0) return;
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
            className="task-item"
          >
            <div className="task-content">
              {editTaskId === task.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                    if (e.key === "Escape") cancelEditing();
                  }}
                  className="task-input"
                  autoFocus
                />
              ) : (
                <span className="task-title">{task.title}</span>
              )}
            </div>

            <div className="task-buttons">
              {editTaskId === task.id ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="btn btn-save"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="btn btn-cancel"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(task.id, task.title)}
                    className="btn btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
        {tasks.length === 0 && (
          <li className="no-tasks">No tasks added yet.</li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
