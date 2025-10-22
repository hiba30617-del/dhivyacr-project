import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  // Optional: you can add author or image
});

export default mongoose.model("Announcement", announcementSchema);
