import React, { useState } from "react";

type Task = {
    id: string;
    title: string;
};

type CalendarSlot = {
    time: string;
    task?: Task;
};

const times = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00",
];

const Calendar: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [slots, setSlots] = useState<CalendarSlot[]>(
        times.map((time) => ({ time }))
    );
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);

    const onDragStart = (task: Task) => {
        setDraggedTask(task);
    };

    const onDrop = (slotIdx: number) => {
        if (!draggedTask) return;
        setSlots((prev) =>
            prev.map((slot, idx) =>
                idx === slotIdx ? { ...slot, task: draggedTask } : slot
            )
        );
        setTasks((prev) => prev.filter((t) => t.id !== draggedTask.id));
        setDraggedTask(null);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div style={{ display: "flex", gap: "2rem" }}>
            <div>
                <h3>Tasks</h3>
                <ul>
                    {tasks.length === 0 && (
                        <li style={{ color: "#bbb" }}>No tasks available</li>
                    )}
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            draggable
                            onDragStart={() => onDragStart(task)}
                            style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                marginBottom: "8px",
                                background: "#f9f9f9",
                                cursor: "grab",
                            }}
                        >
                            {task.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Calendar</h3>
                <table style={{ borderCollapse: "collapse" }}>
                    <tbody>
                        {slots.map((slot, idx) => (
                            <tr key={slot.time}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    {slot.time}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid #ddd",
                                        width: "200px",
                                        height: "40px",
                                        background: slot.task ? "#e0ffe0" : "#fff",
                                    }}
                                    onDrop={() => onDrop(idx)}
                                    onDragOver={onDragOver}
                                >
                                    {slot.task ? slot.task.title : <span style={{ color: "#bbb" }}>Drop task here</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;
