import asyncHandler from "express-async-handler";
import LostFound from "../models/LostFound.js";

export const createLostFound = asyncHandler(async (req, res) => {
  const payload = { ...req.body, createdBy: req.user._id, images: req.images || [] };
  const p = await LostFound.create(payload);
  res.status(201).json(p);
});

export const getLostFound = asyncHandler(async (req, res) => {
  const { type, q, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (q) filter.$text = { $search: q };
  const items = await LostFound.find(filter).sort({ createdAt: -1 }).skip((page-1)*limit).limit(Number(limit));
  const total = await LostFound.countDocuments(filter);
  res.json({ items, total, page: Number(page), limit: Number(limit) });
});
