import asyncHandler from "express-async-handler";
import Event from "../models/Event.js";

export const createEvent = asyncHandler(async (req, res) => {
  const payload = { ...req.body, createdBy: req.user._id, attachments: req.attachments || [] };
  const e = await Event.create(payload);
  res.status(201).json(e);
});

export const getEvents = asyncHandler(async (req, res) => {
  const { upcoming, q, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (q) filter.$text = { $search: q };
  if (upcoming === "true") filter.startDate = { $gte: new Date() };
  const items = await Event.find(filter).sort({ startDate: 1 }).skip((page-1)*limit).limit(Number(limit));
  const total = await Event.countDocuments(filter);
  res.json({ items, total, page: Number(page), limit: Number(limit) });
});

export const rsvpEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) { res.status(404); throw new Error("Event not found"); }
  if (!event.attendees.includes(req.user._id)) {
    event.attendees.push(req.user._id);
    await event.save();
  }
  res.json(event);
});
