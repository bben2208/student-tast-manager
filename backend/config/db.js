// config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://bogbeni431:pgvbI6u7MKKccagX@cluster0.lspfabi.mongodb.net/studentTaskManager?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
