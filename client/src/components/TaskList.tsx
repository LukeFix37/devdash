import React, { useState, useEffect, useRef } from "react";
import { Draggable as BeautifulDraggable, Droppable } from "react-beautiful-dnd";
import type { Task } from "../types";
import { Draggable as FullCalendarDraggable } from "@fullcalendar/interaction";

interface TaskListProps {
  tasks: Task[];
  editTask: (id: string, newTitle: string) => void;
  deleteTask: (id: string) => void;
  toggleCompleted: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  editTask, 
  deleteTask, 
  toggleCompleted 
}) => {
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
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
            extendedProps: { taskId },
          };
        },
      });
    }
  }, []);

  const startEditing = (taskId: string, currentTitle: string) => {
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
          className="space-y-3"
        >
          {tasks.length === 0 && (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 4h.01M9 12h.01M9 16h.01" />
              </svg>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No tasks yet. Create your first task above!
              </p>
            </div>
          )}
          
          {tasks.map((task, index) => (
            <BeautifulDraggable key={task._id} draggableId={task._id} index={index}>
              {(provided, snapshot) => (
                <div
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  className={`fc-external-task group relative bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition-all duration-200 ${
                    snapshot.isDragging ? "shadow-lg ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""
                  } ${task.completed ? "opacity-75" : ""}`}
                  data-task-title={task.title}
                  data-task-id={task._id}
                >
                  {/* Drag Handle */}
                  <div
                    {...provided.dragHandleProps}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                  </div>

                  <div className="flex items-start gap-3 ml-6">
                    {/* Completion Checkbox */}
                    <button
                      onClick={() => toggleCompleted(task._id)}
                      className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        task.completed
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-slate-300 dark:border-slate-600 hover:border-emerald-400"
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-3 h-3 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>

                    {/* Task Content */}
                    <div className="flex-grow min-w-0">
                      {editTaskId === task._id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit();
                              if (e.key === "Escape") cancelEditing();
                            }}
                            autoFocus
                            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={saveEdit}
                              className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors focus:outline-none"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div
                            className={`cursor-pointer select-none ${
                              task.completed
                                ? "line-through text-slate-500 dark:text-slate-400"
                                : "text-slate-900 dark:text-slate-100"
                            }`}
                            onDoubleClick={() => startEditing(task._id, task.title)}
                            title="Double click to edit"
                          >
                            {task.title}
                          </div>
                          
                          {/* Task Metadata */}
                          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                            {task.start && (
                              <div className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Scheduled: {new Date(task.start).toLocaleDateString()}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Created: {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {editTaskId !== task._id && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditing(task._id, task.title)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Edit task"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500"
                          title="Delete task"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </BeautifulDraggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;