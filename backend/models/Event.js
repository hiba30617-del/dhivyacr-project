import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }, // can also be Date type
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

export default Event;
