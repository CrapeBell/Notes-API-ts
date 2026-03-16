console.log("Starting server...");


import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});