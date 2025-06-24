import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import { getAllTasks, createAssignment, getTaskById } from '../controllers/taskController.js';

const router = express.Router();

// ✅ Place static routes first
router.get('/test', (req, res) => {
  res.json({ message: "✅ Public route works!" });
});

router.get('/', getAllTasks);

// ✅ Place dynamic routes last
router.get('/:id', getTaskById);

router.post('/', requireAuth, createAssignment);

export default router;
