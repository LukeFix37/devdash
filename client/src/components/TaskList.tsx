import React, { useState, useEffect, useRef } from "react";
import { Draggable as BeautifulDraggable, Droppable } from "react-beautiful-dnd";
import type { Task } from "../types";
import { Draggable as FullCalendarDraggable } from "@fullcalendar/interaction";

interface TaskListProps {
  tasks: Task[];
  editTask: (id: number, newTitle: string) => void;
  deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, editTask, deleteTask }) => {
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      new FullCalendarDraggable(containerRef.current, {
        itemSelector: ".fc-external-task",
        eventData: (el) => {
          const taskId = el.getAttribute("data-task-id");
          const title = el.getAttribute("data-task-title") || "Untitled Task";
          return {
            title,
            extendedProps: { taskId: taskId ? parseInt(taskId, 10) : undefined },
          };
        },
      });
    }
  }, []);

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
    <Droppable droppableId="taskList">
      {(provided) => (
        <div
          ref={(node) => {
            provided.innerRef(node);
            containerRef.current = node;
          }}
          {...provided.droppableProps}
          id="external-tasks"
          className="widget bg-white dark:bg-gray-700 rounded-md shadow-md p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Tasks
          </h2>
          <ul>
            {tasks.length === 0 && (
              <li className="text-gray-600 dark:text-gray-400 italic">No tasks added yet.</li>
            )}
            {tasks.map((task, index) => (
              <BeautifulDraggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`fc-external-task task-item flex items-center justify-between mb-3 p-3 rounded-md shadow-sm cursor-pointer ${
                      snapshot.isDragging ? "bg-blue-200" : "bg-gray-50 dark:bg-gray-800"
                    }`}
                    data-task-title={task.title}
                    data-task-id={task.id.toString()}
                  >
                    <div className="flex-grow min-w-0 mr-4">
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
                          className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-1 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <span
                          className="block truncate cursor-pointer select-none text-gray-900 dark:text-gray-100"
                          onDoubleClick={() => startEditing(task.id, task.title)}
                          title="Double click to edit"
                        >
                          {task.title}
                        </span>
                      )}
                    </div>
                    <div className="task-buttons flex gap-2">
                      {editTaskId === task.id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="btn-save px-3 py-1 rounded-full bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 text-white text-sm font-semibold transition-all duration-150 shadow-md hover:scale-105"
                            aria-label="Save task edit"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="btn-cancel px-3 py-1 rounded-full bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 text-white text-sm font-semibold transition-all duration-150 shadow-md hover:scale-105"
                            aria-label="Cancel task edit"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(task.id, task.title)}
                            className="btn-edit px-3 py-1 rounded-full bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white text-sm font-semibold transition-all duration-150 shadow-md hover:scale-105"
                            aria-label="Edit task"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="btn-delete px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 text-white text-sm font-semibold transition-all duration-150 shadow-md hover:scale-105"
                            aria-label="Delete task"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                )}
              </BeautifulDraggable>
            ))}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;