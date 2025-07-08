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

const handleEventReceive = (info: any) => {
  const { draggedEl } = info;
  const taskId = draggedEl.getAttribute('data-task-id'); // This is already a string
  const date = info.date;
  
  if (taskId && onEventReceive) {
    onEventReceive(taskId, date); // No need to parse as number anymore
  }
};

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
    <div className="space-y-4">
      {/* This wrapper div is needed for FullCalendar's Draggable init */}
      <div ref={calendarRef} id="external-tasks-drag-container" style={{ display: "none" }} />
      
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>

        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-medium text-slate-900 dark:text-slate-100 min-w-[120px] text-center">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="relative overflow-hidden rounded-xl">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          editable={true}
          droppable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          height="600px"
          events={events}
          eventReceive={(info) => {
            const taskId = info.event.extendedProps.taskId;
            const startDate = info.event.start;
            if (taskId && startDate) {
              onEventReceive(taskId, startDate);
            }
            info.event.remove(); // Remove the temp event after drop
          }}
          eventContent={(eventInfo) => {
            return (
              <div className="p-1 rounded text-xs font-medium overflow-hidden">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                  <span className="truncate">{eventInfo.event.title}</span>
                </div>
              </div>
            );
          }}
          dayCellClassNames="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
          eventClassNames="shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-0"
          slotLabelClassNames="text-slate-600 dark:text-slate-400 text-xs"
          dayHeaderClassNames="text-slate-700 dark:text-slate-300 font-semibold text-sm bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700"
          // Custom styling through CSS variables
          viewClassNames="calendar-custom"
        />
      </div>

      {/* Calendar Legend */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-4">
        </div>
        <div className="flex items-center space-x-2">
        </div>
      </div>
    </div>
  );
};

export default Calendar;