//Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  subject: String,
  dueDate: Date,
  description: String,
  teacher: String,
  priority: String,
  completed: {
    type: Boolean,
    default: false, // ✅ important!
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Task", taskSchema);
