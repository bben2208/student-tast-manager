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

const app = express();
const PORT = process.env.PORT || 5050;

// Connect to MongoDB
connectDB();

// Setup __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://student-tast-manager.onrender.com"
];



app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// Built-in body parser
app.use(express.json());

// API Routes
app.use('/api/users', authRoutes);
app.use('/api/assignments', assignmentRoutes);

// ✅ Serve frontend from dist (after build)
const frontendPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'index.html'));
});



// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
