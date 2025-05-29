import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = ({ events }) => {
  return (
    <div className="calendar-widget max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        droppable={true}
        height="auto" // Let it fit the content
        // You can customize header toolbar here for a simpler widget look:
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: ""
        }}
        // Optional: reduce font size for compactness
        // You can add CSS for .fc { font-size: 0.875rem; } in your global styles if needed
      />
    </div>
  );
};

export default Calendar;
