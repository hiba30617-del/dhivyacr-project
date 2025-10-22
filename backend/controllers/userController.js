import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// get users (admin)
export const getUsers = asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (q) filter.$or = [{ name: new RegExp(q, "i") }, { email: new RegExp(q, "i") }, { branch: new RegExp(q, "i") }];
  const users = await User.find(filter).select("-password").skip((page-1)*limit).limit(Number(limit));
  const total = await User.countDocuments(filter);
  res.json({ users, total, page: Number(page), limit: Number(limit) });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) { res.status(404); throw new Error("User not found"); }
  if (String(req.user._id) !== String(user._id) && req.user.role !== "admin") {
    res.status(403); throw new Error("Not authorized");
  }
  const { name, email, password, branch, year, phone, avatar } = req.body;
  user.name = name || user.name;
  user.email = name || user.email;
  user.password = password || user.password;
  user.branch = branch || user.branch;
  user.year = year || user.year;
  user.phone = phone || user.phone;

  await user.save();
  res.json(user);
});
