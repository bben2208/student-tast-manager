import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import assignmentRoutes from './routes/assignmentsRoutes.js';
import authRoutes from "./routes/authRoutes.js"; // ✅ fixed

dotenv.config();
console.log("✅ Starting server...");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // ✅ allow credentials just in case
  })
);

app.use((req, res, next) => {
  console.log("🔄 Request received:");
  console.log("🔗 Origin:", req.headers.origin);
  console.log("🧾 Method:", req.method);
  console.log("📫 Path:", req.originalUrl);
  next();
});




app.use(express.json());
connectDB();

app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});


app.use('/api/assignments', assignmentRoutes); // 🔁 Task routes
app.use('/api/users', authRoutes); // 🔁 Auth routes (register/login)

app.use((req, res) => {
  res.status(404).json({ error: `No such route: ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
