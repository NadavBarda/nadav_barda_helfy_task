import "./App.css";

import { useEffect, useState } from "react";
import { TaskForm } from "./components/TaskForm";
import { getAllTasks } from "./services/tasks";
import { TaskList } from "./components/TaskList";
import { TaskFilter } from "./components/TaskFilter";

function App() {
  const [seen, setSeen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [selected_task, setSelected_task] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const newTaskBtn = seen ? "Cancel" : "Add task";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data.tasks || []);
        setFilteredTasks(data.tasks || []);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const updateTask = (task) => {
    setSelected_task(task);
    setSeen(true);
  };

  const handleTaskCreated = (newTask, update = false) => {
    if (!update) {
      setTasks((prev) => [newTask, ...prev]);
    } else {
      setTasks((prev) => prev.map((t) => (t.id === newTask.id ? newTask : t)));
    }
  };

  return (
    <>
      <div className="header">
        <h1>Task manager</h1>
      </div>

      <TaskFilter tasks={tasks} setFilteredTasks={setFilteredTasks} />

      <button onClick={() => setSeen((prev) => !prev)}>{newTaskBtn}</button>

      {seen && (
        <TaskForm
          setSeen={setSeen}
          handleTaskCreated={handleTaskCreated}
          selected_task={selected_task}
        />
      )}

      {loading ? (
        <p>Loading tasks…</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          setTasks={setTasks}
          updateTask={updateTask}
        />
      )}
    </>
  );
}

export default App;
