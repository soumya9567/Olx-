import Wishlist from "../models/wishlistModel.js"
import Product from "../models/productModel.js"
import User from "../models/userModel.js";


// ✅ Get Wishlist for a User
export const getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;

        const wishlist = await Wishlist.find({ userId }).populate("productId");
        res.json({ wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
export const wishlisttoggle = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    console.log("Received data:", { userId, productId });

    if (!userId || !productId) {
        return res.status(400).json({ error: 'Missing userId or productId' });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Ensure productId is a valid string before adding to wishlist
    const productIdStr = String(productId).trim();
    if (!productIdStr || productIdStr === "null") {
        return res.status(400).json({ error: 'Invalid productId' });
    }

    const index = user.wishlist.indexOf(productIdStr);
    

    
    if (index === -1) {
        user.wishlist.push(productIdStr);
    } else {
        user.wishlist.splice(index, 1);
        
    }

    await user.save();

    console.log(index,"user wishlist")
    // ✅ Remove null values before responding
    res.status(200).json({ 
      message: 'Wishlist updated', 
      wishlist: user.wishlist.filter(item => item !== null) 
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: 'Server error' });
  }
};


