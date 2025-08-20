import { useState, useEffect } from "react";

export function TaskFilter({ tasks, setFilteredTasks }) {
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let filtered = tasks;

    if (statusFilter === "completed") {
      filtered = filtered.filter((t) => t.completed);
    } else if (statusFilter === "not_completed") {
      filtered = filtered.filter((t) => !t.completed);
    }

    setFilteredTasks(filtered);
  }, [statusFilter, tasks, setFilteredTasks]);

  return (
    <div className="task-filter">
      <label>Status: </label>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not_completed">Not Completed</option>
      </select>
    </div>
  );
}
