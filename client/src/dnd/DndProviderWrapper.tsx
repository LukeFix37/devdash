import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function DndProviderWrapper({ children }: Props) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
