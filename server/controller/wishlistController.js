import Wishlist from "../models/wishlistModel.js"

// ✅ Add to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Prevent duplicates
    const existingItem = await Wishlist.findOne({ userId, productId });
    if (existingItem) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const wishlistItem = new Wishlist({ userId, productId });
    await wishlistItem.save();

    res.status(201).json({ message: "Added to wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to wishlist", error });
  }
};

// ✅ Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await Wishlist.findOneAndDelete({ userId, productId });

    res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};

// ✅ Get User Wishlist
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlistItems = await Wishlist.find({ userId }).populate("productId");

    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
}
