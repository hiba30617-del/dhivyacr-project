import express from "express";
import Roommate from "../models/Roommatemodels.js";

const router = express.Router();

// GET all roommates
// GET roommates by block and roomNo
router.get("/", async (req, res) => {
  const { block, roomNo } = req.query;
  try {
    let query = {};
    if (block) query.block = block;
    if (roomNo) query.roomNo = roomNo;

    const roommates = await Roommate.find(query).sort({ createdAt: -1 });
    res.json(roommates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new roommate
router.post("/", async (req, res) => {
  const { block, roomNo, bedCount, name, gender } = req.body;
  if (!block || !roomNo || !bedCount || !name || !gender) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const newRoommate = new Roommate({ block, roomNo, bedCount, name, gender });
    const saved = await newRoommate.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
