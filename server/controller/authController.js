import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";

dotenv.config(); 

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error(" EMAIL_USER or EMAIL_PASS is missing in .env file!");
  process.exit(1); 
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOTP();
    await otpModel.create({ email, otp, createdAt: new Date() });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, 
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
};

export const verifySignup = async (req, res) => {
  try {
    const { email, otp, password, name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const validOtp = await otpModel.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ name, email, password: hashedPassword });

    await otpModel.deleteMany({ email });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Verify OTP error:", error.message);
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const verifyLogin = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const validOtp = await otpModel.findOne({ email, otp });

    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await otpModel.deleteMany({ email });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login OTP verification error:", error.message);
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};
export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid"); 
    res.json({ message: "Logout successful" });
  });
};

