import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import {
  getAllTasks,
  createAssignment,
  updateTask,
  deleteTask,
  getTaskById,
} from '../controllers/taskController.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createAssignment); // ✅ this one handles the form
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
