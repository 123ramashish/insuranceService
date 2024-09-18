import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import { sendOtpEmail } from "../utils/mailer.js";

dotenv.config();

// Generate a 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Signup function with name, email, and password
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    // If the user exists and is verified, return an error
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "User already registered." });
    }

    // Generate a 6-digit OTP
    const otp = generateOtp();

    // Send the OTP to the user's email
    await sendOtpEmail(email, otp);

    // If the user doesn't exist, create a new user with the OTP
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      await new User({ name, email, password: hashedPassword, otp }).save();
    } else {
      // If the user exists but is not verified, update the OTP
      existingUser.otp = otp;
      await existingUser.save();
    }

    return res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    return res.status(500).json({ message: "Error sending OTP", error: err });
  }
};

// OTP verification and password setup
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If the user is not found or the OTP is invalid, return an error
    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // Set the user as verified and clear the OTP
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    return res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    return res.status(500).json({ message: "Error verifying OTP", error: err });
  }
};

// Admin login: Verify admin credentials and issue JWT
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found or user is not verified, return an error
    if (!user || !user.isVerified) {
      return res
        .status(400)
        .json({ message: "Invalid email or user not verified." });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Generate JWT token for the user (admin field is included)
    const token = jwt.sign(
      { id: user._id, email: user.email, admin: user.admin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Return the user and token
    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        admin: user.admin,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Error logging in", error: err });
  }
};
