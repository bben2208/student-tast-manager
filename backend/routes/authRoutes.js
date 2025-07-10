import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();


console.log("🛣️ Auth routes loaded");
router.post("/register", (req, res, next) => {
    console.log("📩 register route HIT");
    next();
  });
  
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
