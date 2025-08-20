import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());



export default app
