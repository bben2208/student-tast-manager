import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import assignmentRoutes from './routes/assignmentRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
console.log("✅ Starting server...");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Correct CORS middleware
app.use(cors())

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use('/api/assignments', assignmentRoutes);
app.use('/api/users', authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `No such route: ${req.originalUrl}` });
});
