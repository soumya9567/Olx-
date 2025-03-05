import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png"
import search from "../../assets/images/search.png"
import { Heart } from "lucide-react";



const Header = () => {
  const [location, setLocation] = useState("Pakistan");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-gray-100 p-4 flex items-center justify-between shadow-md">
      <a href="#" className="flex items-center">
        <img width={90} src={logo} alt="Logo" className="w-16" />
      </a>

      <div className="flex space-x-4 items-center w-1/2">
        <div className="relative flex items-center ">

          <img
            src={search}
            alt="Search"
            className="absolute left-3 w-5 h-5 cursor-pointer"
          />
          <input
            type="text"
            className="w-full p-2 pl-32  border-2 right-3 rounded-md "
            placeholder="India"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

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
     

        <Link to={"/wishlist"}> <div>
          <h1>view wishlist</h1>
         </div></Link>


      <div className="flex items-center space-x-6">
        <Link to="/">
          <h6 className="underline font-bold cursor-pointer text-lg">Login</h6>

        </Link>

        <Link to="/productpost">
          <button className="flex items-center space-x-2 px-5 py-2 border-4 rounded-full shadow-md font-bold text-lg text-gray-800 border-blue-500 border-t-[#23e5db] border-r-[#ffce32]">
            + <span>SELL</span>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
