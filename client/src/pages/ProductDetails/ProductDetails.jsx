import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Share2, Heart } from "lucide-react";
import axios from "axios";
import Header from "../../Components/Header/Header";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Product not found!");
      });
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!product) {
    return (
      <p className="text-center text-gray-500">Loading product details...</p>
    );
  }

  return (
    <div>
      <Header />
      <div className="p-4 bg-gray-100 min-h-screen flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full grid grid-cols-3 gap-6">
          <div className="col-span-2 relative bg-black flex items-center justify-center">
            <img
              src={`http://localhost:3000${product.image}`}
              alt={product.title}
              className="w-full h-[500px] object-contain bg-black"
            />

            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">
              ❮
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">
              ❯
            </button>
          </div>

          <div className="col-span-1 space-y-4">
            <div className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  ₹ {product.price}
                </h2>
                <p className="text-lg text-gray-700">{product.title}</p>
                <p className="text-gray-500 text-sm">{product.location}</p>
                <p className="text-gray-400 text-xs">
                  {new Date().toDateString()}
                </p>
              </div>
              <div className="flex space-x-4">
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <Share2 size={22} />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600">
                  <Heart size={22} />
                </button>
              </div>
            </div>

            <button className="w-full p-3 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-600 hover:text-white">
              Contact Through G-mail
            </button>

            <div className="border p-4 rounded-lg flex flex-col  ">
              <p>
                <b>Posted In</b>
              </p>
              <p>{product.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
