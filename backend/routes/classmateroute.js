import express from "express";
import Classmate from "../models/Classmate.js";

const router = express.Router();

// GET all classmates
router.get("/", async (req, res) => {
  try {
    const classmates = await Classmate.find().sort({ name: 1 });
    res.json(classmates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET classmates by department and classroom
router.get("/filter", async (req, res) => {
  const { department, classroomNumber } = req.query;

  if (!department || !classroomNumber) {
    return res.status(400).json({ message: "Department and classroomNumber are required" });
  }

  try {
    const filtered = await Classmate.find({
      department: department,
      classroomNumber: classroomNumber
    });
    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST new classmate
router.post("/", async (req, res) => {
  const { name, registerNumber, department, classroomNumber } = req.body;

  if (!name || !registerNumber || !department || !classroomNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMate = new Classmate({ name, registerNumber, department, classroomNumber });
    await newMate.save();
    res.status(201).json(newMate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
