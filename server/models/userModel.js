import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
    
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }] 
      },
    
      {
        timestamps: true,
      }
)

const User = mongoose.model("user",userSchema)
export default User