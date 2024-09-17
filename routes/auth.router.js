import express from "express";
import { signup, login, verifyOtp } from "../controller/auth.Controller.js";
const router = express.Router();

// route for signup
router.post("/signup", signup);
// route for otp verify
router.post("/verify-otp", verifyOtp);

// route for login
router.post("/login", login);

export default router;
