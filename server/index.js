import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); 

import { signup, login, verifySignup } from "./controller/authController.js";
import { postProduct, getProducts, upload, productdetails } from "./controller/productController.js";
import { addToWishlist, getWishlist, removeFromWishlist } from "./controller/wishlistController.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); 

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

app.post("/signup", signup);
app.post("/verify-signup", verifySignup);
app.post("/", login);

app.post("/productpost", upload.single("image"), postProduct);
app.get("/products", getProducts);
app.get("/products/:id", productdetails);

app.post("/", addToWishlist); 
app.delete("/:userId/:productId", removeFromWishlist); 
app.get("/:userId", getWishlist);    

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
