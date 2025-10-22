import asyncHandler from "express-async-handler";
import Roommate from "../models/Roommate.js";

export const createRoommate = asyncHandler(async (req, res) => {
  const payload = { ...req.body, createdBy: req.user._id, images: req.images || [] };
  const r = await Roommate.create(payload);
  res.status(201).json(r);
});

export const getRoommates = asyncHandler(async (req, res) => {
  const { q, minBudget, maxBudget, location, page = 1, limit = 12 } = req.query;
  const filter = {};
  if (q) filter.$text = { $search: q };
  if (location) filter.location = { $regex: location, $options: "i" };
  if (minBudget || maxBudget) filter.budget = {};
  if (minBudget) filter.budget.$gte = Number(minBudget);
  if (maxBudget) filter.budget.$lte = Number(maxBudget);

  const skip = (page - 1) * limit;
  const items = await Roommate.find(filter).skip(skip).limit(Number(limit));
  const total = await Roommate.countDocuments(filter);
  res.json({ items, total, page: Number(page), limit: Number(limit) });
});

export const deleteRoommate = asyncHandler(async (req, res) => {
  const item = await Roommate.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Not found");
  }
  if (String(item.createdBy) !== String(req.user._id) && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized");
  }
  await item.remove();
  res.json({ message: "Deleted" });
});
