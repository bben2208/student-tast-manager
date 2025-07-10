import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  subject: String,
  Date: Date,
  description: String,
  teacher: String,
  priority: String,
});

export default mongoose.model("Task", taskSchema);
