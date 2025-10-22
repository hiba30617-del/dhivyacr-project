// backend/models/LostItem.js
import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String }, // stores the filename
  },
  { timestamps: true }
);

export default mongoose.model("LostItem", lostItemSchema);
