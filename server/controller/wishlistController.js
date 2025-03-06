import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

// Add to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Please log in to add items to your wishlist." });
    }
    

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the wishlist
    const existingWishlistItem = await Wishlist.findOne({ userId, productId });
    if (existingWishlistItem) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    // Add product to wishlist
    const newWishlistItem = new Wishlist({ userId, productId });
    await newWishlistItem.save();

    res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error });
  }
};

// Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const wishlistItem = await Wishlist.findOneAndDelete({ userId, productId });

    if (!wishlistItem) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};

// Get Wishlist
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all wishlist items for the user
    const wishlist = await Wishlist.find({ userId }).populate("productId");

    res.status(200).json(wishlist.map((item) => item.productId));
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};
