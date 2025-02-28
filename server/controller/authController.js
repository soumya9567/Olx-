import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ name, email, password: hashedPassword });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body)

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No record exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
