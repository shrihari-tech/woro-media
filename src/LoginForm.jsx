import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData, {
        withCredentials: true
      });
      console.log("Login form submitted:", response.data);
      sessionStorage.setItem('user', JSON.stringify(response.data.user)); // Store user information in session storage
      navigate("/dashboard");
    } catch (error) {
      console.error("Error occurred", error); // Log error
      if (error.response) {
        console.log("Error response data:", error.response.data); // Log error response data
        setErrorMessage(error.response.data.message || "Server error");
      } else {
        setErrorMessage("Server error");
      }
    }
  };

  return ( 
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full text-white">
        <h2 className="text-3xl font-bold text-center text-blue-400">LOGIN</h2>
        <p className="text-center text-lg mb-6">Access your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm">Remember Me</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account? <a href="/signup" className="text-blue-400 font-semibold">SIGN UP</a>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
