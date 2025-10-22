import mongoose from "mongoose";

const ClassmateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registerNumber: { type: String, required: true },
  department: { type: String, required: true },
  classroomNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Classmate", ClassmateSchema);
