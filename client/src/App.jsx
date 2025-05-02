import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "./ReduxStore/Reducers/authSlice";
import { ToastContainer } from "react-toastify";

// Pages
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import SelectCategory from "./components/Post/SelectCategory";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import OtpVerification from "./components/Verify/OtpVerification";
import Wishlist from "./pages/GetWishlist/Wishlist";
import SearchResults from "./pages/SearchResults/SearchResults";
import Profile from "./pages/Profile/Profile";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const allowedWithoutToken = ["/signup", "/signin", "/verify-otp"];

    if (!token) {
      const currentPath = window.location.pathname;
      if (!allowedWithoutToken.includes(currentPath)) {
        navigate("/");
      }
    } else {
      fetchUserData();
    }
  }, [token, navigate, dispatch]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      dispatch(setUser(data.user));

      if (data.message === "Invalid or expired token") {
        navigate("/");
      }
    } catch (error) {
      console.log("Fetch user error:", error.message);
    }
  };

  return (
    <div className="mx-30">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/search-result" element={<SearchResults />} />
        <Route path="/post-category" element={<SelectCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
