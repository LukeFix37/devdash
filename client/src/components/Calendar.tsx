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
    <div className="space-y-6">
      {/* This wrapper div is needed for FullCalendar's Draggable init */}
      <div ref={calendarRef} id="external-tasks-drag-container" style={{ display: "none" }} />
      
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Schedule Overview
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Drag tasks from the left to schedule them
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Today
          </button>
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-md shadow-sm transition-colors duration-200">
              Week
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                This Week
              </p>
              <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                {events.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Completed
              </p>
              <p className="text-lg font-semibold text-green-900 dark:text-green-100">
                0
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Upcoming
              </p>
              <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                {events.filter(event => event.start && new Date(event.start as string) > new Date()).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Component */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden fullcalendar-container">
        
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height="auto"
          editable={true}
          droppable={true}
          dayMaxEvents={3}
          moreLinkClick="popover"
          events={events}
          eventReceive={(info) => {
            const taskId = info.event.extendedProps.taskId;
            const startDate = info.event.start;
            if (taskId && startDate) {
              onEventReceive(taskId, startDate);
            }
            info.event.remove(); // Remove the temp event after drop
          }}
          eventClick={(info) => {
            // Handle event click - could open edit modal
            console.log('Event clicked:', info.event.title);
          }}
          dateClick={(info) => {
            // Handle date click - could create new event
            console.log('Date clicked:', info.dateStr);
          }}
          eventClassNames="transition-all duration-200 hover:shadow-lg"
        />
      </div>

      {/* Drag and Drop Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
              Pro Tip: Drag & Drop Scheduling
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Drag tasks from the task list on the left directly onto the calendar to schedule them. 
              You can also click and drag existing events to reschedule them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;