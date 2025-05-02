import express from "express";
import { searchProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", searchProducts);

export default router;
