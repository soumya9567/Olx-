import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../Components/Header/Header";
import { Heart } from "lucide-react";
import Banner from "../../Components/Banner/Banner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchProducts } from "../../store/productSlice";

function Home() {
  const dispatch = useDispatch();
  
  // Access products and user from Redux
  const { items: products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.user?._id; 
  const productIds = products.map(product => product._id);
    console.log(products,"ppppppppppppproduct")
  console.log(productIds,"ppppppppppppproductiiiid")// Extract userId from Redux auth state

  const [likedProducts, setLikedProducts] = useState({});

  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);

  // Toggle Wishlist
  const toggleLike = async (productIds) => {
    if (!userId) {
      console.log("User not logged in");
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:3000/wishlist/toggle`, {
        userId,
         productId:productIds,

      
      
      });
  
      console.log("Wishlist updated:", response.data);
  
      // Update state based on API response
      setLikedProducts((prev) => ({
        ...prev,
        [productIds]: response.data.liked, // Assuming backend returns `{ liked: true/false }`
      }));
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header />
      <Banner />

      <h2 className="text-2xl font-bold text-center mb-4">Fresh Recommendations</h2>

      <div className="grid pt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No products posted yet.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 w-full max-w-80 rounded-lg shadow-md relative"
            >
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
                onClick={() => toggleLike(product._id)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
              >
                <Heart
                  size={24}
                  color={likedProducts[product._id] ? "red" : "gray"}
                  fill={likedProducts[product._id] ? "red" : "none"}
                />
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

export default Home;
