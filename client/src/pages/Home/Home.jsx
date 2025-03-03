import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header/Header";
import { Heart } from "lucide-react";

function Home() {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setDate(today);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const toggleLike = (productId) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header />

      <div className="grid pt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No products posted yet.</p>
        ) : (
          products.map((product) => (
            <Link to={`/productdetails/${product._id}`}>
              <div className="bg-white p-4 rounded-lg shadow-md relative">
          
                <div className="relative">
                  {product.image && (
                    <img
                      src={`http://localhost:3000${product.image}`}
                      alt={product.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  )}
                 
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(product._id);
                    }}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                  >
                    <Heart
                      size={24}
                      color={likedProducts[product._id] ? "red" : "gray"}
                      fill={likedProducts[product._id] ? "red" : "none"}
                    />
                  </button>
                </div>

            
                <h2 className="text-xl font-bold mt-2">{product.title}</h2>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-blue-600 font-semibold mt-1">₹{product.price}</p>
                <p className="text-gray-500 text-sm">{product.location}</p>
                <p className="text-gray-500 text-sm">{date}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
