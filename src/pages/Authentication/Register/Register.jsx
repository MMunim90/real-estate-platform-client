import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router"; // make sure to use 'react-router-dom'
import logo from "../../../assets/logo.png";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import registerLottie from "../../../assets/lottie/register.json";
import FadeIn from "react-fade-in";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const { signInWithGoogle } = useAuth();
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async(result) => {
        // const user = result.user;
        //console.log(res.user);
        Swal.fire({
          title: "Registration Successful!",
          icon: "success",
          confirmButtonColor: "#01AFF7",
        });

        //update userinfo in the database
        // const userInfo = {
        //   email: user.email,
        //   role: "user", // default role
        //   created_at: new Date().toISOString(),
        //   last_logged_in: new Date().toISOString(),
        // };

        // const res = await axiosInstance.post('/users', userInfo);
        //console.log('user update info', result.data);

        navigate(from);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Helmet>
        <title>Register | BrickBase</title>
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
              Create your account
            </h2>
            <p className="text-gray-600 mb-6">Please enter your details</p>

            {/* Name */}
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 mb-4">Name is required</p>
            )}

            {/* Photo Upload */}
            <input
              type="file"
              className="w-full mb-4 text-sm file:px-4 file:py-2 border border-gray-300 rounded file:bg-blue-500 file:text-white file:cursor-pointer file:hover:bg-blue-600"
            />

            {/* Email */}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email address"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 mb-4">Email is required</p>
            )}

            {/* Password */}
            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: {
                    hasCapitalLetter: (value) =>
                      /[A-Z]/.test(value) ||
                      "Must include at least one capital letter",
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      "Must include at least one special character",
                  },
                })}
                placeholder="Password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>

            {/* Error Messages */}
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}

            {/* Register Button */}
            <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition">
              Sign up
            </button>
            {/* OR Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-2 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Register */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
            >
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
          </FadeIn>
        </div>
      </form>

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
