import { useDrop } from 'react-dnd';
// other imports remain the same

export default function Calendar() {
  const [events, setEvents] = useState<TaskEvent[]>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: number; title: string }, monitor) => {
      const now = new Date();
      const later = new Date(now.getTime() + 60 * 60 * 1000); // +1 hour
      const newEvent: TaskEvent = {
        id: events.length + 1,
        title: item.title,
        start: now,
        end: later,
      };
      setEvents((prev) => [...prev, newEvent]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Weekly Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 600 }}
      />
      {isOver && <div className="absolute inset-0 bg-green-200 opacity-20 z-10" />}
    </div>
  );
}
