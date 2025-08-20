export function isValidTask(task) {
  const { title, description, priority } = task;

  return (
    hasValidTitle(title) &&
    hasValidDescription(description) &&
    hasValidPriority(priority)
  );
}

export function hasValidPriority(priority) {
  return priority === "low" || priority === "medium" || priority === "high";
}

export function hasValidTitle(title) {
  return title && title.trim().length > 0;
}

export function hasValidDescription(description) {
  return description && description.trim().length > 0;
}
