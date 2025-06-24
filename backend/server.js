import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import assignmentRoutes from './routes/assignmentRoutes.js';
import authRoutes from './routes/authRoutes.js'; // if you use it

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS middleware (must be BEFORE any routes)
// ✅ Must come before any route or middleware
app.use(cors({
  origin: 'http://localhost:5173', // ✅ exactly match your frontend origin
  credentials: true,              // ✅ allow cookies and credentials
}));



// ✅ JSON parsing
app.use(express.json());

// ✅ Routes
app.use('/api/assignments', assignmentRoutes);
app.use('/api/users', authRoutes); // if you have auth

app.use((req, res) => {
  res.status(404).json({ error: `No such route: ${req.originalUrl}` });
});


// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
  });
