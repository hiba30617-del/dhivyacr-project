import asyncHandler from "express-async-handler";
import Announcement from "../models/Announcement.js";

// Create announcement
export const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, body, pinned, expiresAt } = req.body;
  const attachments = req.attachments || []; // controller before middleware should set attachments after upload
  const announcement = await Announcement.create({
    title,
    body,
    pinned: pinned || false,
    attachments,
    postedBy: req.user._id,
    expiresAt
  });
  res.status(201).json(announcement);
});

// Get announcements with search, filter, pagination
export const getAnnouncements = asyncHandler(async (req, res) => {
  const { q, pinned, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (q) filter.$text = { $search: q }; // create text index on title, body
  if (pinned !== undefined) filter.pinned = pinned === "true";
  const skip = (Number(page) - 1) * Number(limit);
  const items = await Announcement.find(filter)
    .sort({ pinned: -1, createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .populate("postedBy", "name email");
  const total = await Announcement.countDocuments(filter);
  res.json({ items, total, page: Number(page), limit: Number(limit) });
});

// Delete
export const deleteAnnouncement = asyncHandler(async (req, res) => {
  const ann = await Announcement.findById(req.params.id);
  if (!ann) {
    res.status(404);
    throw new Error("Announcement not found");
  }
  // allow only admin or poster
  if (req.user.role !== "admin" && String(ann.postedBy) !== String(req.user._id)) {
    res.status(403);
    throw new Error("Not authorized to delete");
  }
  await ann.remove();
  res.json({ message: "Deleted" });
});
