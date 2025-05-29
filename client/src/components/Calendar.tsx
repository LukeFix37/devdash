import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CalendarProps {
  events: any[];
  onDateClick: (dateStr: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onDateClick }) => {
  return (
    <div className="calendar-widget bg-white dark:bg-gray-800 rounded-lg shadow p-4 w-full max-w-lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        droppable={true}
        dateClick={(info) => onDateClick(info.dateStr)}
        height="auto"
      />
    </div>
  );
};

export default Calendar;
