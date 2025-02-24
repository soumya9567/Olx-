import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {

const [email,setEmail] = useState()
const [password,setPassword] = useState()
const navigate = useNavigate()

const handleSubmit =(e) =>{
    e.preventDefault()
    axios.post("http://localhost:3000",{email,password})
    .then(result =>{
        console.log(result)
         if(result.data === "success"){
         
            navigate('/home')

        }
        

    })
    .catch(err =>{
        console.log(err)
    })
}


  return (
    <div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

      <form  onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) =>setPassword(e.target.value)}

            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup"  className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  </div>
  </div>
  )
}

export default SignIn
