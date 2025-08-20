import { deleteTask, toggle_task } from "../services/tasks";
import { TaskItem } from "./TaskItem";
import '../style/TaskList.css'
export function TaskList({ tasks, setTasks, updateTask }) {
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id && t._id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const task_to_update = (id) => {
    const selected_task = tasks.find((t) => t.id === id);
    if (!selected_task) {
      return;
    }
    updateTask(selected_task);
  };

  const toggleTask = async (id) => {
    try {
      await toggle_task(id);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  if (!tasks || tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          toggleTask={() => toggleTask(t.id)}
          removeTask={() => removeTask(t.id)}
          task_to_update={() => task_to_update(t.id)}
        />
      ))}
    </div>
  );
}
