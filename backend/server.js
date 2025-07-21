// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import assignmentRoutes from './routes/assignmentsRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
console.log("✅ Starting server...");

const app = express();
const PORT = 5000;

// DB Connection
connectDB();

// Middleware
// ✅ Recommended safe CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // Or "*" if you're not using credentials
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Debug logger
app.use((req, res, next) => {
  console.log("🔍", req.method, req.originalUrl);
  next();
});

// Routes
app.use('/api/users', authRoutes);
app.use('/api/assignments', assignmentRoutes);

// Fallback
app.use((req, res) => {
  res.status(404).json({ error: `No such route: ${req.originalUrl}` });
});

// Server Start
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
