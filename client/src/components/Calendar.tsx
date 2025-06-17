import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import type { EventInput } from "@fullcalendar/core/index.js";

interface CalendarProps {
  events: EventInput[];
  onEventReceive: (taskId: number, date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onEventReceive }) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calendarRef.current) {
      // Setup external drag from TaskList (FullCalendar's native Draggable)
      new Draggable(calendarRef.current, {
        itemSelector: ".fc-external-task",
        eventData: (el) => {
          const title = el.getAttribute("data-task-title") || "Untitled Task";
          const id = el.getAttribute("data-task-id") || "";
          return {
            title,
            extendedProps: { taskId: parseInt(id, 10) },
          };
        },
      });
    }
  }, []);

  return (
    <>
      {/* This wrapper div is needed for FullCalendar's Draggable init */}
      <div ref={calendarRef} id="external-tasks-drag-container" style={{ display: "none" }} />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        droppable={true} // enable dropping external elements
        events={events}
        eventReceive={(info) => {
          const taskId = info.event.extendedProps.taskId;
          const startDate = info.event.start;
          if (taskId && startDate) {
            onEventReceive(taskId, startDate);
          }
          info.event.remove(); // Remove the temp event after drop
        }}
      />
    </>
  );
};

export default Calendar;
