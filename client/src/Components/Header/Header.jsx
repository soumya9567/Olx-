import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import searchIcon from "../../assets/images/search.png";
import { Heart } from "lucide-react";
import axios from "axios";

const Header = () => {
  const [location, setLocation] = useState("India");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  return (
    <nav className="bg-gray-100 p-4 flex items-center justify-between shadow-md">
    
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="w-20" />
      </Link>

      <div className="relative flex items-center">
        <img src={searchIcon} alt="Search" className="absolute left-3 w-5 h-5 cursor-pointer" />
        <input
          type="text"
          className="w-40 p-2 pl-10 border-2 border-gray-400 rounded-md"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* 🔹 Search Bar */}
      <div className="relative flex items-center w-1/2">
        <input
          type="text"
          className="w-full p-2 border-2 border-gray-400 rounded-md pl-3"
          placeholder="Find Mobile, Car, Laptop..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-2 text-white bg-gray-700 p-2 rounded">
          <i className="fas fa-search"></i>
        </button>
      </div>

      <Link to="/wishlist" className="flex items-center space-x-2">
        <Heart className="text-red-500" />
        <h1 className="font-semibold text-gray-800">Wishlist</h1>
      </Link>

      <div className="flex items-center space-x-6">
      <div>
      {isAuthenticated ? (
        <h6
          onClick={handleLogout}
          className="underline font-bold cursor-pointer text-lg"
        >
          Logout
        </h6>
      ) : (
        <Link to="/">
          <h6 className="underline font-bold cursor-pointer text-lg">Login</h6>
        </Link>
      )}
    </div>


        <Link to="/productpost">
          <button className="flex items-center space-x-2 px-5 py-2 border-4 rounded-full shadow-md font-bold text-lg text-gray-800 border-blue-500 border-t-[#23e5db] border-r-[#ffce32]">
            + <span>SELL</span>
          </button>
        </Link>
      </div>

      {filteredProducts.length > 0 && (
        <div className="absolute top-16 left-1/3 w-1/2 bg-white shadow-lg rounded-md p-4">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="block p-2 hover:bg-gray-200 rounded-md">
              {product.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;
