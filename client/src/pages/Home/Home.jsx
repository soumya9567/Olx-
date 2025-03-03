import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header/Header";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header />

      <div className="flex justify-end mb-6">
      
      </div>

      {/* Product Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No products posted yet.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
              {product.image && (
                <img
                src={`http://localhost:3000${product.image}`} 
                alt={product.title}
                className="w-full h-40 object-cover  rounded-md"
              />
              
              )}
              <h2 className="text-xl font-bold mt-2">{product.title}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-blue-600 font-semibold mt-1">${product.price}</p>
              <p className="text-gray-500 text-sm">{product.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
