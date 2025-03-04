import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signup', { name, email, password });
      console.log(response.data);
      setStep(2);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/verify-signup', { email, otp, password,name });
      console.log(response.data);
      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">User Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter your user name" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter your email" required />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter your password" required />
              </div>
              <button type="submit" className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">Sign Up</button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Verify OTP</h2>
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Enter OTP</label>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter OTP" required />
              </div>
              <button type="submit" className="w-full p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">Verify OTP</button>
            </form>
          </>
        )}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Already have an account? <Link to="/" className="text-blue-500 hover:underline">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;