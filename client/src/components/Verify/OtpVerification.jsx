import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail");
    if (!storedEmail) {
      navigate("/signup");
    } else {
      setEmail(storedEmail);
      console.log("Email loaded from localStorage:", storedEmail);
    }
  }, [navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("OTP verified! Redirecting...");
        localStorage.removeItem("signupEmail"); // clear stored email
        setTimeout(() => navigate("/"), 3000);
      } else {
        setMessage(data.message || "Invalid OTP.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="border border-black p-6 rounded-lg bg-white shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-semibold">OTP Verification</h2>
        <p className="text-gray-700 mt-4">Enter the OTP sent to <strong>{email}</strong></p>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleVerifyOtp} className="space-y-4 mt-4">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full border-b border-gray-300 outline-none focus:border-blue-500 bg-transparent py-1 text-center text-xl"
          />
          <button
            type="submit"
            className="w-full bg-teal-900 text-white font-bold py-3 rounded 
              hover:bg-white hover:text-teal-900 hover:border-2 hover:border-teal-900 transition"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
