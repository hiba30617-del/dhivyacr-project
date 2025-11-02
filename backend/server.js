import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// ✅ Load environment variables first
dotenv.config();

// ✅ Connect to MongoDB using correct key
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ===== Routes =====
import lostFoundRoutes from "./routes/lostfoundroutes.js";
import classmatesRoutes from "./routes/classmateroute.js";
import roommatesRoutes from "./routes/roommateroute.js";
import authRoutes from "./routes/auth.js";
import announcementRoutes from "./routes/announcementroutes.js";
import eventsRoutes from "./routes/eventsroutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Ensure uploads folder exists
const uploadsDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadsDir)) {
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

// ===== Test route =====
app.get("/", (req, res) => res.send("Backend is running ✅"));

// ===== Start Server =====
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
