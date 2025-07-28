import Assignment from '../models/Task.js';

// Get all tasks for the logged-in user
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Assignment.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// Create new task from frontend form (correct version)
export const createAssignment = async (req, res) => {
  const {
    title,
    subject,
    dueDate,
    description,
    teacher,
    priority,
    status,
  } = req.body;

  try {
    const task = new Assignment({
      title,
      subject,
      dueDate,
      description,
      teacher,
      priority,
      status,
      completed: false,
      user: req.user._id,
    });

    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving task:", err);
    res.status(400).json({ error: err.message });
  }
};

// Get one task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Assignment.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// Update task status (e.g., mark as completed)
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const task = await Assignment.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { completed },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Assignment.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting task:", err);
    res.status(500).json({ message: "Server error while deleting task" });
  }
};
