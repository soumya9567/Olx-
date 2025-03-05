import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header/Header";
import { Heart } from "lucide-react";

function Home() {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const [date, setDate] = useState("");

  const userId = " "; 

  useEffect(() => {
    setDate(new Date().toLocaleDateString());

   
    axios
      .get("http://localhost:3000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    
    axios
      .get(`http://localhost:3000/wishlist/${userId}`)
      .then((response) => {
        const wishlistMap = {};
        response.data.forEach((product) => {
          wishlistMap[product._id] = true;
        });
        setLikedProducts(wishlistMap);
      })
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, []);

  const toggleLike = async (productId) => {
    try {
      if (likedProducts[productId]) {
     
        await axios.delete(`http://localhost:3000/wishlist/${userId}/${productId}`);
        setLikedProducts((prev) => {
          const updatedLikes = { ...prev };
          delete updatedLikes[productId];
          return updatedLikes;
        });
      } else {
      
        await axios.post("http://localhost:3000/wishlist", { userId, productId });
        setLikedProducts((prev) => ({
          ...prev,
          [productId]: true,
        }));
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header />

      <div className="grid pt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No products posted yet.</p>
        ) : (
          products.map((product) => (
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
              <p className="text-gray-500 text-sm">{date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
