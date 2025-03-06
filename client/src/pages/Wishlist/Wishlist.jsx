import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header/Header";
import { Heart } from "lucide-react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem("userId"); // Get user ID from authentication

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:3000/wishlist/${userId}`)
      .then((response) => setWishlist(response.data))
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, [userId]);

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/wishlist/${userId}/${productId}`);
      setWishlist((prev) => prev.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header />
      <h1 className="text-2xl font-bold text-center my-4">My Wishlist</h1>
      <div className="grid pt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">Your wishlist is empty.</p>
        ) : (
          wishlist.map((product) => (
            <div key={product._id} className="bg-white p-4 w-full max-w-80 rounded-lg shadow-md relative">
              <Link to={`/productdetails/${product._id}`}>
                {product.image && (
                  <img
                    src={`http://localhost:3000${product.image}`}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                )}
              </Link>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
              >
                <Heart size={24} color="red" fill="red" />
              </button>
              <h2 className="text-xl font-bold mt-2">{product.title}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-blue-600 font-semibold mt-1">₹{product.price}</p>
              <p className="text-gray-500 text-sm">{product.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;
