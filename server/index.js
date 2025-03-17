import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoute from "./routes/authRoute.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // Allow multiple origins
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

app.use("/", authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
