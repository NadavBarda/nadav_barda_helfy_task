import "../style/TaskItem.css";

export function TaskItem({ task, removeTask, toggleTask, task_to_update }) {
  const cardClass =
    "task-card" + (task.completed ? " completed " : " ") + task.priority;

  return (
    <div className={cardClass}>
      <div className="task-info">
        <h3>{task.title}</h3>
        {task.description && <p className="desc">{task.description}</p>}
        <p className="priority">Priority: {task.priority}</p>
      </div>

      <div className="task-actions">
        {toggleTask && (
          <button onClick={toggleTask}>
            {task.completed ? "Undo" : "Complete"}
          </button>
        )}
        {removeTask && <button onClick={removeTask}>Delete</button>}
        <button type="button" onClick={task_to_update}>
          Update
        </button>
      </div>
    </div>
  );
}
