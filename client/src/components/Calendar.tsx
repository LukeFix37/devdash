import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

interface CalendarProps {
  events: any[];
  onEventReceive: (event: any) => void;
  onDateClick: (dateStr: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onEventReceive, onDateClick }) => {
  const externalTasksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalTasksRef.current) {
      new Draggable(externalTasksRef.current, {
        itemSelector: ".external-task",
        eventData: (eventEl) => {
          const title = eventEl.getAttribute("data-title") || "Untitled Task";
          return { title };
        },
      });
    }
  }, []);

  return (
    <div>
      {/* This div is for draggable external tasks container */}
      <div ref={externalTasksRef} style={{ display: "none" }}>
        {/* Your draggable task items must have class "external-task" and data-title */}
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        droppable={true}
        events={events}
        eventReceive={(info) => onEventReceive(info.event)}
        dateClick={(info) => onDateClick(info.dateStr)}
      />
    </div>
  );
};

export default Calendar;
