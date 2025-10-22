import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Routes
import lostFoundRoutes from "./routes/lostfoundroutes.js";
import classmatesRoutes from "./routes/classmateroute.js";
import roommatesRoutes from "./routes/roommateroute.js";
import authRoutes from "./routes/auth.js";
import announcementRoutes from "./routes/announcementroutes.js";
import eventsRoutes from "./routes/eventsroutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Ensure uploads folder exists
const uploadsDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir);

} 

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir)); // serve uploaded images

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/classmates", classmatesRoutes);
app.use("/api/roommates", roommatesRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/lostfound", lostFoundRoutes);

// Test route
app.get("/", (req, res) => res.send("Backend is running ✅"));

// ===== MongoDB Connection =====
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/dbconnect";

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ===== Start Server =====
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
