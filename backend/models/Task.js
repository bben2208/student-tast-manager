//Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  subject: String,
  dueDate: Date,       // ✅ consistent with your controller usage
  description: String,
  teacher: String,
  priority: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});


export default mongoose.model("Task", taskSchema);
