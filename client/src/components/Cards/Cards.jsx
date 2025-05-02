import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist } from "../../ReduxStore/Reducers/authSlice";
import { useMemo } from "react";

const Cards = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const wishlist = useMemo(() => user?.wishlist || [], [user?.wishlist]);
  const isWishlisted = wishlist.includes(product._id);

  const handleWishlist = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/products/wishlist",
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const updatedWishlist = isWishlisted
          ? wishlist.filter((id) => id !== product._id)
          : [...wishlist, product._id];

        dispatch(setWishlist(updatedWishlist));
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="relative bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden w-full max-w-xs sm:max-w-sm">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          onClick={() => navigate(`/product/${product._id}`)}
          src={`http://localhost:4000${product.images[0]}`}
          alt="Product"
          className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
        />
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md"
        >
          <FaHeart
            className={`text-lg transition-colors ${
              isWishlisted ? "text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-blue-900">&#x20B9; {product.price}</p>
          <span className="text-sm text-gray-500 capitalize">
            {product.category}
          </span>
        </div>
        <p
          className="text-base font-medium text-gray-800 truncate cursor-pointer"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          {product.title}
        </p>
        <p className="text-xs text-gray-400">
          Posted on: {new Date(product.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default Cards;
