import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData); // Log form data
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log("Response received", response); // Log response
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      console.log("Signup form submitted:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error occurred", error); // Log error
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
      }
      const errorMessage = error.response ? error.response.data.message : "Server Error";
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full text-white">
        <h2 className="text-3xl font-bold text-center text-blue-400">SIGN UP</h2>
        <p className="text-center text-lg mb-6">Create a free Account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your First Name"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your Last Name"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Company Email"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone <span className="text-red-500">*</span></label>
              <div className="flex">
                <span className="bg-gray-700 p-2 rounded-l border border-gray-600">+91</span>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Personal Number"
                  className="w-full p-2 rounded-r bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-400"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-sm">
              I accept the <a href="#" className="text-blue-400 underline">terms and conditions</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Register
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account? <a href="/" className="text-blue-400 font-semibold">LOGIN</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
