import { tasks } from "../db/tasksDb.js";
import { generateId } from "../utils/genId.js";
import {
  isValidTask,
  hasValidPriority,
  hasValidTitle,
  hasValidDescription,
} from "../utils/validTask.js";

export function getTasks(req, res) {
  res.status(200).json({ tasks });
}

export function createTask(req, res) {
  const { title, description, priority } = req.body;
  const valid = isValidTask(req.body);
  if (!valid) {
    return res.status(401).json({ message: "Missing props" });
  }

  const newTask = {
    id: generateId(),
    title: title.trim(),
    description: description.trim(),
    completed: false,
    priority,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  return res.status(201).json({ message: "Task Added!", task: newTask });
}

export function updateTask(req, res) {
  const { id } = req.params;

  const task = tasks.find((t) => t.id === +id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, description, priority } = req.body;

  if (hasValidTitle(title)) task.title = title;
  if (hasValidDescription(description)) task.description = description;
  if (hasValidPriority(priority)) task.priority = priority;

  return res.status(200).json({ task, message: "Task been updated" });
}

export function deleteTask(req, res) {
  const { id } = req.params;

  const index = tasks.findIndex((t) => t.id === +id);
  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);
  return res.status(200).json({ message: "Task deleted" });
}

export function ToggleTask(req, res) {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === +id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  task.completed = !task.completed;
  return res.status(200).json({ message: "Task updated!" });
}
