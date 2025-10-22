import mongoose from "mongoose";

const roommateSchema = new mongoose.Schema({
  block: { type: String, required: true },
  roomNo: { type: String, required: true },
  bedCount: { type: Number, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Roommate", roommateSchema);
