import { useDrag } from 'react-dnd';

interface TaskProps {
  id: number;
  title: string;
}

export default function Task({ id, title }: TaskProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id, title },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 my-1 rounded shadow cursor-move ${
        isDragging ? 'opacity-50' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
      }`}
    >
      {title}
    </div>
  );
}
