import { useState } from "react";
import { createTask, update_task } from "../services/tasks";
import "../style/TaskForm.css";
const initValue = {
  title: "",
  description: "",
  priority: "",
};

export function TaskForm({ setSeen, handleTaskCreated, selected_task }) {
  const [task, setTask] = useState(() => selected_task ?? initValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit_txt = loading
    ? "Adding..."
    : selected_task
    ? "Update"
    : "Add new Task";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res = null;
      if (!selected_task) {
        res = await createTask(task);
        handleTaskCreated(res.task);
      } else {
        res = await update_task(task);
        handleTaskCreated(res.task, true);
      }

      setSeen(false);
      setTask(initValue);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={task.priority}
          onChange={handleChange}
          required
        >
          <option value="">Choose option</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {submit_txt}
      </button>
    </form>
  );
}
