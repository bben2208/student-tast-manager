import Assignment from '../models/Task.js';

// Fake-memory array (you can remove later)
let tasks = [];

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Assignment.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const addTask = (req, res) => {
  const { title, dueDate, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: Date.now(),
    title,
    dueDate: dueDate || null,
    completed: completed || false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const createAssignment = async (req, res) => {
  const { title, subject, dueDate, description } = req.body;

  try {
    const assignment = await Assignment.create({
      title,
      subject,
      dueDate,
      description,
      user: req.user._id,
    });

    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Assignment.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const task = await Assignment.findOneAndUpdate(
      { _id: id, user: req.user._id }, // ✅ Ensure user owns the task
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

export const deleteTask = async (req, res) => {
  try {
    const task = await Assignment.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // ✅ make sure user owns it
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting task:", err);
    res.status(500).json({ message: "Server error while deleting task" });
  }
};
