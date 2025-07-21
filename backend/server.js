// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import assignmentRoutes from './routes/assignmentsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';



dotenv.config();
console.log("✅ Starting server...");

const app = express();
const PORT = 5000;

app.use(express.json()); // to parse JSON

// DB Connection
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.netlify.app", // replace with final frontend domain
  "https://student-tast-manager.onrender.com" // if served from same Render URL
];// ✅ Recommended safe CORS setup


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

// Routes
app.use('/api/users', authRoutes);
app.use('/api/assignments', assignmentRoutes);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Fallback
app.use((req, res) => {
  res.status(404).json({ error: `No such route: ${req.originalUrl}` });
});

// Server Start
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
