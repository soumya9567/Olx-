import { useState } from "react";
import { Link } from "react-router-dom";
// import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  const [location, setLocation] = useState("Pakistan");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-gray-100 p-4 flex items-center justify-between shadow-md">
      <a href="#" className="flex items-center">
        <img src="/logo.png" alt="Logo" className="w-16" />
      </a>
      
      <div className="flex space-x-4 items-center w-1/2">
        <div className="relative flex items-center w-1/3">
          <input
            type="text"
            className="w-full p-2 border-2 border-gray-400 rounded-md pl-3"
            placeholder="Pakistan"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="absolute right-2 text-white bg-gray-700 p-2 rounded">
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="relative flex items-center w-2/3">
          <input
            type="text"
            className="w-full p-2 border-2 border-gray-400 rounded-md pl-3"
            placeholder="Find Mobile, Car, Laptop"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-2 text-white bg-gray-700 p-2 rounded">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <Link to = "/">
        <h6 className="underline font-bold cursor-pointer text-lg">Login</h6>

        </Link>

        <Link to = "/productpost">
        <button className="flex items-center space-x-2 px-5 py-2 border-4 rounded-full shadow-md font-bold text-lg text-gray-800 border-blue-500 border-t-[#23e5db] border-r-[#ffce32]">
          + <span>SELL</span>
        </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
