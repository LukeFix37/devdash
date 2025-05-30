import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Event {
  title: string;
  date: string;
}

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const calendarRef = useRef<FullCalendar | null>(null);

  const handleDateClick = (arg: { dateStr: string }) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView("timeGridDay", arg.dateStr);
    }
  };

  const handleBackToMonth = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView("dayGridMonth");
    }
  };

  return (
    <div className="w-full max-w-4xl p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleBackToMonth}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Month
        </button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: ""
        }}
      />
    </div>
  );
};

export default Calendar;
