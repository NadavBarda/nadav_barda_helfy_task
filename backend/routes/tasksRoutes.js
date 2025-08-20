import { Router } from "express";
import { createTask, deleteTask, getTasks, ToggleTask, updateTask } from "../controllers/tasksController.js";


const router = Router();
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", ToggleTask);


export default router;
