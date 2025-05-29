import DndProviderWrapper from "./dnd/DndProviderWrapper";
import Header from "./components/Header";
import Task from "./components/TaskList";
import Calendar from "./components/Calendar";

function App() {
  return (
    <DndProviderWrapper>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <Header />
        <div className="grid grid-cols-3 gap-6 p-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Task List</h2>
            <Task id={1} title="Design UI" />
            <Task id={2} title="Fix bugs" />
            <Task id={3} title="Deploy build" />
          </div>
          <div className="col-span-2">
            <Calendar />
          </div>
        </div>
      </div>
    </DndProviderWrapper>
  );
}

export default App;
