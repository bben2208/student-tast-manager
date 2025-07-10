// backend/routes/assignmentsRoutes.js
import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  getAllTasks,
  createAssignment,
  getTaskById,
  updateTask
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", requireAuth, getAllTasks);
router.get("/:id", requireAuth, getTaskById);
router.post("/", requireAuth, createAssignment);
router.patch("/:id", requireAuth, updateTask);

export default router;
