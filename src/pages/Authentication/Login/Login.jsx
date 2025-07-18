import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import logo from "../../../assets/logo.png";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import loginLottie from "../../../assets/lottie/Login.json";
import FadeIn from "react-fade-in";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Helmet>
        <title>Login | BrickBase</title>
      </Helmet>
      {/* Left: Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex items-center justify-center p-8 bg-white text-black"
      >
        <div className="w-full max-w-md">
          <FadeIn>
            {/* Logo */}
            <div className="mb-8">
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="BrickBase Logo" className="w-8 h-8" />
                <span className="text-xl font-bold text-gray-800">
                  BrickBase
                </span>
              </Link>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              Welcome back
            </h2>
            <p className="text-gray-600 mb-6">Please enter your details</p>

            {/* Email */}
            <input
              type="email"
              {...register("email")}
              placeholder="Email address"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password */}
            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center mb-6 text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password
              </a>
            </div>

            {/* Sign In */}
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition">
              Sign in
            </button>

            {/* OR */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-2 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Sign In */}
            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-100 transition">
              <FcGoogle className="text-xl mr-2" />
              Sign in with Google
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </FadeIn>
        </div>
      </form>

      {/* Right: Lottie Section */}
      <div className="hidden flex-1 bg-blue-100 md:flex items-center justify-center p-4">
        <div className="flex items-center justify-center">
          <Lottie animationData={loginLottie} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Login;
