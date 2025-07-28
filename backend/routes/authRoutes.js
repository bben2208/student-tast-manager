import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Return logged-in user's data
router.get("/me", requireAuth, (req, res) => {
  res.json(req.user); // `req.user` is set in requireAuth middleware
});

export default router;
