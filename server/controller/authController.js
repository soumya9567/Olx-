import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "soumyasou9567@gmail.com",
    pass: "oigw pagy izlg tdpy", 
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
    const otpEntry = await otpModel.create({ email, otp, createdAt: new Date() });
    
    await otpModel.create({ email, otp, createdAt: new Date() });

    await transporter.sendMail({
      from: "soumyasou9567@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
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
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
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
    res.status(500).json({ message: "Error logging in", error });
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
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};
