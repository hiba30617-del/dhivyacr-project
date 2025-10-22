// backend/routes/lostfoundRoutes.js
import express from "express";
import multer from "multer";
import LostItem from "../models/LostFoundmodels.js"; // Your Mongoose model
import fs from "fs";
import path from "path";

const router = express.Router();

// Ensure uploads folder exists
const uploadsDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await LostItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error("GET /lostfound error:", err);
    res.status(500).json({ message: "Failed to fetch items" });
  }
});

// POST add new item
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("POST /lostfound body:", req.body); // Debug
    console.log("POST /lostfound file:", req.file); // Debug

    const newItem = new LostItem({
      title,
      description,
      location,
      image: req.file ? req.file.filename : null,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("POST /lostfound error:", err);
    res.status(500).json({ message: "Failed to add item" });
  }
});

// PUT update item
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const updatedData = { title, description, location };
    if (req.file) updatedData.image = req.file.filename;

    const updatedItem = await LostItem.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedItem);
  } catch (err) {
    console.error("PUT /lostfound/:id error:", err);
    res.status(500).json({ message: "Failed to update item" });
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  try {
    await LostItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("DELETE /lostfound/:id error:", err);
    res.status(500).json({ message: "Failed to delete item" });
  }
});

export default router;
