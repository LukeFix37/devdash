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
    <div className="space-y-4">
      {/* This wrapper div is needed for FullCalendar's Draggable init */}
      <div ref={calendarRef} id="external-tasks-drag-container" style={{ display: "none" }} />
      
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Drag tasks from the sidebar to schedule them
          </span>
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
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded"></div>
            <span>Scheduled Tasks</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded"></div>
            <span>Available Slots</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span>{events.length} scheduled tasks</span>
          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
          <span>Week view</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
        <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-200 text-sm font-medium border border-blue-200/50 dark:border-blue-700/50">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Today
        </button>
        <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-200 text-sm font-medium border border-purple-200/50 dark:border-purple-700/50">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          This Week
        </button>
        <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 text-emerald-700 dark:text-emerald-300 rounded-lg hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-900/30 dark:hover:to-green-900/30 transition-all duration-200 text-sm font-medium border border-emerald-200/50 dark:border-emerald-700/50">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          This Month
        </button>
      </div>
    </div>
  );
};

export default Calendar;