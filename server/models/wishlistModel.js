import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
