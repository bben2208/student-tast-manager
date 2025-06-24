import Assignment from '../models/Assignment.js';

// Fake-memory array (you can remove later)
let tasks = [];

export const getAllTasks = (req, res) => {
  res.json(tasks);
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
  