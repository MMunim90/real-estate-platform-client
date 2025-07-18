import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router"; // make sure to use 'react-router-dom'
import logo from "../../../assets/logo.png";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import registerLottie from "../../../assets/lottie/register.json"; // You can replace this with a sign-up animation if available

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Helmet>
        <title>Register | BrickBase</title>
      </Helmet>

      {/* Left: Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white text-black">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="BrickBase Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-800">BrickBase</span>
            </Link>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Create your account
          </h2>
          <p className="text-gray-600 mb-6">Please enter your details</p>

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Photo Upload */}
          <input
            type="file"
            className="w-full mb-4 text-sm file:px-4 file:py-2 border border-gray-300 rounded file:bg-blue-500 file:text-white file:cursor-pointer file:hover:bg-blue-600"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Register Button */}
          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition">
            Sign up
          </button>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Register */}
          <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-100 transition">
            <FcGoogle className="text-xl mr-2" />
            Sign up with Google
          </button>

          {/* Signin Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Lottie Section */}
      <div className="hidden flex-1 bg-blue-100 md:flex items-center justify-center p-4">
        <div className="flex items-center justify-center">
          <Lottie animationData={registerLottie} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Register;
