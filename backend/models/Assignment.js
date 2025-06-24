// models/Assignment.js
import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: String,
  subject: String,
  dueDate: String,
  description: String,
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment; // ✅ ES module default export
