import express from "express";
import { signup, login, verifySignup, logout } from "../controller/authController.js";
import { postProduct, getProducts, upload, productdetails } from "../controller/productController.js";
import  { getWishlist, removeFromWishlist,addToWishlist } from "../controller/wishlistController.js"

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/verifySignup", verifySignup);
router.post("/auth/login", login);
router.post("/logout", logout);



router.post("/products/post", upload.single("image"), postProduct);
router.get("/products", getProducts);
router.get("/products/:id", productdetails);


router.post("/add", addToWishlist);
router.delete("/remove", removeFromWishlist);
router.get("/:userId", getWishlist);




export default router;
