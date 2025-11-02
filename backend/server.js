import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Ensure uploads folder exists
const uploadsDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// Import routes
import authRoutes from "./routes/auth.js";
import lostFoundRoutes from "./routes/lostfoundroutes.js";
import classmatesRoutes from "./routes/classmateroute.js";
import roommatesRoutes from "./routes/roommateroute.js";
import announcementRoutes from "./routes/announcementroutes.js";
import eventsRoutes from "./routes/eventsroutes.js";

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/lostfound", lostFoundRoutes);
app.use("/api/classmates", classmatesRoutes);
app.use("/api/roommates", roommatesRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/events", eventsRoutes);

// Test route
app.get("/", (req, res) => res.send("✅ CampusBuzz backend is live!"));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
