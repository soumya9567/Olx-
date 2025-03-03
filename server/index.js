import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { signup, login } from "./controller/authController.js";
import { postProduct, getProducts, upload, productdetails } from "./controller/productController.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); 

mongoose
  .connect("mongodb+srv://soumyasathyansathyan:soumya1917@cluster0.tzwip.mongodb.net/OLX")
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));


app.post("/signup", signup);
app.post("/", login);
app.post("/home")
app.post("/productpost", upload.single("image"), postProduct);
app.get("/products", getProducts);
app.get("/products/:id",productdetails)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
