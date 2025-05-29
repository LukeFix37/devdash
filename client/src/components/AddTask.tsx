// AddTask.tsx
import React, { useState } from "react";

interface AddTaskProps {
  addTask: (title: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title);
      setTitle("");
    }
  };

  return (
    <div className="widget add-task-widget">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task"
          className="task-input"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTask;
