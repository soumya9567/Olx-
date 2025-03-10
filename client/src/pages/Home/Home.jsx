import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header/Header";
import { Heart } from "lucide-react";
import Banner from "../../Components/Banner/Banner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../assets/images/image1.png"
import image2 from "../../assets/images/image2.png"
import image3 from "../../assets/images/image3.png"
import image4 from "../../assets/images/image5.png"

function Home() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [likedProducts, setLikedProducts] = useState({});
  const [userId, setUserId] = useState(null);
  const carouselImages = [
  image1,image2,image3,image4
  ];
  
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const toggleLike = async (productId) => {
    if (!userId) {
      alert("Please log in to use the wishlist feature.");
      return;
    }
  
    try {
      if (likedProducts[productId]) {
        await axios.delete(`http://localhost:3000/wishlist/${userId}/${productId}`);
        setLikedProducts((prev) => ({ ...prev, [productId]: false }));
      } else {
        await axios.post("http://localhost:3000/wishlist", { userId, productId });
        setLikedProducts((prev) => ({ ...prev, [productId]: true }));
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };
  

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/user", { withCredentials: true })
      .then((response) => {
        setUserId(response.data.userId);
      })
      .catch(() => {
        setUserId(null);
      });
  
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
        setSortedProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:3000/wishlist/${userId}`)
      .then((response) => {
        const wishlistMap = {};
        response.data.forEach((item) => {
          wishlistMap[item.productId._id] = true;
        });
        setLikedProducts(wishlistMap);
      })
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, [userId]);

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    let sorted = [...products];

    if (order === "low-to-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (order === "high-to-low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sorted);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header />
      <Banner />

      <div className="mt-8">
      <div className="flex justify-end -mt-16 mb-4 pt-12">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="p-2 border rounded-md bg-white shadow-md"
        >
          <option value="default">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
        <h2 className="text-2xl font-bold text-center mb-4">Fresh recommendations</h2>
        <Slider {...carouselSettings}>
          {carouselImages.map((imgSrc, index) => (
            <div key={index} className="p-4">
              <img
                src={imgSrc}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </Slider>
      </div>


     

      <div className="grid pt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {sortedProducts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No products posted yet.</p>
        ) : (
          sortedProducts.map((product) => (
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
