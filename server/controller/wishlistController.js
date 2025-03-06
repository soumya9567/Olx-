import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js"; 

export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const existingItem = await Wishlist.findOne({ userId, productId });
    if (existingItem) {
      return res.status(400).json({ message: "Product is already in the wishlist" });
    }

    const newWishlistItem = new Wishlist({ userId, productId });
    await newWishlistItem.save();

    res.status(201).json({ message: "Product added to wishlist", wishlistItem: newWishlistItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlistItems = await Wishlist.find({ userId }).populate("productId");

    const formattedWishlist = wishlistItems.map((item) => ({
      _id: item.productId._id,
      title: item.productId.title,
      description: item.productId.description,
      price: item.productId.price,
      location: item.productId.location,
      image: item.productId.image,
    }));

    res.status(200).json(formattedWishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    await Wishlist.findOneAndDelete({ userId, productId });

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};
