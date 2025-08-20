import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/tasks",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createTask = async (task) => {
  try {
    const res = await api.post("/", task);
    return res.data;
  } catch (error) {
    const serverMsg = error.response.data.message;
    console.error("Error creating task:", serverMsg || error.message);
    throw new Error(serverMsg || "Failed to create task");
  }
};

export const getAllTasks = async () => {
  try {
    const res = await api.get("/");
    return res.data;
  } catch (error) {
    const serverMsg = error.response.data.message;
    console.error("Error creating task:", serverMsg || error.message);
    throw new Error(serverMsg || "Failed to create task");
  }
};

export const deleteTask = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    const serverMsg = error.response.data.message;
    console.error("Error creating task:", serverMsg || error.message);
    throw new Error(serverMsg || "Failed to create task");
  }
};

export const toggle_task = async (id) => {
  try {
    await api.patch(`/${id}/toggle`);
  } catch (error) {
    const serverMsg = error.response.data.message;
    console.error("Error creating task:", serverMsg || error.message);
    throw new Error(serverMsg || "Failed to create task");
  }
};

export const update_task = async (task) => {
  try {
    const res = await api.put(`/${task.id}`, task);
    return res.data;
  } catch (error) {
    const serverMsg = error.response.data.message;
    console.error("Error updating task:", serverMsg || error.message);
    throw new Error(serverMsg || "Failed to create task");
  }
};
