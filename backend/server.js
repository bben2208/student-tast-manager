// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import assignmentRoutes from './routes/assignmentsRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
console.log("✅ Starting server...");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB
connectDB();

// Middleware
app.use(express.json()); // to parse JSON

// CORS setup (safe for dev and prod)
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.netlify.app", // replace with final frontend domain
  "https://student-tast-manager.onrender.com" // if served from same Render URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Debug logger
app.use((req, res, next) => {
  console.log("🔍", req.method, req.originalUrl);
  next();
});

// API Routes
app.use('/api/users', authRoutes);
app.use('/api/assignments', assignmentRoutes);

// === Serve frontend in production ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Fallback for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
