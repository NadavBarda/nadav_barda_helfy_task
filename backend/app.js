import express from "express";
import cors from "cors";
import "dotenv/config";
import tasksRoute from "./routes/tasksRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/tasks", tasksRoute);

export default app;
